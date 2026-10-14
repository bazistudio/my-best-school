import React from "react";
import { Branch } from "@universal-school/shared-types";

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranchId?: string;
  onSelectBranch: (branchId: string) => void;
  isLoading?: boolean;
}

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="h-9 w-48 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] animate-pulse border border-[var(--border-subtle)]"></div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="px-3 py-2 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-default)] text-xs text-[var(--text-muted)]">
        No branches available
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="branch-select" className="text-xs font-medium text-[var(--text-secondary)]">
        Active Campus:
      </label>
      <div className="relative">
        <select
          id="branch-select"
          value={selectedBranchId || ""}
          onChange={(e) => onSelectBranch(e.target.value)}
          className="appearance-none bg-[var(--surface-base)] hover:bg-[var(--surface-elevated)] text-[var(--foreground)] text-xs font-medium pl-3 pr-8 py-2 rounded-[var(--radius-lg)] border border-[var(--border-default)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-transparent transition-colors cursor-pointer shadow-sm"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} [{b.code}] {b.isMain ? "★ Main" : ""}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[var(--text-muted)]">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
