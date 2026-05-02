## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## 2026-02-21 - Tooltips on disabled buttons
**Learning:** When adding a Radix UI `<Tooltip>` to a potentially disabled element (like a `<Button disabled>`), wrapping it directly with `<TooltipTrigger asChild>` prevents the tooltip from appearing because disabled HTML elements do not fire pointer events.
**Action:** Wrap the disabled element in a `<span>` and conditionally set the span's tabIndex (e.g., `<TooltipTrigger asChild><span tabIndex={isDisabled ? 0 : -1}><Button disabled={isDisabled}>...</Button></span></TooltipTrigger>`).
