import type { ReactNode } from "react";

export default function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-burgundy"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-ink/50">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-burgundy">
          {error}
        </p>
      )}
    </div>
  );
}
