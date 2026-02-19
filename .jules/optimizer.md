# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2026-02-19 - Canvas Render Loop Optimization
   **Bottleneck:** The `ParallaxStarfield` component was creating thousands of `rgba()` strings and modifying canvas state (`fillStyle`) for every star in every frame, causing excessive garbage collection and CPU usage.
   **Learning:** Canvas `fillStyle` changes are expensive because they involve string parsing. Batched drawing by color (setting `fillStyle` once per group) and using `globalAlpha` for opacity variations is significantly more performant.
   **Prevention:** When animating many objects on a canvas, always group draw calls by shared properties (like color) to minimize state changes and avoid allocating new strings in the render loop.
