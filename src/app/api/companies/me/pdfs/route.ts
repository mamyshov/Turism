import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";
import { ALLOWED_PDF_TYPES, MAX_PDF_SIZE_BYTES, canUploadVideoOrPdf } from "@/lib/constants";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const company = await prisma.company.findUnique({ where: { id: session.user.companyId } });
  if (!company) return NextResponse.json({ error: "Компания не найдена." }, { status: 404 });
  if (!canUploadVideoOrPdf(company.tariff)) {
    return NextResponse.json(
      { error: "PDF-гиды доступны с тарифа «Стандарт». Улучшите тариф в разделе «Тариф»." },
      { status: 403 }
    );
  }

  const form = await req.formData();
  const title = String(form.get("title") ?? "").trim();
  const file = form.get("file");

  if (!title) {
    return NextResponse.json({ error: "Укажите название гида." }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Файл не выбран." }, { status: 400 });
  }

  try {
    const url = await saveUploadedFile(file, `companies/${company.id}/pdfs`, {
      allowedTypes: ALLOWED_PDF_TYPES,
      maxSizeBytes: MAX_PDF_SIZE_BYTES,
    });
    const pdf = await prisma.pdfGuide.create({
      data: { companyId: company.id, title: title.slice(0, 200), url },
    });
    return NextResponse.json({ ok: true, pdf });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("PDF upload failed", err);
    return NextResponse.json({ error: "Не удалось загрузить PDF." }, { status: 500 });
  }
}
