import { prisma } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import type { Prisma } from "@prisma/client";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedRegions, localizedCategories, localizedLanguages } from "@/lib/i18n/constant-labels";

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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{dict.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <form className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 h-fit">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{dict.searchLabel}</label>
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder={dict.searchPlaceholder}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <Select label={dict.region} allLabel={dict.all} name="region" options={regions} defaultValue={searchParams.region} />
          <Select label={dict.category} allLabel={dict.all} name="category" options={categories} defaultValue={searchParams.category} />
          <Select label={dict.language} allLabel={dict.all} name="language" options={languages} defaultValue={searchParams.language} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{dict.price}</label>
            <div className="flex gap-2">
              <input
                name="minPrice"
                type="number"
                min={0}
                placeholder={dict.from}
                defaultValue={searchParams.minPrice}
                className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                name="maxPrice"
                type="number"
                min={0}
                placeholder={dict.to}
                defaultValue={searchParams.maxPrice}
                className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button className="w-full rounded-md bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-700">
            {dict.apply}
          </button>
          <a href="/search" className="block text-center text-sm text-gray-500 hover:text-brand-700">
            {dict.reset}
          </a>
        </form>

        <div>
          <p className="mb-4 text-sm text-gray-500">{dict.found}: {companies.length}</p>
          {companies.length === 0 ? (
            <p className="text-gray-500">{dict.empty}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

function Select({
  label,
  allLabel,
  name,
  options,
  defaultValue,
}: {
  label: string;
  allLabel: string;
  name: string;
  options: { key: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.key} value={o.key}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
