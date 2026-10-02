"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type Side = "left" | "right" | "bottom";

const POSITION_CLASSES: Record<Side, string> = {
  left: "inset-y-0 left-0 h-full w-full max-w-xs rounded-r-card",
  right: "inset-y-0 right-0 h-full w-full max-w-xs rounded-l-card",
  bottom: "inset-x-0 bottom-0 max-h-[85vh] w-full rounded-t-card",
};

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal aria-label={title}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className={`absolute flex flex-col bg-white shadow-card ${POSITION_CLASSES[side]}`}>
        {title && (
          <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
            <h2 className="font-semibold text-ink">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="focus-ring rounded-md p-1 text-ink-muted hover:bg-gray-100 hover:text-ink"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer && <div className="border-t border-line p-4">{footer}</div>}
      </div>
    </div>
  );
}
