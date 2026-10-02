import Link from "next/link";
import { Eye, MessageSquare, Map as MapIcon, CreditCard } from "lucide-react";
import { requireCurrentCompany } from "@/lib/current-company";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { StatCard } from "@/components/dashboard/StatCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { lastNDates } from "@/lib/chart-series";

const DAYS = 90;

export default async function DashboardHome() {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard;

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (DAYS - 1));

  const [dailyViews, reviewCount, recentReviews] = await Promise.all([
    prisma.dailyView.findMany({
      where: { companyId: company.id, date: { gte: since.toISOString().slice(0, 10) } },
    }),
    prisma.review.count({ where: { companyId: company.id } }),
    prisma.review.findMany({
      where: { companyId: company.id },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);
  const byDate = new Map(dailyViews.map((d) => [d.date, d.count]));
  const series = lastNDates(DAYS).map((date) => ({ date, count: byDate.get(date) ?? 0 }));
  const tariff = dict.billing.tariffs[company.tariff]?.label ?? company.tariff;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">{dict.home.title}</h2>
        <p className="text-sm text-ink-secondary">{dict.home.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard icon={Eye} label={dict.home.kpiViews} value={company.viewCount.toLocaleString()} />
        <StatCard icon={MessageSquare} label={dict.home.kpiReviews} value={reviewCount} />
        <StatCard icon={MapIcon} label={dict.home.kpiActiveTours} value={company.tours.length} />
        <StatCard icon={CreditCard} label={dict.home.kpiTariff} value={tariff} />
      </div>

      <section>
        <h3 className="mb-3 font-semibold text-ink">{dict.home.chartTitle}</h3>
        <AnalyticsChart
          series={series}
          viewsSuffix={dict.stats.viewsSuffix}
          periodLabels={{ 7: dict.chart.period7, 30: dict.chart.period30, 90: dict.chart.period90 }}
        />
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-ink">{dict.home.recentReviewsTitle}</h3>
          {recentReviews.length > 0 && (
            <Link href="/dashboard/reviews" className="focus-ring rounded text-sm font-medium text-brand-700">
              {dict.home.viewAll}
            </Link>
          )}
        </div>
        {recentReviews.length === 0 ? (
          <EmptyState icon={MessageSquare} title={dict.home.recentReviewsEmpty} />
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {recentReviews.map((r) => (
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
      </section>
    </div>
  );
}
