import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { rm, unlink } from "fs/promises";
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

  const company = await prisma.company.findUnique({ where: { id: params.id } });
  if (!company) {
    return NextResponse.json({ error: "Турфирма не найдена." }, { status: 404 });
  }

  // Deleting the owning User cascades to Company and all of its media,
  // tours and reviews (see onDelete: Cascade in prisma/schema.prisma).
  await prisma.user.delete({ where: { id: company.userId } });

  // Best-effort disk cleanup — an orphan upload is harmless, this must
  // never block the account deletion the admin asked for.
  rm(path.join(process.cwd(), "public", "uploads", "companies", company.id), {
    recursive: true,
    force: true,
  }).catch(() => {});
  if (company.verificationDocument) {
    unlink(path.join(process.cwd(), "public", company.verificationDocument)).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
