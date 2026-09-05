"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary["nav"] }) {
  const { data: session, status } = useSession();

  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-700 text-lg">
          <span aria-hidden>🏔️</span>
          KyrgyzTour Hub
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/search" className="hover:text-brand-700">{dict.catalog}</Link>
          <Link href="/about" className="hover:text-brand-700">{dict.about}</Link>
          <Link href="/contacts" className="hover:text-brand-700">{dict.contacts}</Link>
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <LanguageSwitcher locale={locale} />
          {status === "authenticated" ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin/moderation" className="text-gray-600 hover:text-brand-700">
                  {dict.admin}
                </Link>
              )}
              <Link
                href="/dashboard/profile"
                className="text-gray-600 hover:text-brand-700"
              >
                {dict.account}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
              >
                {dict.logout}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-brand-700">
                {dict.login}
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-brand-600 px-3 py-1.5 font-medium text-white hover:bg-brand-700"
              >
                {dict.forCompanies}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
