import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";
import {
  ALLOWED_VIDEO_TYPES,
  MAX_REEL_SIZE_BYTES,
  MAX_REELS_PER_COMPANY,
  MAX_REEL_CAPTION_LENGTH,
} from "@/lib/constants";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const company = await prisma.company.findUnique({
    where: { id: session.user.companyId },
    include: { _count: { select: { reels: true } } },
  });
  if (!company) return NextResponse.json({ error: "Компания не найдена." }, { status: 404 });

  if (company._count.reels >= MAX_REELS_PER_COMPANY) {
    return NextResponse.json(
      { error: `Достигнут лимит роликов (${MAX_REELS_PER_COMPANY}). Удалите старые, чтобы добавить новый.` },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  const caption = String(form.get("caption") ?? "").trim().slice(0, MAX_REEL_CAPTION_LENGTH);

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Файл не выбран." }, { status: 400 });
  }

  try {
    const url = await saveUploadedFile(file, `companies/${company.id}/reels`, {
      allowedTypes: ALLOWED_VIDEO_TYPES,
      maxSizeBytes: MAX_REEL_SIZE_BYTES,
    });
    const reel = await prisma.reel.create({
      data: { companyId: company.id, url, caption: caption || null },
    });
    return NextResponse.json({ ok: true, reel });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Reel upload failed", err);
    return NextResponse.json({ error: "Не удалось загрузить видео." }, { status: 500 });
  }
}
