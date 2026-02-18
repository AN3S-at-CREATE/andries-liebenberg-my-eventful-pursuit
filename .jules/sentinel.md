## 2025-05-18 - Centralized Validation Schemas
**Vulnerability:** Inconsistent or weak password policies scattered across components (e.g., `Auth.tsx` had weak checks).
**Learning:** Defining validation logic locally inside UI components leads to duplication, inconsistency, and missed security requirements.
**Prevention:** Use centralized Zod schemas (e.g., `src/lib/auth-schemas.ts`) for all authentication inputs to enforce strict security policies (like password complexity) consistently across the application.
