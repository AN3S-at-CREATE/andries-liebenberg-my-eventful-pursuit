## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2026-04-18 - Context-Aware Tooltips
**Learning:** Icon-only buttons (e.g., `<Button size="icon">`) generally require a dual accessibility strategy: an `aria-label` attribute (or `<span className="sr-only">`) for screen readers, AND a `Tooltip` wrapper for visual hover context. Exception: Do not add tooltips to mobile-only elements (e.g., `lg:hidden`) as touch devices lack hover, and do not add `aria-label` if `sr-only` text is already present.
**Action:** Verify if the target element is visible and interactive on hover-capable devices before adding tooltips, and check for existing `sr-only` content before adding `aria-label` attributes.
