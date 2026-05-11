## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.

## 2024-05-24 - Tooltips on disabled buttons and Recharts collision
**Learning:** When replacing native HTML `title` attributes with Shadcn `<Tooltip>` components for icon-only buttons, import collisions can occur with `recharts`. The third-party import should be aliased (`Tooltip as RechartsTooltip`). Also, disabled buttons (`<Button disabled>`) do not fire pointer events, breaking Radix UI Tooltips.
**Action:** Alias third-party `Tooltip` imports. Wrap disabled elements in a `<span>` with conditional `tabIndex` (`tabIndex={isDisabled ? 0 : -1}`) inside `<TooltipTrigger asChild>` to ensure the tooltip is accessible and hoverable even when disabled, without causing double-focus when enabled.
