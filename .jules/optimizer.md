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

## 2025-02-19 - Critical Image Prioritization
   **Bottleneck:** Important above-the-fold images (like Navbar logos and Loading screen animations) were either using `loading="lazy"` and `decoding="async"` or had no explicit fetch priority. This delayed rendering of these critical elements, negatively impacting the Largest Contentful Paint (LCP) metric.
   **Learning:** The `loading="lazy"` attribute delays the loading of images until they are close to the viewport. However, applying it to images already in the initial viewport (above the fold) actually slows down their loading because the browser has to wait until the DOM layout is calculated to determine if they are in the viewport. `decoding="async"` also delays rendering to avoid blocking the main thread, which is bad for critical visual elements. Using React's camelCase `fetchPriority="high"` directly signals to the browser to prioritize the resource early in the load cycle, significantly improving LCP.
   **Prevention:** Never apply `loading="lazy"` or `decoding="async"` to images that are visible on initial page load (above-the-fold). Instead, use `fetchPriority="high"` and `decoding="sync"` for critical, high-priority images such as logos, hero images, or loading animations to protect LCP and ensure they render immediately.
## 2025-03-09 - [Optimize BackgroundFX Performance]
**Bottleneck:** `ctx.createLinearGradient` was called on every frame in the `drawGrid` loop within `BackgroundFX.tsx`, causing high Garbage Collection pressure and performance drops.
**Learning:** Recreating complex objects like `CanvasGradient` inside animation loops forces the engine to repeatedly allocate and discard memory.
**Prevention:** Cache these objects outside the loop (e.g., in outer scope) and only recreate them during initialization or window resize events.

## 2025-10-25 - Fix over-nested requestAnimationFrame
**Bottleneck:** The `ScrollToTop` component's scroll event listener used a double-nested `requestAnimationFrame` debounce approach where `ticking` was set to `true` by an outer wrapper, completely blocking the inner `requestAnimationFrame` and rendering the scroll handler non-functional (so `setIsVisible` was never called).
**Learning:** When implementing `requestAnimationFrame` debouncing with a `ticking` flag, over-nesting `requestAnimationFrame` calls and modifying the flag synchronously outside the inner callback breaks the debounce logic and prevents state updates.
**Prevention:** Ensure the `ticking` flag is strictly reset to `false` within the async callback itself, and use a single straightforward `requestAnimationFrame` layer for event handlers like `onScroll`.
