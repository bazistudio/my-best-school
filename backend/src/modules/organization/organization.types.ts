/**
 * Organization Domain Types
 * Specific query filters and internal domain parameters.
 */

import {
  OrganizationProfile,
  Branch,
  AcademicYear,
  Term,
} from "@universal-school/shared-types";

export interface BranchFilter {
  isActive?: boolean;
  isMain?: boolean;
  search?: string;
}

export interface OrganizationContext {
  organization: OrganizationProfile;
  branches: Branch[];
  activeAcademicYear?: AcademicYear;
}

export interface DomainError {
  code: "NOT_FOUND" | "CONFLICT" | "VALIDATION_FAILED" | "INVARIANT_VIOLATION";
  message: string;
  details?: unknown;
}
