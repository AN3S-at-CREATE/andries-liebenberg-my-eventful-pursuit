# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-02-21 - Canvas Render Loop Optimization
   **Bottleneck:** The `ParallaxStarfield` component was constructing thousands of unique `rgba(...)` string objects per frame and switching `ctx.fillStyle` frequently, causing high Garbage Collection pressure and CPU usage.
   **Learning:** Canvas 2D performance is significantly improved by batching draw calls by shared state (e.g., color) and using `ctx.globalAlpha` for opacity changes instead of parsing color strings.
   **Prevention:** When animating many particles, group them by invariant properties (like color) and use numeric properties (like `globalAlpha`) for per-particle variations.
