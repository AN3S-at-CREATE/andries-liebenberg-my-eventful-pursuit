## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2024-06-01 - Hidden Text Accessibility
**Learning:** When text within an interactive element (like a button or tab) is hidden on smaller screens using CSS classes like `hidden sm:inline`, the element loses its accessible name on those breakpoints because `display: none` removes the text from the accessibility tree.
**Action:** Always provide a fallback `aria-label` on the parent interactive element to ensure it remains accessible to screen readers on mobile devices.
