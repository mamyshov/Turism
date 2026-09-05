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

  const pdf = await prisma.pdfGuide.findUnique({ where: { id: params.id } });
  if (!pdf || pdf.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Файл не найден." }, { status: 404 });
  }

  await prisma.pdfGuide.delete({ where: { id: pdf.id } });
  unlink(path.join(process.cwd(), "public", pdf.url)).catch(() => {});

  return NextResponse.json({ ok: true });
}
