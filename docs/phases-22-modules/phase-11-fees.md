# Phase 11: Fee Management

## 1. Domain Overview
Billing engine for tuition, admissions, transport, exams, discounts, invoices, receipts, and dues.

## 2. Key Responsibilities
- **Fee Structures:** Tuition fees by grade/branch, admission fees, lab charges, annual charges.
- **Concessions & Scholarships:** Sibling discount policies, need-based scholarships, staff child discounts.
- **Invoice Generation:** Monthly/quarterly automated billing runs with due dates and late payment fines.
- **Collections & Receipts:** Cash/bank payment recording, partial payments, automated receipt numbering, balance carry-forward.
- **Defaulters & Statements:** Defaulter lists, fee reminder notices, family balance statements.

## 3. Directory Layout
- Backend: `backend/src/modules/fees/`
  - `fees.routes.ts`
  - `fees.controller.ts`
  - `fees.service.ts`
  - `fees.repository.ts`
  - `fees.schema.ts`
  - `fees.types.ts`
- Frontend: `apps/web/src/features/fees/`
  - `components/FeeInvoiceView.tsx`
  - `components/FeeCollectionDialog.tsx`
  - `components/FeeDefaultersTable.tsx`

## 4. Phase Verification Checklist
- [ ] Financial transactions immutable: changes handled via adjustments/credit notes.
- [ ] Partial payments update outstanding balance without corrupting ledger history.
- [ ] Multi-branch fee structures isolate correctly per branch configuration.
