import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toJsonArray } from "@/lib/json";
import { REGIONS, LANGUAGES, TOUR_CATEGORIES } from "@/lib/constants";

const REGION_KEYS: Set<string> = new Set(REGIONS.map((r) => r.key));
const LANGUAGE_KEYS: Set<string> = new Set(LANGUAGES.map((l) => l.key));
const CATEGORY_KEYS: Set<string> = new Set(TOUR_CATEGORIES.map((c) => c.key));

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const body = await req.json();
  const {
    description,
    region,
    languages,
    categories,
    phone,
    whatsapp,
    instagram,
    contactEmail,
  } = body;

  if (region && !REGION_KEYS.has(region)) {
    return NextResponse.json({ error: "Некорректный регион." }, { status: 400 });
  }
  const safeLanguages = Array.isArray(languages)
    ? languages.filter((l: string) => LANGUAGE_KEYS.has(l))
    : [];
  const safeCategories = Array.isArray(categories)
    ? categories.filter((c: string) => CATEGORY_KEYS.has(c))
    : [];

  const company = await prisma.company.update({
    where: { id: session.user.companyId },
    data: {
      description: typeof description === "string" ? description.slice(0, 3000) : undefined,
      region: region || null,
      languages: toJsonArray(safeLanguages),
      categories: toJsonArray(safeCategories),
      phone: typeof phone === "string" ? phone.slice(0, 40) : undefined,
      whatsapp: typeof whatsapp === "string" ? whatsapp.slice(0, 40) : undefined,
      instagram: typeof instagram === "string" ? instagram.slice(0, 60) : undefined,
      contactEmail: typeof contactEmail === "string" ? contactEmail.slice(0, 200) : undefined,
    },
  });

  return NextResponse.json({ ok: true, company });
}
