import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_REELS_PER_COMPANY } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { ReelManager } from "./ReelManager";

export default async function DashboardReelsPage() {
  const company = await requireCurrentCompany();
  const dict = getDictionary(getLocale()).dashboard.reels;

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{dict.title}</h2>
      <p className="mb-6 text-sm text-ink-secondary">
        {dict.subtitlePrefix}{" "}
        <a href="/reels" target="_blank" className="focus-ring rounded text-brand-700 hover:underline">
          /reels
        </a>{" "}
        {dict.subtitleSuffix.replace("{limit}", String(MAX_REELS_PER_COMPANY))}
      </p>
      <ReelManager
        initialReels={company.reels.map((r) => ({
          id: r.id,
          url: r.url,
          caption: r.caption,
          likeCount: r._count.likes,
        }))}
        limit={MAX_REELS_PER_COMPANY}
        dict={dict}
      />
    </div>
  );
}
