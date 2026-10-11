# Design-system checker maintenance

Preserve the `check-design-system.mjs` contract:
- Scan `index.html`, `tailwind.config.ts` and code/SVG files under `src/` and `public/` (`.ts`, `.tsx`, `.js`, `.css`, `.html`, `.svg`, etc.), ignoring comments.
- Parse both `theme` and `theme.extend`; preset keys cannot be reintroduced through spreads or computed keys.
- Standalone image SVGs cannot read CSS variables; icons/logos must come from design-system assets.
- Malformed `src/design-system/manifest.json` must fail gracefully, not crash.
- Fail on every symlink at `index.html`, `tailwind.config.ts`, or under `src/`/`public/`, dangling or not; never follow them.
- Keep `.github/workflows/design-system.yml` using the same check on every PR. Honour justified `ds-allow: <reason>` comments on or above a line.
- Legacy brand assets are pinned by content in `LEGACY_BRAND_ASSETS`; file changes fail, and entries must be removed when files go. Lookalike client/event assets require `NOT_BRAND_ASSETS` with a reason.
- Share images (`og:image`, `twitter:image`), JSON-LD logos and code-drawn logos are not checked yet; do not represent them as validated.