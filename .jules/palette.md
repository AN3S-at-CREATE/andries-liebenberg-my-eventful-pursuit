## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-04-30 - Inline Chat Input Accessibility
**Learning:** Chat interfaces often omit visible labels for aesthetic reasons, which breaks accessibility for screen reader users who cannot contextualize the input.
**Action:** Always provide an `aria-label` attribute (e.g., `aria-label="Type your message"`) for inline chat or search inputs that lack a dedicated `<label>` element.
