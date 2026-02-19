## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2024-05-24 - [Canvas String Allocation]
**Learning:** Found frequent string allocation (e.g., `rgba(x, y, z, a)`) inside a canvas render loop (`requestAnimationFrame`) for thousands of particles. This causes significant garbage collection pressure and CPU overhead.
**Action:** Pre-calculate color strings and use `ctx.globalAlpha` for opacity changes to avoid creating new strings every frame. Batch draw calls by color to minimize state changes.
