"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Check } from "lucide-react";
import { COMPANY_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Dictionary } from "@/lib/i18n/dictionary";

type Values = {
  name: string;
  type: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

export function RegisterForm({ dict }: { dict: Dictionary["auth"] }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    name: "",
    type: "LEGAL",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const steps = [dict.stepBasic, dict.stepContacts, dict.stepDocs, dict.stepReview];
  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  // Steps stay mounted (hidden) so the single multipart FormData still
  // contains every field; only the visible slice changes.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < steps.length - 1) {
      if (e.currentTarget.checkValidity()) setStep((s) => s + 1);
      else e.currentTarget.reportValidity();
      return;
    }
    setError(null);

    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("passwordConfirm")) {
      setError(dict.passwordMismatch);
      setStep(1);
      return;
    }
    formData.delete("passwordConfirm");
    setSubmitting(true);

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
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-brand-700">{dict.registerSuccessTitle}</h1>
        <p className="mt-1 text-sm font-medium text-warning">{dict.statusPending}</p>
        <p className="mt-3 text-ink-secondary">{dict.registerSuccessBody}</p>
      </div>
    );
  }

  const typeLabel = COMPANY_TYPES.find((t) => t.key === values.type)?.label ?? values.type;

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-12">
      <h1 className="text-2xl font-bold text-ink">{dict.registerTitle}</h1>
      <p className="mt-2 text-sm text-ink-secondary">{dict.registerSubtitle}</p>

      <ol className="mt-6 flex items-center gap-2" aria-label="Steps">
        {steps.map((label, i) => (
          <li key={label} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className={`h-1.5 rounded-full ${i <= step ? "bg-brand-600" : "bg-gray-200"}`} />
            <span
              aria-current={i === step ? "step" : undefined}
              className={`truncate text-xs ${i === step ? "font-semibold text-brand-700" : "text-ink-muted"}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5 rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
        encType="multipart/form-data"
        noValidate={false}
      >
        <div className={step === 0 ? "space-y-5" : "hidden"}>
          <Input label={dict.name} name="name" value={values.name} onChange={set("name")} required />
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">{dict.type}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {COMPANY_TYPES.map((t) => (
                <label
                  key={t.key}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-brand-500 ${
                    values.type === t.key ? "border-brand-600 bg-brand-50 text-brand-900" : "border-line hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.key}
                    checked={values.type === t.key}
                    onChange={set("type")}
                    className="accent-brand-600"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={step === 1 ? "space-y-5" : "hidden"}>
          <Input label={dict.email} name="email" type="email" value={values.email} onChange={set("email")} required />
          <Input
            label={dict.phone}
            name="phone"
            type="tel"
            placeholder="+996 700 000 000"
            value={values.phone}
            onChange={set("phone")}
          />
          <Input
            label={dict.password}
            name="password"
            type="password"
            value={values.password}
            onChange={set("password")}
            required
            minLength={8}
          />
          <Input
            label={dict.passwordConfirm}
            name="passwordConfirm"
            type="password"
            value={values.passwordConfirm}
            onChange={set("passwordConfirm")}
            required
            minLength={8}
          />
        </div>

        <div className={step === 2 ? "space-y-2" : "hidden"}>
          <label htmlFor="verificationDocument" className="block text-sm font-medium text-ink">
            {dict.verificationDoc}
          </label>
          <input
            id="verificationDocument"
            type="file"
            name="verificationDocument"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            className="focus-ring block w-full rounded-md text-sm text-ink-secondary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:font-medium file:text-brand-700 hover:file:bg-brand-100"
          />
          <p className="text-xs text-ink-muted">{dict.verificationDocHint}</p>
        </div>

        {step === 3 && (
          <div>
            <p className="mb-3 text-sm text-ink-secondary">{dict.reviewHint}</p>
            <dl className="divide-y divide-line rounded-md border border-line text-sm">
              {[
                [dict.name, values.name],
                [dict.type, typeLabel],
                [dict.email, values.email],
                [dict.phone, values.phone || "—"],
                [dict.verificationDoc, fileName ?? "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5 px-3 py-2 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="text-balance-wrap font-medium text-ink sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {error && (
          <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
            <AlertCircle className="size-4" aria-hidden />
            {error}
          </p>
        )}

        <div className="flex gap-2">
          {step > 0 && (
            <Button type="button" variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
              {dict.back}
            </Button>
          )}
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            loading={submitting}
            icon={step === steps.length - 1 ? <Check className="size-4" /> : undefined}
          >
            {step === steps.length - 1 ? dict.registerButton : dict.next}
          </Button>
        </div>

        <p className="text-center text-sm text-ink-secondary">
          {dict.haveAccount}{" "}
          <Link href="/login" className="focus-ring rounded font-medium text-brand-700 hover:underline">
            {dict.loginButton}
          </Link>
        </p>
      </form>
    </div>
  );
}
