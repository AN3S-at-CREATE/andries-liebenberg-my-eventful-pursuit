# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2026-02-22 - Global Cursor Optimization & Fix
   **Bottleneck:** `GlobalCursorGlow` was adding `window.scrollY` to mouse coordinates for a `fixed` element, causing cursor misalignment on scroll. It also ran unnecessarily on touch devices.
   **Learning:** Fixed-positioned elements should use viewport-relative coordinates (`clientX`/`clientY`) directly. Touch devices often lack a cursor, so cursor-following effects should be disabled.
   **Prevention:** Always verify coordinate systems when mixing `fixed`/`absolute` positioning with mouse events. Use `matchMedia('(pointer: coarse)')` to disable cursor effects on touch devices.
