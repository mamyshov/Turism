import Link from "next/link";
import { Mountain } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function Footer({
  tagline,
  nav,
}: {
  tagline: string;
  nav: Pick<Dictionary["nav"], "about" | "contacts" | "catalog">;
}) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-container px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2 text-ink">
            <Mountain className="size-5 text-brand-600" aria-hidden />
            <span className="font-semibold">KyrgyzTour Hub</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-secondary">
            <Link href="/search" className="focus-ring rounded hover:text-brand-700">
              {nav.catalog}
            </Link>
            <Link href="/about" className="focus-ring rounded hover:text-brand-700">
              {nav.about}
            </Link>
            <Link href="/contacts" className="focus-ring rounded hover:text-brand-700">
              {nav.contacts}
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          © {new Date().getFullYear()} KyrgyzTour Hub. {tagline}
        </p>
      </div>
    </footer>
  );
}
