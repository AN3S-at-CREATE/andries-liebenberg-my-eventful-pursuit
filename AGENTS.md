# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Vite + React + TypeScript** SPA (the AN3S / Andries Liebenberg portfolio site) backed by a **hosted** Supabase project. There is no monorepo and no local backend to run for normal frontend development.

### Services & commands
The only service to run for development is the Vite dev server. Standard commands live in `package.json` `scripts`:
- Dev server: `pnpm dev` → http://localhost:8080 (port is fixed in `vite.config.ts`)
- Lint: `pnpm lint` (ESLint flat config; currently emits warnings only, 0 errors)
- Build: `pnpm build`
- Preview built output: `pnpm preview`
- There is **no automated test suite** in this repo (no `test` script / framework). Verification is manual + lint + build.

### Non-obvious caveats
- **Use pnpm.** The repo contains multiple lockfiles (`pnpm-lock.yaml`, `package-lock.json`, `bun.lock(b)`); `plan.md` / `.jules/*` standardize on pnpm (`pnpm install --frozen-lockfile`). Mixing package managers will desync.
- On `pnpm install` you'll see "Ignored build scripts" warnings for `esbuild` / `@swc/core` / `core-js`. These are safe to ignore — both `pnpm dev` and `pnpm build` work without approving them. Do **not** run the interactive `pnpm approve-builds`.
- **Dev (esbuild) is stricter than the prod build (SWC).** A duplicate named import compiles fine via `pnpm build` (SWC silently dedupes) but crashes the dev server with `Uncaught SyntaxError: Identifier 'X' has already been declared`, which renders a **blank page**. If the app is blank in dev, check the browser console for a duplicate-declaration SyntaxError before assuming an environment problem.
- If the dev server shows stale/corrupt optimized deps, clear the Vite cache: `rm -rf node_modules/.vite` then restart `pnpm dev`.
- The SPA is mostly client-rendered: `/`, `/companies`, `/showcase`, and the **ROI Calculator** (in the home page "AI-Powered Growth Tools" section) work fully offline with no backend.
- Dynamic features (AN3S Concierge chat, Performance Brief generator, contact email) call **Supabase Edge Functions** on the hosted project configured in `.env` (`VITE_SUPABASE_*`, anon key only). Those functions need server-side secrets set in Supabase (`LOVABLE_API_KEY`, `RESEND_API_KEY`, service-role key) and are not required for general frontend dev. Local edge-function work needs the Supabase CLI + Deno (not installed by default).
