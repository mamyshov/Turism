"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Search, Clapperboard, Heart, User } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionary";

// Hidden where it would collide with another fixed bar or a task-focused layout.
const HIDDEN_PREFIXES = ["/company/", "/tour/", "/dashboard", "/admin", "/login", "/register"];

export function MobileBottomNav({ dict, reelsLabel }: { dict: Dictionary["nav"]; reelsLabel: string }) {
  const pathname = usePathname() ?? "/";
  const { status } = useSession();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const items = [
    { href: "/", label: dict.home, icon: Home },
    { href: "/search", label: dict.catalog, icon: Search },
    { href: "/reels", label: reelsLabel, icon: Clapperboard },
    { href: "/favorites", label: dict.favorites, icon: Heart },
    status === "authenticated"
      ? { href: "/dashboard", label: dict.account, icon: User }
      : { href: "/login", label: dict.login, icon: User },
  ];

  return (
    <>
      <div className="h-16 md:hidden" aria-hidden />
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`focus-ring flex min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-medium transition-colors ${
                active ? "text-brand-700" : "text-ink-muted hover:text-ink"
              }`}
            >
              <Icon className={`size-5 ${active && href === "/favorites" ? "fill-brand-100" : ""}`} aria-hidden />
              <span className="w-full truncate text-center">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
