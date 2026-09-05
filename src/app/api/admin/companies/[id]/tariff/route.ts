import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_TARIFFS = new Set(["BASIC", "STANDARD", "PRO"]);

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещён." }, { status: 403 });
  }

  const body = await req.json();
  const tariff = String(body.tariff ?? "");
  if (!VALID_TARIFFS.has(tariff)) {
    return NextResponse.json({ error: "Некорректный тариф." }, { status: 400 });
  }

  const company = await prisma.company.update({
    where: { id: params.id },
    data: { tariff },
  });

  return NextResponse.json({ ok: true, company });
}
