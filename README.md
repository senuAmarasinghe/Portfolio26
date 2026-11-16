# Portfolio26

The personal portfolio of **Senuthi Amarasinghe**, Software Engineering undergraduate and Frontend Engineer Intern. An editorial, magazine-inspired single page built with Next.js, with a light "paper" theme, a dark "ink" theme and small interactive details.

## Highlights

- **Editorial design system:** OKLCH colour tokens for light and dark themes, a fluid type scale, Archivo (expanded) + Instrument Serif typography, and a 12-column magazine grid.
- **Projects from GitHub, automatically:** public repos tagged `portfolio` appear in the Work section, cached on the server and refreshed hourly.
- **Small details:** a live Colombo clock and a compass that watches the cursor in the masthead, a page-curl corner, an ink-dot scroll-spy nav, a pull-cord theme switch with an ink-spread View Transition, and a scrollbar that inks crimson while scrolling.
- **Smooth, but respectful:** Lenis smooth scrolling for mouse users only; every effect is off on touch devices or for `prefers-reduced-motion`.
- **Fast by default:** the page is prerendered static HTML (Server Components first), revalidated in the background.
- **Accessible:** semantic landmarks and headings, keyboard-friendly mobile menu (focus management, Escape, scroll lock), WCAG AA colour contrast in both themes.

## Tech stack

| Area      | Tools                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript (strict)                      |
| Styling   | Tailwind CSS v4, design tokens in `globals.css`, `clsx` + `tailwind-merge`                               |
| Motion    | CSS transitions, Web Animations API, View Transitions API, Lenis                                         |
| Quality   | ESLint, Prettier (Tailwind class sorting), Vitest + React Testing Library                                |
| Workflow  | Git Flow branches, Conventional Commits (Commitlint), Husky + lint-staged, GitHub Actions CI, Dependabot |
| Hosting   | Vercel                                                                                                   |

## Getting started

Requires **Node.js 22** (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Name                   | Required         | Purpose                                                                                                                    |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical URL for metadata, `robots.txt` and `sitemap.xml`                                                                 |
| `GITHUB_TOKEN`         | No               | Read-only GitHub token; raises the API limit from 60 to 5,000 requests/hour. Server-only, never prefix with `NEXT_PUBLIC_` |

## Scripts

| Script                            | Description                                            |
| --------------------------------- | ------------------------------------------------------ |
| `npm run dev`                     | Start the dev server                                   |
| `npm run build`                   | Production build                                       |
| `npm run start`                   | Serve the production build                             |
| `npm run check`                   | Typecheck, lint, format check and tests (what CI runs) |
| `npm run test`                    | Tests in watch mode (`test:run` to run once)           |
| `npm run lint` / `lint:fix`       | ESLint                                                 |
| `npm run format` / `format:check` | Prettier                                               |
| `npm run typecheck`               | Generate route types and run `tsc`                     |

## Updating content

All copy lives in typed data files in `src/data/`, separate from the UI:

| File                                      | Content                                |
| ----------------------------------------- | -------------------------------------- |
| `profile.ts`                              | Name, role, tagline, about text, stats |
| `experience.ts`                           | Work and volunteering                  |
| `projects.ts`                             | Hand-written project entries           |
| `education.ts`, `skills.ts`, `socials.ts` | The rest                               |

### Showing a GitHub project

1. On the repo's GitHub page, open the gear next to **About**.
2. Add the topic `portfolio` (and `portfolio-featured` to show it near the top). Other topics become the tech-stack tags, e.g. `nextjs` → "Next.js".
3. Write a one-line description and, if there's a live demo, fill in **Website**.

It appears within an hour. For a richer write-up, add the project to `src/data/projects.ts` with `links.repo` set to the repository URL; the hand-written entry then replaces the automatic one.

## Project structure

```
src/
├── app/                  # Routes, root layout (theme script, metadata), robots, sitemap
├── assets/images/        # Statically imported images (optimised by next/image)
├── components/
│   ├── effects/          # Small details: clock, compass, page curl, ink drops, scroll effects
│   ├── layout/           # Site header and footer
│   ├── navigation/       # Ink-dot scroll-spy nav, mobile menu
│   ├── sections/         # Page sections (hero, about, experience, work, ...)
│   ├── theme/            # Pull-cord theme switch
│   └── ui/               # Reusable primitives (Section, Container, Eyebrow, Tag)
├── config/               # Site config (URL, nav, GitHub username)
├── data/                 # Typed content
├── hooks/                # Reusable client hooks (media queries, scroll-spy, theme, pointer)
├── lib/                  # Framework-light logic: GitHub mapping, theme, motion tokens
└── types/                # Shared TypeScript types
```

Conventions: kebab-case files, PascalCase named component exports, `@/` imports, tests next to the code as `*.test.ts(x)`, Server Components by default with `"use client"` only for interactive parts.

## Workflow

```
feat/* or fix/*  ──PR──▶  develop (preview deploy)  ──PR──▶  main (production)
```

- Commits follow [Conventional Commits](https://www.conventionalcommits.org) in lowercase (`feat: add …`), enforced by Commitlint.
- Husky runs ESLint and Prettier on staged files before each commit.
- GitHub Actions runs `npm run check` and a production build on every push and pull request.
- Dependabot opens weekly pull requests for dependency updates into `develop`.

## License

© Senuthi Amarasinghe. The source is public for reference; the content, photos and design are not licensed for reuse.
