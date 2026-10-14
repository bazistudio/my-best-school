# Phase 19: Communications & Notifications

## 1. Domain Overview
Institutional announcements, multi-channel messaging (SMS, Email, WhatsApp, Push), and delivery tracking.

## 2. Key Responsibilities
- **Announcements:** Targeted by entire institution, specific branch, grade level, section, or staff role.
- **Triggered Alerts:** Automated dispatches on daily student absence, fee due dates, exam announcements.
- **Provider Gateway Abstraction:** Unified interface for SMS gateways (Twilio, local telco APIs), SMTP email, and push.
- **Delivery Logs & Retries:** Tracking sent, delivered, failed states, retry queues, and opt-out preferences.

## 3. Directory Layout
- Backend: `backend/src/modules/communications/`
  - `communications.routes.ts`
  - `communications.controller.ts`
  - `communications.service.ts`
  - `communications.repository.ts`
  - `communications.schema.ts`
  - `communications.types.ts`
- Frontend: `apps/web/src/features/communications/`
  - `components/NoticeBoard.tsx`
  - `components/BroadcastComposer.tsx`

## 4. Phase Verification Checklist
- [ ] Delivery failures properly logged with failure reasons without crashing message queue.
- [ ] Emergency broadcast system reliably reaches targeted parent contacts.
