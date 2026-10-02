import { Check } from "lucide-react";
import { requireCurrentCompany } from "@/lib/current-company";
import { TARIFFS } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { Badge } from "@/components/ui/Badge";

export default async function BillingPage() {
  const company = await requireCurrentCompany();
  const dict = getDictionary(getLocale()).dashboard.billing;

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{dict.title}</h2>
      <p className="mb-6 max-w-2xl text-sm text-ink-secondary">{dict.subtitle}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {TARIFFS.map((tariff) => {
          const t = dict.tariffs[tariff.key] ?? { label: tariff.label, period: tariff.period, features: tariff.features as unknown as string[] };
          const current = company.tariff === tariff.key;
          return (
            <div
              key={tariff.key}
              className={`flex flex-col rounded-card border bg-white p-5 shadow-card ${
                current ? "border-brand-600 ring-1 ring-brand-600" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{t.label}</h3>
                {current && <Badge tone="brand">{dict.currentTariff}</Badge>}
              </div>
              <p className="mt-2 text-2xl font-bold text-brand-700">
                {tariff.price === 0 ? dict.free : `${tariff.price}`}
              </p>
              <p className="text-xs text-ink-muted">{t.period}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-secondary">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 flex-none text-brand-600" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
