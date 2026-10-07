# File inventory (scoped)

Paths relative to the repository root.

## Root and tooling

| Path | Purpose | Status |
| --- | --- | --- |
| `AGENTS.md` | Rules for agents: "Design system" section (only source of truth, never edit `src/design-system/`, no hard-coded colours/fonts, role names), then Cursor Cloud notes (pnpm advice predates the switch to `package-lock.json`) | Active |
| `PROTECTED_CONTENT.md` | Additive-only registry of routes, sections, data, AI tools, edge functions, hooks, contact info; §10 design system | Active |
| `index.html` | Page shell, SEO meta, JSON-LD; loads Montserrat from the design system's Google Fonts URL | Active |
| `tailwind.config.ts` | `presets: [an3s]` (design-system preset owns colours, fonts, radii, shadows, type sizes); keeps container, keyframes and animations (glows in `--pink-hsl` / `--cyan-hsl`) | Active |
| `package.json` | Scripts incl. `check:ds`, `ds:sync`, `build` (prebuild regenerates `public/sitemap.xml`), `test` (vitest), `lint` | Active |
| `package-lock.json` | The lockfile on `main` (no `pnpm-lock.yaml`); install with `npm ci` | Active |
| `scripts/sync-design-system.mjs` | Copies the design system's `dist/web/` into `src/design-system/` (`--from`, `$AN3S_DESIGN_SYSTEM`, or `../Design Sytsem AN3S`) | Active |
| `scripts/check-design-system.mjs` | Guard: vendored files match `manifest.json` (LF-normalised sha256), fonts and preset wired, no hex/rgb/hsl literals, stock Tailwind colours, arbitrary colours or font-family declarations; `ds-allow:` comment for justified exceptions | Active |
| `scripts/generate-sitemap.ts` | Writes `public/sitemap.xml` before dev/build | Active |
| `.github/workflows/design-system.yml` | Runs the guard on pull requests and pushes to `main` (Node 20, no install) | Active |
| `.gitignore` | Includes `.agents/` (local analysis memory) | Active |

## Design system (generated — never edit)

| Path | Purpose | Status |
| --- | --- | --- |
| `src/design-system/tokens.css` | Every token as a CSS custom property, `-hsl` channel copies, `-channels`/`-alpha` for translucent colours, `.type-*` classes | Generated |
| `src/design-system/shadcn.css` | shadcn roles → tokens: primary pink-glow, secondary cyan-glow, accent nebula, destructive danger, success, border line, input line-strong, ring focus, charts | Generated |
| `src/design-system/tailwind-preset.js` | Palette = tokens + roles only (`white`/`black` = `ink`/`void`), fonts, radii, glow shadows (stock drop shadows = none), gradients, type sizes, `space-*`, sizes | Generated |
| `src/design-system/tokens.ts` | Typed values (`color`, `shadow`, `gradient`, …, `googleFontsHref`) for charts and canvas | Generated |
| `src/design-system/assets/` | `an3s-wordmark.png` (used as the logo), `an3s-wordmark-on-space.png`, `icons/*.svg` (8 service icons) | Generated |
| `src/design-system/manifest.json`, `README.md` | Source tokens hash, font URL, role map, file hashes; consumer notes | Generated |

## Source

| Path | Purpose | Status |
| --- | --- | --- |
| `src/index.css` | Imports `design-system/tokens.css` + `shadcn.css`; base layer; role-named neon helpers (`glow-primary/secondary`, `glow-text-*`, `divider-*`, `glass`, `glass-primary/secondary`, `badge-glow-*`, `btn-glow-*`) | Active |
| `src/App.tsx` | Providers, LazyMotion, global background stack (ParallaxStarfield, NebulaClouds, BackgroundFX, GlobalCursorGlow), lazy routes, loading screen | Active |
| `src/pages/` | Index, About, Companies, CompanyDetail, Contact, Showcase, Downloads, Status, Auth, Admin, Privacy, Terms, CookiePolicy, NotFound; `expertise/` (index + 6), `ai/` (index + EventPulse, LynkieSky, NeuroLogix, CustomModels) | Active |
| `src/components/background/BackgroundFX.tsx` | Design-system backdrop: circuit traces + light streaks on a canvas drawn once per resize, pink smoke low-left, blue smoke right; reports mount to `lib/backgroundStatus` | Active |
| `src/components/effects/` | ParallaxStarfield (stars in `pink`/`cyan`/`ink` from tokens), NebulaClouds (pink/blue smoke), ParallaxElements (`variant` primary/secondary/mixed), CursorGlow / GlobalCursorGlow (`color` primary/secondary/mixed) | Active |
| `src/components/layout/` | Navbar, Footer (design-system wordmark), PageTransition, ScrollToTop, ErrorBoundary | Active |
| `src/components/motion/MotionReveal.tsx` | Scroll reveals; `MotionHover` glow `primary`/`secondary`/`both` from `tokens.ts` shadows | Active |
| `src/components/ai-tools/`, `companies/`, `contact/`, `showcase/`, `loading/`, `seo/` | Feature components (Concierge, ROI calculator with token chart colours, company cards and metrics, contact form, gallery, loading screen with the wordmark, SEO) | Active |
| `src/components/ui/` | shadcn primitives; `card.tsx` variants `glass`, `glass-primary`, `glass-secondary` and glow `primary`/`secondary`/`both`; `badge.tsx` `glow-primary/secondary`; `button.tsx` `glow`/`glow-secondary`; `toast.tsx` danger tokens; `chart.tsx` has one `ds-allow` | Active |
| `src/data/` | companies, companyMetrics, an3sKnowledge (protected datasets) | Active |
| `src/assets/` | `loading-screen.gif`, showcase photos; `logo.svg` (unused since 2026-10-07) | Active |
