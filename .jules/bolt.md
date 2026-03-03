## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2026-02-21 - [Canvas Allocation Bottleneck]
**Learning:** Constructing new color strings (e.g. `rgba(r,g,b,a)`) for every entity in a render loop causes massive Garbage Collection pressure.
**Action:** Use `ctx.globalAlpha` for opacity changes and keep `ctx.fillStyle` constant. Batch draw calls by color to minimize state changes.

## 2025-03-03 - [Mobile Event Listener Bottleneck]
**Learning:** Found `GlobalCursorGlow` adding `mousemove` listeners and running spring animations on mobile devices where no cursor exists. This wastes CPU cycles tracking touch events unnecessarily and creates useless DOM nodes.
**Action:** Used `useIsMobile()` hook to short-circuit the event listeners and return `null` for the component on mobile, saving rendering, event-handling, and Garbage Collection overhead. Ensure `framer-motion` hooks are called *before* the conditional return to satisfy React rules.
