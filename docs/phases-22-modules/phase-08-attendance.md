# Phase 08: Student Attendance

## 1. Domain Overview
Recording, managing, and reporting daily and period-wise student attendance.

## 2. Key Responsibilities
- **Attendance Modes:** Daily homeroom attendance or period-wise subject attendance.
- **Attendance States:** Present, Absent, Late, Excused, Half-Day, Sick Leave.
- **Locking & Corrections:** Teacher submission window, principal approval for past modifications.
- **Alerts & Reports:** Instant notification triggers for absent students, monthly attendance registers.

## 3. Directory Layout
- Backend: `backend/src/modules/attendance/`
  - `attendance.routes.ts`
  - `attendance.controller.ts`
  - `attendance.service.ts`
  - `attendance.repository.ts`
  - `attendance.schema.ts`
  - `attendance.types.ts`
- Frontend: `apps/web/src/features/attendance/`
  - `components/AttendanceSheet.tsx`
  - `components/MonthlyRegisterView.tsx`

## 4. Phase Verification Checklist
- [ ] Fast batch marking interface (mark all present, toggle absentees).
- [ ] Attendance percentage calculation accounts for holidays and excused leaves.
