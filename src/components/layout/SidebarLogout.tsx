"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SidebarLogout({ label }: { label: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="focus-ring flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-ink-secondary transition-colors hover:bg-red-50 hover:text-danger"
    >
      <LogOut className="size-[18px]" aria-hidden />
      {label}
    </button>
  );
}
