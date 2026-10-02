"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { AlertCircle } from "lucide-react";

type FieldWrap = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const fieldBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-muted transition-colors " +
  "focus-ring disabled:bg-gray-50 disabled:text-ink-muted disabled:cursor-not-allowed";

function borderClasses(hasError?: boolean) {
  return hasError
    ? "border-danger focus-visible:ring-danger"
    : "border-line hover:border-ink-secondary/60 focus-visible:border-brand-500";
}

export const Input = forwardRef<HTMLInputElement, FieldWrap & InputHTMLAttributes<HTMLInputElement>>(
  function Input({ label, hint, error, required, className, id, ...props }, ref) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldShell label={label} hint={hint} error={error} required={required} fieldId={fieldId} className={className}>
        <input
          ref={ref}
          id={fieldId}
          className={`${fieldBase} ${borderClasses(!!error)}`}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          {...props}
        />
      </FieldShell>
    );
  }
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  FieldWrap & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, hint, error, required, className, id, ...props }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} fieldId={fieldId} className={className}>
      <textarea
        ref={ref}
        id={fieldId}
        className={`${fieldBase} ${borderClasses(!!error)} min-h-[96px] resize-y`}
        required={required}
        aria-invalid={!!error}
        {...props}
      />
    </FieldShell>
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  FieldWrap & SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ label, hint, error, required, className, id, children, ...props }, ref) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} fieldId={fieldId} className={className}>
      <select
        ref={ref}
        id={fieldId}
        className={`${fieldBase} ${borderClasses(!!error)}`}
        required={required}
        aria-invalid={!!error}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
});

function FieldShell({
  label,
  hint,
  error,
  required,
  fieldId,
  className,
  children,
}: FieldWrap & { fieldId: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-danger">
          <AlertCircle className="size-3.5" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="mt-1.5 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
