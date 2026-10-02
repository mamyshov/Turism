import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, Mountain } from "lucide-react";
import { fromJsonArray } from "@/lib/json";
import { computeRating } from "@/lib/rating";
import { StarRating } from "@/components/StarRating";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
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
  tours?: { price: number }[];
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
  const fromPrice = company.tours && company.tours.length > 0
    ? Math.min(...company.tours.map((t) => t.price))
    : null;

  return (
    <Link
      href={`/company/${company.slug}`}
      className="focus-ring group block overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        {cover ? (
          <Image
            src={cover}
            alt={company.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <Mountain className="size-10" aria-hidden />
          </div>
        )}
        {company.tariff === "PRO" && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            <ShieldCheck className="size-3.5" aria-hidden />
            {dict.verified}
          </span>
        )}
        <FavoriteButton id={company.id} className="absolute right-3 top-3" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-balance-wrap font-semibold text-ink group-hover:text-brand-700">{company.name}</h3>
          {fromPrice !== null && (
            <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
              {dict.priceFrom.replace("{price}", fromPrice.toLocaleString())}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-ink-secondary">
          {company.region && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5 text-ink-muted" aria-hidden />
              {localizeRegion(company.region, locale)}
            </span>
          )}
          {rating.count > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <StarRating value={rating.average} size="sm" />
              <span className="text-xs text-ink-muted">({rating.count})</span>
            </span>
          )}
        </div>
        {company.description && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-secondary">{company.description}</p>
        )}
        {categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((c) => (
              <span key={c} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                {localizeCategory(c, locale)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
