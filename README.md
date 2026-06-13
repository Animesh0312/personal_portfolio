# Personal Portfolio Website

A modern personal portfolio for a senior software engineer, built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and `lucide-react`.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates the production build
- `npm run preview` previews the production build locally

## Project structure

```text
frontend/
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- tsconfig.json
|-- vite.config.ts
`-- src/
    |-- App.tsx
    |-- index.css
    |-- components/
    |-- data/portfolio.json
    |-- hooks/usePortfolio.ts
    |-- types/portfolio.ts
```

## Content editing

All portfolio content lives in [frontend/src/data/portfolio.json](frontend/src/data/portfolio.json).

Update these top-level keys to change the site:

- `profile`
- `skills.categories`
- `experience`
- `projects`
- `education`
- `testimonials`

Components do not hardcode profile, experience, project, or testimonial content. The app reads those values through the typed `usePortfolio()` hook in [frontend/src/hooks/usePortfolio.ts](/C:/Users/animesh/Documents/New%20project/frontend/src/hooks/usePortfolio.ts).

## Design notes

- Dark background base: `#0C0C0C`
- Chrome/silver headline gradient via `.hero-heading`
- Purple-magenta-orange accent gradient for primary buttons
- Sticky project cards and CSS marquee testimonials
- Empty social links and empty project URLs are hidden automatically

## Build

```bash
cd frontend
npm run build
```
