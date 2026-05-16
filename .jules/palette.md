## 2026-02-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like social links) require a dual strategy for full accessibility: `aria-label` provides programmatic context for screen readers, while a `Tooltip` offers visual context for sighted users on hover. Relying on one or the other leaves a gap in the user experience.
**Action:** Always wrap icon-only buttons in a Tooltip component AND ensure the interactive element (button/link) has a descriptive aria-label.
## $(date +%Y-%m-%d) - Add Tooltip to Password Visibility Toggle
**Learning:** Icon-only buttons for toggling form states (like password visibility) can be ambiguous to sighted users without explicit tooltips, even when `aria-label` is present for screen readers.
**Action:** When adding an icon-only button to inputs or interactive forms, wrap it in a `Tooltip` with a `TooltipTrigger asChild` to provide visual context without breaking accessibility or DOM structure.
