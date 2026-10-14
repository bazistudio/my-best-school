# Phase 04: Student Information System (SIS)

## 1. Domain Overview
The central repository for student profiles, demographic details, academic standing, and institutional history.

## 2. Key Responsibilities
- **Student Profile:** Complete personal record, photograph, gender, date of birth, blood group, address.
- **Academic Placement:** Admission number, current class, section, roll number, student status (Active, Inactive, Transferred, Graduated).
- **History & Records:** Previous school credentials, transfer certificate (TC) tracking, promotion history.
- **Emergency & Medical:** Allergies, emergency contacts, pickup authorization indicators.

## 3. Directory Layout
- Backend: `backend/src/modules/students/`
  - `students.routes.ts`
  - `students.controller.ts`
  - `students.service.ts`
  - `students.repository.ts`
  - `students.schema.ts`
  - `students.types.ts`
- Frontend: `apps/web/src/features/students/`
  - `components/StudentDirectory.tsx`
  - `components/StudentProfileCard.tsx`

## 4. Phase Verification Checklist
- [ ] Roll number unique per class/section/session.
- [ ] Status updates (e.g. transfer/withdrawal) audit logged and archived properly.
- [ ] Fast search by name, admission number, roll number, or father name.
