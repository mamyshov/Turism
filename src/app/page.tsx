import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedRegions, localizedCategories } from "@/lib/i18n/constant-labels";

const TARIFF_ORDER: Record<string, number> = { PRO: 0, STANDARD: 1, BASIC: 2 };

async function getFeaturedCompanies() {
  const companies = await prisma.company.findMany({
    where: { verificationStatus: "APPROVED", isBlocked: false },
    include: {
      photos: { orderBy: { order: "asc" }, take: 1 },
      reviews: { select: { rating: true } },
    },
    take: 30,
  });
  return companies
    .sort((a, b) => TARIFF_ORDER[a.tariff] - TARIFF_ORDER[b.tariff])
    .slice(0, 6);
}

export default async function HomePage() {
  const featured = await getFeaturedCompanies();
  const locale = getLocale();
  const dict = getDictionary(locale).home;
  const regions = localizedRegions(locale);
  const categories = localizedCategories(locale);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold">{dict.heroTitle}</h1>
          <p className="mt-4 text-brand-50 text-lg max-w-2xl mx-auto">{dict.heroSubtitle}</p>

          <form action="/search" className="mt-8 mx-auto max-w-xl flex gap-2">
            <input
              name="q"
              placeholder={dict.searchPlaceholder}
              className="flex-1 rounded-md border-0 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            <button className="rounded-md bg-white px-5 py-3 font-medium text-brand-700 hover:bg-brand-50">
              {dict.searchButton}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {regions.slice(0, 6).map((r) => (
              <Link
                key={r.key}
                href={`/search?region=${r.key}`}
                className="rounded-full bg-brand-800/40 px-3 py-1 text-sm hover:bg-brand-800/70"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-xl font-bold mb-2">{dict.categoriesTitle}</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/search?category=${c.key}`}
              className="rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:border-brand-500 hover:text-brand-700"
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{dict.topCompaniesTitle}</h2>
          <Link href="/search" className="text-sm font-medium text-brand-700">
            {dict.viewAll}
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {dict.emptyState}{" "}
            <Link href="/register" className="text-brand-700 font-medium">{dict.emptyStateLink}</Link>.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((company) => (
              <CompanyCard key={company.id} company={company} locale={locale} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
