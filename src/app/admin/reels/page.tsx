import Link from "next/link";
import { Clapperboard, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { AdminReelActions } from "./AdminReelActions";

export default async function AdminReelsPage() {
  const reels = await prisma.reel.findMany({
    include: {
      company: { select: { name: true, slug: true, isBlocked: true, verificationStatus: true } },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">Reels</h2>
      <p className="mb-6 text-sm text-ink-secondary">
        Удаляйте неподходящие ролики. Последние {reels.length} роликов.
      </p>

      {reels.length === 0 ? (
        <EmptyState icon={Clapperboard} title="Роликов пока нет." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {reels.map((reel) => {
            const hidden = reel.company.isBlocked || reel.company.verificationStatus !== "APPROVED";
            return (
              <div key={reel.id} className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative aspect-[9/16] w-full bg-black">
                  <video
                    src={`${reel.url}#t=0.1`}
                    controls
                    preload="metadata"
                    playsInline
                    className="h-full w-full object-cover"
                    aria-label={reel.caption ?? reel.company.name}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <div className="min-w-0">
                    <Link
                      href={`/company/${reel.company.slug}`}
                      target="_blank"
                      className="focus-ring text-balance-wrap rounded text-sm font-semibold text-ink hover:text-brand-700"
                    >
                      {reel.company.name}
                    </Link>
                    {reel.caption && <p className="text-balance-wrap mt-0.5 line-clamp-2 text-xs text-ink-secondary">{reel.caption}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="size-3.5" aria-hidden />
                      {reel._count.likes}
                    </span>
                    <span>{reel.createdAt.toLocaleDateString("ru-RU")}</span>
                    {hidden && <Badge tone="warning">Скрыт из ленты</Badge>}
                  </div>
                  <div className="mt-auto pt-1">
                    <AdminReelActions reelId={reel.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
