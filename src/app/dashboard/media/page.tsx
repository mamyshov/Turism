import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_PHOTOS_BY_TARIFF } from "@/lib/constants";
import { PhotoManager } from "./PhotoManager";

export default async function MediaPage() {
  const company = await requireCurrentCompany();
  const limit = MAX_PHOTOS_BY_TARIFF[company.tariff] ?? 5;

  return (
    <div className="max-w-2xl space-y-10">
      <section>
        <h2 className="text-lg font-semibold mb-1">Фотографии</h2>
        <p className="mb-4 text-sm text-gray-500">
          До {limit} фото на вашем тарифе ({company.tariff}), формат JPG/PNG/WEBP, до 5 МБ каждое.
        </p>
        <PhotoManager
          initialPhotos={company.photos.map((p) => ({ id: p.id, url: p.url }))}
          limit={limit}
        />
      </section>

      <section className="rounded-lg border border-dashed border-gray-300 p-5 text-sm text-gray-500">
        <h2 className="mb-1 font-semibold text-gray-700">Видео и PDF-гиды</h2>
        <p>
          Загрузка видео (ссылка на YouTube/Vimeo или файл) и PDF-гидов появится на
          Стандарт и Про тарифах — этот раздел запланирован на следующий этап
          разработки.
        </p>
      </section>
    </div>
  );
}
