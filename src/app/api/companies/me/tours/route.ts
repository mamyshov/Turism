import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const body = await req.json();
  const title = String(body.title ?? "").trim();
  const price = Number(body.price);

  if (!title || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Укажите название и корректную цену тура." },
      { status: 400 }
    );
  }

  const tour = await prisma.tour.create({
    data: {
      companyId: session.user.companyId,
      title,
      description: body.description || null,
      durationDays: body.durationDays ? Number(body.durationDays) : null,
      durationHours: body.durationHours ? Number(body.durationHours) : null,
      price: Math.round(price),
      maxPeople: body.maxPeople ? Number(body.maxPeople) : null,
      included: body.included || null,
      excluded: body.excluded || null,
    },
  });

  return NextResponse.json({ ok: true, tour });
}
