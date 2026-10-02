import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { fromJsonArray } from "@/lib/json";
import { computeRating } from "@/lib/rating";
import { trackCompanyView } from "@/lib/track-view";
import Image from "next/image";
import Link from "next/link";
import { sitePhoto } from "@/lib/site-photos";
import { MapPin, ShieldCheck, FileText, Download } from "lucide-react";
import { PhotoGallery } from "@/components/PhotoGallery";
import { StarRating } from "@/components/StarRating";
import { TabPanels, type TabPanel } from "@/components/ui/TabPanels";
import { ContactButtons, MobileContactBar } from "@/components/company/ContactButtons";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { ReviewForm } from "./ReviewForm";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizeLanguage, localizeCategory, localizeRegion } from "@/lib/i18n/constant-labels";

const INTL_LOCALE: Record<Locale, string> = { ru: "ru-RU", ky: "ky-KG", en: "en-US" };
const CURRENCY: Record<Locale, string> = { ru: "сом", ky: "сом", en: "KGS" };

async function getCompany(slug: string) {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      photos: { orderBy: { order: "asc" } },
      tours: { orderBy: { createdAt: "asc" }, include: { photos: { orderBy: { order: "asc" }, take: 1 } } },
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
  const fullDict = getDictionary(locale);
  const dict = fullDict.company;
  const tourDict = fullDict.dashboard.tours;
  const intlLocale = INTL_LOCALE[locale];

  const languages = fromJsonArray(company.languages);
  const categories = fromJsonArray(company.categories);
  const rating = computeRating(company.reviews);
  const cover = company.photos[0]?.url ?? sitePhoto("cover");

  const toursPanel = company.tours.length === 0 ? (
    <EmptyState title={dict.noTours} />
  ) : (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {company.tours.map((tour) => (
        <div key={tour.id} id={`tour-${tour.id}`} className="scroll-mt-24 overflow-hidden rounded-card border border-line bg-white shadow-card">
          {(tour.photos[0]?.url ?? company.photos[0]?.url) && (
            <Link href={`/tour/${tour.id}`} className="focus-ring relative block aspect-[16/9] w-full bg-gray-100" aria-label={tour.title}>
              <Image
                src={(tour.photos[0]?.url ?? company.photos[0]?.url) as string}
                alt={tour.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Link>
          )}
          <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-balance-wrap font-semibold text-ink">
              <Link href={`/tour/${tour.id}`} className="focus-ring rounded hover:text-brand-700 hover:underline">
                {tour.title}
              </Link>
            </h3>
            <span className="whitespace-nowrap font-semibold text-brand-700">
              {tour.price.toLocaleString(intlLocale)} {CURRENCY[locale]}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-secondary">
            {[
              tour.durationDays ? `${tour.durationDays} ${tourDict.daysSuffix}` : null,
              tour.durationHours ? `${tour.durationHours} ${tourDict.hoursSuffix}` : null,
              tour.maxPeople ? tourDict.maxPeopleSuffix.replace("{n}", String(tour.maxPeople)) : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {tour.description && (
            <p className="mt-2 whitespace-pre-line text-sm text-ink-secondary">{tour.description}</p>
          )}
          {tour.included && (
            <p className="mt-3 text-sm">
              <span className="font-medium text-success">{dict.included}: </span>
              {tour.included}
            </p>
          )}
          {tour.excluded && (
            <p className="mt-1 text-sm">
              <span className="font-medium text-danger">{dict.excluded}: </span>
              {tour.excluded}
            </p>
          )}
          </div>
        </div>
      ))}
    </div>
  );

  const photosPanel =
    company.photos.length === 0 ? (
      <EmptyState title={dict.noPhotos} />
    ) : (
      <PhotoGallery photos={company.photos} companyName={company.name} />
    );

  const videosPanel =
    company.videos.length === 0 ? (
      <EmptyState title={dict.noVideos} />
    ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {company.videos.map((video) => (
          <div key={video.id} className="aspect-video overflow-hidden rounded-card bg-black">
            {video.type === "EMBED" ? (
              <iframe src={video.url} title={video.title ?? dict.videos} className="h-full w-full" allowFullScreen />
            ) : (
              <video src={video.url} controls className="h-full w-full" />
            )}
          </div>
        ))}
      </div>
    );

  const pdfPanel =
    company.pdfGuides.length === 0 ? (
      <EmptyState title={dict.noPdfGuides} />
    ) : (
      <ul className="grid gap-3 sm:grid-cols-2">
        {company.pdfGuides.map((pdf) => (
          <li key={pdf.id}>
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-brand-400"
            >
              <span className="flex size-10 flex-none items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="text-balance-wrap flex-1 text-sm font-medium text-ink">{pdf.title}</span>
              <Download className="size-4 flex-none text-ink-muted" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    );

  const reviewsPanel = (
    <div className="space-y-6">
      <ReviewForm companyId={company.id} dict={dict} />
      {company.reviews.length === 0 ? (
        <EmptyState title={dict.noReviews} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {company.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              authorName={review.authorName}
              rating={review.rating}
              text={review.text}
              createdAt={review.createdAt}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );

  const panels: TabPanel[] = [
    { key: "tours", label: dict.tours, count: company.tours.length, content: toursPanel },
    { key: "photos", label: dict.photos, count: company.photos.length, content: photosPanel },
    { key: "videos", label: dict.videos, count: company.videos.length, content: videosPanel },
    { key: "pdf", label: dict.pdfGuides, count: company.pdfGuides.length, content: pdfPanel },
    { key: "reviews", label: dict.reviews, count: company.reviews.length, content: reviewsPanel },
  ];

  return (
    <div className="pb-24 md:pb-0">
      <div className="relative h-48 w-full bg-gradient-to-br from-brand-800 to-brand-600 sm:h-64 lg:h-80">
        {cover && (
          <Image src={cover} alt={company.name} fill priority className="object-cover object-[50%_30%]" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-container px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <div
              aria-hidden
              className="relative z-10 -mt-10 flex size-20 flex-none items-center justify-center rounded-card border-4 border-white bg-brand-600 text-3xl font-bold text-white shadow-card sm:-mt-12 sm:size-24"
            >
              {company.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 pt-1 sm:pb-1 sm:pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-balance-wrap text-2xl font-bold text-ink sm:text-3xl">{company.name}</h1>
                {company.tariff === "PRO" && (
                  <Badge tone="brand" icon={<ShieldCheck className="size-3.5" aria-hidden />}>
                    {dict.verified}
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-secondary">
                {company.region && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-4 text-ink-muted" aria-hidden />
                    {localizeRegion(company.region, locale)}
                  </span>
                )}
                {rating.count > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <StarRating value={rating.average} />
                    {rating.average} ({rating.count})
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ContactButtons company={company} dict={dict} />
            <ShareButton path={`/company/${company.slug}`} title={company.name} dict={fullDict.share} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 md:hidden">
          <ContactButtons company={company} dict={dict} secondaryOnly />
          <ShareButton path={`/company/${company.slug}`} title={company.name} dict={fullDict.share} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {company.description && (
              <section>
                <h2 className="mb-2 text-lg font-semibold text-ink">{dict.about}</h2>
                <p className="whitespace-pre-line text-ink-secondary">{company.description}</p>
              </section>
            )}
          </div>
          {(languages.length > 0 || categories.length > 0) && (
            <aside className="h-fit space-y-4 rounded-card border border-line bg-white p-5 text-sm shadow-card">
              {languages.length > 0 && (
                <div>
                  <p className="font-medium text-ink">{dict.languages}</p>
                  <p className="mt-1 text-ink-secondary">
                    {languages.map((l) => localizeLanguage(l, locale)).join(", ")}
                  </p>
                </div>
              )}
              {categories.length > 0 && (
                <div>
                  <p className="font-medium text-ink">{dict.tourTypes}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {categories.map((c) => (
                      <Badge key={c} tone="brand">
                        {localizeCategory(c, locale)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>

        <div className="mt-10">
          <TabPanels panels={panels} />
        </div>
      </div>

      <MobileContactBar company={company} dict={dict} />
    </div>
  );
}
