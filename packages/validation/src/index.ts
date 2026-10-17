/**
 * Universal School Platform - Validation utilities
 * Reusable validation functions without external dependencies for the baseline.
 */

import {
  CreateBranchDto,
  UpdateBranchDto,
  CreateAcademicYearDto,
  UpdateOrganizationProfileDto,
} from "@universal-school/shared-types";

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrorDetail[];
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidBranchCode(code: string): boolean {
  return /^[A-Z0-9_-]{2,15}$/i.test(code);
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^\+?[0-9\s-]{7,20}$/.test(phone);
}

export function isValidIsoDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

export function isValidTimeFormat(timeStr: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr);
}

/**
 * Validate Organization Profile Update
 */
export function validateOrganizationUpdate(
  input: UpdateOrganizationProfileDto
): ValidationResult {
  const errors: ValidationErrorDetail[] = [];

  if (input.name !== undefined && input.name.trim().length < 2) {
    errors.push({ field: "name", message: "Organization name must be at least 2 characters." });
  }

  if (input.shortName !== undefined && (input.shortName.trim().length < 2 || input.shortName.trim().length > 10)) {
    errors.push({ field: "shortName", message: "Short name must be between 2 and 10 characters." });
  }

  if (input.contactEmail !== undefined && !isValidEmail(input.contactEmail)) {
    errors.push({ field: "contactEmail", message: "Invalid contact email address format." });
  }

  if (input.contactPhone !== undefined && !isValidPhoneNumber(input.contactPhone)) {
    errors.push({ field: "contactPhone", message: "Invalid contact phone number format." });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate Branch Creation
 */
export function validateBranchCreate(input: CreateBranchDto): ValidationResult {
  const errors: ValidationErrorDetail[] = [];

  if (!input.name || input.name.trim().length < 2) {
    errors.push({ field: "name", message: "Branch name is required and must be at least 2 characters." });
  }

  if (!input.code || !isValidBranchCode(input.code)) {
    errors.push({
      field: "code",
      message: "Branch code is required, alphanumeric, and between 2 and 15 characters.",
    });
  }

  if (!input.address || input.address.trim().length < 3) {
    errors.push({ field: "address", message: "Physical address is required." });
  }

  if (!input.city || input.city.trim().length < 2) {
    errors.push({ field: "city", message: "City is required." });
  }

  if (input.email && !isValidEmail(input.email)) {
    errors.push({ field: "email", message: "Invalid branch email format." });
  }

  if (input.phone && !isValidPhoneNumber(input.phone)) {
    errors.push({ field: "phone", message: "Invalid branch phone number format." });
  }

  if (input.capacity !== undefined && (typeof input.capacity !== "number" || input.capacity < 1)) {
    errors.push({ field: "capacity", message: "Capacity must be a positive integer." });
  }

  if (input.shifts) {
    input.shifts.forEach((shift, index) => {
      if (!shift.name) {
        errors.push({ field: `shifts[${index}].name`, message: "Shift name is required." });
      }
      if (!isValidTimeFormat(shift.startTime) || !isValidTimeFormat(shift.endTime)) {
        errors.push({ field: `shifts[${index}].time`, message: "Shift times must be in HH:mm format." });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate Branch Update
 */
export function validateBranchUpdate(input: UpdateBranchDto): ValidationResult {
  const errors: ValidationErrorDetail[] = [];

  if (input.name !== undefined && input.name.trim().length < 2) {
    errors.push({ field: "name", message: "Branch name must be at least 2 characters." });
  }

  if (input.email !== undefined && !isValidEmail(input.email)) {
    errors.push({ field: "email", message: "Invalid branch email format." });
  }

  if (input.phone !== undefined && !isValidPhoneNumber(input.phone)) {
    errors.push({ field: "phone", message: "Invalid branch phone number format." });
  }

  if (input.capacity !== undefined && (typeof input.capacity !== "number" || input.capacity < 1)) {
    errors.push({ field: "capacity", message: "Capacity must be a positive integer." });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate Academic Year and Terms
 */
export function validateAcademicYear(input: CreateAcademicYearDto): ValidationResult {
  const errors: ValidationErrorDetail[] = [];

  if (!input.name || input.name.trim().length < 4) {
    errors.push({ field: "name", message: "Academic year name (e.g. '2026-2027') is required." });
  }

  if (!isValidIsoDate(input.startDate)) {
    errors.push({ field: "startDate", message: "Start date must be in YYYY-MM-DD format." });
  }

  if (!isValidIsoDate(input.endDate)) {
    errors.push({ field: "endDate", message: "End date must be in YYYY-MM-DD format." });
  }

  if (isValidIsoDate(input.startDate) && isValidIsoDate(input.endDate)) {
    if (new Date(input.startDate) >= new Date(input.endDate)) {
      errors.push({ field: "endDate", message: "End date must be chronologically after start date." });
    }
  }

  if (input.terms && input.terms.length > 0) {
    const parentValid = isValidIsoDate(input.startDate) && isValidIsoDate(input.endDate);

    input.terms.forEach((term, index) => {
      if (!term.name || term.name.trim().length < 2) {
        errors.push({ field: `terms[${index}].name`, message: "Term name is required." });
      }
      if (!term.termCode || term.termCode.trim().length < 2) {
        errors.push({ field: `terms[${index}].termCode`, message: "Term code is required." });
      }
      if (!isValidIsoDate(term.startDate) || !isValidIsoDate(term.endDate)) {
        errors.push({ field: `terms[${index}].date`, message: "Term dates must be in YYYY-MM-DD format." });
      } else {
        if (new Date(term.startDate) >= new Date(term.endDate)) {
          errors.push({ field: `terms[${index}].endDate`, message: "Term end date must be after term start date." });
        }

        if (parentValid) {
          if (new Date(term.startDate) < new Date(input.startDate)) {
            errors.push({
              field: `terms[${index}].startDate`,
              message: "Term start date cannot precede the parent academic year start date.",
            });
          }
          if (new Date(term.endDate) > new Date(input.endDate)) {
            errors.push({
              field: `terms[${index}].endDate`,
              message: "Term end date cannot exceed the parent academic year end date.",
            });
          }
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
