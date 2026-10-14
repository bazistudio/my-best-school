# Phase 18: Events, Activities & Discipline

## 1. Domain Overview
Management of school functions, field trips, extracurricular clubs, student behavior incidents, and achievement awards.

## 2. Key Responsibilities
- **School Events & Trips:** Calendar events, field trips, permission slip tracking, participant limits.
- **Clubs & Extracurriculars:** Debating, sports teams, robotics clubs, member rosters, coach assignments.
- **Disciplinary Records:** Behavioral infraction logging, category, action taken (warning, detention, suspension).
- **Achievements & Merit:** Merit points, honor rolls, certificates of achievement, sports awards.

## 3. Directory Layout
- Backend: `backend/src/modules/activities/`
  - `activities.routes.ts`
  - `activities.controller.ts`
  - `activities.service.ts`
  - `activities.repository.ts`
  - `activities.schema.ts`
  - `activities.types.ts`
- Frontend: `apps/web/src/features/activities/`
  - `components/EventCalendar.tsx`
  - `components/DisciplineLogModal.tsx`

## 4. Phase Verification Checklist
- [ ] Parent permission slip status tracks correctly for field trip rosters.
- [ ] Disciplinary history linked to student profile with restricted visibility.
