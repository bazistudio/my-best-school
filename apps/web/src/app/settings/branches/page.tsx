"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Branch } from "@universal-school/shared-types";
import { organizationApi } from "@/features/organization/api";
import { BranchListTable } from "@/features/organization/components/BranchListTable";
import { CreateBranchModal } from "@/features/organization/components/CreateBranchModal";
import { Button, Badge } from "@/components/ui";

export default function SettingsBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const loadBranches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await organizationApi.getBranches();
      setBranches(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || "Failed to load branch configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleBranchCreated = (newBranch: Branch) => {
    setBranches((prev) => [...prev, newBranch]);
  };

  return (
    <div className="space-y-8">
      {/* Settings Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs text-[var(--text-muted)] font-medium">
          <span>Administration</span>
          <span>•</span>
          <span className="text-[var(--focus-ring)]">System Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-heading">
          Institutional Settings
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Configure multi-branch campus topology, operational profiles, and system parameters.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="border-b border-[var(--border-subtle)]">
        <nav className="flex space-x-6 text-xs font-medium" aria-label="Settings Tabs">
          <Link
            href="/settings/branches"
            className="pb-3 border-b-2 border-[var(--color-primary)] text-[var(--foreground)] font-semibold flex items-center gap-2"
          >
            <span>Branches & Campuses</span>
            <Badge variant="neutral" size="sm">
              {branches.length}
            </Badge>
          </Link>
          <span
            className="pb-3 border-b-2 border-transparent text-[var(--text-muted)] cursor-not-allowed flex items-center gap-1.5"
            title="General settings will be available in subsequent configuration phases"
          >
            <span>General Profile</span>
            <span className="text-[10px] text-[var(--text-disabled)] font-mono">[Phase 01 Org]</span>
          </span>
        </nav>
      </div>

      {/* Branches Tab Content */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground)] font-heading">
              Campuses & Branches
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Authorized institutional branches. Every state-changing and read operation is strictly scoped to branch boundaries.
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="md"
          >
            + Create Branch
          </Button>
        </div>

        {error ? (
          <div className="p-6 rounded-[var(--radius-2xl)] bg-[var(--color-error-subtle)] border border-[var(--color-error-border)] text-rose-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-3 w-3 rounded-full bg-[var(--color-error)] animate-pulse" />
              <h3 className="font-semibold text-sm text-[var(--foreground)]">Error Loading Branches</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{error}</p>
            <Button
              onClick={loadBranches}
              variant="outline"
              size="sm"
            >
              Retry Connection
            </Button>
          </div>
        ) : (
          <BranchListTable branches={branches} isLoading={isLoading} />
        )}
      </div>

      {/* Single Branch Creation Modal */}
      <CreateBranchModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onBranchCreated={handleBranchCreated}
      />
    </div>
  );
}
