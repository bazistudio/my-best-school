# Phase 17: Health, Safety & Student Welfare

## 1. Domain Overview
Confidential medical history, clinic/first-aid logs, dietary requirements, and child safeguarding records.

## 2. Key Responsibilities
- **Student Medical Profiles:** Allergies, chronic conditions (asthma, diabetes), emergency medication protocols.
- **Clinic Visits:** Date, time, complaints, administered first-aid, attending nurse notes, parent notification flags.
- **Incident & Injury Logging:** Formal incident reports, injury logs, witness statements, administrative sign-off.
- **Safeguarding (Confidential):** Restricted-access child protection notes accessible strictly by designated officers.

## 3. Directory Layout
- Backend: `backend/src/modules/health/`
  - `health.routes.ts`
  - `health.controller.ts`
  - `health.service.ts`
  - `health.repository.ts`
  - `health.schema.ts`
  - `health.types.ts`
- Frontend: `apps/web/src/features/health/`
  - `components/MedicalAlertBanner.tsx`
  - `components/ClinicVisitLog.tsx`

## 4. Phase Verification Checklist
- [ ] Strict role-based isolation: standard teachers cannot view confidential safeguarding records.
- [ ] Emergency medical alert badges appear prominently on student cards for critical allergies.
