## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2024-05-10 - Tooltips for icon-only buttons with disabled states
**Learning:** Icon-only buttons need ARIA labels and visual Tooltips for accessibility. But when an element might be disabled (like a button during an export/loading state), the Radix UI TooltipTrigger needs a wrapping `span` with conditional `tabIndex` so that the disabled element can still show the tooltip on hover without causing double-focus issues when active. Also, be careful of import collisions (e.g. Recharts Tooltip vs Shadcn Tooltip).
**Action:** Use conditional `tabIndex` wrapper for Tooltip triggers on disabled elements and alias colliding imports.
