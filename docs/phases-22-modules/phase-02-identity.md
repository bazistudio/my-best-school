# Phase 02: Identity, Authentication & Permissions

## 1. Domain Overview
Controls who can access the system, what actions they can perform, and which branches/classes they can inspect or modify.

## 2. Key Responsibilities
- **Staff Authentication:** Email/username login, password hashing, session tokens, account recovery.
- **Role-Based Access Control (RBAC):** Super Admin, Principal, Branch Admin, Teacher, Accountant, Receptionist, Parent, Student.
- **Branch & Scope Isolation:** Restricting staff to their assigned branch and teachers to their assigned classes.
- **Security & Session Governance:** Session timeout, concurrent logins, security events, account lockouts.

## 3. Directory Layout
- Backend: `backend/src/modules/identity/`
  - `identity.routes.ts`
  - `identity.controller.ts`
  - `identity.service.ts`
  - `identity.repository.ts`
  - `identity.schema.ts`
  - `identity.types.ts`
- Frontend: `apps/web/src/features/identity/`
  - `components/LoginForm.tsx`
  - `components/RoleBadge.tsx`
  - `components/PermissionGuard.tsx`

## 4. Phase Verification Checklist
- [ ] Passwords securely hashed; tokens verified on protected routes.
- [ ] Branch admin cannot access records of another branch without super admin privilege.
- [ ] Failed login attempts trigger throttling and audit events.
