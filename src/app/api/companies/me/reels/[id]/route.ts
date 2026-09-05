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

  const reel = await prisma.reel.findUnique({ where: { id: params.id } });
  if (!reel || reel.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Ролик не найден." }, { status: 404 });
  }

  await prisma.reel.delete({ where: { id: reel.id } });
  unlink(path.join(process.cwd(), "public", reel.url)).catch(() => {});

  return NextResponse.json({ ok: true });
}
