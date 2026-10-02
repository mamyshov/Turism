import { requireCurrentCompany } from "@/lib/current-company";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { TourManager } from "./TourManager";

export default async function ToursPage() {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard.tours;

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{dict.title}</h2>
      <p className="mb-6 text-sm text-ink-secondary">{dict.subtitle}</p>
      <TourManager
        locale={locale}
        initialTours={company.tours.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          durationDays: t.durationDays,
          durationHours: t.durationHours,
          price: t.price,
          maxPeople: t.maxPeople,
          included: t.included,
          excluded: t.excluded,
        }))}
        dict={dict}
      />
    </div>
  );
}
