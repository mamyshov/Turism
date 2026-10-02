import Link from "next/link";
import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_PHOTOS_BY_TARIFF, canUploadVideoOrPdf } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PhotoManager } from "./PhotoManager";
import { VideoManager } from "./VideoManager";
import { PdfManager } from "./PdfManager";

export default async function MediaPage() {
  const company = await requireCurrentCompany();
  const limit = MAX_PHOTOS_BY_TARIFF[company.tariff] ?? 5;
  const canVideoPdf = canUploadVideoOrPdf(company.tariff);
  const dict = getDictionary(getLocale()).dashboard.media;

  return (
    <div className="max-w-2xl space-y-10">
      <section>
        <h2 className="text-lg font-semibold mb-1">{dict.photosTitle}</h2>
        <p className="mb-4 text-sm text-gray-500">
          {dict.photosSubtitle.replace("{limit}", String(limit)).replace("{tariff}", company.tariff)}
        </p>
        <PhotoManager
          initialPhotos={company.photos.map((p) => ({ id: p.id, url: p.url }))}
          limit={limit}
          dict={dict}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1">{dict.videosTitle}</h2>
        <p className="mb-4 text-sm text-gray-500">{dict.videosSubtitle}</p>
        {canVideoPdf ? (
          <VideoManager
            initialVideos={company.videos.map((v) => ({ id: v.id, type: v.type, url: v.url, title: v.title }))}
            dict={dict}
          />
        ) : (
          <TariffUpsell dict={dict} feature={dict.videosTitle.toLowerCase()} />
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-1">{dict.pdfTitle}</h2>
        <p className="mb-4 text-sm text-gray-500">{dict.pdfSubtitle}</p>
        {canVideoPdf ? (
          <PdfManager initialPdfs={company.pdfGuides.map((p) => ({ id: p.id, title: p.title, url: p.url }))} dict={dict} />
        ) : (
          <TariffUpsell dict={dict} feature={dict.pdfTitle} />
        )}
      </section>
    </div>
  );
}

function TariffUpsell({
  dict,
  feature,
}: {
  dict: { upsellPrefix: string; changeTariff: string };
  feature: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-5 text-sm text-gray-500">
      {dict.upsellPrefix.replace("{feature}", feature)}{" "}
      <Link href="/dashboard/billing" className="font-medium text-brand-700 hover:underline">
        {dict.changeTariff}
      </Link>
    </div>
  );
}
