import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAnthropicClient, AI_MODEL } from "@/lib/anthropic";
import { LOCALES, DEFAULT_LOCALE, Locale } from "@/lib/i18n/locales";

// Sending the whole catalog to the model works at MVP scale (a few dozen
// to a few hundred tours). If the catalog grows much larger, add a
// pre-filter (keyword/region match, or a real retrieval/embeddings step)
// before this cap so the prompt stays within a reasonable context size —
// don't just raise the cap.
const MAX_TOURS_IN_PROMPT = 200;
const MAX_QUERY_LENGTH = 500;
const MAX_RESULTS = 10;

const AiResultSchema = z.object({
  results: z
    .array(
      z.object({
        tourId: z.string().describe("Exact id of a tour from the provided list"),
        reason: z.string().describe("One short sentence explaining why this tour matches the request"),
      })
    )
    .describe("Tours that genuinely match the request, most relevant first. Empty array if nothing matches well."),
});

const LANGUAGE_NAME: Record<Locale, string> = {
  ru: "Russian",
  ky: "Kyrgyz",
  en: "English",
};

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const query = typeof body?.query === "string" ? body.query.trim() : "";
  const locale: Locale = (LOCALES as string[]).includes(body?.locale) ? body.locale : DEFAULT_LOCALE;

  if (!query) {
    return NextResponse.json({ error: "Query is required." }, { status: 400 });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: `Query is too long (max ${MAX_QUERY_LENGTH} characters).` }, { status: 400 });
  }

  const tours = await prisma.tour.findMany({
    where: {
      company: { verificationStatus: "APPROVED", isBlocked: false },
    },
    include: {
      company: { select: { name: true, slug: true, region: true, categories: true } },
    },
    take: MAX_TOURS_IN_PROMPT,
    orderBy: { createdAt: "desc" },
  });

  if (tours.length === 0) {
    return NextResponse.json({ results: [] });
  }

  const catalogForPrompt = tours.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ? t.description.slice(0, 300) : null,
    durationDays: t.durationDays,
    durationHours: t.durationHours,
    price: t.price,
    maxPeople: t.maxPeople,
    included: t.included,
    excluded: t.excluded,
    region: t.company.region,
    company: t.company.name,
  }));

  try {
    const client = getAnthropicClient();
    const response = await client.messages.parse({
      model: AI_MODEL,
      max_tokens: 4096,
      output_config: {
        format: zodOutputFormat(AiResultSchema),
        effort: "low",
      },
      system:
        "You are a tour-matching assistant for KyrgyzTour Hub, a tourism platform for Kyrgyzstan. " +
        "You will be given a tourist's free-text request and a JSON list of available tours (fields: " +
        "id, title, description, durationDays, durationHours, price in KGS, maxPeople, included, excluded, " +
        "region, company). Select only tours that genuinely match the request — it is fine to return few " +
        "results or an empty list if nothing fits well. Never invent a tourId that is not in the provided list. " +
        `Write each "reason" as one short, friendly sentence in ${LANGUAGE_NAME[locale]}.`,
      messages: [
        {
          role: "user",
          content: `Tourist request: "${query}"\n\nAvailable tours (JSON):\n${JSON.stringify(catalogForPrompt)}`,
        },
      ],
    });

    if (!response.parsed_output) {
      return NextResponse.json({ error: "AI returned an unexpected response." }, { status: 502 });
    }

    const validIds = new Set(tours.map((t) => t.id));
    const byId = new Map(tours.map((t) => [t.id, t]));

    const results = response.parsed_output.results
      .filter((r) => validIds.has(r.tourId))
      .slice(0, MAX_RESULTS)
      .map((r) => {
        const tour = byId.get(r.tourId)!;
        return {
          tourId: tour.id,
          reason: r.reason,
          title: tour.title,
          price: tour.price,
          durationDays: tour.durationDays,
          durationHours: tour.durationHours,
          companyName: tour.company.name,
          companySlug: tour.company.slug,
        };
      });

    return NextResponse.json({ results });
  } catch (err) {
    if (err instanceof Error && err.message === "ANTHROPIC_API_KEY is not set") {
      return NextResponse.json(
        { error: "AI search is not configured on this server." },
        { status: 503 }
      );
    }
    if (err instanceof Anthropic.BadRequestError) {
      console.error("AI tour search bad request", err);
      return NextResponse.json({ error: "AI search request was invalid." }, { status: 400 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "AI service is busy, please try again shortly." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error", err);
      return NextResponse.json({ error: "AI search failed." }, { status: 502 });
    }
    console.error("AI tour search failed", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
