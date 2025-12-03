# FutureGeo — Geoscience & the SDGs

An interactive single-page experience showing how geoscientists advance the UN Sustainable Development Goals, with insights, impact stories, and discipline highlights.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (or your preferred Node package manager)

## Getting started

```bash
git clone <YOUR_GIT_URL>
cd FutureGeo
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`) in your browser.

## Available scripts

- `npm run dev` — Start the Vite development server with hot reloading.
- `npm run build` — Create a production build in the `dist` folder.
- `npm run build:dev` — Development-mode build (useful for debugging production config).
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint on the project.

## Project structure

- `src/pages` — Page-level routes (home, insights archive, insight detail, 404).
- `src/components` — Page sections and shared components (Hero, GeoscienceImpact, Disciplines, SDGSection, Footer).
- `src/components/ui` — shadcn/ui primitives and helpers.
- `src/content` — Markdown posts for insights.
- `public/data` — Static data (SDG JSON/CSV, geoscience specializations, etc.).

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- React Router

## Data entry

- `public/data/geosciences-sdgs.json` — SDG initiatives and descriptions.
- `public/data/geoscience-specializations.csv` — Specializations and related metadata.
- `src/content/sdg-posts` — Markdown insight posts; follow the existing front matter fields.

## Potentially unused UI primitives

These shadcn/ui components are not referenced by name in the codebase (double-check before removal): `calendar.tsx`, `command.tsx`, `drawer.tsx`.

## Deployment

The app is a static site that can be deployed to any static hosting provider (GitHub Pages, Netlify, Vercel, etc.).

For GitHub Pages with GitHub Actions (see `.github/workflows/deploy.yml`):

1. Push this repository to GitHub.
2. In repo settings, enable GitHub Pages with the **GitHub Actions** source.
3. Ensure the default branch name in `deploy.yml` matches your repo (e.g. `main`).
4. Push to the default branch — the workflow will build and deploy automatically.

Manual deploy:

```bash
npm run build
```

Upload the `dist` contents to your static hosting provider.
