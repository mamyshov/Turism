import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export class UploadValidationError extends Error {}

/**
 * Saves an uploaded file under public/uploads/<subdir>/ and returns its
 * public URL. Validates MIME type and size before touching disk.
 *
 * NOTE: this is a local-disk implementation suitable for the MVP/dev
 * environment. For production, swap this for Supabase Storage / S3 / R2 —
 * callers only depend on getting back a public URL, so the storage backend
 * can change without touching route handlers.
 */
export async function saveUploadedFile(
  file: File,
  subdir: string,
  { allowedTypes, maxSizeBytes }: { allowedTypes: string[]; maxSizeBytes: number }
): Promise<string> {
  if (!allowedTypes.includes(file.type)) {
    throw new UploadValidationError(
      `Недопустимый тип файла: ${file.type || "неизвестен"}`
    );
  }
  if (file.size > maxSizeBytes) {
    throw new UploadValidationError(
      `Файл слишком большой (макс. ${(maxSizeBytes / (1024 * 1024)).toFixed(0)} МБ)`
    );
  }

  const ext = EXTENSION_BY_MIME[file.type] ?? "bin";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const dir = path.join(UPLOAD_ROOT, subdir);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${subdir}/${filename}`;
}
