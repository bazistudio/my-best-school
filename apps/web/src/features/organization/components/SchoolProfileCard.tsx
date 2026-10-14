import React from "react";
import { OrganizationProfile } from "@universal-school/shared-types";
import { Card, Badge } from "@/components/ui";

interface SchoolProfileCardProps {
  profile: OrganizationProfile;
  isLoading?: boolean;
}

export const SchoolProfileCard: React.FC<SchoolProfileCardProps> = ({ profile, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse space-y-4">
        <div className="h-6 w-48 bg-[var(--surface-elevated)] rounded-[var(--radius-md)]"></div>
        <div className="h-4 w-72 bg-[var(--surface-elevated)] opacity-60 rounded-[var(--radius-md)]"></div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="h-4 bg-[var(--surface-elevated)] opacity-40 rounded"></div>
          <div className="h-4 bg-[var(--surface-elevated)] opacity-40 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5 mb-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-[var(--radius-xl)] bg-[var(--color-primary)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center font-bold text-2xl text-[var(--color-primary-foreground)] shadow-lg shadow-[rgba(0,41,107,0.3)]">
            {profile.shortName?.slice(0, 2) || "SC"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight font-heading">
                {profile.name}
              </h2>
              <Badge variant="primary">
                {profile.shortName}
              </Badge>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {profile.tagline || "Official Institution Profile"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end text-xs text-[var(--text-secondary)] space-y-1">
          <span className="font-mono bg-[var(--surface-base)] px-2.5 py-1 rounded-[var(--radius-md)] border border-[var(--border-default)]">
            Reg: {profile.registrationNumber}
          </span>
          {profile.taxIdentifier && (
            <span className="font-mono text-[var(--text-muted)] text-[11px]">
              NTN/Tax: {profile.taxIdentifier}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] font-medium block mb-1">Official Address</span>
          <p className="text-[var(--foreground)] leading-relaxed">{profile.primaryAddress}</p>
        </div>

        <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] font-medium block mb-1">Contact Details</span>
          <p className="text-[var(--foreground)] font-mono">{profile.contactEmail}</p>
          <p className="text-[var(--text-secondary)] font-mono mt-1">{profile.contactPhone}</p>
        </div>

        <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--surface-base)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] font-medium block mb-1">Regional Parameters</span>
          <div className="flex justify-between text-[var(--text-secondary)] mt-1">
            <span>Currency:</span>
            <span className="font-mono font-semibold text-[var(--color-success)]">{profile.currency}</span>
          </div>
          <div className="flex justify-between text-[var(--text-secondary)] mt-1">
            <span>Timezone:</span>
            <span className="font-mono text-[var(--text-muted)]">{profile.timezone}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
