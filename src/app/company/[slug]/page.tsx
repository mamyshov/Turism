import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { fromJsonArray } from "@/lib/json";
import { computeRating } from "@/lib/rating";
import { trackCompanyView } from "@/lib/track-view";
import { PhotoGallery } from "@/components/PhotoGallery";
import { StarRating } from "@/components/StarRating";
import { ReviewForm } from "./ReviewForm";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizeLanguage, localizeCategory, localizeRegion } from "@/lib/i18n/constant-labels";

const INTL_LOCALE: Record<Locale, string> = { ru: "ru-RU", ky: "ky-KG", en: "en-US" };

async function getCompany(slug: string) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      photos: { orderBy: { order: "asc" } },
      tours: { orderBy: { createdAt: "asc" } },
      videos: true,
      pdfGuides: true,
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!company || company.verificationStatus !== "APPROVED" || company.isBlocked) return null;
  return company;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const company = await getCompany(params.slug);
  if (!company) return {};
  return {
    title: company.name,
    description: company.description ?? undefined,
  };
}

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const company = await getCompany(params.slug);
  if (!company) notFound();

  // Best-effort view counter for the stats chart — not critical-path, so
  // failures here must never break the page render.
  trackCompanyView(company.id).catch(() => {});

  const locale = getLocale();
  const dict = getDictionary(locale).company;
  const intlLocale = INTL_LOCALE[locale];

  const languages = fromJsonArray(company.languages);
  const categories = fromJsonArray(company.categories);
  const rating = computeRating(company.reviews);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            {company.tariff === "PRO" && (
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-medium text-white">
                ✓ {dict.verified}
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500">
            {company.region && <p>📍 {localizeRegion(company.region, locale)}</p>}
            {rating.count > 0 && (
              <p className="flex items-center gap-1.5">
                <StarRating value={rating.average} />
                <span className="text-sm">{rating.average} ({rating.count})</span>
              </p>
            )}
          </div>
        </div>

        <ContactButtons company={company} dict={dict} />
      </div>

      {company.photos.length > 0 && (
        <div className="mt-8">
          <PhotoGallery photos={company.photos} companyName={company.name} />
        </div>
      )}

      {company.description && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-lg font-semibold mb-2">{dict.about}</h2>
          <p className="whitespace-pre-line text-gray-700">{company.description}</p>
        </div>
      )}

      {(languages.length > 0 || categories.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          {languages.length > 0 && (
            <div>
              <span className="font-medium text-gray-700">{dict.languages}: </span>
              {languages.map((l) => localizeLanguage(l, locale)).join(", ")}
            </div>
          )}
          {categories.length > 0 && (
            <div>
              <span className="font-medium text-gray-700">{dict.tourTypes}: </span>
              {categories.map((c) => localizeCategory(c, locale)).join(", ")}
            </div>
          )}
        </div>
      )}

      {company.videos.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">{dict.videos}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {company.videos.map((video) => (
              <div key={video.id} className="aspect-video overflow-hidden rounded-lg bg-black">
                {video.type === "EMBED" ? (
                  <iframe
                    src={video.url}
                    title={video.title ?? dict.videos}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <video src={video.url} controls className="h-full w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {company.pdfGuides.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">{dict.pdfGuides}</h2>
          <ul className="space-y-2">
            {company.pdfGuides.map((pdf) => (
              <li key={pdf.id}>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:underline"
                >
                  📄 {pdf.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {company.tours.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">{dict.tours}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {company.tours.map((tour) => (
              <div key={tour.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{tour.title}</h3>
                  <span className="whitespace-nowrap font-semibold text-brand-700">
                    {tour.price.toLocaleString(intlLocale)} сом
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {[
                    tour.durationDays ? `${tour.durationDays} дн.` : null,
                    tour.durationHours ? `${tour.durationHours} ч.` : null,
                    tour.maxPeople ? `до ${tour.maxPeople} чел.` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {tour.description && (
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{tour.description}</p>
                )}
                {tour.included && (
                  <p className="mt-2 text-sm"><span className="font-medium text-green-700">{dict.included}: </span>{tour.included}</p>
                )}
                {tour.excluded && (
                  <p className="mt-1 text-sm"><span className="font-medium text-red-700">{dict.excluded}: </span>{tour.excluded}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {dict.reviews} {rating.count > 0 && <span className="text-gray-400">({rating.count})</span>}
          </h2>
        </div>

        <div className="mb-6">
          <ReviewForm companyId={company.id} dict={dict} />
        </div>

        {company.reviews.length > 0 && (
          <div className="space-y-4">
            {company.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.authorName}</span>
                  <StarRating value={review.rating} size="sm" />
                </div>
                {review.text && <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{review.text}</p>}
                <p className="mt-2 text-xs text-gray-400">
                  {review.createdAt.toLocaleDateString(intlLocale)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactButtons({
  company,
  dict,
}: {
  company: { phone: string | null; whatsapp: string | null; instagram: string | null; contactEmail: string | null };
  dict: { whatsapp: string; call: string; email: string; instagram: string };
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {company.whatsapp && (
        <a
          href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          {dict.whatsapp}
        </a>
      )}
      {company.phone && (
        <a href={`tel:${company.phone}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          📞 {dict.call}
        </a>
      )}
      {company.contactEmail && (
        <a href={`mailto:${company.contactEmail}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          ✉️ {dict.email}
        </a>
      )}
      {company.instagram && (
        <a
          href={`https://instagram.com/${company.instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          {dict.instagram}
        </a>
      )}
    </div>
  );
}
