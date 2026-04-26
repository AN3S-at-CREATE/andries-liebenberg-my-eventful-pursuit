## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-04-26 - Dual Accessibility for Icon-only Submit Buttons
**Learning:** Icon-only buttons used for submitting forms or sending messages (like the chat inputs in Concierge) often lack accessible names for screen readers and visual context for pointer device users.
**Action:** When an icon-only button is used, apply a dual-accessibility strategy: add an explicit `aria-label` (e.g., `aria-label="Send message"`) to the `<Button>`, ensure it has `size="icon"` for correct dimensions, and wrap the button in a `<Tooltip>` to provide on-hover context for sighted users.
