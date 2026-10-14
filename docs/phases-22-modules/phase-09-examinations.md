# Phase 09: Examinations & Results

## 1. Domain Overview
Management of exam terms, assessment weighting, marks entry, grading formulas, and report card generation.

## 2. Key Responsibilities
- **Exam Structure:** Term exams, midterms, unit tests, quizzes, practicals, weightages.
- **Grading Systems:** Percentage, Letter Grades (A+, A, B, etc.), GPA, custom grade scales.
- **Marks Entry & Moderation:** Secure score entry by subject teachers, verification by exam head.
- **Report Cards & Position:** Printable report cards with teacher remarks, class position/rank, term comparisons.

## 3. Directory Layout
- Backend: `backend/src/modules/examinations/`
  - `examinations.routes.ts`
  - `examinations.controller.ts`
  - `examinations.service.ts`
  - `examinations.repository.ts`
  - `examinations.schema.ts`
  - `examinations.types.ts`
- Frontend: `apps/web/src/features/examinations/`
  - `components/MarksEntrySheet.tsx`
  - `components/ReportCardTemplate.tsx`

## 4. Phase Verification Checklist
- [ ] Weightage calculations (e.g. 20% test + 80% final) calculate accurately without rounding errors.
- [ ] Published results lock marks against unauthorized edits.
