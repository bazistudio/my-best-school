# Phase 05: Guardian & Family Management

## 1. Domain Overview
Models household structures, parental guardianship, communications links, and billing responsibility.

## 2. Key Responsibilities
- **Parent/Guardian Records:** Father, mother, legal guardian contact information, CNIC/ID, occupation.
- **Multi-Child Linkage:** One family record linked to multiple siblings across different classes and branches.
- **Authorized Pickups & Restraints:** Designated pickup persons, emergency contacts, legal custody restrictions.
- **Billing Assignment:** Specifying who receives invoices and financial notices.

## 3. Directory Layout
- Backend: `backend/src/modules/guardians/`
  - `guardians.routes.ts`
  - `guardians.controller.ts`
  - `guardians.service.ts`
  - `guardians.repository.ts`
  - `guardians.schema.ts`
  - `guardians.types.ts`
- Frontend: `apps/web/src/features/guardians/`
  - `components/FamilyProfile.tsx`
  - `components/SiblingLinker.tsx`

## 4. Phase Verification Checklist
- [ ] Multiple siblings correctly tied to a shared guardian profile.
- [ ] Emergency contact and authorized pickup verification works reliably.
