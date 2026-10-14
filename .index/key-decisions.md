# Key decisions

## 2026-10-07 — The AN3S design system is the only source of truth
The user asked for the site to take its look only from the design system, with pink as the lead colour (the earlier Lovable "Brand Lock" made cyan primary). The design system's web export is vendored into `src/design-system/` and verified by hash; Tailwind, fonts and the shadcn roles come from it; a guard and CI check block hand edits and hard-coded colours or fonts. Missing values are added to the design system first (danger, success and line-strong were added this way).

## 2026-10-07 — Vendored copy, not a package
Lovable builds on its own servers and can't install from a private GitHub repo, so the export is committed here and refreshed with `npm run ds:sync`.

## 2026-10-07 — Role names instead of colour names
Helpers and component options were renamed from cyan/pink to primary/secondary (`glow-cyan` → `glow-primary`, `glass-pink` → `glass-secondary`, `glow="cyan"` → `glow="primary"`, data `accent: "cyan"` → `"primary"`), so every element that used to lead in cyan now leads in pink and the names stay true.

## 2026-10-07 — Glow tints for words and fills, saturated hues for light
`primary`/`secondary` map to `pink-glow`/`cyan-glow` (neon reads as a light core with a saturated bloom); glows, edges, smoke, stars and charts use the saturated `pink`, `cyan`, `blue`. Glass panels lost their black drop shadows (the brand book: light, not shadow).

## 2026-10-07 — BackgroundFX rebuilt as the design-system backdrop
The previous version (perspective grid, particles, noise) called `.sort()`/`.forEach()` on an object and used undefined variables. It is now a static canvas (circuit traces, light streaks) plus pink and blue smoke, redrawn only on resize.

## 2026-10-07 — Motion kept for now
Parallax, cursor glow, hover lift and scroll reveals stay in this update even though the brand book asks for still light; changing them is a separate, visible step.

## 2026-10-14 — Public brand files are synced copies
The favicon, touch icon, share image and JSON-LD logo must sit at fixed URLs, so they live in `public/` as byte-identical copies of design-system assets, written by `npm run ds:sync` (`PUBLIC_COPIES`) rather than by hand. The guard verifies every icon link, `og:image`, `twitter:image` and JSON-LD `logo` in `index.html` against the design-system hashes. No `favicon.ico`: the design system ships none (its asset store refuses .ico) and current browsers read the SVG.

## 2026-10-14 — The hero shows the work, not the events
Andries: the brand is business growth, marketing, development, AI and graphics, not events. The hero's visual is therefore the key visual's Core Work panel built from design-system parts (neon-edged panel, notched tab, the discipline icons), headlining six disciplines; 3D Virtualization & Events and Sales Leadership stay elsewhere on the site. No new imagery was needed.
