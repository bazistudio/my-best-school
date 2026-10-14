# Universal Backend Structure & Guidelines

Dedicated Node.js + TypeScript backend for Universal School Platform.

## Module Boundaries
The backend is organized into domain-driven modules:
- `organization/`: School identity, branch configurations, academic calendar boundaries.
- `identity/`: Users, staff roles, permissions, and branch access control.
- `students/`: Student profiles, registration, and records.
- `admissions/`: Applicant management and admission processing.
- `guardians/`: Parent and guardian relationships.
- `staff/`: Teachers, administrators, and staff profiles.
- `academics/`: Classes, sections, subjects, timetables, and sessions.
- `attendance/`: Student and staff daily and period attendance tracking.
- `fees/`: Fee structures, schedules, billing, and discounts.
- `finance/`: Invoicing, payments, receipts, and accounting ledgers.
- `examinations/`: Assessments, grading scales, marks, and report cards.
- `communications/`: Notifications, SMS/email alerts, and announcements.
- `documents/`: File attachments and document metadata.
- `audit/`: Comprehensive audit trails, change tracking, and operational logging.

## Architectural Rules
1. **No Hardcoded School Identities**: School-specific names, branches, and currency are loaded through configuration or database records.
2. **Phase 1 Baseline**: Database migrations, live endpoints, and authentication are deferred until explicitly authorized.
