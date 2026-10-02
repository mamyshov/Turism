"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-600/50",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 active:bg-brand-200 disabled:text-brand-700/50",
  outline:
    "bg-white text-ink border border-line hover:bg-gray-50 active:bg-gray-100 disabled:text-ink/40",
  ghost:
    "bg-transparent text-ink-secondary hover:bg-gray-100 hover:text-ink active:bg-gray-200",
  danger:
    "bg-danger text-white hover:bg-red-600 active:bg-red-700 disabled:bg-danger/50",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function baseClasses(variant: Variant, size: Size, fullWidth?: boolean, extra?: string) {
  return [
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-ring disabled:cursor-not-allowed disabled:opacity-60",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    extra ?? "",
  ].join(" ");
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, fullWidth, icon, disabled, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={baseClasses(variant, size, fullWidth, className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
});

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={baseClasses(variant, size, fullWidth, className)} {...props}>
      {icon}
      {children}
    </Link>
  );
}
