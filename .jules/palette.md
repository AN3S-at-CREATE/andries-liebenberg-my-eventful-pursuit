## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2024-05-23 - Add ARIA labels to inline chat inputs and icon buttons
**Learning:** For inline chat inputs that lack a dedicated `<label>` element for aesthetic reasons, relying solely on `placeholder` text is insufficient for screen readers. Similarly, icon-only buttons (like a send arrow) must have explicitly defined `aria-label` attributes.
**Action:** Always provide a descriptive `aria-label` attribute (e.g., `aria-label="Type your message"` and `aria-label="Send message"`) to ensure accessibility for screen readers when visible text labels are omitted.
