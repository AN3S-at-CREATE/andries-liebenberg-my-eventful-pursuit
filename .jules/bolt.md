## 2024-05-24 - [Canvas Readback Bottleneck]
**Learning:** Found `ctx.getImageData()` and `ctx.putImageData()` being used inside a requestAnimationFrame loop to generate noise. This causes massive main-thread blocking, especially on high-resolution displays, as it forces GPU-CPU synchronization and iterates millions of pixels in JS.
**Action:** Replaced with a pre-generated noise pattern drawn via `ctx.fillStyle` and `ctx.fillRect`. Avoid pixel manipulation in animation loops.

## 2026-02-21 - [Canvas Allocation Bottleneck]
**Learning:** Constructing new color strings (e.g. `rgba(r,g,b,a)`) for every entity in a render loop causes massive Garbage Collection pressure.
**Action:** Use `ctx.globalAlpha` for opacity changes and keep `ctx.fillStyle` constant. Batch draw calls by color to minimize state changes.

## 2025-05-18 - [Canvas Render Loop Overdraw & String Allocation]
**Learning:** Found string allocations (`+ particle.opacity + ")"`) inside `requestAnimationFrame` loop per particle causing massive GC overhead. Also, `ctx.arc` + `ctx.fill` is unnecessarily expensive for tiny particles (<1.5px), and redundant background fills cause overdraw when a transparent background (`clearRect`) would suffice.
**Action:** Use `ctx.globalAlpha` for transparency instead of dynamic color strings. Batch `ctx.fillStyle` by sorting entities by color. Use `ctx.fillRect` for tiny particles instead of `ctx.arc`. Use `ctx.clearRect` for container transparency instead of solid fills to reduce GPU fill rate.
