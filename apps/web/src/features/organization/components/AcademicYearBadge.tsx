import React from "react";
import { AcademicYear } from "@universal-school/shared-types";
import { Badge } from "@/components/ui";

interface AcademicYearBadgeProps {
  academicYear?: AcademicYear | null;
  isLoading?: boolean;
}

export const AcademicYearBadge: React.FC<AcademicYearBadgeProps> = ({
  academicYear,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="h-7 w-32 rounded-full bg-[var(--surface-elevated)] animate-pulse border border-[var(--border-subtle)]"></div>;
  }

  if (!academicYear) {
    return (
      <Badge variant="error">
        No Active Session
      </Badge>
    );
  }

  const currentTerm = academicYear.terms.find((t) => t.isCurrent) || academicYear.terms[0];

  return (
    <div className="flex items-center gap-2">
      <Badge variant="success" className="gap-1.5 font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)] animate-pulse"></span>
        Session: {academicYear.name}
      </Badge>
      {currentTerm && (
        <Badge variant="neutral" className="font-mono text-[11px]">
          {currentTerm.name}
        </Badge>
      )}
    </div>
  );
};
