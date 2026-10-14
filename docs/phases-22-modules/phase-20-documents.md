# Phase 20: Documents & Certificates

## 1. Domain Overview
Generation of official school certificates, student document vault, and verification watermarking.

## 2. Key Responsibilities
- **Certificate Templates:** Bonafide, Character, Transfer (Leaving) Certificates, Sports Achievement.
- **Serial Numbering & Verification:** Sequential certificate issuance numbers, QR-code verification tokens.
- **Document Vault:** Secure storage for scanned student CNIC/B-Form, birth certificates, previous school transcripts.
- **Access Control & Audit:** Download audit trails, revocation records for cancelled certificates.

## 3. Directory Layout
- Backend: `backend/src/modules/documents/`
  - `documents.routes.ts`
  - `documents.controller.ts`
  - `documents.service.ts`
  - `documents.repository.ts`
  - `documents.schema.ts`
  - `documents.types.ts`
- Frontend: `apps/web/src/features/documents/`
  - `components/CertificateGenerator.tsx`
  - `components/DocumentUploadVault.tsx`

## 4. Phase Verification Checklist
- [ ] Certificate generation renders accurate student details, signature blocks, and unique serial numbers.
- [ ] Issued certificates cannot be re-issued with different parameters under the same serial number.
