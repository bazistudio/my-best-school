# Phase 12: Accounting & Finance

## 1. Domain Overview
General ledger, cash/bank accounts, expense vouchers, vendor payments, and financial reporting.

## 2. Key Responsibilities
- **Chart of Accounts:** Assets, liabilities, equity, revenue, operational expenses.
- **Vouchers:** Cash payment, bank payment, receipt, journal vouchers with maker-checker approval.
- **Account Reconciliation:** Bank account statement reconciliation, petty cash tracking.
- **Financial Statements:** Daily collection report, income vs expense, trial balance, balance sheet.
- **Period Closing:** Month-end and year-end book closing preventing retroactive edits.

## 3. Directory Layout
- Backend: `backend/src/modules/finance/`
  - `finance.routes.ts`
  - `finance.controller.ts`
  - `finance.service.ts`
  - `finance.repository.ts`
  - `finance.schema.ts`
  - `finance.types.ts`
- Frontend: `apps/web/src/features/finance/`
  - `components/VoucherEntryForm.tsx`
  - `components/TrialBalanceView.tsx`

## 4. Phase Verification Checklist
- [ ] Debits strictly equal credits across every journal entry.
- [ ] Period-end closure locks transactions against unauthorized retroactive modifications.
