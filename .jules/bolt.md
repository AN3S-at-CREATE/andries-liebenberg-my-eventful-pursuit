## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2024-05-25 - [Canvas String Allocation GC Pressure]
**Learning:** In `ParallaxStarfield.tsx`, `rgba()` color strings were being constructed inside the render loop for every star, every frame (e.g., `rgba(13, 229, 255, ${opacity})`). This creates thousands of string objects per frame, leading to significant Garbage Collection (GC) pressure and potential micro-stuttering.
**Action:** Replaced dynamic string construction with `ctx.globalAlpha` for opacity and static `rgb()` color constants. This avoids string allocation entirely in the hot loop.
