1. **Remove `loading="lazy"` from above-the-fold images:**
   - Modify `src/components/layout/Navbar.tsx` to ensure both logo `<img>` tags use `fetchPriority="high"` and `decoding="sync"` instead of `loading="lazy"`. Since these are in the navbar, they are above the fold.
2. **Review and optimize other `<img>` tags:**
   - In `src/components/layout/Footer.tsx`, the logo is below the fold. `loading="lazy"` is appropriate, so we can keep it as is.
   - In `src/components/loading/LoadingScreen.tsx`, check images to ensure they aren't using lazy loading unnecessarily if they're critical.
   - In `src/components/showcase/EventGallery.tsx`, ensure `width` and `height` are provided and lazy loading is used correctly.
3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
4. **Submit PR:**
   - Use title `🚀 Optimizer: [Performance improvement]`
   - Add description of changes.
