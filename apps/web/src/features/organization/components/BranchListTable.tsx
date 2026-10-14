import React from "react";
import { Branch } from "@universal-school/shared-types";
import { Badge } from "@/components/ui";

interface BranchListTableProps {
  branches: Branch[];
  isLoading?: boolean;
}

export const BranchListTable: React.FC<BranchListTableProps> = ({ branches, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-base)] p-8 text-center text-[var(--text-muted)] animate-pulse">
        Loading campuses and branches...
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="rounded-[var(--radius-2xl)] border border-dashed border-[var(--border-default)] bg-[var(--surface-base)] p-8 text-center text-[var(--text-muted)]">
        No branches currently configured for this institution.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-base)] backdrop-blur-sm shadow-xl">
      <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] font-heading">Campus & Branch Registry</h3>
          <p className="text-xs text-[var(--text-muted)]">Total authorized campuses: {branches.length}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[var(--surface-base)] text-[var(--text-muted)] uppercase tracking-wider font-semibold border-b border-[var(--border-subtle)]">
            <tr>
              <th className="px-6 py-3">Branch Details</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">City / Address</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Capacity & Shifts</th>
              <th className="px-6 py-3 text-right">Designation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {branches.map((b) => (
              <tr key={b.id} className="hover:bg-[var(--surface-elevated)] transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-[var(--foreground)]">{b.name}</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">ID: {b.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-[var(--radius-md)] font-mono text-[11px] font-bold bg-[var(--surface-base)] border border-[var(--border-default)] text-[var(--focus-ring)]">
                    {b.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--foreground)] block">{b.city}</span>
                  <span className="text-[var(--text-muted)] text-[11px]">{b.address}</span>
                </td>
                <td className="px-6 py-4 text-[var(--text-secondary)] font-mono">
                  <div>{b.phone}</div>
                  <div className="text-[var(--text-muted)] text-[11px]">{b.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[var(--text-secondary)]">
                    Cap: <span className="font-mono text-[var(--color-success)] font-semibold">{b.capacity || "N/A"}</span>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {b.shifts.map((s) => (
                      <span
                        key={s.id}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        title={`${s.startTime} - ${s.endTime}`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {b.isMain ? (
                    <Badge variant="warning">
                      ★ Main Campus
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      Secondary Branch
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
