import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Banknote, Mountain, ShieldCheck, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { computeRating } from "@/lib/rating";
import { PhotoGallery } from "@/components/PhotoGallery";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { ContactButtons, MobileContactBar } from "@/components/company/ContactButtons";
import { getLocale } from "@/lib/i18n/get-locale";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizeRegion } from "@/lib/i18n/constant-labels";

const INTL: Record<Locale, string> = { ru: "ru-RU", ky: "ky-KG", en: "en-US" };
const CURRENCY: Record<Locale, string> = { ru: "сом", ky: "сом", en: "KGS" };

async function getTour(id: string) {
  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
      photos: { orderBy: { order: "asc" } },
      company: {
        include: {
          photos: { orderBy: { order: "asc" } },
          reviews: { select: { rating: true } },
          tours: { orderBy: { createdAt: "asc" } },
        },
      },
    },
  });
  if (!tour || tour.company.verificationStatus !== "APPROVED" || tour.company.isBlocked) return null;
  return tour;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const tour = await getTour(params.id);
  if (!tour) return {};
  return { title: `${tour.title} — ${tour.company.name}`, description: tour.description ?? undefined };
}

export default async function TourPage({ params }: { params: { id: string } }) {
  const tour = await getTour(params.id);
  if (!tour) notFound();

  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.tour;
  const company = tour.company;
  const rating = computeRating(company.reviews);
  const photos = tour.photos.length > 0 ? tour.photos : company.photos;
  const others = company.tours.filter((x) => x.id !== tour.id);
  const tourDict = dict.dashboard.tours;

  const duration =
    [
      tour.durationDays ? `${tour.durationDays} ${tourDict.daysSuffix}` : null,
      tour.durationHours ? `${tour.durationHours} ${tourDict.hoursSuffix}` : null,
    ]
      .filter(Boolean)
      .join(" ") || null;
  const group = tour.maxPeople ? tourDict.maxPeopleSuffix.replace("{n}", String(tour.maxPeople)) : null;

  const facts = [
    { icon: Clock, label: t.duration, value: duration },
    { icon: Users, label: t.group, value: group },
  ].filter((f) => f.value);

  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-container px-4 py-6 sm:px-6 sm:py-8">
        <Link
          href={`/company/${company.slug}`}
          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-medium text-ink-secondary hover:text-brand-700"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t.back}
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {photos.length > 0 ? (
              <PhotoGallery photos={photos} companyName={`${tour.title} — ${company.name}`} />
            ) : (
              <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-card bg-gradient-to-br from-brand-800 to-brand-600 text-white/80">
                <Mountain className="size-10" aria-hidden />
                <span className="text-sm">{t.noPhotos}</span>
              </div>
            )}

            <h1 className="text-balance-wrap mt-6 text-2xl font-bold text-ink sm:text-3xl">{tour.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-secondary">
              {company.region && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4 text-ink-muted" aria-hidden />
                  {localizeRegion(company.region, locale)}
                </span>
              )}
              {rating.count > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <StarRating value={rating.average} size="sm" />
                  {rating.average} ({rating.count})
                </span>
              )}
            </div>

            {tour.description && (
              <section className="mt-6">
                <h2 className="mb-2 text-lg font-semibold text-ink">{t.about}</h2>
                <p className="whitespace-pre-line text-ink-secondary">{tour.description}</p>
              </section>
            )}

            {(tour.included || tour.excluded) && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tour.included && (
                  <div className="rounded-card border border-line bg-white p-4 shadow-card">
                    <p className="font-medium text-success">{dict.company.included}</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-ink-secondary">{tour.included}</p>
                  </div>
                )}
                {tour.excluded && (
                  <div className="rounded-card border border-line bg-white p-4 shadow-card">
                    <p className="font-medium text-danger">{dict.company.excluded}</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-ink-secondary">{tour.excluded}</p>
                  </div>
                )}
              </div>
            )}

            {others.length > 0 && (
              <section className="mt-10">
                <h2 className="mb-3 text-lg font-semibold text-ink">{t.otherTours}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {others.map((o) => (
                    <Link
                      key={o.id}
                      href={`/tour/${o.id}`}
                      className="focus-ring flex items-start justify-between gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-brand-400"
                    >
                      <span className="text-balance-wrap font-medium text-ink">{o.title}</span>
                      <span className="whitespace-nowrap font-semibold text-brand-700">
                        {o.price.toLocaleString(INTL[locale])} {CURRENCY[locale]}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="h-fit space-y-4 rounded-card border border-line bg-white p-5 shadow-card lg:sticky lg:top-20">
            <div>
              <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                <Banknote className="size-4" aria-hidden />
                {t.price}
              </p>
              <p className="text-3xl font-bold text-brand-700">
                {tour.price.toLocaleString(INTL[locale])} <span className="text-lg">{CURRENCY[locale]}</span>
              </p>
            </div>

            {facts.length > 0 && (
              <dl className="space-y-2 border-t border-line pt-4 text-sm">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1.5 text-ink-secondary">
                      <Icon className="size-4 text-ink-muted" aria-hidden />
                      {label}
                    </dt>
                    <dd className="font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="border-t border-line pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{t.operator}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Link
                  href={`/company/${company.slug}`}
                  className="focus-ring text-balance-wrap rounded font-semibold text-ink hover:text-brand-700"
                >
                  {company.name}
                </Link>
                {company.tariff === "PRO" && (
                  <Badge tone="brand" icon={<ShieldCheck className="size-3.5" aria-hidden />}>
                    {dict.company.verified}
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-ink-secondary">{t.contactHint}</p>
              <div className="mt-3 hidden md:block">
                <ContactButtons company={company} dict={dict.company} />
              </div>
              <div className="mt-3 md:hidden">
                <ContactButtons company={company} dict={dict.company} secondaryOnly />
              </div>
              <div className="mt-3">
                <ShareButton path={`/tour/${tour.id}`} title={`${tour.title} — ${company.name}`} dict={dict.share} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MobileContactBar company={company} dict={dict.company} />
    </div>
  );
}
