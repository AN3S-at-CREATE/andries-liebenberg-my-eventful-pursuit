# Dead code and tech debt

| Path | Issue | Evidence | Risk | Recommended action | Priority |
| --- | --- | --- | --- | --- | --- |
| `src/assets/logo.svg` | Unused since the design-system wordmark replaced it; 685 KB SVG wrapping embedded raster images | No imports (`grep "assets/logo.svg"`) | None at runtime (Vite only bundles imported assets) | Delete once the user confirms | Low |
| `public/favicon.svg` | 685 KB SVG wrapping raster images, used as the favicon (same file as `src/assets/logo.svg`; in `LEGACY_BRAND_ASSETS`) | `index.html` link | Slow first load of the icon | Replace with a small favicon from the design system once a vector logo exists | Medium |
| `index.html` share image (`og:image`, `twitter:image`, JSON-LD `image`/`logo`) and `DEFAULT_IMAGE` in `src/components/seo/Seo.tsx` | A Lovable-hosted share image, not a design-system asset; the guard doesn't check share images yet | `index.html` meta tags | Off-brand previews when links are shared | Add a share image (and a square or vector mark) to the design system, then point these at it and extend the guard | Medium |
| `src/assets/loading-screen.gif` | 5.7 MB animated AN3S logo (500×500) on the loading screen, not a design-system asset | `LoadingScreen.tsx` import; in `LEGACY_BRAND_ASSETS` | Heavy first paint; brand asset outside the design system | Add a loading animation (or a light vector one) to the design system, then use it; the design-system wordmark is already the fallback | Medium |
| `src/components/effects/CursorGlow.tsx`, `GlobalCursorGlow.tsx` | `bg-gradient-radial` is not defined in Tailwind or the preset, so the "mixed" glow renders without a background | No `gradient-radial` in config or preset | Mixed cursor glow invisible | Use the design system's gradients or retire the cursor glow in the motion update | Low |
| `ParallaxStarfield`, `ParallaxElements`, `GlobalCursorGlow`, card hover lift | Motion conflicts with the brand book ("light breathes, nothing travels") | Design-system README, Motion | Off-brand feel | Second design-system update | Medium |
| `AGENTS.md` | Says to use pnpm with `pnpm-lock.yaml`, but `main` only has `package-lock.json` | `ls *lock*` | Agents pick the wrong install command | Correct the Cursor Cloud section | Low |

## Resolved

- 2026-10-07: `src/App.css` (unused Vite starter styles with hard-coded colours) deleted.
- 2026-10-07: `BackgroundFX.tsx` runtime bugs (`.sort`/`.forEach` on an object, undefined `COLORS`/`colorType`) removed by the rebuild.
- 2026-10-07: `IMPLEMENTATION_AUDIT.md` §7 described the old hand-written `:root`/`.dark` theme (cyan primary, pink secondary); rewritten to point at the design-system export.
- 2026-10-08: `public/placeholder.svg` (Lovable template placeholder in hard-coded greys, referenced nowhere: `git grep placeholder.svg` empty) deleted when the guard started scanning `public/` and SVGs.
- 2026-10-08: `public/favicon.ico` deleted: it was the Lovable template's heart icon (not an AN3S mark), unreferenced; `/favicon.svg` stays the site's icon.
- 2026-10-08: the ROI calculator's PDF export (`ROICalculatorModal.tsx`) hard-coded RGB colours in jsPDF calls (old graphite and old cyan); now uses the design-system tokens.
