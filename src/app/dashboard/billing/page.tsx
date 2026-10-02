import { requireCurrentCompany } from "@/lib/current-company";
import { TARIFFS } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export default async function BillingPage() {
  const company = await requireCurrentCompany();
  const dict = getDictionary(getLocale()).dashboard.billing;

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">{dict.title}</h2>
      <p className="mb-6 text-sm text-gray-500">{dict.subtitle}</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {TARIFFS.map((tariff) => {
          const t = dict.tariffs[tariff.key] ?? { label: tariff.label, period: tariff.period, features: tariff.features as unknown as string[] };
          return (
            <div
              key={tariff.key}
              className={`rounded-lg border p-4 ${
                company.tariff === tariff.key ? "border-brand-600 ring-1 ring-brand-600" : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold">{t.label}</h3>
              <p className="mt-1 text-lg font-bold text-brand-700">
                {tariff.price === 0 ? dict.free : `${tariff.price} ${t.period}`}
              </p>
              {tariff.price > 0 && <p className="text-xs text-gray-400">{t.period}</p>}
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {t.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              {company.tariff === tariff.key && (
                <p className="mt-3 text-xs font-medium text-brand-700">{dict.currentTariff}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
