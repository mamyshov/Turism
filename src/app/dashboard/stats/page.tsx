import { requireCurrentCompany } from "@/lib/current-company";
import { prisma } from "@/lib/prisma";
import { ViewsChart } from "./ViewsChart";

const DAYS = 30;

function lastNDates(n: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export default async function StatsPage() {
  const company = await requireCurrentCompany();

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (DAYS - 1));
  const sinceStr = since.toISOString().slice(0, 10);

  const dailyViews = await prisma.dailyView.findMany({
    where: { companyId: company.id, date: { gte: sinceStr } },
  });
  const byDate = new Map(dailyViews.map((d) => [d.date, d.count]));

  const series = lastNDates(DAYS).map((date) => ({ date, count: byDate.get(date) ?? 0 }));
  const periodTotal = series.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Статистика</h2>
      <p className="mb-6 text-sm text-gray-500">Просмотры профиля за последние {DAYS} дней.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Всего просмотров</p>
          <p className="text-3xl font-bold text-brand-700">{company.viewCount}</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500">За {DAYS} дней</p>
          <p className="text-3xl font-bold text-brand-700">{periodTotal}</p>
        </div>
      </div>

      <ViewsChart series={series} />
    </div>
  );
}
