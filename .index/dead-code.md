# Dead code and tech debt

| Path | Issue | Evidence | Risk | Recommended action | Priority |
| --- | --- | --- | --- | --- | --- |
| `src/assets/logo.svg` | Unused since the design-system wordmark replaced it; 685 KB SVG wrapping embedded raster images | No imports (`grep "assets/logo.svg"`) | None at runtime (Vite only bundles imported assets) | Delete once the user confirms | Low |
| `src/assets/loading-screen.gif` | 5.7 MB animated AN3S logo, unused (LoadingScreen shows the design system's `an3s-loader.svg`); pinned in `LEGACY_BRAND_ASSETS` | No imports | None at runtime (not bundled) | Delete once the owner confirms (retained per PROTECTED_CONTENT.md §11) | Low |
| `src/integrations/supabase/previewAuthStorage.ts:38` | `let timer` never reassigned: the only ESLint error on `main` | `npx eslint .` | `npm run lint` exits 1 | `const timer` | Low |
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
- 2026-10-14: `public/favicon.svg` (685 KB raster wrapper) replaced by the design system's 944-byte `an3s-mark.svg` copy; its `LEGACY_BRAND_ASSETS` entry removed (the old content survives as `src/assets/logo.svg`).
- 2026-10-14: the Lovable-hosted share image in `index.html` (og/twitter image, JSON-LD image and logo) and `Seo.tsx` replaced by the design system's `an3s-share.png` and `an3s-mark-512.png`, served from `public/`; the guard now checks `index.html`'s share images and JSON-LD logos.
- 2026-10-14: LoadingScreen's static PNG wordmark and spinning `Loader2` (travelling motion) replaced by the design system's breathing `an3s-loader.svg`; Navbar, Footer and home hero use `an3s-wordmark.svg` instead of the PNG.
