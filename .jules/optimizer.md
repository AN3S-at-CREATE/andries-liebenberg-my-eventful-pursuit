# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-03-05 - Canvas Rendering Optimization
   **Bottleneck:** `ParallaxStarfield` was using template strings (e.g., `rgba(...)`) for every star on every frame to handle opacity, forcing expensive string parsing and canvas context state changes (`ctx.fillStyle`) thousands of times per frame.
   **Learning:** The HTML5 Canvas API is state-heavy. Changing `fillStyle` is expensive, especially when parsing strings. Using `ctx.globalAlpha` combined with a constant `ctx.fillStyle` avoids string parsing and minimizes state changes when batched by color.
   **Prevention:** When animating many objects with the same color but different opacities, group them by color, set `fillStyle` once, and use `globalAlpha` for individual opacity.
