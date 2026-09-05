import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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

  const tour = await prisma.tour.findUnique({ where: { id: params.id } });
  if (!tour || tour.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Тур не найден." }, { status: 404 });
  }

  await prisma.tour.delete({ where: { id: tour.id } });
  return NextResponse.json({ ok: true });
}
