import { requireCurrentCompany } from "@/lib/current-company";
import { MAX_REELS_PER_COMPANY } from "@/lib/constants";
import { ReelManager } from "./ReelManager";

export default async function DashboardReelsPage() {
  const company = await requireCurrentCompany();

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-1">Короткие видео (Reels)</h2>
      <p className="mb-6 text-sm text-gray-500">
        Короткие вертикальные ролики попадают в общую публичную ленту{" "}
        <a href="/reels" target="_blank" className="text-brand-700 hover:underline">
          /reels
        </a>{" "}
        — доступно на любом тарифе, до {MAX_REELS_PER_COMPANY} роликов, MP4/WEBM/MOV,
        до 50 МБ каждый. Это способ привлечь туристов, а не платная функция.
      </p>
      <ReelManager
        initialReels={company.reels.map((r) => ({
          id: r.id,
          url: r.url,
          caption: r.caption,
          likeCount: r._count.likes,
        }))}
        limit={MAX_REELS_PER_COMPANY}
      />
    </div>
  );
}
