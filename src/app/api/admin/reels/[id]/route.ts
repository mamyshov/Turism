import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { unlink } from "fs/promises";
import path from "path";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещён." }, { status: 403 });
  }

  const reel = await prisma.reel.findUnique({ where: { id: params.id } });
  if (!reel) return NextResponse.json({ ok: true });

  await prisma.reel.delete({ where: { id: reel.id } });

  // Only user uploads are removed from disk; bundled demo videos are left alone.
  if (reel.url.startsWith("/uploads/")) {
    unlink(path.join(process.cwd(), "public", reel.url)).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
