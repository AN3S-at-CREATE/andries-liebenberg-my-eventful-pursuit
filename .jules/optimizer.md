# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2026-03-01 - Image Loading and Dimensions
   **Bottleneck:** High initial load times and Cumulative Layout Shift (CLS) were observed because the large `logo.svg` (685 KB) in the header and footer lacked explicit width and height attributes. The footer logo was also loaded eagerly, competing for bandwidth on initial page load.
   **Learning:** Explicitly declaring `width` and `height` attributes on image tags reserves space in the layout before the image downloads, preventing CLS. Adding `loading="lazy"` to below-the-fold images (like those in the footer) defers their loading until they are near the viewport, saving initial bandwidth.
   **Prevention:** Always add `width` and `height` attributes to `<img>` tags (matching the CSS size/aspect ratio) to reduce CLS, and use `loading="lazy"` for all below-the-fold imagery.
