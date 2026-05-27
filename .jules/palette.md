## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-27 - Inline Character Counts for Zod Schemas
**Learning:** The contact form schema enforces strict length limits (2000 chars for message, 200 for goal), but the UI lacked client-side indicators. Relying solely on post-submission errors for length limits causes user frustration.
**Action:** Standardize pairing Zod `.max()` constraints with real-time character counters and `maxLength` attributes on textual inputs to provide immediate visual feedback.
