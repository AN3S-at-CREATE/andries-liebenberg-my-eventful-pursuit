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

## 2026-03-08 - Above-the-fold Image Loading Optimization
   **Bottleneck:** The main logo image in the Navbar was marked with `loading="lazy"`, which tells the browser to de-prioritize its loading. Because the Navbar is visible immediately on page load, this harms the Largest Contentful Paint (LCP) performance metric.
   **Learning:** Applying lazy loading to above-the-fold content delays rendering of elements that the user expects to see immediately. LCP represents how quickly the main content of a webpage loads. Delaying it reduces perceived performance and harms SEO. Critical above-the-fold images should be loaded eagerly and prioritized using `fetchpriority="high"`.
   **Prevention:** Never apply `loading="lazy"` to above-the-fold images (like logos in the header or hero banner images). Instead, use `fetchpriority="high"` and `decoding="sync"` to ensure they load as fast as possible to improve LCP.
