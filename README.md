# FutureGeo – Geoscience & the SDGs

An interactive single‑page application showcasing how geoscientists contribute to the UN Sustainable Development Goals, including a resource library of initiatives, data hubs, and collaborations.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (or another Node package manager)

## Getting started

```bash
git clone <YOUR_GIT_URL>
cd FutureGeo2
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

## Available scripts

- `npm run dev` – Start the Vite development server with hot reloading.
- `npm run build` – Create a production build in the `dist` folder.
- `npm run build:dev` – Development‐mode build (useful for debugging production config).
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint on the project.

## Project structure

- `src/pages` – Top‑level pages (home, SDG resources, etc.).
- `src/components` – Reusable UI components and sections.
- `src/components/ui` – shadcn‑ui primitives.
- `public/data` – Static data files (e.g., the SDG initiatives JSON/CSV).

## Technologies

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn‑ui
- React Router

## Deployment

The app is a static site that can be deployed to any static hosting provider (GitHub Pages, Netlify, Vercel, etc.).

For GitHub Pages with GitHub Actions (see `.github/workflows/deploy.yml`):

1. Push this repository to GitHub.
2. In your repo settings, enable GitHub Pages with the **GitHub Actions** source.
3. Ensure the default branch name in `deploy.yml` matches your repo (e.g. `main`).
4. Push to the default branch – the workflow will build and deploy the site automatically.

You can also deploy manually by running:

```bash
npm run build
```

and uploading the contents of the `dist` directory to your static hosting provider.
