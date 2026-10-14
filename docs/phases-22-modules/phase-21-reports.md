# Phase 21: Reports & Analytics Dashboard

## 1. Domain Overview
High-level executive analytics, multi-branch comparative reports, academic trends, and operational summaries.

## 2. Key Responsibilities
- **Executive Dashboard:** Headcount KPIs, active admissions, today's attendance rates, revenue collection totals.
- **Academic Progress Analytics:** Grade distribution curves, subject-wise pass rates, year-over-year performance.
- **Financial Analytics:** Projected vs collected fees, arrears aging analysis, department expense breakdowns.
- **Exporting & Print Engine:** PDF and Excel exports with institution headers, filter criteria, and verification stamps.

## 3. Directory Layout
- Backend: `backend/src/modules/reports/`
  - `reports.routes.ts`
  - `reports.controller.ts`
  - `reports.service.ts`
  - `reports.repository.ts`
  - `reports.schema.ts`
  - `reports.types.ts`
- Frontend: `apps/web/src/features/reports/`
  - `components/ExecutiveKpiGrid.tsx`
  - `components/BranchComparisonChart.tsx`

## 4. Phase Verification Checklist
- [ ] Analytics queries run efficiently using proper indices without blocking active transaction processing.
- [ ] Multi-branch summaries correctly aggregate data without leaking unassigned branch figures.
