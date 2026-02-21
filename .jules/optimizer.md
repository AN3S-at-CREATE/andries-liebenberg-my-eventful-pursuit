# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-22 - Optimized Canvas Rendering
   **Bottleneck:** The `ParallaxStarfield` component was creating thousands of string allocations (`rgba(...)`) and state changes (`ctx.fillStyle`) every frame in the render loop.
   **Learning:** Grouping draw calls by color and using `ctx.globalAlpha` for opacity allows reusing `ctx.fillStyle`, which significantly reduces garbage collection overhead and CPU usage.
   **Prevention:** When animating with Canvas 2D, always batch similar operations and avoid creating objects or strings inside the `requestAnimationFrame` loop.
