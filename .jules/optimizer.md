# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-02-20 - Canvas Memory Allocation Optimization
   **Bottleneck:** The `ParallaxStarfield` animation loop was creating thousands of new string objects (`rgba(...)`) per second to set `ctx.fillStyle`, causing frequent garbage collection and potential frame drops.
   **Learning:** In canvas animation loops, avoid creating objects or strings. Instead of setting `fillStyle` with a new string for every item, batch draw calls by color (setting `fillStyle` once) and use `ctx.globalAlpha` for opacity variations, which avoids memory allocation.
   **Prevention:** When animating many objects with Canvas API, group them by shared properties (like color) to minimize state changes and avoid allocations inside the loop.
