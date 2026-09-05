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
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const video = await prisma.video.findUnique({ where: { id: params.id } });
  if (!video || video.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Видео не найдено." }, { status: 404 });
  }

  await prisma.video.delete({ where: { id: video.id } });

  if (video.type === "UPLOAD") {
    unlink(path.join(process.cwd(), "public", video.url)).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
