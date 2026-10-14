# Phase 07: Timetable & Scheduling

## 1. Domain Overview
Management of school shifts, class periods, room allocation, teacher workload, and timetable generation.

## 2. Key Responsibilities
- **Period & Shift Configuration:** Morning/afternoon shifts, period start/end times, assembly, breaks.
- **Timetable Matrix:** Weekly grid per section, subject, and room.
- **Conflict Detection:** Automatic prevention of double-booking teachers or rooms.
- **Substitutions:** On-the-fly teacher substitution when staff are on leave.

## 3. Directory Layout
- Backend: `backend/src/modules/timetable/`
  - `timetable.routes.ts`
  - `timetable.controller.ts`
  - `timetable.service.ts`
  - `timetable.repository.ts`
  - `timetable.schema.ts`
  - `timetable.types.ts`
- Frontend: `apps/web/src/features/timetable/`
  - `components/TimetableGrid.tsx`
  - `components/SubstitutionManager.tsx`

## 4. Phase Verification Checklist
- [ ] Overlapping periods for the same teacher or room trigger instant validation errors.
- [ ] Weekly schedules can be printed or exported per class and per teacher.
