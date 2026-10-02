import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { unlink } from "fs/promises";
import path from "path";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; photoId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const photo = await prisma.tourPhoto.findUnique({
    where: { id: params.photoId },
    include: { tour: { select: { id: true, companyId: true } } },
  });
  if (!photo || photo.tour.id !== params.id || photo.tour.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Фото не найдено." }, { status: 404 });
  }

  await prisma.tourPhoto.delete({ where: { id: photo.id } });

  // Only user uploads are removed from disk; bundled demo images are left alone.
  if (photo.url.startsWith("/uploads/")) {
    unlink(path.join(process.cwd(), "public", photo.url)).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
