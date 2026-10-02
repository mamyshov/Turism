import { requireCurrentCompany } from "@/lib/current-company";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { TourManager } from "./TourManager";

export default async function ToursPage() {
  const company = await requireCurrentCompany();
  const dict = getDictionary(getLocale()).dashboard.tours;

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">{dict.title}</h2>
      <p className="mb-6 text-sm text-gray-500">{dict.subtitle}</p>
      <TourManager
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
