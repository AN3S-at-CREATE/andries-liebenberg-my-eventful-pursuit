## 2024-06-11 - [Scroll Layout Thrashing]
**Bottleneck:** Continuous scrolling blocked the main thread and caused layout thrashing due to synchronous scroll event listeners calling state updates for the scroll-to-top button.
**Learning:** `window.addEventListener('scroll')` must be marked as `{ passive: true }` so the browser can paint scrolling natively. Further, synchronous state updates inside scroll events cause high CPU usage.
**Prevention:** Always debounce high-frequency `scroll` updates using `window.requestAnimationFrame()` to sync state changes with the display refresh rate.

