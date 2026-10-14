# Phase 06: Academics & Curriculum

## 1. Domain Overview
Structure of classes, sections, subjects, syllabus mappings, and academic progression rules.

## 2. Key Responsibilities
- **Class & Section Structure:** Grades (e.g. Nursery, Grade 1 to 10), Sections (A, B, C), room capacity.
- **Curriculum & Subjects:** Core and elective subjects, subject codes, weekly period allocations.
- **Subject-Teacher Mapping:** Allocating teachers as Class Teachers or Subject Teachers per section.
- **Promotion & Progression:** Academic year transition rules, pass/fail retention, section reshuffling.

## 3. Directory Layout
- Backend: `backend/src/modules/academics/`
  - `academics.routes.ts`
  - `academics.controller.ts`
  - `academics.service.ts`
  - `academics.repository.ts`
  - `academics.schema.ts`
  - `academics.types.ts`
- Frontend: `apps/web/src/features/academics/`
  - `components/ClassSectionTree.tsx`
  - `components/SubjectMappingTable.tsx`

## 4. Phase Verification Checklist
- [ ] Class teacher and subject teacher relationships validate without conflicts.
- [ ] End-of-year batch promotion workflow preserves historical enrollment snapshots.
