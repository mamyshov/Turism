"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";

export function MobileFiltersDrawer({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="focus-ring inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-gray-50 active:bg-gray-100"
      >
        <SlidersHorizontal className="size-4" aria-hidden />
        {label}
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} side="bottom" title={title}>
        {children}
      </Drawer>
    </>
  );
}
