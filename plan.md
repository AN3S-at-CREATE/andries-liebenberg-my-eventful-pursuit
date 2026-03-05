1. **Optimize Event Gallery Images:** The EventGallery component uses large images without specifying `width` and `height`, and without using `loading="lazy"`. I will modify `src/components/showcase/EventGallery.tsx` to include `loading="lazy"`, `width="1024"`, and `height="576"` on the `<img>` tags in the gallery and the lightbox. I will also make sure to use `decoding="async"` where applicable. I will also do the same for the logo in the Footer, Navbar and LoadingScreen.
   - Files to modify:
     - `src/components/layout/Footer.tsx` (add width, height, loading="lazy", decoding="async")
     - `src/components/layout/Navbar.tsx` (add width, height, loading="lazy", decoding="async")
     - `src/components/loading/LoadingScreen.tsx` (already checked some, but we'll add width and height)
     - `src/components/showcase/EventGallery.tsx` (add width, height, loading="lazy", decoding="async")
2. **Pre-commit checks:** Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
3. **Submit:** Submit the changes with branch name "optimizer/image-optimization", and PR title "🚀 Optimizer: [Performance improvement] Optimize images with loading=lazy and explicit dimensions".
