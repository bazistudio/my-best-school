import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className = "",
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors select-none";

  const variantStyles = {
    primary:
      "bg-[rgba(0,41,107,0.18)] text-blue-300 border border-[rgba(0,41,107,0.4)]",
    secondary:
      "bg-[rgba(230,57,70,0.14)] text-rose-300 border border-[rgba(230,57,70,0.35)]",
    success:
      "bg-[var(--color-success-subtle)] text-emerald-400 border border-[var(--color-success-border)]",
    warning:
      "bg-[var(--color-warning-subtle)] text-amber-300 border border-[var(--color-warning-border)]",
    error:
      "bg-[var(--color-error-subtle)] text-rose-400 border border-[var(--color-error-border)]",
    neutral:
      "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};
