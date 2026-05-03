## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2024-05-03 - Standardized Tooltips
**Learning:** Native `title` attributes provide inconsistent tooltip styling compared to the application's design system. Replacing them with the Shadcn `Tooltip` component ensures visual consistency for hover feedback on icon-only buttons.
**Action:** Always verify if a native `title` attribute can be upgraded to a consistent UI component like `Tooltip` when rendering icon-only actions.
