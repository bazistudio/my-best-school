# Phase 16: Transport Management

## 1. Domain Overview
Management of school buses/vans, transport routes, designated pickup stops, drivers, and transport fee schedules.

## 2. Key Responsibilities
- **Fleet & Crew Management:** Vehicle registration, fitness certificates, insurance expiry, driver and conductor profiles.
- **Route & Stop Planning:** Route names, sequential stops, pickup/drop-off scheduled times, passenger capacity.
- **Student Allocation:** Assigning students to specific routes/stops, seat capacity monitoring.
- **Transport Billing:** Automated addition of route-specific transport fees to student monthly invoices.

## 3. Directory Layout
- Backend: `backend/src/modules/transport/`
  - `transport.routes.ts`
  - `transport.controller.ts`
  - `transport.service.ts`
  - `transport.repository.ts`
  - `transport.schema.ts`
  - `transport.types.ts`
- Frontend: `apps/web/src/features/transport/`
  - `components/RouteManager.tsx`
  - `components/VehicleRoster.tsx`

## 4. Phase Verification Checklist
- [ ] Vehicle capacity limit checks prevent over-allocation of students to buses.
- [ ] Changing a student's stop dynamically updates their upcoming transport fee invoice.
