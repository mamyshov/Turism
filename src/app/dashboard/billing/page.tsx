import { requireCurrentCompany } from "@/lib/current-company";
import { TARIFFS } from "@/lib/constants";

export default async function BillingPage() {
  const company = await requireCurrentCompany();

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Тариф</h2>
      <p className="mb-6 text-sm text-gray-500">
        Онлайн-оплата появится позже. Пока смена тарифа выполняется
        администратором вручную — напишите нам на info@kyrgyztourhub.kg.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {TARIFFS.map((tariff) => (
          <div
            key={tariff.key}
            className={`rounded-lg border p-4 ${
              company.tariff === tariff.key ? "border-brand-600 ring-1 ring-brand-600" : "border-gray-200"
            }`}
          >
            <h3 className="font-semibold">{tariff.label}</h3>
            <p className="mt-1 text-lg font-bold text-brand-700">
              {tariff.price === 0 ? "Бесплатно" : `${tariff.price} ${tariff.period}`}
            </p>
            {tariff.price > 0 && <p className="text-xs text-gray-400">{tariff.period}</p>}
            <ul className="mt-3 space-y-1 text-sm text-gray-600">
              {tariff.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            {company.tariff === tariff.key && (
              <p className="mt-3 text-xs font-medium text-brand-700">Текущий тариф</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
