"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Map,
  Image as ImageIcon,
  Clapperboard,
  MessageSquare,
  BarChart3,
  CreditCard,
  Settings,
  ShieldCheck,
  Building2,
} from "lucide-react";

// Icons are referenced by name because component references can't cross the
// server -> client boundary as props.
const ICONS = {
  home: LayoutDashboard,
  tours: Map,
  media: ImageIcon,
  reels: Clapperboard,
  reviews: MessageSquare,
  stats: BarChart3,
  billing: CreditCard,
  settings: Settings,
  moderation: ShieldCheck,
  companies: Building2,
};

export type SidebarIcon = keyof typeof ICONS;

export type SidebarItem = {
  href: string;
  label: string;
  icon: SidebarIcon;
};

export function Sidebar({
  items,
  title,
  footer,
}: {
  items: SidebarItem[];
  title: string;
  footer?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href.split("/").length > 2 && !!pathname?.startsWith(href + "/"));

  const nav = (onNavigate?: () => void) => (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`focus-ring flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-50 text-brand-700"
                : "text-ink-secondary hover:bg-gray-100 hover:text-ink"
            }`}
          >
            <Icon className="size-[18px] flex-none" aria-hidden />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar trigger */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <span className="font-semibold text-ink">{items.find((i) => isActive(i.href))?.label ?? title}</span>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Открыть меню"
          className="focus-ring rounded-md border border-line bg-white p-2 text-ink hover:bg-gray-50"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal>
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white p-4 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-ink">{title}</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Закрыть"
                className="focus-ring rounded-md p-1.5 text-ink-muted hover:bg-gray-100 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>
            {nav(() => setMobileOpen(false))}
            {footer && <div className="mt-auto border-t border-line pt-4">{footer}</div>}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 flex-none lg:flex lg:flex-col">
        <div className="sticky top-20 flex flex-col gap-4">
          {nav()}
          {footer}
        </div>
      </aside>
    </>
  );
}
