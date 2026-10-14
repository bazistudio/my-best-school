# Universal School Platform - Master Architecture & 22-Module Catalogue

> **Baseline Status:** Version 0.1.0 (Architecture Baseline)  
> **Development Model:** Phased, isolated modular implementation (One-by-one verification: build, fix, apply, test, advance).

---

## 1. System Overview & Technology Stack

```
[ Client Applications ]
  ├── Web Application (Next.js 16 + React 19 + TypeScript + App Router)
  ├── Desktop Application (Tauri 2 - Windows Offline/Local First)
  └── Mobile Applications (Teacher, Student, Parent Portals)
           │
           ▼
[ API Gateway Boundary (Express + TypeScript) ]
  ├── REST API (/api/v1)
  ├── Authentication & Granular Permissions
  ├── Input Validation (Shared Schemas)
  ├── Rate Limiting & Audit Logging
  └── Standardized Error Handling
           │
           ▼
[ 22 Modular Domain Services ]
  (Independent business logic, controllers, services, repositories)
           │
      ┌────┴────────────────────────┐
      ▼                             ▼
[ PostgreSQL ]                 [ Firestore ]
(Primary Source of Truth:       (Selected Realtime Features:
 Students, Attendance, Fees,     Notifications, Realtime Delivery,
 Academics, Finance, HR)         Document State)
```

---

## 2. Core Architectural Principles

1. **Strict Modular Boundaries:** Each module owns its schema, business validation, service logic, data access, and API routes. No giant monolithic file or tangled dependencies.
2. **Universal Baseline Identity:** Zero hardcoded school branding in business logic. All names, currencies, formats, and branch structures are provided via configuration overlays ([packages/config](file:///e:/my-best-school/packages/config)).
3. **Dual Baseline Target (Online & Offline):**
   - **Baseline:** Framework-agnostic contracts and clear separation between storage and logic.
   - **Offline Clone:** SQLite / local storage + local Express/Tauri bridge.
   - **Online Clone:** PostgreSQL + Firebase/Firestore realtime syncing.
4. **Phased Development:** No database migrations or live API endpoints are added prematurely. We develop, test, and sign off on each phase sequentially.

---

## 3. The 22 Modules Breakdown

| Category | # | Module Name | Scope & Purpose |
|---|---|---|---|
| **A. Foundation & Administration** | 01 | [Organization & Branches](file:///e:/my-best-school/docs/phases-22-modules/phase-01-organization.md) | School profile, branch codes, shifts, academic years, calendars. |
| | 02 | [Identity & Permissions](file:///e:/my-best-school/docs/phases-22-modules/phase-02-identity.md) | Staff accounts, RBAC, branch isolation, secure sessions, audit. |
| | 03 | [Admissions & Enrollment](file:///e:/my-best-school/docs/phases-22-modules/phase-03-admissions.md) | Enquiries, applications, tests, interviews, document verification, placement. |
| | 04 | [Student Information (SIS)](file:///e:/my-best-school/docs/phases-22-modules/phase-04-students.md) | Profiles, photos, roll numbers, history, contacts, medical flags. |
| | 05 | [Guardian & Family](file:///e:/my-best-school/docs/phases-22-modules/phase-05-guardians.md) | Family accounts, parent contacts, pickup authorizations, billing contacts. |
| **B. Academics & Teaching** | 06 | [Academics & Curriculum](file:///e:/my-best-school/docs/phases-22-modules/phase-06-academics.md) | Grades, sections, subjects, syllabus, promotion rules. |
| | 07 | [Timetable & Scheduling](file:///e:/my-best-school/docs/phases-22-modules/phase-07-timetable.md) | Periods, shifts, room allocation, teacher workload, substitution. |
| | 08 | [Student Attendance](file:///e:/my-best-school/docs/phases-22-modules/phase-08-attendance.md) | Daily/period attendance, leave approval, absence SMS, registers. |
| | 09 | [Examinations & Results](file:///e:/my-best-school/docs/phases-22-modules/phase-09-examinations.md) | Exam sessions, grading scales, marks moderation, report cards. |
| | 10 | [Homework & Learning](file:///e:/my-best-school/docs/phases-22-modules/phase-10-homework.md) | Homework assignments, submissions, study material, feedback. |
| **C. Fees & Finance** | 11 | [Fee Management](file:///e:/my-best-school/docs/phases-22-modules/phase-11-fees.md) | Structures, tuition, invoices, sibling discounts, receipts, defaulters. |
| | 12 | [Accounting & Finance](file:///e:/my-best-school/docs/phases-22-modules/phase-12-finance.md) | Income/expense vouchers, bank accounts, general ledger, audits. |
| | 13 | [Staff, HR & Payroll](file:///e:/my-best-school/docs/phases-22-modules/phase-13-staff.md) | Contracts, qualifications, staff attendance, salaries, payslips. |
| | 14 | [Inventory & Purchasing](file:///e:/my-best-school/docs/phases-22-modules/phase-14-inventory.md) | Stationery, uniforms, books, stock levels, vendor orders. |
| **D. Welfare & Operations** | 15 | [Library Management](file:///e:/my-best-school/docs/phases-22-modules/phase-15-library.md) | Catalog, barcodes, lending, returns, overdue fines. |
| | 16 | [Transport Management](file:///e:/my-best-school/docs/phases-22-modules/phase-16-transport.md) | Routes, stops, vehicle tracking, driver profiles, transport fees. |
| | 17 | [Health & Student Welfare](file:///e:/my-best-school/docs/phases-22-modules/phase-17-health.md) | First-aid logs, medical records, safeguarding incidents, consent. |
| | 18 | [Events & Discipline](file:///e:/my-best-school/docs/phases-22-modules/phase-18-activities.md) | Extracurricular activities, discipline records, awards. |
| **E. Communication & Oversight** | 19 | [Communications](file:///e:/my-best-school/docs/phases-22-modules/phase-19-communications.md) | Announcements, SMS/Email gateway, targeted notices, delivery logs. |
| | 20 | [Documents & Certificates](file:///e:/my-best-school/docs/phases-22-modules/phase-20-documents.md) | Bonafide, character, leaving certificates, template generators. |
| | 21 | [Reports & Analytics](file:///e:/my-best-school/docs/phases-22-modules/phase-21-reports.md) | Executive dashboards, branch comparison, enrollment & finance KPIs. |
| | 22 | [Audit & Governance](file:///e:/my-best-school/docs/phases-22-modules/phase-22-audit.md) | System-wide audit logs, backup tools, data retention, security logs. |

---

## 4. Phase-by-Phase Development Lifecycle

Every single module follows this strict verification cycle before moving to the next:
1. **Contract Definition:** Add domain interfaces and types to `packages/shared-types`.
2. **Schema & Validation:** Define input validation in `packages/validation` or local module schemas.
3. **Backend Service & Storage Abstraction:** Implement service rules and repository interfaces under `backend/src/modules/<module>`.
4. **API Routes:** Expose standard `/api/v1/<module>` endpoints with error handling.
5. **Frontend Presentation:** Connect `apps/web/src/features/<module>` with UI components.
6. **Testing & Fix:** Test integration, verify edge cases, fix any issues.
7. **Sign-off & Lock:** Complete phase verification before advancing to the next module.
