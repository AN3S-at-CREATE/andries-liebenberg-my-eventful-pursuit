# Design-system checker maintenance

Preserve the `check-design-system.mjs` contract:
- Scan `index.html`, `tailwind.config.ts` and code/SVG files under `src/` and `public/` (`.ts`, `.tsx`, `.js`, `.css`, `.html`, `.svg`, etc.), ignoring comments.
- Parse both `theme` and `theme.extend`; preset keys cannot be reintroduced through spreads or computed keys.
- Standalone image SVGs cannot read CSS variables; icons/logos must come from design-system assets.
- Malformed `src/design-system/manifest.json` must fail gracefully, not crash.
- Fail on every symlink at `index.html`, `tailwind.config.ts`, or under `src/`/`public/`, dangling or not; never follow them.
- Keep `.github/workflows/design-system.yml` using the same check on every PR. Honour justified `ds-allow: <reason>` comments on or above a line.
- Legacy brand assets are pinned by content in `LEGACY_BRAND_ASSETS`; file changes fail, and entries must be removed when files go. Lookalike client/event assets require `NOT_BRAND_ASSETS` with a reason.
- `index.html`'s share images (`og:image`, `twitter:image`) and JSON-LD `logo` values must be design-system asset copies served from the site (root paths or `https://an3s.info/...`). `Seo.tsx`'s per-route image, JSON-LD `image` and code-drawn logos are not checked; do not represent them as validated.
- `sync-design-system.mjs` refreshes the public brand copies listed in its `PUBLIC_COPIES`; keep that list and `index.html` in step.