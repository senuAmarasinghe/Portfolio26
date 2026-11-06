# Portfolio26

Personal portfolio website built with [Next.js](https://nextjs.org) (App Router), TypeScript and Tailwind CSS.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, Cache Components)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4, `clsx` + `tailwind-merge` via `cn()`
- **Quality:** ESLint, Prettier (+ Tailwind class sorting), EditorConfig
- **Testing:** Vitest + React Testing Library
- **Git hooks:** Husky, lint-staged, Commitlint (Conventional Commits)

## Getting started

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script              | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | Lint with ESLint (`lint:fix` to auto-fix)     |
| `npm run format`    | Format with Prettier (`format:check` in CI)   |
| `npm run typecheck` | Generate route types and run `tsc`            |
| `npm run test`      | Run tests in watch mode (`test:run` for once) |
| `npm run check`     | Typecheck + lint + format check + tests       |

## Project structure

```
src/
├── app/                 # Routes, layouts and route-level files (App Router)
│   ├── layout.tsx       # Root layout + site-wide metadata
│   ├── page.tsx         # Home page
│   ├── not-found.tsx    # 404 page
│   ├── robots.ts        # /robots.txt
│   └── sitemap.ts       # /sitemap.xml
├── components/
│   ├── layout/          # Site chrome: header, footer
│   ├── sections/        # Page sections (hero, projects, ...) — add as needed
│   └── ui/              # Reusable, presentational primitives
├── config/              # Site config: name, URL, nav, social links
├── lib/                 # Framework-agnostic helpers (e.g. cn)
└── types/               # Shared TypeScript types
```

Conventions:

- Files use `kebab-case`, components use `PascalCase` named exports.
- Import via the `@/` alias (maps to `src/`).
- Tests live next to the code they test as `*.test.ts(x)`.
- Server Components by default; add `"use client"` only where interactivity is needed.

## Commit convention

Commits follow [Conventional Commits](https://www.conventionalcommits.org), enforced by Commitlint:
`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `perf:`, `build:`.
