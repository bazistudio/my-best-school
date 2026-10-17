"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  OrganizationProfile,
  Branch,
  AcademicYear,
} from "@universal-school/shared-types";
import { organizationApi } from "@/features/organization/api";
import { SchoolProfileCard } from "@/features/organization/components/SchoolProfileCard";
import { BranchSelector } from "@/features/organization/components/BranchSelector";
import { BranchListTable } from "@/features/organization/components/BranchListTable";
import { AcademicYearBadge } from "@/features/organization/components/AcademicYearBadge";
import { Button } from "@/components/ui";

export default function OrganizationPage() {
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [profData, branchData, ayData] = await Promise.all([
        organizationApi.getProfile(),
        organizationApi.getBranches(),
        organizationApi.getActiveAcademicYear().catch(() => null),
      ]);

      setProfile(profData);
      setBranches(branchData);
      setAcademicYear(ayData);

      const main = branchData.find((b) => b.isMain) || branchData[0];
      if (main) setSelectedBranchId(main.id);
    } catch (err: unknown) {
      const e = err as Error;
      setError(
        e.message ||
          "Could not connect to the backend organization service. Ensure backend API is running on port 4000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Module Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs text-[var(--text-muted)] font-medium">
            <span>Institution Settings</span>
            <span>•</span>
            <span className="text-[var(--focus-ring)]">Phase 01 Verified</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-heading">
            Organization & Campus Registry
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Configure institutional profile, multi-campus topology, and academic sessions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AcademicYearBadge academicYear={academicYear} isLoading={isLoading} />
          <BranchSelector
            branches={branches}
            selectedBranchId={selectedBranchId}
            onSelectBranch={setSelectedBranchId}
            isLoading={isLoading}
          />
          <Link href="/settings/branches">
            <Button
              variant="outline"
              size="md"
            >
              Configure Branches ⚙
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {error ? (
          <div className="p-6 rounded-[var(--radius-2xl)] bg-[var(--color-error-subtle)] border border-[var(--color-error-border)] text-rose-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-3 w-3 rounded-full bg-[var(--color-error)] animate-pulse"></span>
              <h3 className="font-semibold text-sm text-[var(--foreground)]">API Connection Notice</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{error}</p>
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
            >
              Retry Connection
            </Button>
          </div>
        ) : (
          <>
            {profile && <SchoolProfileCard profile={profile} isLoading={isLoading} />}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--foreground)]">Registered Branches</span>
                <Link
                  href="/settings/branches"
                  className="text-xs font-medium text-[var(--focus-ring)] hover:underline"
                >
                  Manage & Add Campuses in Settings →
                </Link>
              </div>
              <BranchListTable branches={branches} isLoading={isLoading} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
