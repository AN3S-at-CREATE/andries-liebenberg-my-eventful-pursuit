## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-09 - Accessible Tooltips for Icon-Only Buttons
**Learning:** When adding Shadcn UI tooltips to elements that already have a native `title` attribute, it is crucial to remove the native `title` attribute to prevent double-tooltips (the native browser one overlapping with the custom React one). Also, when integrating Shadcn Tooltips within a file that uses Recharts, alias the Recharts `Tooltip` to avoid naming collisions.
**Action:** Always verify if an icon button has a pre-existing `title` before wrapping it in a custom `<Tooltip>`. Use `import { Tooltip as RechartsTooltip }` when both libraries are present in the same file.
