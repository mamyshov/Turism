import { cookies } from "next/headers";
import { Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CompanyCard } from "@/components/CompanyCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAVORITES_COOKIE, parseFavorites } from "@/lib/favorites";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata = { title: "Favorites" };

export default async function FavoritesPage() {
  const locale = getLocale();
  const dict = getDictionary(locale).favorites;
  const ids = parseFavorites(cookies().get(FAVORITES_COOKIE)?.value);

  const found = ids.length
    ? await prisma.company.findMany({
        where: { id: { in: ids }, verificationStatus: "APPROVED", isBlocked: false },
        include: {
          photos: { orderBy: { order: "asc" }, take: 1 },
          reviews: { select: { rating: true } },
          tours: { select: { price: true }, orderBy: { price: "asc" }, take: 1 },
        },
      })
    : [];
  const companies = ids.map((id) => found.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <div className="mx-auto max-w-container px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-bold text-ink">{dict.title}</h1>
      <p className="mb-6 mt-1 text-sm text-ink-secondary">{dict.subtitle}</p>
      {companies.length === 0 ? (
        <EmptyState icon={Heart} title={dict.empty} description={dict.emptyHint} actionHref={{ label: dict.browse, href: "/search" }} />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
