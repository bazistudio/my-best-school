/**
 * Universal School Platform - Validation utilities
 * Reusable validation functions without external dependencies for the baseline.
 */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidBranchCode(code: string): boolean {
  return /^[A-Z0-9_-]{2,10}$/i.test(code);
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^\+?[0-9\s-]{7,15}$/.test(phone);
}
