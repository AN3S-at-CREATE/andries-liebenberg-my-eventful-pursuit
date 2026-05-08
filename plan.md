1. **Fix `ticking` logic in `ScrollToTop.tsx`:**
   - In `src/components/layout/ScrollToTop.tsx`, the `ticking` variable is being set to `false` synchronously right after the `requestAnimationFrame` call inside `toggleVisibility`. This defeats the entire purpose of the debounce, as the next scroll event will immediately pass the `!ticking` check.
   - I'll remove the redundant nested `window.requestAnimationFrame` calls and structure it properly with a single `ticking` check.

2. **Fix `ticking` logic in `GlobalCursorGlow.tsx`:**
   - Same issue. Wait, looking closer at `GlobalCursorGlow.tsx` and `CursorGlow.tsx`, they DON'T have the `ticking = false` synchronous bug at the end of the handler. They only do `ticking = false` *inside* the `requestAnimationFrame` callback.
   - Wait, let me double check the `ScrollToTop.tsx` file again.

3. Let's read `ScrollToTop.tsx` closely.
   ```javascript
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
      ticking = false; // THIS IS THE BUG!
    };
   ```
   This is exactly the bug mentioned in memory: "When implementing `requestAnimationFrame` debouncing with a `ticking` flag, ensure the flag is strictly reset to `false` within the async callback itself. Avoid modifying the flag synchronously outside the callback or over-nesting `requestAnimationFrame` calls, which nullifies the debounce benefits."

4. I will refactor `ScrollToTop.tsx` to fix the nested `requestAnimationFrame` and the synchronous `ticking = false`.

5. Let's create a git merge diff.
