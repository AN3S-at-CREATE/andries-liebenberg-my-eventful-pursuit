# Frontend architecture

- Public claims and concierge knowledge share `data/facts.ts`, with source/year provenance. Omit missing evidence rather than infer it; site and assistant must agree. The server concierge must consume the same facts.
- Services and disciplines use shared data modules for pages and navigation. Brand parts compose exported tokens without changing generated design-system files, preventing presentation drift.
- Motion wrappers preserve static layout contracts. Starfield renders only on resize: the brand permits slow light breathing, not travelling content; reduced motion stays still.
- Retained metric tools have no portfolio metric dataset. Briefs use only venture identity, sector, role and source-backed periods; do not invent performance reports.