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

  const photo = await prisma.photo.findUnique({ where: { id: params.id } });
  if (!photo || photo.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Фото не найдено." }, { status: 404 });
  }

  await prisma.photo.delete({ where: { id: photo.id } });

  // Best-effort disk cleanup — a leftover orphan file is harmless, an error
  // here must not block the DB deletion the user asked for.
  unlink(path.join(process.cwd(), "public", photo.url)).catch(() => {});

  return NextResponse.json({ ok: true });
}
