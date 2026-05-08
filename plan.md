1. **Analyze `src/components/ai-tools/calculator/ROICalculatorModal.tsx` for UX Improvement:**
   - There are two icon-only buttons for "Copy shareable link" and "Export as PDF" which currently use the native HTML `title` attribute for tooltips.
   - Using native `title` attribute isn't great for consistent UX and visual design. We should replace them with the Shadcn UI `<Tooltip>` component.
   - But wait, `Tooltip` is already imported from `recharts`! We need to handle this carefully to avoid naming collision. We will import the Shadcn UI tooltip components and alias the `recharts` one if necessary, or just alias the Shadcn ones. The standard in this codebase seems to be aliasing `Tooltip` from `recharts` if we are importing the Shadcn one, or aliasing the `recharts` one. Let's check `memory` - "If this causes import collisions (e.g., with Recharts), resolve them by aliasing the third-party import (e.g., import { Tooltip as RechartsTooltip }), leaving the Shadcn import exactly as Tooltip."

2. **Modify `src/components/ai-tools/calculator/ROICalculatorModal.tsx`:**
   - Update `recharts` import to alias `Tooltip as RechartsTooltip`.
   - Update `<Tooltip>` in `<AreaChart>` to `<RechartsTooltip>`.
   - Import `Tooltip, TooltipContent, TooltipTrigger` from `@/components/ui/tooltip`.
   - Wrap the "Copy shareable link" and "Export as PDF" `<Button>` elements in Shadcn UI `<Tooltip>` components. Use `<TooltipTrigger asChild>` as per memory constraints.
   - Remove the `title` attributes from the `<Button>` elements.

3. **Verify Changes:**
   - Run `pnpm lint`, `pnpm build`, and tests if any using a bash session.
   - Ensure the UI builds correctly.

4. **Document UX Learning:**
   - Write to `.jules/palette.md` to document replacing native `title` with Shadcn Tooltip for icon-only buttons.

5. **Pre-commit:**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
