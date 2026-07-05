# Codev_Tim

Engineering operating system representing software engineer Timur — not a portfolio site.

**Version:** 0.9.4  
**Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · next-intl

Canonical product, content, and architecture decisions live in [`/docs`](./docs). Implementation follows [`docs/10_IMPLEMENTATION_PLAN.md`](./docs/10_IMPLEMENTATION_PLAN.md).

## Prerequisites

- Node.js ≥ 20
- npm

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/en`.

## Scripts

| Script                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Development server (Turbopack)      |
| `npm run build`        | Production build                    |
| `npm run start`        | Serve production build              |
| `npm run lint`         | ESLint (Next.js + TypeScript rules) |
| `npm run lint:fix`     | ESLint with auto-fix                |
| `npm run format`       | Prettier write                      |
| `npm run format:check` | Prettier check (CI)                 |
| `npm run typecheck`    | TypeScript strict check             |
| `npm run validate`     | typecheck + lint + format:check     |

## Environment

Copy `.env.example` to `.env.local` and set:

| Variable                         | Required   | Description                      |
| -------------------------------- | ---------- | -------------------------------- |
| `SITE_URL`                       | Yes (prod) | Public origin, no trailing slash |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | No         | GA4 — deferred lazyOnload        |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | No         | Microsoft Clarity — optional     |
| `RESEND_API_KEY`                 | No         | Contact form — Phase 5           |

## Structure

```
src/app/[locale]/     App Router pages (i18n segment)
src/components/       UI & shell (Phase 2+)
src/features/         Terminal, palette, boot (Phase 2+)
src/i18n/             next-intl routing & request config
src/lib/              Content loaders, schemas, SEO helpers
src/styles/           Design tokens + Tailwind globals
src/types/            Shared TypeScript types
content/              MDX + JSON content
messages/             UI translation files (en, ru, uz)
docs/                 Canonical project documentation
```

## Git hooks

- **pre-commit** — lint-staged (ESLint + Prettier on staged files)
- **commit-msg** — commitlint (Conventional Commits)

## Locales

`en` · `ru` · `uz` — prefix always (`/en/projects`, `/ru/about`, …)

## License

Private — all rights reserved.
