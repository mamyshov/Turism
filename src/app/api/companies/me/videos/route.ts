import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";
import { toEmbedUrl } from "@/lib/video";
import { ALLOWED_VIDEO_TYPES, MAX_VIDEO_SIZE_BYTES, canUploadVideoOrPdf } from "@/lib/constants";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const company = await prisma.company.findUnique({ where: { id: session.user.companyId } });
  if (!company) return NextResponse.json({ error: "Компания не найдена." }, { status: 404 });
  if (!canUploadVideoOrPdf(company.tariff)) {
    return NextResponse.json(
      { error: "Видео доступно с тарифа «Стандарт». Улучшите тариф в разделе «Тариф»." },
      { status: 403 }
    );
  }

  const form = await req.formData();
  const type = form.get("type");
  const title = form.get("title");
  const titleStr = typeof title === "string" && title.trim() ? title.trim().slice(0, 200) : null;

  if (type === "EMBED") {
    const rawUrl = form.get("url");
    if (typeof rawUrl !== "string" || !rawUrl.trim()) {
      return NextResponse.json({ error: "Укажите ссылку на видео." }, { status: 400 });
    }
    const embedUrl = toEmbedUrl(rawUrl);
    if (!embedUrl) {
      return NextResponse.json(
        { error: "Поддерживаются только ссылки на YouTube и Vimeo." },
        { status: 400 }
      );
    }
    const video = await prisma.video.create({
      data: { companyId: company.id, type: "EMBED", url: embedUrl, title: titleStr },
    });
    return NextResponse.json({ ok: true, video });
  }

  if (type === "UPLOAD") {
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Файл не выбран." }, { status: 400 });
    }
    try {
      const url = await saveUploadedFile(file, `companies/${company.id}/videos`, {
        allowedTypes: ALLOWED_VIDEO_TYPES,
        maxSizeBytes: MAX_VIDEO_SIZE_BYTES,
      });
      const video = await prisma.video.create({
        data: { companyId: company.id, type: "UPLOAD", url, title: titleStr },
      });
      return NextResponse.json({ ok: true, video });
    } catch (err) {
      if (err instanceof UploadValidationError) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
      console.error("Video upload failed", err);
      return NextResponse.json({ error: "Не удалось загрузить видео." }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Некорректный тип видео." }, { status: 400 });
}
