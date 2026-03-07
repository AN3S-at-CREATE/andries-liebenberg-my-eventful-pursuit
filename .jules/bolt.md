## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2026-02-21 - [Canvas Allocation Bottleneck]
**Learning:** Constructing new color strings (e.g. `rgba(r,g,b,a)`) for every entity in a render loop causes massive Garbage Collection pressure.
**Action:** Use `ctx.globalAlpha` for opacity changes and keep `ctx.fillStyle` constant. Batch draw calls by color to minimize state changes.

## 2025-06-21 - Canvas State Management Overhead
**Learning:** In HTML5 Canvas render loops, state changes like `ctx.fillStyle` are extremely expensive. Changing `fillStyle` ~200 times per frame causes massive GC churn and CPU overhead. Additionally, dynamically concatenating colors (`color + opacity + ")"`) for `rgba` compounds this issue.
**Action:** Always sort objects by style during initialization. In the draw loop, track the applied state (`lastColor`) and update the context only when it actually changes. Use `ctx.globalAlpha` combined with static color strings instead of dynamic string concatenation for variable opacity.

## 2025-06-21 - Conditional Returns with Framer Motion Hooks
**Learning:** When attempting to optimize out components on mobile using early returns (`if (isMobile) return null;`), you must be careful if the component uses Framer Motion hooks like `useTransform` inline within the JSX style props. React's rules of hooks dictate that hooks cannot be called conditionally, meaning any early return placed above the inline hook call will result in a runtime error ("Rendered fewer hooks than expected").
**Action:** Always extract Framer Motion hooks unconditionally to the top level of the component before adding any conditional early returns for performance optimizations.
