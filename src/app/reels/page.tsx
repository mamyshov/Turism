import { prisma } from "@/lib/prisma";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getVisitorId } from "@/lib/visitor";
import { ReelsFeed } from "./ReelsFeed";

export const metadata = { title: "Reels" };

async function getReels() {
  const reels = await prisma.reel.findMany({
    where: { company: { verificationStatus: "APPROVED", isBlocked: false } },
    include: {
      company: { select: { name: true, slug: true } },
      _count: { select: { likes: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const visitorId = getVisitorId();
  let likedIds = new Set<string>();
  if (visitorId && reels.length > 0) {
    const likes = await prisma.reelLike.findMany({
      where: { visitorId, reelId: { in: reels.map((r) => r.id) } },
      select: { reelId: true },
    });
    likedIds = new Set(likes.map((l) => l.reelId));
  }

  return reels.map((r) => ({
    id: r.id,
    url: r.url,
    caption: r.caption,
    companyName: r.company.name,
    companySlug: r.company.slug,
    likeCount: r._count.likes,
    liked: likedIds.has(r.id),
  }));
}

export default async function ReelsPage() {
  const reels = await getReels();
  const locale = getLocale();
  const dict = getDictionary(locale).reels;

  return <ReelsFeed reels={reels} dict={dict} />;
}
