1. **Optimize `GlobalCursorGlow.tsx` for mobile performance**
   - **File:** `src/components/effects/GlobalCursorGlow.tsx`
   - **Changes:**
     - Import `useIsMobile` from `@/hooks/use-mobile`.
     - Retrieve `isMobile` status using the hook at the top level.
     - Extract inline `useTransform` hook calls to the top level (before any conditional returns) to comply with React rules.
     - Add early return in `useEffect` and skip attaching mouse tracking event listeners if `isMobile` is true.
     - Add `if (isMobile) return null;` just before rendering to avoid rendering glow DOM nodes on mobile entirely.
     - Include performance code comments explaining the optimizations.

2. **Verification step**
   - Run `pnpm install --frozen-lockfile` to ensure clean node environment.
   - Run `pnpm lint` and `pnpm build` in a bash session to verify that no regressions were introduced and that all dependencies correctly resolve.
   - Verify file contents using `read_file` to ensure modifications were applied exactly.

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run `pre_commit_instructions` tool to get and execute necessary steps.
   - Ensure a journal entry is written to `.jules/optimizer.md` following the Optimizer's format.

4. **Submit PR**
   - PR title: `🚀 Optimizer: [Performance improvement] Disable cursor glow on mobile devices`
   - Push and submit.
