# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2025-10-24 - Canvas Rendering Optimization (BackgroundFX)
   **Bottleneck:** `BackgroundFX` recreated static grid paths every frame and suffered from garbage collection spikes and context switching due to repeated string concatenations for `ctx.fillStyle` and interleaved particle colors. Additionally, an opaque fill was masking underlying components.
   **Learning:** Static background elements should be cached on an offscreen canvas and copied using `ctx.drawImage`. Sorting particle arrays by color allows batching `ctx.fillStyle` operations, significantly reducing context state changes. Separating base color representations from opacity (using `ctx.globalAlpha`) avoids garbage collection from string building. Using `ctx.clearRect` preserves underlying element visibility compared to `ctx.fillRect` with opaque styles.
   **Prevention:** Cache static canvas elements, batch draw operations by style, use `globalAlpha` for opacity instead of RGBA strings, and use `clearRect` to clear context instead of opaque fills when layering effects.
