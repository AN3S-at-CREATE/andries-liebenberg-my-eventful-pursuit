# Sentinel Security Journal

## 2026-02-17 - Centralized Authentication Schema
**Vulnerability:** Inconsistent and weak password validation in scattered component-level schemas (e.g., `Auth.tsx`).
**Learning:** Hardcoding validation logic in UI components leads to duplicate code and missed security requirements. Using `zod` for schemas makes validation portable and strict.
**Prevention:** Centralize all authentication schemas in `src/lib/auth-schemas.ts`. Enforce strong password policies (min 8 chars, uppercase, lowercase, number, special char) at the schema level to ensure consistency across all auth flows.
