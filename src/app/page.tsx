import Link from "next/link";
import Image from "next/image";
import { sitePhoto } from "@/lib/site-photos";
import { prisma } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedRegions, localizedCategories } from "@/lib/i18n/constant-labels";
import {
  Search as SearchIcon,
  Sparkles,
  Mountain,
  PawPrint,
  Landmark,
  UtensilsCrossed,
  Flame,
  Leaf,
  Snowflake,
  ArrowRight,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TARIFF_ORDER: Record<string, number> = { PRO: 0, STANDARD: 1, BASIC: 2 };

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  trekking: Mountain,
  horse: PawPrint,
  cultural: Landmark,
  gastro: UtensilsCrossed,
  adventure: Flame,
  eco: Leaf,
  pilgrimage: Landmark,
  winter: Snowflake,
};

async function getFeaturedCompanies() {
  const companies = await prisma.company.findMany({
    where: { verificationStatus: "APPROVED", isBlocked: false },
    include: {
      photos: { orderBy: { order: "asc" }, take: 1 },
      reviews: { select: { rating: true } },
      tours: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
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
  const searchDict = getDictionary(locale).search;
  const regions = localizedRegions(locale);
  const categories = localizedCategories(locale);
  const heroPhoto = sitePhoto("hero");

  return (
    <div>
      {/* Hero — abstract brand-colored mountain silhouette in place of licensed photography */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-800 to-brand-600 text-white">
        {heroPhoto && (
          <>
            <Image src={heroPhoto} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </>
        )}
        <svg
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full ${heroPhoto ? "hidden" : ""} text-brand-900/40`}
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0 300 L0 180 L160 60 L280 160 L420 40 L560 170 L700 90 L860 200 L1000 70 L1120 190 L1200 140 L1200 300 Z"
          />
        </svg>
        <div className="relative mx-auto max-w-container px-4 py-20 text-center sm:px-6 sm:py-28">
          <h1 className="text-balance-wrap text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
            {dict.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-brand-50 sm:text-lg">{dict.heroSubtitle}</p>

          <form
            action="/search"
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-card bg-white p-2 shadow-card sm:flex-row"
          >
            <label className="sr-only" htmlFor="home-region">
              {searchDict.region}
            </label>
            <select
              id="home-region"
              name="region"
              defaultValue=""
              className="focus-ring rounded-md border-0 bg-transparent px-3 py-2.5 text-sm text-ink sm:w-36 sm:flex-none"
            >
              <option value="">{searchDict.region}</option>
              {regions.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="home-category">
              {searchDict.category}
            </label>
            <select
              id="home-category"
              name="category"
              defaultValue=""
              className="focus-ring rounded-md border-0 bg-transparent px-3 py-2.5 text-sm text-ink sm:w-36 sm:flex-none"
            >
              <option value="">{searchDict.category}</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              name="q"
              placeholder={dict.searchPlaceholder}
              className="focus-ring min-w-0 flex-1 rounded-md border-0 px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
            />
            <button className="inline-flex items-center justify-center gap-1.5 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 active:bg-brand-800">
              <SearchIcon className="size-4" aria-hidden />
              {dict.searchButton}
            </button>
          </form>

          <Link
            href="/search"
            className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <Sparkles className="size-4" aria-hidden />
            {searchDict.aiTitle}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold text-ink">{dict.categoriesTitle}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.key] ?? Compass;
            return (
              <Link
                key={c.key}
                href={`/search?category=${c.key}`}
                className="focus-ring flex flex-col items-center gap-2 rounded-card border border-line bg-white p-4 text-center shadow-card transition-colors hover:border-brand-400 hover:bg-brand-50"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-balance-wrap text-sm font-medium text-ink">{c.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">{dict.topCompaniesTitle}</h2>
          <Link href="/search" className="focus-ring inline-flex items-center gap-1 text-sm font-medium text-brand-700">
            {dict.viewAll}
          </Link>
        </div>

        <div className="mt-4">
          {featured.length === 0 ? (
            <EmptyState
              icon={Mountain}
              title={dict.emptyState}
              actionHref={{ label: dict.emptyStateLink, href: "/register" }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((company) => (
                <CompanyCard key={company.id} company={company} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
