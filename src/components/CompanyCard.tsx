import Image from "next/image";
import Link from "next/link";
import { fromJsonArray } from "@/lib/json";
import { computeRating } from "@/lib/rating";
import { StarRating } from "@/components/StarRating";
import { getDictionary } from "@/lib/i18n/dictionary";
import { DEFAULT_LOCALE, Locale } from "@/lib/i18n/locales";
import { localizeRegion, localizeCategory } from "@/lib/i18n/constant-labels";

export type CompanyCardData = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string | null;
  categories: string;
  tariff: string;
  photos: { url: string }[];
  reviews?: { rating: number }[];
};

export function CompanyCard({
  company,
  locale = DEFAULT_LOCALE,
}: {
  company: CompanyCardData;
  locale?: Locale;
}) {
  const categories = fromJsonArray(company.categories);
  const cover = company.photos[0]?.url;
  const rating = computeRating(company.reviews ?? []);
  const dict = getDictionary(locale).company;

  return (
    <Link
      href={`/company/${company.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 w-full bg-gray-100">
        {cover ? (
          <Image
            src={cover}
            alt={`${company.name}`}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-4xl">🏔️</div>
        )}
        {company.tariff === "PRO" && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white shadow">
            ✓ {dict.verified}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-700">{company.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          {company.region && <span>📍 {localizeRegion(company.region, locale)}</span>}
          {rating.count > 0 && (
            <span className="flex items-center gap-1">
              <StarRating value={rating.average} size="sm" />
              <span className="text-xs">({rating.count})</span>
            </span>
          )}
        </div>
        {company.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{company.description}</p>
        )}
        {categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((c) => (
              <span key={c} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {localizeCategory(c, locale)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
