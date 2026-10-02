"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, Link as LinkIcon, MessageCircle, Send, Check, Ellipsis } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function ShareButton({
  path,
  title,
  dict,
  label,
  variant = "outline",
}: {
  /** Site-relative path, e.g. `/company/my-slug`; the origin is added in the browser. */
  path: string;
  title: string;
  dict: Dictionary["share"];
  label?: string;
  variant?: "outline" | "ghost";
}) {
  const [open, setOpen] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const url = () => `${window.location.origin}${path}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
    } catch {
      const input = document.createElement("input");
      input.value = url();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    toast("success", dict.copied);
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  }

  function openExternal(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url: url() });
    } catch {
      // user dismissed the sheet
    }
    setOpen(false);
  }

  const item =
    "focus-ring flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-gray-50 active:bg-gray-100";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label ?? dict.button}
        className={`focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors ${
          variant === "outline"
            ? "border border-line bg-white text-ink hover:bg-gray-50 active:bg-gray-100"
            : "text-ink-secondary hover:bg-gray-100 hover:text-ink"
        }`}
      >
        <Share2 className="size-4" aria-hidden />
        <span>{label ?? dict.button}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 w-60 rounded-card border border-line bg-white p-1.5 shadow-card"
        >
          <button role="menuitem" className={item} onClick={copy}>
            {copied ? <Check className="size-4 text-success" aria-hidden /> : <LinkIcon className="size-4 text-ink-muted" aria-hidden />}
            {dict.copyLink}
          </button>
          <button
            role="menuitem"
            className={item}
            onClick={() => openExternal(`https://wa.me/?text=${encodeURIComponent(`${title} ${url()}`)}`)}
          >
            <MessageCircle className="size-4 text-ink-muted" aria-hidden />
            {dict.whatsapp}
          </button>
          <button
            role="menuitem"
            className={item}
            onClick={() =>
              openExternal(`https://t.me/share/url?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title)}`)
            }
          >
            <Send className="size-4 text-ink-muted" aria-hidden />
            {dict.telegram}
          </button>
          {canNativeShare && (
            <button role="menuitem" className={item} onClick={nativeShare}>
              <Ellipsis className="size-4 text-ink-muted" aria-hidden />
              {dict.more}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
