import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";
import { ALLOWED_PHOTO_TYPES, MAX_PHOTO_SIZE_BYTES, MAX_PHOTOS_PER_TOUR } from "@/lib/constants";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: "Не авторизован." }, { status: 401 });
  }

  const tour = await prisma.tour.findUnique({
    where: { id: params.id },
    include: { _count: { select: { photos: true } } },
  });
  if (!tour || tour.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Тур не найден." }, { status: 404 });
  }
  if (tour._count.photos >= MAX_PHOTOS_PER_TOUR) {
    return NextResponse.json(
      { error: `Достигнут лимит фото тура (${MAX_PHOTOS_PER_TOUR}).` },
      { status: 400 }
    );
  }

  const form = await req.formData();
  const file = form.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Файл не выбран." }, { status: 400 });
  }

  try {
    const url = await saveUploadedFile(file, `tours/${tour.id}`, {
      allowedTypes: ALLOWED_PHOTO_TYPES,
      maxSizeBytes: MAX_PHOTO_SIZE_BYTES,
    });
    const photo = await prisma.tourPhoto.create({
      data: { tourId: tour.id, url, order: tour._count.photos },
    });
    return NextResponse.json({ ok: true, photo: { id: photo.id, url: photo.url } });
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("Tour photo upload failed", err);
    return NextResponse.json({ error: "Не удалось загрузить фото." }, { status: 500 });
  }
}
