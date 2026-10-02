"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Search, Mountain, User, LogOut, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button, LinkButton } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export function Navbar({
  locale,
  dict,
  reelsLabel,
}: {
  locale: Locale;
  dict: Dictionary["nav"];
  reelsLabel: string;
}) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/search", label: dict.catalog },
    { href: "/reels", label: reelsLabel },
    { href: "/about", label: dict.about },
    { href: "/contacts", label: dict.contacts },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-line bg-white">
      <div className="mx-auto flex h-full max-w-container items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="focus-ring -ml-2 flex items-center gap-2 rounded-md p-2 text-lg font-bold text-brand-700">
          <Mountain className="size-6 text-brand-600" aria-hidden />
          <span className="hidden sm:inline">KyrgyzTour Hub</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-secondary lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="focus-ring rounded transition-colors hover:text-brand-700">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            aria-label={dict.catalog}
            className="focus-ring hidden rounded-md p-2 text-ink-secondary hover:bg-gray-100 hover:text-ink lg:inline-flex"
          >
            <Search className="size-5" />
          </Link>
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {status === "authenticated" ? (
              <>
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin/moderation"
                    className="focus-ring flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-ink-secondary hover:text-brand-700"
                  >
                    <ShieldCheck className="size-4" />
                    {dict.admin}
                  </Link>
                )}
                <LinkButton href="/dashboard/profile" variant="ghost" size="sm" icon={<User className="size-4" />}>
                  {dict.account}
                </LinkButton>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut className="size-4" />}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  {dict.logout}
                </Button>
              </>
            ) : (
              <>
                <LinkButton href="/login" variant="ghost" size="sm">
                  {dict.login}
                </LinkButton>
                <LinkButton href="/register" variant="primary" size="sm">
                  {dict.forCompanies}
                </LinkButton>
              </>
            )}
          </div>

          <button
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileOpen((v) => !v)}
            className="focus-ring rounded-md p-2 text-ink hover:bg-gray-100 lg:hidden"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-line bg-white px-4 py-4 shadow-card lg:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-ink">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-md px-3 py-2.5 hover:bg-gray-50"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <LanguageSwitcher locale={locale} />
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
            {status === "authenticated" ? (
              <>
                {session.user.role === "ADMIN" && (
                  <LinkButton href="/admin/moderation" variant="outline" size="sm" icon={<ShieldCheck className="size-4" />}>
                    {dict.admin}
                  </LinkButton>
                )}
                <LinkButton href="/dashboard/profile" variant="secondary" size="sm" icon={<User className="size-4" />}>
                  {dict.account}
                </LinkButton>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut className="size-4" />}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  {dict.logout}
                </Button>
              </>
            ) : (
              <>
                <LinkButton href="/login" variant="outline" size="sm">
                  {dict.login}
                </LinkButton>
                <LinkButton href="/register" variant="primary" size="sm">
                  {dict.forCompanies}
                </LinkButton>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
