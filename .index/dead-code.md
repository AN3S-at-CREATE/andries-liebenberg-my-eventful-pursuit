# Dead code and tech debt

| Path | Issue | Evidence | Risk | Recommended action | Priority |
| --- | --- | --- | --- | --- | --- |
| `src/assets/logo.svg` | Unused since the design-system wordmark replaced it; 685 KB SVG wrapping embedded raster images | No imports (`grep "assets/logo.svg"`) | None at runtime (Vite only bundles imported assets) | Delete once the user confirms | Low |
| `public/favicon.svg` | 685 KB SVG wrapping raster images, used as the favicon | `index.html` link | Slow first load of the icon | Replace with a small favicon from the design system once a vector logo exists | Medium |
| `src/components/effects/CursorGlow.tsx`, `GlobalCursorGlow.tsx` | `bg-gradient-radial` is not defined in Tailwind or the preset, so the "mixed" glow renders without a background | No `gradient-radial` in config or preset | Mixed cursor glow invisible | Use the design system's gradients or retire the cursor glow in the motion update | Low |
| `ParallaxStarfield`, `ParallaxElements`, `GlobalCursorGlow`, card hover lift | Motion conflicts with the brand book ("light breathes, nothing travels") | Design-system README, Motion | Off-brand feel | Second design-system update | Medium |
| `AGENTS.md` | Says to use pnpm with `pnpm-lock.yaml`, but `main` only has `package-lock.json` | `ls *lock*` | Agents pick the wrong install command | Correct the Cursor Cloud section | Low |

## Resolved

- 2026-10-07: `src/App.css` (unused Vite starter styles with hard-coded colours) deleted.
- 2026-10-07: `BackgroundFX.tsx` runtime bugs (`.sort`/`.forEach` on an object, undefined `COLORS`/`colorType`) removed by the rebuild.
