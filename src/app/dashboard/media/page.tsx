import Link from "next/link";
import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_PHOTOS_BY_TARIFF, canUploadVideoOrPdf } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PhotoManager } from "./PhotoManager";
import { VideoManager } from "./VideoManager";
import { PdfManager } from "./PdfManager";
import { TabPanels, type TabPanel } from "@/components/ui/TabPanels";
import { Lock } from "lucide-react";

export default async function MediaPage() {
  const company = await requireCurrentCompany();
  const limit = MAX_PHOTOS_BY_TARIFF[company.tariff] ?? 5;
  const canVideoPdf = canUploadVideoOrPdf(company.tariff);
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard.media;

  const panels: TabPanel[] = [
    {
      key: "photos",
      label: dict.photosTitle,
      count: company.photos.length,
      content: (
        <section>
          <p className="mb-4 text-sm text-ink-secondary">
            {dict.photosSubtitle.replace("{limit}", String(limit)).replace("{tariff}", company.tariff)}
          </p>
          <PhotoManager
            initialPhotos={company.photos.map((p) => ({ id: p.id, url: p.url }))}
            limit={limit}
            dict={dict}
          />
        </section>
      ),
    },
    {
      key: "videos",
      label: dict.videosTitle,
      count: company.videos.length,
      content: (
        <section>
          <p className="mb-4 text-sm text-ink-secondary">{dict.videosSubtitle}</p>
          {canVideoPdf ? (
            <VideoManager
              initialVideos={company.videos.map((v) => ({ id: v.id, type: v.type, url: v.url, title: v.title }))}
              dict={dict}
            />
          ) : (
            <TariffUpsell dict={dict} feature={dict.videosTitle.toLowerCase()} />
          )}
        </section>
      ),
    },
    {
      key: "pdf",
      label: dict.pdfTitle,
      count: company.pdfGuides.length,
      content: (
        <section>
          <p className="mb-4 text-sm text-ink-secondary">{dict.pdfSubtitle}</p>
          {canVideoPdf ? (
            <PdfManager initialPdfs={company.pdfGuides.map((p) => ({ id: p.id, title: p.title, url: p.url }))} dict={dict} />
          ) : (
            <TariffUpsell dict={dict} feature={dict.pdfTitle} />
          )}
        </section>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">{getDictionary(locale).dashboard.nav.media}</h2>
      <TabPanels panels={panels} />
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
    <div className="flex items-start gap-3 rounded-card border border-dashed border-line bg-white p-5 text-sm text-ink-secondary">
      <Lock className="mt-0.5 size-4 flex-none text-ink-muted" aria-hidden />
      <span>
      {dict.upsellPrefix.replace("{feature}", feature)}{" "}
      <Link href="/dashboard/billing" className="focus-ring rounded font-medium text-brand-700 hover:underline">
        {dict.changeTariff}
      </Link>
      </span>
    </div>
  );
}
