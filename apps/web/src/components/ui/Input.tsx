import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, label, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full rounded-[var(--radius-lg)] border bg-[var(--surface-base)] px-3.5 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-[var(--color-error)] focus:ring-[var(--color-error)]"
              : "border-[var(--border-default)] hover:border-[var(--border-strong)]"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
