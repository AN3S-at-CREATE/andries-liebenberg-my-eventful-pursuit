# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2026-02-24 - Canvas Compositing and Render Loop Optimization
   **Bottleneck:** `BackgroundFX` component (z-index: -10) was filling the canvas with an opaque color (`ctx.fillRect`), obscuring underlying `ParallaxStarfield` and `NebulaClouds` components while still paying their rendering cost. Additionally, it allocated new strings for color/opacity in every frame of the render loop.
   **Learning:** Opaque background layers at higher z-indices prevent underlying layers from being seen, wasting GPU resources. Constructing strings (like `rgba()`) inside a render loop triggers frequent Garbage Collection.
   **Prevention:** Use `ctx.clearRect` for transparent overlays to reveal underlying layers. Batch draw calls by color to minimize state changes (`fillStyle`), and use `ctx.globalAlpha` instead of string manipulation for opacity changes.
