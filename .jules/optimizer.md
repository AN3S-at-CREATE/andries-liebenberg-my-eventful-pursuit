# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-20 - Canvas Rendering Optimization
   **Bottleneck:** `ParallaxStarfield` was creating thousands of new string objects (e.g., `rgba(...)`) and setting `ctx.fillStyle` for every star in every animation frame, causing high garbage collection pressure and CPU usage.
   **Learning:** Grouping draw calls by color allows minimizing state changes (`ctx.fillStyle`). Using `ctx.globalAlpha` for opacity variations avoids the need to construct new color strings for each element.
   **Prevention:** When animating many elements on Canvas, batch them by shared properties (like color) and use `globalAlpha` for individual opacity to avoid expensive string allocations and context state changes.
