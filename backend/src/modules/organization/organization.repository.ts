/**
 * Organization Repository Contract & In-Memory Implementation
 * 
 * NOTE: In Phase 01 baseline, data is maintained strictly in-process memory.
 * No database engine or migration is used. State resets upon server restart.
 * Objects are deep-cloned to prevent accidental external mutation.
 */

import {
  OrganizationProfile,
  Branch,
  AcademicYear,
} from "@universal-school/shared-types";
import { BranchFilter } from "./organization.types.js";

export interface IOrganizationRepository {
  getProfile(): Promise<OrganizationProfile>;
  updateProfile(data: Partial<OrganizationProfile>): Promise<OrganizationProfile>;
  
  // Branch operations
  getBranches(filter?: BranchFilter): Promise<Branch[]>;
  getBranchById(id: string): Promise<Branch | null>;
  getBranchByCode(code: string): Promise<Branch | null>;
  getMainBranch(): Promise<Branch | null>;
  createBranch(branch: Branch): Promise<Branch>;
  updateBranch(id: string, data: Partial<Branch>): Promise<Branch | null>;
  
  // Academic Year operations
  getAcademicYears(): Promise<AcademicYear[]>;
  getAcademicYearById(id: string): Promise<AcademicYear | null>;
  getActiveAcademicYear(): Promise<AcademicYear | null>;
  createAcademicYear(academicYear: AcademicYear): Promise<AcademicYear>;
  setActiveAcademicYear(id: string): Promise<AcademicYear | null>;
}

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  private profile: OrganizationProfile;
  private branches: Map<string, Branch> = new Map();
  private academicYears: Map<string, AcademicYear> = new Map();

  constructor() {
    const now = new Date().toISOString();

    // Default neutral institution profile
    this.profile = {
      id: "org-default-01",
      name: "Universal School",
      shortName: "USP",
      registrationNumber: "REG-2026-001",
      tagline: "Excellence in Education",
      contactEmail: "admin@universalschool.org",
      contactPhone: "+92 51 111 222 333",
      primaryAddress: "Plot 12, Education City, Sector H-8",
      currency: "PKR",
      locale: "en-PK",
      timezone: "Asia/Karachi",
      createdAt: now,
      updatedAt: now,
    };

    // Baseline Main Campus
    const mainBranch: Branch = {
      id: "branch-main-01",
      organizationId: this.profile.id,
      code: "MAIN",
      name: "Main Campus",
      address: "Plot 12, Education City, Sector H-8",
      city: "Islamabad",
      phone: "+92 51 111 222 333",
      email: "main@universalschool.org",
      isMain: true,
      isActive: true,
      capacity: 1200,
      shifts: [
        {
          id: "shift-01",
          name: "Morning Shift",
          type: "MORNING",
          startTime: "08:00",
          endTime: "14:00",
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    this.branches.set(mainBranch.id, mainBranch);

    // Initial Academic Year (2026-2027)
    const initialSession: AcademicYear = {
      id: "ay-2026-2027",
      organizationId: this.profile.id,
      name: "2026-2027",
      startDate: "2026-08-01",
      endDate: "2027-05-31",
      isCurrent: true,
      terms: [
        {
          id: "term-1",
          academicYearId: "ay-2026-2027",
          name: "First Term",
          termCode: "TERM-1",
          startDate: "2026-08-01",
          endDate: "2026-12-20",
          isCurrent: true,
        },
        {
          id: "term-2",
          academicYearId: "ay-2026-2027",
          name: "Final Term",
          termCode: "TERM-2",
          startDate: "2027-01-05",
          endDate: "2027-05-31",
          isCurrent: false,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    this.academicYears.set(initialSession.id, initialSession);
  }

  private clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  async getProfile(): Promise<OrganizationProfile> {
    return this.clone(this.profile);
  }

  async updateProfile(data: Partial<OrganizationProfile>): Promise<OrganizationProfile> {
    this.profile = {
      ...this.profile,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.clone(this.profile);
  }

  async getBranches(filter?: BranchFilter): Promise<Branch[]> {
    let list = Array.from(this.branches.values());

    if (filter) {
      if (filter.isActive !== undefined) {
        list = list.filter((b) => b.isActive === filter.isActive);
      }
      if (filter.isMain !== undefined) {
        list = list.filter((b) => b.isMain === filter.isMain);
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.code.toLowerCase().includes(q) ||
            b.city.toLowerCase().includes(q)
        );
      }
    }

    return this.clone(list);
  }

  async getBranchById(id: string): Promise<Branch | null> {
    const branch = this.branches.get(id);
    return branch ? this.clone(branch) : null;
  }

  async getBranchByCode(code: string): Promise<Branch | null> {
    const normalized = code.toUpperCase().trim();
    for (const b of this.branches.values()) {
      if (b.code.toUpperCase() === normalized) {
        return this.clone(b);
      }
    }
    return null;
  }

  async getMainBranch(): Promise<Branch | null> {
    for (const b of this.branches.values()) {
      if (b.isMain && b.isActive) {
        return this.clone(b);
      }
    }
    return null;
  }

  async createBranch(branch: Branch): Promise<Branch> {
    this.branches.set(branch.id, this.clone(branch));
    return this.clone(branch);
  }

  async updateBranch(id: string, data: Partial<Branch>): Promise<Branch | null> {
    const existing = this.branches.get(id);
    if (!existing) return null;

    const updated: Branch = {
      ...existing,
      ...data,
      id: existing.id, // Immutable ID
      organizationId: existing.organizationId,
      updatedAt: new Date().toISOString(),
    };

    this.branches.set(id, updated);
    return this.clone(updated);
  }

  async getAcademicYears(): Promise<AcademicYear[]> {
    return this.clone(Array.from(this.academicYears.values()));
  }

  async getAcademicYearById(id: string): Promise<AcademicYear | null> {
    const year = this.academicYears.get(id);
    return year ? this.clone(year) : null;
  }

  async getActiveAcademicYear(): Promise<AcademicYear | null> {
    for (const ay of this.academicYears.values()) {
      if (ay.isCurrent) return this.clone(ay);
    }
    return null;
  }

  async createAcademicYear(academicYear: AcademicYear): Promise<AcademicYear> {
    this.academicYears.set(academicYear.id, this.clone(academicYear));
    return this.clone(academicYear);
  }

  async setActiveAcademicYear(id: string): Promise<AcademicYear | null> {
    const target = this.academicYears.get(id);
    if (!target) return null;

    // Reset all others to not current
    for (const [key, val] of this.academicYears.entries()) {
      this.academicYears.set(key, { ...val, isCurrent: false });
    }

    const updated: AcademicYear = {
      ...target,
      isCurrent: true,
      updatedAt: new Date().toISOString(),
    };
    this.academicYears.set(id, updated);
    return this.clone(updated);
  }
}
