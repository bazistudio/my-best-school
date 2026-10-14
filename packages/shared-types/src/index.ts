/**
 * Universal School Platform - Shared Domain Contracts
 * Database-independent domain models and response envelopes.
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface SchoolBranding {
  name: string;
  shortName: string;
  tagline?: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

export interface BranchConfig {
  id: string;
  name: string;
  code: string;
  address?: string;
  isMain: boolean;
}

export interface AppConfig {
  school: SchoolBranding;
  branches: BranchConfig[];
  currency: string;
  locale: string;
  academicYear: string;
}

/* =========================================================================
 * Phase 01: Organization & Branch Management Contracts
 * ========================================================================= */

export interface OrganizationProfile {
  id: string;
  name: string;
  shortName: string;
  registrationNumber: string;
  taxIdentifier?: string;
  tagline?: string;
  logoUrl?: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  primaryAddress: string;
  currency: string;
  locale: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export type ShiftType = "MORNING" | "AFTERNOON" | "EVENING" | "FULL_DAY";

export interface BranchShift {
  id: string;
  name: string;
  type: ShiftType;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
}

export interface Branch {
  id: string;
  organizationId: string;
  code: string; // Unique, e.g., 'MAIN', 'NORTH'
  name: string;
  address: string;
  city: string;
  stateOrProvince?: string;
  postalCode?: string;
  phone: string;
  email: string;
  isMain: boolean;
  isActive: boolean;
  capacity?: number;
  shifts: BranchShift[];
  createdAt: string;
  updatedAt: string;
}

export interface Term {
  id: string;
  academicYearId: string;
  name: string;
  termCode: string; // e.g., 'TERM-1', 'SPRING'
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  isCurrent: boolean;
}

export interface AcademicYear {
  id: string;
  organizationId: string;
  name: string; // e.g., '2026-2027'
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  isCurrent: boolean;
  terms: Term[];
  createdAt: string;
  updatedAt: string;
}

/* Request and mutation DTOs */
export interface UpdateOrganizationProfileDto {
  name?: string;
  shortName?: string;
  registrationNumber?: string;
  taxIdentifier?: string;
  tagline?: string;
  logoUrl?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  primaryAddress?: string;
  currency?: string;
  locale?: string;
  timezone?: string;
}

export interface CreateBranchDto {
  code: string;
  name: string;
  address: string;
  city: string;
  stateOrProvince?: string;
  postalCode?: string;
  phone: string;
  email: string;
  isMain?: boolean;
  capacity?: number;
  shifts?: Array<{
    name: string;
    type: ShiftType;
    startTime: string;
    endTime: string;
  }>;
}

export interface UpdateBranchDto {
  name?: string;
  address?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  isMain?: boolean;
  isActive?: boolean;
  capacity?: number;
  shifts?: Array<{
    id?: string;
    name: string;
    type: ShiftType;
    startTime: string;
    endTime: string;
  }>;
}

export interface CreateAcademicYearDto {
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  terms?: Array<{
    name: string;
    termCode: string;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
  }>;
}
