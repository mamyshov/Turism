import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const company = await prisma.company.findUnique({ where: { id: params.id } });
  if (!company || company.verificationStatus !== "APPROVED" || company.isBlocked) {
    return NextResponse.json({ error: "Турфирма не найдена." }, { status: 404 });
  }

  const body = await req.json();
  const authorName = String(body.authorName ?? "").trim();
  const authorEmail = String(body.authorEmail ?? "").trim();
  const rating = Number(body.rating);
  const text = typeof body.text === "string" ? body.text.trim().slice(0, 2000) : null;

  if (!authorName || authorName.length > 100) {
    return NextResponse.json({ error: "Укажите имя (до 100 символов)." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    return NextResponse.json({ error: "Укажите корректный email." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Оценка должна быть от 1 до 5." }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { companyId: company.id, authorName, authorEmail, rating, text: text || null },
  });

  return NextResponse.json({ ok: true, review });
}
