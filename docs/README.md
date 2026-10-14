# Universal School Platform - Documentation Index

Welcome to the **Universal School Platform** documentation. This suite details the architectural rules, domain structures, database entities, and phase-by-phase development lifecycle for this multi-branch school administration platform.

---

## 1. Core Architecture Specifications
- **[Backend Architecture & Acceptance Standards](file:///e:/my-best-school/docs/architecture/backend-architecture-report.md)**:
  - The 8-Step Transaction Pattern (Auth -> Validation -> Scope -> Service -> DB Tx -> Audit -> Outbox -> Standard Response)
  - Module ownership & anti-corruption rules
  - Suggested database domain & entity map (13 domains)
  - Multi-branch design & backend scoping rules
  - The 3-Layer Reusability Model (Shared Product, School Configuration, Deployment Environment)
  - Master Backend Completion Acceptance Tracker (0/21)
- **[System Architecture](file:///e:/my-best-school/docs/architecture/system-architecture.md)**:
  - Client tiers (Web, Tauri Desktop, Mobile)
  - Express API gateway boundary
  - Dual baseline target (Online PostgreSQL/Firestore vs Offline SQLite)
  - 22-module catalogue overview

---

## 2. Phase-by-Phase Module Roadmap (`docs/phases-22-modules/`)
Each module is built, verified, and signed off sequentially before moving to the next:

### Category A: Foundation & Administration
1. [Phase 01: Organization & Branch Management](file:///e:/my-best-school/docs/phases-22-modules/phase-01-organization.md)
2. [Phase 02: Identity, Authentication & Permissions](file:///e:/my-best-school/docs/phases-22-modules/phase-02-identity.md)
3. [Phase 03: Admissions & Enrollment](file:///e:/my-best-school/docs/phases-22-modules/phase-03-admissions.md)
4. [Phase 04: Student Information System (SIS)](file:///e:/my-best-school/docs/phases-22-modules/phase-04-students.md)
5. [Phase 05: Guardian & Family Management](file:///e:/my-best-school/docs/phases-22-modules/phase-05-guardians.md)

### Category B: Teaching & Academic Operations
6. [Phase 06: Academics & Curriculum](file:///e:/my-best-school/docs/phases-22-modules/phase-06-academics.md)
7. [Phase 07: Timetable & Scheduling](file:///e:/my-best-school/docs/phases-22-modules/phase-07-timetable.md)
8. [Phase 08: Student Attendance](file:///e:/my-best-school/docs/phases-22-modules/phase-08-attendance.md)
9. [Phase 09: Examinations & Results](file:///e:/my-best-school/docs/phases-22-modules/phase-09-examinations.md)
10. [Phase 10: Homework, Assignments & Learning Materials](file:///e:/my-best-school/docs/phases-22-modules/phase-10-homework.md)

### Category C: Fees, Finance & School Business
11. [Phase 11: Fee Management](file:///e:/my-best-school/docs/phases-22-modules/phase-11-fees.md)
12. [Phase 12: Accounting & Finance](file:///e:/my-best-school/docs/phases-22-modules/phase-12-finance.md)
13. [Phase 13: Staff, HR & Payroll](file:///e:/my-best-school/docs/phases-22-modules/phase-13-staff.md)
14. [Phase 14: Inventory, Purchasing & Vendors](file:///e:/my-best-school/docs/phases-22-modules/phase-14-inventory.md)

### Category D: Student Welfare & Supporting Services
15. [Phase 15: Library Management](file:///e:/my-best-school/docs/phases-22-modules/phase-15-library.md)
16. [Phase 16: Transport Management](file:///e:/my-best-school/docs/phases-22-modules/phase-16-transport.md)
17. [Phase 17: Health, Safety & Student Welfare](file:///e:/my-best-school/docs/phases-22-modules/phase-17-health.md)
18. [Phase 18: Events, Activities & Discipline](file:///e:/my-best-school/docs/phases-22-modules/phase-18-activities.md)

### Category E: Communication, Records & Oversight
19. [Phase 19: Communications & Notifications](file:///e:/my-best-school/docs/phases-22-modules/phase-19-communications.md)
20. [Phase 20: Documents & Certificates](file:///e:/my-best-school/docs/phases-22-modules/phase-20-documents.md)
21. [Phase 21: Reports & Management Dashboard](file:///e:/my-best-school/docs/phases-22-modules/phase-21-reports.md)
22. [Phase 22: Audit, Settings & Data Governance](file:///e:/my-best-school/docs/phases-22-modules/phase-22-audit.md)
