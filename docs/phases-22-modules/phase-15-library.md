# Phase 15: Library Management

## 1. Domain Overview
Management of the school library catalog, book issues/returns, student borrowing limits, and overdue fines.

## 2. Key Responsibilities
- **Book Catalog:** Titles, authors, publishers, ISBN, Dewey classification, shelf coordinates, available copies.
- **Circulation Desk:** Barcode/RFID book check-out and check-in for students and staff.
- **Fines & Limits:** Configurable max borrow counts (e.g. 2 books for 14 days), late fee calculation.
- **Loss & Damage:** Lost book fee assessment, replacement tracking.

## 3. Directory Layout
- Backend: `backend/src/modules/library/`
  - `library.routes.ts`
  - `library.controller.ts`
  - `library.service.ts`
  - `library.repository.ts`
  - `library.schema.ts`
  - `library.types.ts`
- Frontend: `apps/web/src/features/library/`
  - `components/CatalogSearch.tsx`
  - `components/CirculationDesk.tsx`

## 4. Phase Verification Checklist
- [ ] Borrow limits enforced preventing student from checking out more books than authorized.
- [ ] Overdue fine accurately calculated and optionally linked to fee invoice balance.
