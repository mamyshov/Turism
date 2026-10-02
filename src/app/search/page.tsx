import { prisma } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchX } from "lucide-react";
import type { Prisma } from "@prisma/client";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedRegions, localizedCategories, localizedLanguages } from "@/lib/i18n/constant-labels";
import { AiTourSearch } from "./AiTourSearch";
import { SearchFilters } from "./SearchFilters";
import { MobileFiltersDrawer } from "./MobileFiltersDrawer";

const TARIFF_ORDER: Record<string, number> = { PRO: 0, STANDARD: 1, BASIC: 2 };

type SearchParams = {
  q?: string;
  region?: string;
  category?: string;
  language?: string;
  minPrice?: string;
  maxPrice?: string;
};

async function getCompanies(params: SearchParams) {
  const where: Prisma.CompanyWhereInput = { verificationStatus: "APPROVED", isBlocked: false };

  if (params.region) where.region = params.region;
  if (params.category) where.categories = { contains: `"${params.category}"` };
  if (params.language) where.languages = { contains: `"${params.language}"` };
  if (params.q) {
    where.OR = [
      { name: { contains: params.q } },
      { description: { contains: params.q } },
    ];
  }

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  if (minPrice || maxPrice) {
    where.tours = {
      some: {
        price: {
          gte: minPrice || undefined,
          lte: maxPrice || undefined,
        },
      },
    };
  }

  const companies = await prisma.company.findMany({
    where,
    include: {
      photos: { orderBy: { order: "asc" }, take: 1 },
      reviews: { select: { rating: true } },
      tours: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
    },
  });

  return companies.sort((a, b) => TARIFF_ORDER[a.tariff] - TARIFF_ORDER[b.tariff]);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const companies = await getCompanies(searchParams);
  const locale = getLocale();
  const dict = getDictionary(locale).search;
  const regions = localizedRegions(locale);
  const categories = localizedCategories(locale);
  const languages = localizedLanguages(locale);

  return (
    <div className="mx-auto max-w-container px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-bold text-ink">{dict.title}</h1>

      <div className="mt-6">
        <AiTourSearch dict={dict} locale={locale} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden h-fit rounded-card border border-line bg-white p-5 lg:block">
          <SearchFilters dict={dict} regions={regions} categories={categories} languages={languages} searchParams={searchParams} idPrefix="desktop" />
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-secondary">
              {dict.found}: <span className="font-medium text-ink">{companies.length}</span>
            </p>
            <div className="lg:hidden">
              <MobileFiltersDrawer label={dict.filtersButton} title={dict.filtersButton}>
                <SearchFilters dict={dict} regions={regions} categories={categories} languages={languages} searchParams={searchParams} idPrefix="mobile" />
              </MobileFiltersDrawer>
            </div>
          </div>

          {companies.length === 0 ? (
            <EmptyState icon={SearchX} title={dict.empty} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
