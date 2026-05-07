## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-07 - Dual Accessibility for Icon-only Buttons
**Learning:** Icon-only buttons (like the password visibility toggle) require a dual accessibility strategy: an `aria-label` attribute for screen readers, AND a `Tooltip` wrapper for visual hover context.
**Action:** Always wrap icon-only buttons with Shadcn UI `Tooltip` components when they don't have visual text, ensuring the `aria-label` matches the tooltip content.
