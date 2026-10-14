"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  OrganizationProfile,
  Branch,
  AcademicYear,
  CreateBranchDto,
} from "@universal-school/shared-types";
import { organizationApi } from "@/features/organization/api";
import { SchoolProfileCard } from "@/features/organization/components/SchoolProfileCard";
import { BranchSelector } from "@/features/organization/components/BranchSelector";
import { BranchListTable } from "@/features/organization/components/BranchListTable";
import { AcademicYearBadge } from "@/features/organization/components/AcademicYearBadge";
import { Button, Input, Modal } from "@/components/ui";

export default function OrganizationPage() {
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [academicYear, setAcademicYear] = useState<AcademicYear | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form states for adding a secondary campus
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formCode, setFormCode] = useState<string>("");
  const [formName, setFormName] = useState<string>("");
  const [formCity, setFormCity] = useState<string>("");
  const [formAddress, setFormAddress] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formCapacity, setFormCapacity] = useState<string>("500");
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const payload: CreateBranchDto = {
      code: formCode.trim().toUpperCase(),
      name: formName.trim(),
      city: formCity.trim(),
      address: formAddress.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim(),
      capacity: Number(formCapacity) || undefined,
      isMain: false,
      shifts: [
        {
          name: "Morning Shift",
          type: "MORNING",
          startTime: "08:00",
          endTime: "14:00",
        },
      ],
    };

    startTransition(async () => {
      try {
        const created = await organizationApi.createBranch(payload);
        setBranches((prev) => [...prev, created]);
        setShowAddModal(false);
        // Reset form
        setFormCode("");
        setFormName("");
        setFormCity("");
        setFormAddress("");
        setFormPhone("");
        setFormEmail("");
      } catch (err: unknown) {
        const e = err as Error;
        setFormError(e.message || "Failed to create branch.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans p-6 sm:p-10">
      {/* Header Bar */}
      <header className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/"
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              ← Back to Portal Home
            </Link>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-xs text-[var(--focus-ring)] font-medium">Phase 01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-heading">
            Organization & Campus Management
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AcademicYearBadge academicYear={academicYear} isLoading={isLoading} />
          <BranchSelector
            branches={branches}
            selectedBranchId={selectedBranchId}
            onSelectBranch={setSelectedBranchId}
            isLoading={isLoading}
          />
          <Button
            onClick={() => setShowAddModal(true)}
            variant="primary"
            size="md"
          >
            + Add New Branch
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto flex-1 space-y-8">
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
            <BranchListTable branches={branches} isLoading={isLoading} />
          </>
        )}
      </main>

      {/* Add Branch Modal using shared Modal primitive */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Secondary Campus"
        description="Expand institution multi-campus topology"
      >
        {formError && (
          <div className="p-3 mb-4 rounded-[var(--radius-lg)] bg-[var(--color-error-subtle)] border border-[var(--color-error-border)] text-xs text-[var(--color-error)]">
            {formError}
          </div>
        )}

        <form onSubmit={handleCreateBranch} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Branch Code *"
              type="text"
              required
              placeholder="e.g. CITY, NORTH"
              value={formCode}
              onChange={(e) => setFormCode(e.target.value)}
              className="font-mono uppercase"
            />
            <Input
              label="Campus Name *"
              type="text"
              required
              placeholder="e.g. City Campus"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City *"
              type="text"
              required
              placeholder="e.g. Rawalpindi"
              value={formCity}
              onChange={(e) => setFormCity(e.target.value)}
            />
            <Input
              label="Capacity"
              type="number"
              placeholder="e.g. 500"
              value={formCapacity}
              onChange={(e) => setFormCapacity(e.target.value)}
            />
          </div>

          <Input
            label="Physical Address *"
            type="text"
            required
            placeholder="Street / Sector details"
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone *"
              type="text"
              required
              placeholder="+92 51 ..."
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
            />
            <Input
              label="Email *"
              type="email"
              required
              placeholder="branch@school.edu"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isPending}
            >
              Save Branch
            </Button>
          </div>
        </form>
      </Modal>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto border-t border-[var(--border-subtle)] pt-6 mt-12 text-xs text-[var(--text-muted)] flex justify-between">
        <span>School Universel · Phase 01 Baseline</span>
        <span>Standard Design System v1.0</span>
      </footer>
    </div>
  );
}
