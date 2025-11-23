<!-- .github/copilot-instructions.md — guidance for AI coding agents working on this repo -->

# Copilot / AI Agent Instructions — FutureGeo2

Purpose: give an AI coding agent the minimal, actionable knowledge to be productive in this Vite + React + TypeScript site.

- **Big picture**: This is a client-side Vite React app (no backend). Pages live under `src/pages/*` and are composed from smaller React components in `src/components/*`. Global providers (React Query) and routing are wired in `src/App.tsx`.

- **Key files/dirs**:
  - `src/App.tsx` — app root; add routes here (place custom routes above the catch-all `*` route).
  - `src/pages/Index.tsx`, `src/pages/NotFound.tsx` — page entrypoints.
  - `src/components/*` — composed components (e.g. `Hero`, `Disciplines`, `SDGSection`).
  - `src/components/ui/*` — UI primitives (shadcn-style components). Prefer reusing these rather than adding duplicate UI plumbing.
  - `public/data/` — static assets fetched at runtime (e.g. `geoscience-specializations.csv`). Do not change fetch paths; components expect `/data/...` URLs.
  - `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.ts` — build/dev configuration and path alias (`@/*` → `src/*`).

- **Build / dev / lint**:
  - Install: `npm i`
  - Dev server: `npm run dev` (uses `vite`)
  - Build: `npm run build` (or `npm run build:dev` for development-mode build)
  - Preview build: `npm run preview`
  - Lint: `npm run lint` (uses `eslint .`)

- **Code patterns & conventions** (do not change without reason):
  - Imports use the TypeScript path alias: `@/...` maps to `src/...` (see `tsconfig.json`). Example: `import { Hero } from "@/components/Hero"`.
  - UI primitives live under `src/components/ui` and are used throughout. When adding new UI, add a primitive here so other components can reuse it.
  - Components are functional React components; pages default-export their top-level component (e.g. `export default Index;`). Smaller components often use named exports (e.g. `export const Hero = () => {}`).
  - Routing: `src/App.tsx` uses `react-router-dom`. Add routes as `<Route path="/foo" element={<Foo />} />` and place them above the `*` catch-all.
  - Global state / data fetching: app uses `@tanstack/react-query` via `QueryClientProvider` in `App.tsx`. Prefer using React Query for server-like data fetching patterns.
  - Styling: Tailwind CSS classes are used heavily in JSX. Many components use class utilities like `container`, `animate-*`, and responsive classes.

- **Data & integration specifics**:
  - CSV data under `public/data` is parsed client-side with `papaparse` (see `src/components/Disciplines.tsx`). Fetch uses `fetch('/data/...')` and then `Papa.parse(csvText, { header: true, complete })`.
  - No server-side runtime is assumed. Avoid introducing server-only code or Node-only modules into runtime bundles.

- **When editing UI or pages**:
  - Reuse primitives in `src/components/ui` whenever possible.
  - Match the existing naming & export patterns: component files use PascalCase and export either a named `export const` or a `default` page export.
  - Update routes in `src/App.tsx` for new pages; keep the `NotFound` route as the final catch-all.

- **Testing & CI**:
  - There are no tests in the repo. Use `npm run lint` as a quick static check.

- **Examples from the repo**:
  - Add a route: open `src/App.tsx` and add above the `*` route:

    `<Route path="/new" element={<NewPage />} />`

  - Fetch CSV as done in `src/components/Disciplines.tsx`:

    `fetch('/data/geoscience-specializations.csv').then(r=>r.text()).then(csv=>Papa.parse(csv,{header:true,complete:...}))`

- **What to avoid / gotchas**:
  - Do not change the public asset paths (`/data/*`) — client code depends on these exact URLs.
  - Avoid adding Node-only APIs to client code; the project is bundled by Vite for the browser.
  - Keep route additions conservative: update `src/App.tsx` and check for required imports.

If any instruction above is unclear or you want more examples (e.g. UI primitive patterns or a stub for adding a page + route), tell me which area to expand and I will iterate.
