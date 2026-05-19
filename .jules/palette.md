## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-20 - [Add ARIA labels to inline AI chat inputs]
**Learning:** Inline chat interfaces often lack dedicated form `<label>` elements for aesthetic reasons, causing screen readers to announce them as empty text fields. The icon-only "Send" buttons also get announced as empty if not properly labelled.
**Action:** Always provide `aria-label="Type your message"` for inline chat/search inputs and `aria-label="Send message"` for their adjacent icon-only buttons to ensure they remain accessible without compromising the UI design.
