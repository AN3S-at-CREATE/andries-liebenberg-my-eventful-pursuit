## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2024-05-13 - Tooltips on Disabled Elements
**Learning:** When using Radix UI/Shadcn UI Tooltips on a potentially disabled element (like a button during an export/loading state), the tooltip will not trigger because disabled HTML elements do not fire pointer events.
**Action:** Wrap the disabled element in a `<span>` to act as the tooltip trigger, and conditionally set its `tabIndex={isDisabled ? 0 : -1}` to maintain focusability without double-focusing when enabled.
