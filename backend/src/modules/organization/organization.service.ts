/**
 * Organization Service
 * Enforces business rules:
 * - Exactly one active Main Branch at all times
 * - Unique, normalized branch codes
 * - Guarded academic year and term transitions
 */

import {
  OrganizationProfile,
  Branch,
  AcademicYear,
  CreateBranchDto,
  UpdateBranchDto,
  CreateAcademicYearDto,
  UpdateOrganizationProfileDto,
} from "@universal-school/shared-types";
import {
  IOrganizationRepository,
} from "./organization.repository.js";
import {
  validateOrganizationUpdate,
  validateBranchCreate,
  validateBranchUpdate,
  validateAcademicYear,
} from "./organization.schema.js";

export class OrganizationService {
  constructor(private readonly repository: IOrganizationRepository) {}

  async getProfile(): Promise<OrganizationProfile> {
    return this.repository.getProfile();
  }

  async updateProfile(dto: UpdateOrganizationProfileDto): Promise<OrganizationProfile> {
    const validation = validateOrganizationUpdate(dto);
    if (!validation.isValid) {
      throw {
        status: 400,
        code: "VALIDATION_FAILED",
        message: "Invalid organization profile update data.",
        details: validation.errors,
      };
    }

    return this.repository.updateProfile(dto);
  }

  async getBranches(filter?: { isActive?: boolean; isMain?: boolean; search?: string }): Promise<Branch[]> {
    return this.repository.getBranches(filter);
  }

  async getBranchById(id: string): Promise<Branch> {
    const branch = await this.repository.getBranchById(id);
    if (!branch) {
      throw {
        status: 404,
        code: "BRANCH_NOT_FOUND",
        message: `Branch with ID '${id}' was not found.`,
      };
    }
    return branch;
  }

  async createBranch(dto: CreateBranchDto): Promise<Branch> {
    const validation = validateBranchCreate(dto);
    if (!validation.isValid) {
      throw {
        status: 400,
        code: "VALIDATION_FAILED",
        message: "Invalid branch creation data.",
        details: validation.errors,
      };
    }

    const normalizedCode = dto.code.trim().toUpperCase();

    // Check code uniqueness
    const existing = await this.repository.getBranchByCode(normalizedCode);
    if (existing) {
      throw {
        status: 409,
        code: "BRANCH_CODE_CONFLICT",
        message: `A branch with code '${normalizedCode}' already exists.`,
      };
    }

    const org = await this.repository.getProfile();
    const currentMain = await this.repository.getMainBranch();

    // If marked as main, check if another main branch already exists
    if (dto.isMain && currentMain) {
      throw {
        status: 400,
        code: "MAIN_BRANCH_CONFLICT",
        message: `Cannot create another main branch. '${currentMain.name}' [${currentMain.code}] is already designated as the Main Campus.`,
      };
    }

    const now = new Date().toISOString();
    const newBranch: Branch = {
      id: `branch-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      organizationId: org.id,
      code: normalizedCode,
      name: dto.name.trim(),
      address: dto.address.trim(),
      city: dto.city.trim(),
      stateOrProvince: dto.stateOrProvince?.trim(),
      postalCode: dto.postalCode?.trim(),
      phone: dto.phone.trim(),
      email: dto.email.trim(),
      isMain: dto.isMain ?? (!currentMain), // auto-set main if no main branch exists
      isActive: true,
      capacity: dto.capacity,
      shifts: dto.shifts?.map((s, idx) => ({
        id: `shift-${idx + 1}`,
        name: s.name,
        type: s.type,
        startTime: s.startTime,
        endTime: s.endTime,
      })) || [],
      createdAt: now,
      updatedAt: now,
    };

    return this.repository.createBranch(newBranch);
  }

  async updateBranch(id: string, dto: UpdateBranchDto): Promise<Branch> {
    const validation = validateBranchUpdate(dto);
    if (!validation.isValid) {
      throw {
        status: 400,
        code: "VALIDATION_FAILED",
        message: "Invalid branch update data.",
        details: validation.errors,
      };
    }

    const existing = await this.repository.getBranchById(id);
    if (!existing) {
      throw {
        status: 404,
        code: "BRANCH_NOT_FOUND",
        message: `Branch with ID '${id}' was not found.`,
      };
    }

    // Invariant: Cannot deactivate the Main Campus
    if (existing.isMain && dto.isActive === false) {
      throw {
        status: 400,
        code: "INVARIANT_VIOLATION",
        message: "Cannot deactivate the Main Campus. Another branch must be promoted to Main Campus first.",
      };
    }

    // Invariant: Cannot demote the Main Campus directly to false without designating a new one
    if (existing.isMain && dto.isMain === false) {
      throw {
        status: 400,
        code: "INVARIANT_VIOLATION",
        message: "Cannot demote the Main Campus. Designate another branch as Main instead.",
      };
    }

    // If promoting a secondary branch to Main, ensure old main is reassigned
    if (dto.isMain === true && !existing.isMain) {
      const currentMain = await this.repository.getMainBranch();
      if (currentMain && currentMain.id !== id) {
        await this.repository.updateBranch(currentMain.id, { isMain: false });
      }
    }

    const updated = await this.repository.updateBranch(id, {
      ...dto,
      name: dto.name ? dto.name.trim() : existing.name,
      address: dto.address ? dto.address.trim() : existing.address,
      city: dto.city ? dto.city.trim() : existing.city,
      shifts: dto.shifts
        ? dto.shifts.map((s, idx) => ({
            id: s.id || `shift-${idx + 1}`,
            name: s.name,
            type: s.type,
            startTime: s.startTime,
            endTime: s.endTime,
          }))
        : existing.shifts,
    });

    return updated!;
  }

  async getAcademicYears(): Promise<AcademicYear[]> {
    return this.repository.getAcademicYears();
  }

  async getActiveAcademicYear(): Promise<AcademicYear> {
    const active = await this.repository.getActiveAcademicYear();
    if (!active) {
      throw {
        status: 404,
        code: "NO_ACTIVE_ACADEMIC_YEAR",
        message: "No active academic year is currently set.",
      };
    }
    return active;
  }

  async createAcademicYear(dto: CreateAcademicYearDto): Promise<AcademicYear> {
    const validation = validateAcademicYear(dto);
    if (!validation.isValid) {
      throw {
        status: 400,
        code: "VALIDATION_FAILED",
        message: "Invalid academic year configuration.",
        details: validation.errors,
      };
    }

    const org = await this.repository.getProfile();
    const existingYears = await this.repository.getAcademicYears();

    // Check duplicate name
    if (existingYears.some((ay) => ay.name.trim().toLowerCase() === dto.name.trim().toLowerCase())) {
      throw {
        status: 409,
        code: "ACADEMIC_YEAR_CONFLICT",
        message: `An academic year with name '${dto.name}' already exists.`,
      };
    }

    const id = `ay-${Date.now()}`;
    const now = new Date().toISOString();

    const academicYear: AcademicYear = {
      id,
      organizationId: org.id,
      name: dto.name.trim(),
      startDate: dto.startDate,
      endDate: dto.endDate,
      isCurrent: dto.isCurrent ?? (existingYears.length === 0),
      terms: dto.terms?.map((t, idx) => ({
        id: `term-${idx + 1}`,
        academicYearId: id,
        name: t.name.trim(),
        termCode: t.termCode.trim().toUpperCase(),
        startDate: t.startDate,
        endDate: t.endDate,
        isCurrent: t.isCurrent ?? (idx === 0),
      })) || [],
      createdAt: now,
      updatedAt: now,
    };

    if (academicYear.isCurrent) {
      // Mark others as not current
      for (const y of existingYears) {
        if (y.isCurrent) {
          await this.repository.createAcademicYear({ ...y, isCurrent: false });
        }
      }
    }

    return this.repository.createAcademicYear(academicYear);
  }

  async setActiveAcademicYear(id: string): Promise<AcademicYear> {
    const target = await this.repository.getAcademicYearById(id);
    if (!target) {
      throw {
        status: 404,
        code: "ACADEMIC_YEAR_NOT_FOUND",
        message: `Academic year '${id}' was not found.`,
      };
    }

    const updated = await this.repository.setActiveAcademicYear(id);
    return updated!;
  }
}
