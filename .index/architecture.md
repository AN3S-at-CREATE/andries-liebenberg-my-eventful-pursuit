# Architecture

## Overview

Single-page app: Vite 5 + React 18 + TypeScript, shadcn/ui on Radix, Tailwind 3.4, framer-motion (LazyMotion), recharts, react-router 6, TanStack Query. Dynamic features call hosted Supabase edge functions (`an3s-concierge`, `performance-brief`, `send-contact-email`). Lovable builds and publishes it; GitHub `main` and Lovable stay in sync both ways.

## Styling: the design system is the only source of truth

```
an3s-design-system (separate repo)          this repo
  project/tokens.json  --tools/export.mjs-->  dist/web/  --npm run ds:sync-->  src/design-system/  (generated, hashed)
                                                                                   |
   index.html  <-- Montserrat URL (manifest.googleFontsHref)                       |
   tailwind.config.ts  presets: [tailwind-preset.js]  <----------------------------+
   src/index.css  @import tokens.css, shadcn.css  <--------------------------------+
   code needing raw values  import { color, shadow } from "@/design-system/tokens" <+
```

- Colour roles (from the design system's exporter): `primary` = pink-glow, `secondary` = cyan-glow, `accent` = nebula, `muted`/`card`/`popover` = panel, `border` = line, `input` = line-strong, `ring` = focus (cyan), `destructive` = danger, `success` = success, charts pink/cyan/blue/violet/ink.
- Translucent colours (line, line-strong) also export `-channels` and `-alpha`, so Tailwind opacity modifiers (`border-border/50`) multiply instead of producing invalid CSS.
- Stock Tailwind palettes and drop shadows are gone: the preset replaces `theme.colors` and maps `shadow-sm…2xl` to none (depth comes from `shadow-glow-*`).
- The guard (`scripts/check-design-system.mjs`) enforces it locally and in CI.

## Background stack (App.tsx)

ParallaxStarfield (canvas stars, scroll parallax, twinkle) → NebulaClouds (blurred smoke) → BackgroundFX (design-system backdrop: circuits, streaks, smoke) → GlobalCursorGlow. Pages add ParallaxElements orbs. Parallax and cursor glow conflict with the brand book's motion rule ("light breathes, nothing travels"); scheduled for the second design-system update.

## Constraints

- `PROTECTED_CONTENT.md`: additive-only for routes, sections, data, AI tools, edge functions, hooks and contact details.
- Many automated agents open PRs (Jules bolt/palette/sentinel/optimizer, Copilot, Claude); keep changes focused.
- Dev uses esbuild, production SWC (see AGENTS.md caveats).
