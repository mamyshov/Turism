import Link from "next/link";
import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_PHOTOS_BY_TARIFF, canUploadVideoOrPdf } from "@/lib/constants";
import { PhotoManager } from "./PhotoManager";
import { VideoManager } from "./VideoManager";
import { PdfManager } from "./PdfManager";

export default async function MediaPage() {
  const company = await requireCurrentCompany();
  const limit = MAX_PHOTOS_BY_TARIFF[company.tariff] ?? 5;
  const canVideoPdf = canUploadVideoOrPdf(company.tariff);

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

      <section>
        <h2 className="text-lg font-semibold mb-1">Видео-гиды</h2>
        <p className="mb-4 text-sm text-gray-500">
          Ссылка на YouTube/Vimeo или файл (MP4/WEBM/MOV, до 200 МБ).
        </p>
        {canVideoPdf ? (
          <VideoManager
            initialVideos={company.videos.map((v) => ({ id: v.id, type: v.type, url: v.url, title: v.title }))}
          />
        ) : (
          <TariffUpsell feature="видео-гидов" />
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1">PDF-гиды</h2>
        <p className="mb-4 text-sm text-gray-500">Маршруты и гиды в формате PDF, до 20 МБ.</p>
        {canVideoPdf ? (
          <PdfManager initialPdfs={company.pdfGuides.map((p) => ({ id: p.id, title: p.title, url: p.url }))} />
        ) : (
          <TariffUpsell feature="PDF-гидов" />
        )}
      </section>
    </div>
  );
}

function TariffUpsell({ feature }: { feature: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-5 text-sm text-gray-500">
      Загрузка {feature} доступна с тарифа «Стандарт».{" "}
      <Link href="/dashboard/billing" className="font-medium text-brand-700 hover:underline">
        Сменить тариф →
      </Link>
    </div>
  );
}
