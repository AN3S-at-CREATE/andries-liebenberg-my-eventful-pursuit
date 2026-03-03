# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2025-06-12 - Mobile Unnecessary Effects Optimization
   **Bottleneck:** The `GlobalCursorGlow` component was adding event listeners (`mousemove`, `mouseleave`, `mouseenter`) and calculating framer motion values via hooks on all devices, even though the visual effect was only useful for pointer-equipped desktop devices. This led to unnecessary performance overhead on mobile.
   **Learning:** Hooks like `useIsMobile` can be effectively used to exit early from `useEffect` logic and render `null`, thereby avoiding completely unnecessary render cycles, layout thrashing, and event listener overhead on mobile configurations where cursor effects are not applicable.
   **Prevention:** Whenever designing a desktop-only visual effect (such as cursor tracking), integrate conditional logic (e.g., via `useIsMobile()`) early in the component lifecycle to bypass event bindings and dom rendering for mobile devices.
