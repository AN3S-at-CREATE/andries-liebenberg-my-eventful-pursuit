# Motion v1 and navigation

- [x] Add shared motion timings, persistent navigation and route transitions.
- [x] Add stagger reveals, reversible ledger disclosures and global-only starfield motion.
- [x] Verify headings, focus, anchors, prices, reduced motion, mobile CLS and protected hashes.
- [x] Leave unpublished and report all verification results.

## Verification
- Hero component, test and media hashes unchanged; facts, prices and loading-screen hashes unchanged.
- Services eyebrow and H1 clear the fixed navigation; heading anchor lands at 80px.
- Public routes and venture detail render one H1; navigation focus lands on H1 with native support and fallback.
- Navigation stays mounted; active rail and aria-current follow the route, including AI for Dreamforge.
- Ledger closes after 420ms, reverses on keyboard activation, and excludes collapsing links from keyboard focus; 38 offers retained.
- Lighthouse mobile Services CLS: 0.000244, below 0.1; no horizontal overflow at 390px.
- Reduced motion: zero running animations, no price blur, starfield offset zero.
- Global ParallaxStarfield is mounted only in App.tsx: -28px at scrollY 700 on desktop, zero on phone and reduced motion.
- ParallaxElements has no imports or mounted usages; BackgroundFX has no scroll-linked movement.
- 66 tests and design-system check passed; changed-file lint has no errors. Existing generated-auth lint error remains outside scope.
- No publishing or deployment requested.
