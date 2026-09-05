"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { COMPANY_TYPES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function RegisterForm({ dict }: { dict: Dictionary["auth"] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("passwordConfirm")) {
      setError(dict.passwordMismatch);
      setSubmitting(false);
      return;
    }
    formData.delete("passwordConfirm");

    try {
      const res = await fetch("/api/register", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-brand-700">{dict.registerSuccessTitle}</h1>
        <p className="mt-3 text-gray-600">{dict.registerSuccessBody}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold">{dict.registerTitle}</h1>
      <p className="mt-2 text-sm text-gray-600">{dict.registerSubtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" encType="multipart/form-data">
        <Field label={dict.name} name="name" required />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{dict.type}</label>
          <div className="flex gap-4">
            {COMPANY_TYPES.map((t) => (
              <label key={t.key} className="flex items-center gap-2 text-sm">
                <input type="radio" name="type" value={t.key} required defaultChecked={t.key === "LEGAL"} />
                {t.label}
              </label>
            ))}
          </div>
        </div>

        <Field label={dict.email} name="email" type="email" required />
        <Field label={dict.phone} name="phone" type="tel" placeholder="+996 700 000 000" />
        <Field label={dict.password} name="password" type="password" required minLength={8} />
        <Field label={dict.passwordConfirm} name="passwordConfirm" type="password" required minLength={8} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {dict.verificationDoc}
          </label>
          <input
            type="file"
            name="verificationDocument"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-brand-700"
          />
          <p className="mt-1 text-xs text-gray-400">{dict.verificationDocHint}</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brand-600 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? "…" : dict.registerButton}
        </button>

        <p className="text-center text-sm text-gray-500">
          {dict.haveAccount}{" "}
          <Link href="/login" className="text-brand-700 font-medium">{dict.loginButton}</Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  minLength,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
    </div>
  );
}
