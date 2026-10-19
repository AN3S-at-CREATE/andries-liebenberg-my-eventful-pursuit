# Motion v1 and navigation

## Nebula background correction
- [x] Confirm the playing inner-page film is covered by an opaque route-root fill.
- [x] Reveal it only beneath non-home route roots and defer loading until the first inner-page visit.
- [x] Verify visible playback on Services, Work, About and Contact; same video survives navigation and loops, fresh home skips nebula download, phone has no overflow, reduced motion shows only the poster; leave unpublished.
- Verification: six targeted tests and changed-file lint pass; preview build OK. Design-system check still flags only the two pre-existing email-signature asset exceptions, left untouched.

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

## Page content detail
- [ ] Clarify Work examples and brand imagery using supplied material.
- [ ] Replace repetitive expertise claims with approved offers and relevant links.
- [ ] Add verified venture context; omit unsupported company capabilities.
- [ ] Verify preview and checks; leave unpublished and report any missing source material.
