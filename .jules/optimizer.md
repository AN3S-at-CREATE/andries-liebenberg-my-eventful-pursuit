# OPTIMIZER'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-02-19 - Route-based Code Splitting
   **Bottleneck:** All page components were statically imported in `App.tsx`, causing the entire application code to be bundled into a single large file (or few large chunks) loaded on initial visit.
   **Learning:** Modern bundlers like Vite support dynamic imports (`import()`) which, when combined with `React.lazy`, allow splitting code into separate chunks that are loaded on demand.
   **Prevention:** Always use `React.lazy` for route components to ensure the initial bundle size remains minimal and pages are loaded only when accessed.

## 2025-05-24 - Canvas Particle Rendering
   **Bottleneck:** The `ParallaxStarfield` component was using `ctx.arc()` (which constructs a path) for thousands of stars every frame, creating significant CPU overhead even for tiny 1px dots.
   **Learning:** `ctx.fillRect()` is significantly faster than `ctx.arc()` for small shapes because it skips the path construction step. For particles smaller than 1.5px, the visual difference between a square and a circle is negligible.
   **Prevention:** When building particle systems on Canvas, prefer `fillRect` for small particles (< 2px) to reduce draw call overhead.

## 2025-10-24 - Mobile Animation Overhead
   **Bottleneck:** The `NebulaClouds` component was rendering multiple large, blurred `motion.div` elements with infinite animations on all devices, causing high GPU/CPU usage on mobile.
   **Learning:** Heavy CSS filters like `blur()` combined with continuous transforms are expensive on mobile devices. Using `useIsMobile` and `useReducedMotion` hooks allows conditionally simplifying the scene (fewer elements, no animation) without sacrificing the desktop experience.
   **Prevention:** Always check `useIsMobile` or `useReducedMotion` for components with heavy animations or complex visual effects.
