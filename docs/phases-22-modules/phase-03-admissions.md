# Phase 03: Admissions & Enrollment

## 1. Domain Overview
Handles the intake of new students, tracking their journey from prospective enquiry to approved, registered student.

## 2. Key Responsibilities
- **Enquiry & Application:** Registration of applicant details, target class, and contact info.
- **Assessment & Interviews:** Entrance test scores, interview remarks, and status tracking.
- **Document Verification:** Uploaded birth certificate, previous report cards, CNIC/B-Form verification.
- **Admission Finalization:** Class assignment, auto-generation of unique Admission Number.
- **Waitlists & Fees:** Application fee collection, waitlist management, batch admissions.

## 3. Directory Layout
- Backend: `backend/src/modules/admissions/`
  - `admissions.routes.ts`
  - `admissions.controller.ts`
  - `admissions.service.ts`
  - `admissions.repository.ts`
  - `admissions.schema.ts`
  - `admissions.types.ts`
- Frontend: `apps/web/src/features/admissions/`
  - `components/AdmissionForm.tsx`
  - `components/ApplicantPipeline.tsx`

## 4. Phase Verification Checklist
- [ ] Application pipeline moves through Draft -> Submitted -> Interview -> Accepted -> Enrolled.
- [ ] Admission number uniqueness enforced across organization/branches.
- [ ] Enrolled applicant seamlessly translates into an active SIS student profile.
