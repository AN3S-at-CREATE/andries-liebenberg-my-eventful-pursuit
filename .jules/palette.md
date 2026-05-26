## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-26 - Add accessible Tooltips to disabled icon-buttons
**Learning:** Standard Radix UI `TooltipTrigger` components do not render tooltips when placed directly on disabled native elements (e.g. `<button disabled>`) because disabled elements don't capture pointer events.
**Action:** When adding Shadcn/Radix tooltips to potentially disabled buttons, wrap the disabled element in a `span` and control its `tabIndex` conditionally (`tabIndex={isDisabled ? 0 : -1}`) so the Tooltip Trigger remains accessible via hover and keyboard focus without causing double-focusing when enabled.
