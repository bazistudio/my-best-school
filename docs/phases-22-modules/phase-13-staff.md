# Phase 13: Staff, HR & Payroll

## 1. Domain Overview
Staff directory, employment contracts, attendance tracking, leave requests, and payroll generation.

## 2. Key Responsibilities
- **Staff Profiles:** Teachers, administrative staff, support personnel, qualifications, designations.
- **Employment Contracts:** Salary terms, probation, allowances, deductions, bank account details.
- **Staff Attendance & Leaves:** Check-in/out, leave allowances (annual, casual, sick), approvals.
- **Payroll Runs:** Monthly salary generation, allowances, tax/deductions, payslip generation, payout registers.

## 3. Directory Layout
- Backend: `backend/src/modules/staff/`
  - `staff.routes.ts`
  - `staff.controller.ts`
  - `staff.service.ts`
  - `staff.repository.ts`
  - `staff.schema.ts`
  - `staff.types.ts`
- Frontend: `apps/web/src/features/staff/`
  - `components/StaffDirectory.tsx`
  - `components/PayrollGenerator.tsx`

## 4. Phase Verification Checklist
- [ ] Automatic deduction calculation based on unpaid leaves during payroll processing.
- [ ] Printable, password-protected payslips generated with breakdown details.
