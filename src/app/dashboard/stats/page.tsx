import { requireCurrentCompany } from "@/lib/current-company";

export default async function StatsPage() {
  const company = await requireCurrentCompany();

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Статистика</h2>
      <p className="mb-6 text-sm text-gray-500">
        Подробная статистика по дням будет доступна на Этапе 3. Пока — общее
        число просмотров профиля.
      </p>
      <div className="rounded-lg border border-gray-200 p-6">
        <p className="text-sm text-gray-500">Всего просмотров профиля</p>
        <p className="text-4xl font-bold text-brand-700">{company.viewCount}</p>
      </div>
    </div>
  );
}
