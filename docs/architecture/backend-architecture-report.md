# Universal School Platform - Backend Architecture, Domain Ownership & Master Acceptance Standard

> **Document Version:** 1.0.0  
> **Target:** Master Baseline Universal Architecture (Reusable across schools without hardcoded branding)

---

## 1. End-to-End Workflow Architecture (The 8-Step Transaction Pattern)

Every state-changing school operation (such as marking attendance, collecting a fee, or posting marks) follows a strict, non-negotiable 8-step execution lifecycle to guarantee transactional safety, authorization, and data integrity.

### Reference Lifecycle: Marking Attendance
```
[ Client Application (Web / Desktop / Mobile) ]
                      │
                      ▼
 1. Teacher submits attendance payload for class & date
                      │
                      ▼
 2. API Gateway & Route Boundary
    ├── Authenticates staff identity & session token
    └── Validates payload schema (date format, status enums, student IDs)
                      │
                      ▼
 3. Authorization & Scoping Layer
    ├── Verifies teacher's branch assignment (branch_id)
    └── Verifies teacher is authorized for the specific class, section, & period
                      │
                      ▼
 4. Domain Service Validation
    ├── Confirms active academic session
    └── Verifies all students in payload are currently enrolled in this class/section
                      │
                      ▼
 5. Repository & Database Transaction (PostgreSQL / SQLite)
    └── Atomic transaction:
        ├── Upserts attendance_sessions
        └── Batch upserts attendance_records
                      │
                      ▼
 6. Tamper-Proof Audit Logging
    └── Inscribes action in audit_logs (who, what, when, IP, branch, changed state)
                      │
                      ▼
 7. Safe Post-Transaction Notifications (Outbox / Event Pattern)
    └── Triggers absentee SMS/push alerts ONLY after DB transaction successfully commits
                      │
                      ▼
 8. Consistent API Response
    └── Returns uniform standardized payload: { success: true, data: { ... } }
```

---

## 2. Module Ownership & Anti-Corruption Rules

To maintain long-term stability across all 22 modules, **strict module boundaries are enforced**. A module strictly owns its business rules and database entities. Other modules must consume its public services or API interfaces rather than modifying its tables directly.

| Module | Sole Authority & Ownership Scope | Direct Access Prohibitions |
|---|---|---|
| **Identity** | Users, credentials, roles, permissions, sessions, branch bindings | No other module writes credentials or assigns permissions directly. |
| **Organization** | School details, branches, operating hours, academic year definitions | Modules reference `branch_id` and `academic_year_id` as foreign keys only. |
| **Students (SIS)** | Student identity, demographic profiles, enrollment records | Modules do not mutate student registration or enrollment status directly. |
| **Academics** | Classes, sections, subjects, syllabus, teacher-to-subject mappings | Modules read curriculum structure; only Academics alters class allocations. |
| **Attendance** | Attendance sessions, present/absent/late records, leave requests | Attendance records are strictly mutated via Attendance domain services. |
| **Fees** | Fee structures, discount policies, invoices, payments, balances | Accounting reads fee transactions; only Fees handles billing & receipts. |
| **Finance** | Chart of accounts, general ledger, cash/bank accounts, vouchers | No arbitrary financial mutations; ledgers balance via double-entry journal vouchers. |
| **Examinations** | Exam sessions, grading scales, mark entries, moderation, report cards | Teachers enter marks via Exam services; published marks lock against modification. |

---

## 3. Suggested Database Domains & Entity Map

The database architecture is partitioned into clean, cohesive domains:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       DATABASE DOMAINS MAP                                       │
├─────────────────────┬────────────────────────────────────────────────────────────────────────────┤
│ Domain              │ Important Entities                                                         │
├─────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ 1. Organization     │ organizations, branches, school_settings                                   │
│ 2. Identity         │ users, roles, permissions, user_roles, user_branch_access, sessions        │
│ 3. People           │ persons, students, guardians, student_guardians, staff                     │
│ 4. Admissions       │ admission_applications, admission_documents, admission_decisions           │
│ 5. Academics        │ academic_years, terms, classes, sections, subjects, enrollments, teacher_assignments│
│ 6. Attendance       │ attendance_sessions, attendance_records, leave_requests                    │
│ 7. Exams            │ exam_sessions, exam_subjects, marks, grading_scales, report_cards          │
│ 8. Fees             │ fee_categories, fee_structures, fee_invoices, fee_invoice_items,          │
│                     │ payments, payment_allocations, concessions                                │
│ 9. Finance          │ accounts, journal_entries, journal_lines, expenses, cash_accounts           │
│ 10. HR              │ staff_contracts, staff_attendance, leave_balances, payroll_runs, payslips  │
│ 11. Operations      │ inventory_items, stock_movements, vendors, purchase_orders,               │
│                     │ library_copies, transport_routes                                           │
│ 12. Communications  │ announcements, notification_preferences, notification_deliveries           │
│ 13. Governance      │ audit_logs, document_metadata, outbox_events, idempotency_records          │
└─────────────────────┴────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Multi-Branch Design & Scoping Architecture

Even when deployed for a single-campus school, every entity is architected with branch awareness to avoid painful refactoring when the institution opens additional branches.

1. **Branch Ownership:** Tables contain `organization_id` and/or `branch_id` where records are location-specific (e.g. `classes`, `attendance_sessions`, `fee_invoices`, `staff_contracts`).
2. **Backend Enforced Authorization:** Hiding a dropdown branch in the frontend is **not** security. The backend gateway strictly checks `user_branch_access` against the requested `branch_id`.
3. **Student Enrollment Scoping:** A student profile is linked to a person record, but their active enrollment is explicitly tied to a specific `branch_id` and `academic_year_id`.
4. **Simple Isolated Deployments:** For single-tenant or cloned instances per school, the architecture avoids unnecessary SaaS multitenancy overhead while maintaining clean relational boundaries.

---

## 5. Platform Reusability Architecture (The 3-Layer Model)

To guarantee that the platform can be cloned and deployed for any institution without rewriting source code, the system is strictly split into three layers:

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Layer 1: Shared Universal Product Engine                                  │
│ - Node.js + Express + TypeScript backend                                   │
│ - Database schemas & migration files                                      │
│ - Shared domain logic (attendance, fees, examinations, SIS)               │
│ - Standardized security, RBAC, and error handlers                         │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ Layer 2: School Configuration Overlay (packages/config)                    │
│ - School Name (e.g., "My Best School", "Green Valley Academy")            │
│ - Branch codes & physical addresses                                       │
│ - Academic year labels & active sessions                                  │
│ - Currency (PKR, USD, etc.), locale, date formats                         │
│ - Grading scales & fee billing schedules                                  │
│ - Enabled module flags (toggle library, transport, boarding, etc.)         │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ Layer 3: Deployment & Infrastructure Environment                          │
│ - Database connection strings (PostgreSQL online / SQLite offline)        │
│ - Optional Firebase/Firestore credentials                                 │
│ - Domain names & SSL certificates                                         │
│ - Storage buckets & backup cron jobs                                      │
└───────────────────────────────────────────────────────────────────────────┘
```

> **Universal Rule:** School-specific names, currencies, and branch codes never appear as string literals in core backend business logic.

---

## 6. Master Backend Completion Acceptance Tracker (0/21)

A module or backend is never declared "complete" merely because directories or mock endpoints exist. The baseline is approved only when each criteria below is tested and passed.

### 1. Foundation & Infrastructure
- [ ] **1.1** Backend starts reliably and configuration is strictly validated on startup.
- [ ] **1.2** PostgreSQL migrations run cleanly from a zero-state local database.
- [ ] **1.3** Database transactions, connection pooling, and graceful shutdown are robust.
- [ ] **1.4** Firestore / document services integration is verified for features using it.

### 2. Security & Identity
- [ ] **2.1** Staff login, logout, password hashing, session expiry, and recovery work securely.
- [ ] **2.2** Role-based access control (RBAC), branch scoping, and guardian-child boundaries are strictly enforced.
- [ ] **2.3** Sensitive operations generate immutable audit logs; API secrets remain protected.

### 3. School Workflows End-to-End
- [ ] **3.1** Admissions pipeline, applicant conversion, and SIS student profile lifecycle work end-to-end.
- [ ] **3.2** Academic years, terms, classes, sections, and teacher assignments function seamlessly.
- [ ] **3.3** Daily/period attendance recording, locking, corrections, and leave workflows work end-to-end.
- [ ] **3.4** Fee schedules, invoice generation, partial payments, receipts, and ledger balances reconcile to the cent.
- [ ] **3.5** Examination sessions, mark entries, moderation approval, and report cards compute and publish accurately.

### 4. Operations, Governance & Quality
- [ ] **4.1** Strict API schema validation, standard error envelopes, and API documentation are verified.
- [ ] **4.2** Automated unit and integration test suite passes with zero regressions.
- [ ] **4.3** Point-in-time database backup and recovery procedures are verified on clean hardware.
- [ ] **4.4** High-level reports strictly reconcile with authoritative database tables.
- [ ] **4.5** Web, desktop (Tauri), and mobile clients communicate through the identical API gateway contract.

### 5. Release Readiness
- [ ] **5.1** Configuration overlays and deployment guides are 100% reproducible for new client clones.
- [ ] **5.2** Structured logging, failure alerts, and monitoring hooks are operational.
- [ ] **5.3** Institutional acceptance tests pass for all enabled core school workflows.
- [ ] **5.4** Known limits, edge-case recovery procedures, and upgrade runbooks are documented.
