# Phase 01: Organization & Branch Management

## 1. Domain Overview
The Foundation of the entire platform. Defines school institution details, multiple branches, physical locations, academic sessions, and operational calendars.

## 2. Key Responsibilities
- **School Profile:** Official name, legal registration, logo, address, contact information.
- **Multi-Branch Topology:** Main campus and secondary branches, branch codes, shifts, capacity.
- **Academic Calendar:** Active academic sessions, terms/semesters, holidays, working days.
- **Operational Settings:** Currency, timezones, localization, branch-specific policies.

## 3. Directory Layout
- Backend: `backend/src/modules/organization/`
  - `organization.routes.ts`
  - `organization.controller.ts`
  - `organization.service.ts`
  - `organization.repository.ts`
  - `organization.schema.ts`
  - `organization.types.ts`
- Frontend: `apps/web/src/features/organization/`
  - `components/BranchSelector.tsx`
  - `components/SchoolProfileCard.tsx`
  - `components/AcademicYearBadge.tsx`

## 4. Phase Verification Checklist
- [ ] School branding is loaded dynamically via configuration.
- [ ] Multiple branches can be defined with distinct branch codes.
- [ ] Active academic session switch does not break previous historical data.
- [ ] No hardcoded school or branch names exist in the service logic.
