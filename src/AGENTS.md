# Frontend architecture

- Public claims and concierge knowledge share `data/facts.ts`, with source/year provenance. Omit missing evidence rather than infer it; site and assistant must agree. The server concierge must consume the same facts.
- Services and disciplines use shared data modules for pages and navigation. Brand parts compose exported tokens without changing generated design-system files, preventing presentation drift.
- Lab metadata lives in data/lab.ts; visibility gates counts, sky, lists and routes. SVG positions are constellation offsets rather than slug coordinates, and prices resolve from facts.ts so future stars remain additive.
- Lab rooms use URL-backed tabs and the shared demo hook; brief handoffs are transient and consumed once, keeping conversation content out of persistent storage.
- Documented public built repositories join lab.ts stars and share direct /lab/:slug rooms; the workshop index/count filters those stars, retaining approval gates and legacy workshop room URLs.
- Contact uses React Hook Form and Zod with approved catalogue choices; its server must store before acknowledging receipt, and owner details include the selected service so enquiries remain actionable without email delivery.
- The contact function bundles its own service-title allowlist because deployment excludes frontend files; a parity test prevents catalogue drift.
- Motion wrappers preserve grid stretch with one-shot opacity/transform reveals. Native View Transitions have an AnimatePresence fallback; the app shell owns navigation and global backgrounds so route exits cannot remount them.
- Hero playback recovery controls use a body portal above page content so the concierge dock cannot block Play.
- Retained metric tools have no portfolio metric dataset. Briefs use only venture identity, sector, role and source-backed periods; do not invent performance reports.