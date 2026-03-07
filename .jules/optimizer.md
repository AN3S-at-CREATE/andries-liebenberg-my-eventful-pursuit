# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2025-10-24 - Unoptimized Image Tags
   **Bottleneck:** Missing explicit `width` and `height` attributes on `<img>` tags, leading to Cumulative Layout Shift (CLS), and missing `loading="lazy"` on below-the-fold images causing unnecessary early network requests.
   **Learning:** Browsers cannot reserve space for images without explicit dimensions, which causes layout shifts as the image loads. Deferring off-screen image loading with `loading="lazy"` speeds up initial page load and saves bandwidth.
   **Prevention:** Always declare `width` and `height` attributes on all `<img>` tags (matching their CSS aspect ratio) and apply `loading="lazy"` for below-the-fold images. Use `decoding="async"` for non-critical images to avoid blocking the main thread.

## 2026-03-07 - Delayed LCP due to Lazy Loading
   **Bottleneck:** The critical above-the-fold logo image in the Navbar component was using `loading="lazy"` and `decoding="async"`, delaying the Largest Contentful Paint (LCP) and degrading perceived performance.
   **Learning:** While `loading="lazy"` is great for off-screen images, applying it to above-the-fold elements forces the browser to wait until layout is calculated before requesting the image, delaying its display.
   **Prevention:** Never apply `loading="lazy"` or `decoding="async"` to critical above-the-fold images (like logos or hero banners). Always eagerly load these elements to optimize LCP.
