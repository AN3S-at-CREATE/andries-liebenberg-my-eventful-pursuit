# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2025-02-28 - Canvas Particle Render Overhead and Transparency Preservation
   **Bottleneck:** `BackgroundFX` re-assigned `ctx.fillStyle` dynamically as strings (e.g., `"rgba(...)"`) for thousands of particles each frame, causing expensive string parsing, garbage collection overhead, and frequent path generation via `ctx.arc()`. Furthermore, rendering a solid background color obscured layers beneath it.
   **Learning:** Sorting particles by color ahead of time, changing `fillStyle` only when the color changes, utilizing `ctx.globalAlpha` instead of string interpolation for transparency, using `ctx.fillRect()` instead of `ctx.arc()` for tiny particles (< 1.5px), and clearing the frame using `ctx.clearRect()` drastically improves canvas render performance and maintains stack visibility.
   **Prevention:** Always batch canvas drawing commands by grouping state changes (like `fillStyle`). Use math and context states (`globalAlpha`) rather than string parsing when possible, substitute complex paths with primitives (`fillRect`) for small shapes, and consider visibility of underlays when refreshing frames.
