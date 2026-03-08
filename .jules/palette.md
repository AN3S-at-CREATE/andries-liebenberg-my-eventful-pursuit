## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2025-02-23 - Keyboard Navigable Custom Interactive Elements
**Learning:** Custom interactive elements like gallery thumbnails `<div>` often lack native keyboard support and screen reader context. Even if they have `onClick` handlers, users cannot tab to them or activate them via the keyboard.
**Action:** For interactive non-button elements, always add `role="button"`, `tabIndex={0}`, an `onKeyDown` handler (for Enter/Space), and clear focus visible styles (like `focus-visible:ring-2`) to ensure full keyboard and screen reader accessibility.
