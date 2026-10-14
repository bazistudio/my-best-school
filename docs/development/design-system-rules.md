# School Universel — Frontend Design System & Implementation Rules v1.0

This document defines the mandatory design rules and reusable foundations for **every** frontend phase of School Universel.

---

## 1. Brand Palette & Semantic Design Tokens

All colors are declared centrally in [`apps/web/src/app/globals.css`](file:///e:/my-best-school/apps/web/src/app/globals.css).

| Token | CSS Variable | Hex Value | Semantic Purpose |
|---|---|---|---|
| **Primary** | `--color-primary` | `#00296B` | Main brand, primary actions, active navigation, prominent headers |
| **Primary Hover** | `--color-primary-hover` | `#001F52` | Hover state for primary action buttons |
| **Secondary** | `--color-secondary` | `#E63946` | Secondary brand accent, selective emphasis, highlights |
| **Secondary Hover** | `--color-secondary-hover` | `#D32734` | Hover state for secondary actions |
| **Success** | `--color-success` | `#16A34A` | Completed operations, positive metrics, active status |
| **Warning** | `--color-warning` | `#EAB308` | Pending status, attention alerts, main campus badges |
| **Error / Danger** | `--color-error` | `#DC2626` | Form validation errors, destructive actions, offline notices |
| **Info** | `--color-info` | `#0284C7` | Informational callouts and guidance notes |

---

## 2. Typography Standard

- **Body, Inputs, Tables & Controls:** `Inter` (via `--font-inter` and `var(--font-family-body)`).
- **Headings & Titles:** `Poppins` (via `--font-poppins` and `var(--font-family-heading)`).
- Font assets are loaded via `next/font/google` with `display: swap` and automatic self-hosting by Next.js at build time, with full system fallback stacks.

---

## 3. Shared Component Foundation (`apps/web/src/components/ui/`)

Every module must consume these standardized primitives instead of writing raw HTML elements or arbitrary ad-hoc Tailwind classes:

1. [`Button`](file:///e:/my-best-school/apps/web/src/components/ui/Button.tsx): Variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), loading spinner.
2. [`Badge`](file:///e:/my-best-school/apps/web/src/components/ui/Badge.tsx): Variants (`primary`, `secondary`, `success`, `warning`, `error`, `neutral`).
3. [`Card`](file:///e:/my-best-school/apps/web/src/components/ui/Card.tsx): Variants (`default`, `elevated`, `interactive`).
4. [`Input`](file:///e:/my-best-school/apps/web/src/components/ui/Input.tsx): Label integration, validation error indicator, focus ring.
5. [`Modal`](file:///e:/my-best-school/apps/web/src/components/ui/Modal.tsx): Accessible backdrop, animated entry, dismiss handler.

---

## 4. Mandatory Frontend Development Rules

Every future module (Phase 02 through Phase 22) must strictly adhere to these rules:

### Rule A — Token-Only Colors
- **Never** write raw hex values (e.g. `#00296B`, `#E63946`, `#22c55e`) inside JSX components.
- **Never** use arbitrary Tailwind palette overrides (e.g. `bg-blue-700`, `text-red-500`, `border-green-400`).
- Always use semantic tokens: `var(--color-primary)`, `var(--color-error)`, `var(--surface-base)`, etc.

### Rule B — Reuse Before Creating
- Before writing a new UI component, check `apps/web/src/components/ui/`.
- Reuse `Button`, `Input`, `Modal`, `Badge`, and `Card`. Do not create a second button or modal implementation.

### Rule C — Centralized Typography
- Use the shared font scale. Do not import separate fonts in feature directories.

### Rule D — Shared Behavior & Accessibility
- Components must maintain keyboard focus rings (`var(--focus-ring)`), disabled states, and text contrast.
- Status must never be conveyed by color alone (always combine with icons, text, or badges).

### Rule E — Keep Domain Logic Out of Presentation Primitives
- UI primitives in `components/ui/` must remain pure and free of school, branch, or auth logic.

### Rule F — No Styling Shortcuts
- No inline style tags for colors or repetitive one-off CSS blocks.

### Rule G — New-Token Governance
- If a new semantic token is genuinely needed, add it centrally to `globals.css` and document its purpose here first.

### Rule H — Design-System Compliance Checks
- Before approving any frontend phase, check the diff for hardcoded colors, duplicate components, and accessibility regressions.
