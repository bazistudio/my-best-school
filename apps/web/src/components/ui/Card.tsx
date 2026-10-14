import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-base)] backdrop-blur-sm p-6 shadow-xl transition-all";

    const variantStyles = {
      default: "hover:border-[var(--border-default)]",
      elevated: "bg-[var(--surface-elevated)] border-[var(--border-default)] shadow-2xl",
      interactive: "hover:border-[var(--focus-ring)] hover:shadow-blue-900/10 cursor-pointer active:scale-[0.99]",
    };

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
