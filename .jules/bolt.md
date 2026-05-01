## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2026-02-21 - [Canvas Allocation Bottleneck]
**Learning:** Constructing new color strings (e.g. `rgba(r,g,b,a)`) for every entity in a render loop causes massive Garbage Collection pressure.
**Action:** Use `ctx.globalAlpha` for opacity changes and keep `ctx.fillStyle` constant. Batch draw calls by color to minimize state changes.

## 2025-06-21 - Canvas State Management Overhead
**Learning:** In HTML5 Canvas render loops, state changes like `ctx.fillStyle` are extremely expensive. Changing `fillStyle` ~200 times per frame causes massive GC churn and CPU overhead. Additionally, dynamically concatenating colors (`color + opacity + ")"`) for `rgba` compounds this issue.
**Action:** Always sort objects by style during initialization. In the draw loop, track the applied state (`lastColor`) and update the context only when it actually changes. Use `ctx.globalAlpha` combined with static color strings instead of dynamic string concatenation for variable opacity.

## 2025-03-11 - O(N) Array .find() in Sort Comparators
**Learning:** During array sorting in `CompanyGrid.tsx`, using an O(N) function like `getMetricsByCompanyId` (which uses `.find()`) inside the comparator creates an O(M * N log N) performance bottleneck.
**Action:** Precompute a `Map` of necessary lookup data in O(M) time before sorting. Use the Map for O(1) lookups inside the sort comparator. Always wrap derived sorted/filtered arrays in `useMemo` to prevent unnecessary re-computations on re-renders.

## 2026-04-17 - [Scroll Event Layout Thrashing]
**Learning:** Synchronous `scroll` event listeners can cause significant layout thrashing and high CPU usage during continuous scrolling. It can block the browser's native scrolling.
**Action:** Always debounce synchronous `scroll` event listeners using `window.requestAnimationFrame()` and mark the event listener with `{ passive: true }` to prevent blocking the main thread and the browser's native scrolling.
## 2024-03-24 - Main Thread Blocking from mousemove Events
**Learning:** High-frequency native events like `mousemove` can easily block the main thread and cause layout thrashing if they trigger synchronous DOM reads (like `getBoundingClientRect()`) or complex state updates on every event firing. This is particularly problematic for users with high-polling-rate mice.
**Action:** Always wrap high-frequency native event listeners (like `mousemove` or `scroll`) in `window.requestAnimationFrame()` using a `ticking` boolean flag to throttle execution to the display refresh rate (typically 60Hz).

## 2024-05-01 - Debounce heavy resize events
**Learning:** Recreating complex objects (like CanvasGradient) and re-initializing large particle arrays on every resize event without debouncing causes massive Garbage Collection pressure and performance drops.
**Action:** Always debounce window `resize` event listeners using a `setTimeout` (e.g. 150ms) when they trigger heavy operations like canvas re-initialization, and clear the timeout on unmount.
