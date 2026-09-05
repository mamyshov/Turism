import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTO_SIZE_BYTES,
  MAX_PHOTOS_BY_TARIFF,
} from "@/lib/constants";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const company = await prisma.company.findUnique({
    where: { id: session.user.companyId },
    include: { _count: { select: { photos: true } } },
  });
  if (!company) return NextResponse.json({ error: "Компания не найдена." }, { status: 404 });

  const limit = MAX_PHOTOS_BY_TARIFF[company.tariff] ?? 5;
  if (company._count.photos >= limit) {
    return NextResponse.json(
      { error: `Достигнут лимит фото для вашего тарифа (${limit}). Улучшите тариф, чтобы загрузить больше.` },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Файл не выбран." }, { status: 400 });
  }

  try {
    const url = await saveUploadedFile(file, `companies/${company.id}`, {
      allowedTypes: ALLOWED_PHOTO_TYPES,
      maxSizeBytes: MAX_PHOTO_SIZE_BYTES,
    });
    const photo = await prisma.photo.create({
      data: { companyId: company.id, url, order: company._count.photos },
    });
    return NextResponse.json({ ok: true, photo });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Photo upload failed", err);
    return NextResponse.json({ error: "Не удалось загрузить фото." }, { status: 500 });
  }
}
