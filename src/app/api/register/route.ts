import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slug";
import {
  ALLOWED_VERIFICATION_TYPES,
  MAX_VERIFICATION_DOC_SIZE_BYTES,
} from "@/lib/constants";
import { saveUploadedFile, UploadValidationError } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") ?? "").trim();
    const type = String(form.get("type") ?? "");
    const email = String(form.get("email") ?? "").toLowerCase().trim();
    const phone = String(form.get("phone") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const doc = form.get("verificationDocument");

    if (!name || !email || !password || (type !== "LEGAL" && type !== "INDIVIDUAL")) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля корректно." },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Пароль должен содержать не менее 8 символов." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже зарегистрирован." },
        { status: 409 }
      );
    }

    let verificationDocumentUrl: string | null = null;
    if (doc instanceof File && doc.size > 0) {
      try {
        verificationDocumentUrl = await saveUploadedFile(doc, "verification", {
          allowedTypes: ALLOWED_VERIFICATION_TYPES,
          maxSizeBytes: MAX_VERIFICATION_DOC_SIZE_BYTES,
        });
      } catch (err) {
        if (err instanceof UploadValidationError) {
          return NextResponse.json({ error: err.message }, { status: 400 });
        }
        throw err;
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const slug = await generateUniqueSlug(name);

    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        role: "COMPANY",
        company: {
          create: {
            name,
            slug,
            type: type as "LEGAL" | "INDIVIDUAL",
            phone,
            contactEmail: email,
            verificationDocument: verificationDocumentUrl,
            verificationStatus: "PENDING",
          },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Registration failed", err);
    return NextResponse.json(
      { error: "Не удалось выполнить регистрацию. Попробуйте позже." },
      { status: 500 }
    );
  }
}
