import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateVisitorId } from "@/lib/visitor";

// Public endpoint (no login) — toggles this anonymous visitor's like on a
// reel and returns the new state + total count.
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const reel = await prisma.reel.findUnique({ where: { id: params.id } });
  if (!reel) {
    return NextResponse.json({ error: "Ролик не найден." }, { status: 404 });
  }

  const visitorId = getOrCreateVisitorId();

  const existing = await prisma.reelLike.findUnique({
    where: { reelId_visitorId: { reelId: reel.id, visitorId } },
  });

  if (existing) {
    await prisma.reelLike.delete({ where: { id: existing.id } });
  } else {
    await prisma.reelLike.create({ data: { reelId: reel.id, visitorId } });
  }

  const count = await prisma.reelLike.count({ where: { reelId: reel.id } });

  return NextResponse.json({ liked: !existing, count });
}
