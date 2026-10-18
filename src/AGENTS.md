# Frontend architecture

- Public claims and concierge knowledge share `data/facts.ts`, with source/year provenance. Omit missing evidence rather than infer it; site and assistant must agree. The server concierge must consume the same facts.
- Services and disciplines use shared data modules for pages and navigation. Brand parts compose exported tokens without changing generated design-system files, preventing presentation drift.
- Motion wrappers preserve grid stretch with one-shot opacity/transform reveals. Native View Transitions have an AnimatePresence fallback; the app shell owns navigation and global backgrounds so route exits cannot remount them.
- Hero playback recovery controls use a body portal above page content so the concierge dock cannot block Play.
- Retained metric tools have no portfolio metric dataset. Briefs use only venture identity, sector, role and source-backed periods; do not invent performance reports.