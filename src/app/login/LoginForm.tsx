"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function LoginForm({ dict }: { dict: Dictionary["auth"] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setSubmitting(false);
    if (res?.error) {
      setError(dict.wrongCredentials);
      return;
    }
    router.push(searchParams.get("callbackUrl") ?? "/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12 sm:py-16">
      <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
        <h1 className="text-2xl font-bold text-ink">{dict.loginTitle}</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input id="email" name="email" type="email" label={dict.email} required autoComplete="email" />
          <Input
            id="password"
            name="password"
            type="password"
            label={dict.password}
            required
            autoComplete="current-password"
          />

          {error && (
            <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
              <AlertCircle className="size-4" aria-hidden />
              {error}
            </p>
          )}

          <Button type="submit" size="lg" fullWidth loading={submitting}>
            {dict.loginButton}
          </Button>

          <p className="text-center text-sm text-ink-secondary">
            {dict.noAccount}{" "}
            <Link href="/register" className="focus-ring rounded font-medium text-brand-700 hover:underline">
              {dict.registerButton}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
