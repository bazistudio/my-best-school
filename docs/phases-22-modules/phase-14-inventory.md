# Phase 14: Inventory, Purchasing & Vendors

## 1. Domain Overview
Tracking books, uniforms, lab equipment, furniture, stationery, purchase orders, and stock movements.

## 2. Key Responsibilities
- **Item Master:** Categories, SKUs, reorder thresholds, unit prices.
- **Suppliers & Purchase Orders:** Vendor list, purchase requests, quotation tracking, PO generation.
- **Stock Movements:** Goods received notes (GRN), issuance to departments/students, returns, wastage write-offs.
- **Low Stock Alerts:** Automated warnings when critical consumables drop below safety levels.

## 3. Directory Layout
- Backend: `backend/src/modules/inventory/`
  - `inventory.routes.ts`
  - `inventory.controller.ts`
  - `inventory.service.ts`
  - `inventory.repository.ts`
  - `inventory.schema.ts`
  - `inventory.types.ts`
- Frontend: `apps/web/src/features/inventory/`
  - `components/StockTable.tsx`
  - `components/PurchaseOrderModal.tsx`

## 4. Phase Verification Checklist
- [ ] Stock issuance updates real-time quantities and prevents negative stock balances.
- [ ] Purchase invoices integrate seamlessly into Phase 12 accounts payable.
