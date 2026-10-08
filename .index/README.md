# .index — project context map

Living map of this repository so any session (human or agent) starts from accurate context.

## What this project is

The **an3s.info** website (Andries Liebenberg / AN3S): a Vite + React 18 + TypeScript SPA with shadcn/ui and Tailwind, backed by hosted Supabase edge functions. It is the Lovable project "My Eventful Pursuit - Andries Liebenberg" (`94961edf-dc3d-4cd8-85d2-c5e6c2ed8e78`), synced to GitHub `AN3S-at-CREATE/andries-liebenberg-my-eventful-pursuit`; production changes go live only when the project is published in Lovable.

Since 2026-10-07 the **AN3S design system** (`AN3S-CREATE/an3s-design-system`) is the only source of truth for colours, fonts, radii, glows, gradients, the logo and icons: see `AGENTS.md` ("Design system") and `architecture.md`.

## How to use this index

1. Read `file-inventory.md` and `architecture.md` first.
2. Read `key-decisions.md` before touching styling, the background effects or the design-system wiring.
3. `dead-code.md` is the tech-debt register; `context-refresh-log.md` records each refresh.
4. `PROTECTED_CONTENT.md` (repo root) lists what may never be deleted.

## Maintenance rules

- After creating, editing, moving or deleting a file, update `file-inventory.md` (and `architecture.md` / `key-decisions.md` if affected).
- Entries come from reading the actual files; no guesses, no secrets (`.env` holds only the public Supabase URL and anon key, still never copy it here).
- Status values: `Active`, `Deprecated`, `Dead`, `Experimental`, `Generated`.
- The inventory is scoped to structure and the design-system wiring; shadcn primitives in `src/components/ui/` are listed as a group.
