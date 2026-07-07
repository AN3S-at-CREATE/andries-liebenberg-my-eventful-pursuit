## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2026-02-21 - Accessible Visual Loading Spinners
**Learning:** Decorative SVG loading spinners (like Lucide's `Loader2`) often lack inherent meaning to screen readers and can be announced confusingly. Wrapping them in a container with `role="status"` and a descriptive `aria-label` while hiding the SVG with `aria-hidden="true"` creates a clean, semantic loading state.
**Action:** Always wrap visual loading components (like `<Loader2 />`) in a status container (`<div role="status" aria-label="Loading content">`) and hide the visual element from the accessibility tree (`aria-hidden="true"`).
