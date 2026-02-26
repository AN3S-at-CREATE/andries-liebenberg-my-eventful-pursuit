## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2026-02-23 - Keyboard Accessible Tooltips
**Learning:** Custom tooltip implementations using only `onMouseEnter/Leave` events fail accessibility standards because they are invisible to keyboard users.
**Action:** Replace custom tooltip logic with the `shadcn/ui` `Tooltip` component, which automatically handles focus interactions and ARIA attributes via Radix UI.
