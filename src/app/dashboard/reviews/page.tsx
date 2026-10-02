import { MessageSquare } from "lucide-react";
import { requireCurrentCompany } from "@/lib/current-company";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function DashboardReviewsPage() {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard.reviewsPage;
  const reviews = await prisma.review.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{dict.title}</h2>
      <p className="mb-6 text-sm text-ink-secondary">{dict.subtitle}</p>
      {reviews.length === 0 ? (
        <EmptyState icon={MessageSquare} title={dict.empty} description={dict.emptyHint} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              authorName={r.authorName}
              rating={r.rating}
              text={r.text}
              createdAt={r.createdAt}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
