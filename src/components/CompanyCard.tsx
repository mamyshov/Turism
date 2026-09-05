import Image from "next/image";
import Link from "next/link";
import { fromJsonArray } from "@/lib/json";
import { labelFor, REGIONS, TOUR_CATEGORIES } from "@/lib/constants";

export type CompanyCardData = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string | null;
  categories: string;
  tariff: string;
  photos: { url: string }[];
};

export function CompanyCard({ company }: { company: CompanyCardData }) {
  const categories = fromJsonArray(company.categories);
  const cover = company.photos[0]?.url;

  return (
    <Link
      href={`/company/${company.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-44 w-full bg-gray-100">
        {cover ? (
          <Image
            src={cover}
            alt={`Фото — ${company.name}`}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300 text-4xl">🏔️</div>
        )}
        {company.tariff === "PRO" && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-medium text-white shadow">
            ✓ Проверено
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-700">{company.name}</h3>
        {company.region && (
          <p className="mt-1 text-sm text-gray-500">📍 {labelFor(REGIONS, company.region)}</p>
        )}
        {company.description && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{company.description}</p>
        )}
        {categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((c) => (
              <span key={c} className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-700">
                {labelFor(TOUR_CATEGORIES, c)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
