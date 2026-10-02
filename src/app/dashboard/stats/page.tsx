import { Eye, CalendarDays, Heart, Clapperboard } from "lucide-react";
import { requireCurrentCompany } from "@/lib/current-company";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { lastNDates } from "@/lib/chart-series";

const DAYS = 90;

export default async function StatsPage() {
  const company = await requireCurrentCompany();
  const dict = getDictionary(getLocale()).dashboard;

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (DAYS - 1));
  const dailyViews = await prisma.dailyView.findMany({
    where: { companyId: company.id, date: { gte: since.toISOString().slice(0, 10) } },
  });
  const byDate = new Map(dailyViews.map((d) => [d.date, d.count]));
  const series = lastNDates(DAYS).map((date) => ({ date, count: byDate.get(date) ?? 0 }));
  const last30 = series.slice(-30).reduce((sum, d) => sum + d.count, 0);
  const totalLikes = company.reels.reduce((sum, r) => sum + r._count.likes, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">{dict.stats.title}</h2>
        <p className="text-sm text-ink-secondary">{dict.stats.subtitle.replace("{days}", "7 / 30 / 90")}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard icon={Eye} label={dict.stats.totalViews} value={company.viewCount.toLocaleString()} />
        <StatCard icon={CalendarDays} label={dict.stats.periodViews.replace("{days}", "30")} value={last30.toLocaleString()} />
        <StatCard icon={Clapperboard} label={dict.nav.reels} value={company.reels.length} />
        <StatCard icon={Heart} label={dict.stats.likes} value={totalLikes.toLocaleString()} />
      </div>

      <AnalyticsChart
        series={series}
        viewsSuffix={dict.stats.viewsSuffix}
        periodLabels={{ 7: dict.chart.period7, 30: dict.chart.period30, 90: dict.chart.period90 }}
      />
    </div>
  );
}
