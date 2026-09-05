import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещён." }, { status: 403 });
  }

  const body = await req.json();
  const status = body.status;
  if (status !== "APPROVED" && status !== "REJECTED") {
    return NextResponse.json({ error: "Некорректный статус." }, { status: 400 });
  }

  const company = await prisma.company.update({
    where: { id: params.id },
    data: {
      verificationStatus: status,
      verificationComment: typeof body.comment === "string" ? body.comment.slice(0, 500) : null,
    },
  });

  return NextResponse.json({ ok: true, company });
}
