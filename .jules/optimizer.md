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

## 2026-01-04 - Unnecessary Hooks Execution
   **Bottleneck:** The `GlobalCursorGlow` component was initializing complex `useSpring` and `useTransform` hooks unconditionally, even on mobile devices where the glow effect was eventually rendered as `null`, causing unnecessary CPU overhead and potential main thread blocking.
   **Learning:** Framer Motion hooks like `useSpring` and `useTransform` register internal event listeners and create animated values. Executing them when not needed wastes resources.
   **Prevention:** Hooks must be called unconditionally at the top level, but their *inputs* or the *effects* they trigger can be conditionally bypassed, or the component itself can be conditionally rendered by its parent to avoid mounting entirely on mobile devices.
