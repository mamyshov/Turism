import { requireCurrentCompany } from "@/lib/current-company";
import { TourManager } from "./TourManager";

export default async function ToursPage() {
  const company = await requireCurrentCompany();

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Туры</h2>
      <p className="mb-6 text-sm text-gray-500">
        Добавьте туры, которые предлагает ваша компания. Они появятся на
        публичной странице профиля.
      </p>
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
      />
    </div>
  );
}
