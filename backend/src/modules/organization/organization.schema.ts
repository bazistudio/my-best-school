/**
 * Organization Schema & Validation
 * Re-exports shared validators to maintain single source of validation truth.
 */

export {
  validateOrganizationUpdate,
  validateBranchCreate,
  validateBranchUpdate,
  validateAcademicYear,
  type ValidationResult,
  type ValidationErrorDetail,
} from "@universal-school/validation";
