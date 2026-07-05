# Codev_Tim — Technology Stack

**Document ID:** `CT-DOC-08`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Preface

This document defines the **canonical technology stack** for the Codev_Tim ecosystem and the **rules for technology selection** — what to adopt, what to avoid, and why.

**Scope:**

- **Codev_Tim site** — the engineering operating system (this product)
- **Timur's product stack** — technologies used in registered products (e.g., ERP Platform)
- **Selection principles** — govern all future technology decisions

**Related documents:**

- `00_PROJECT_VISION.md` — Engineering goals, performance targets
- `03_ABOUT_TIMUR.md` — Engineer profile, product stacks
- `04_SEO_STRATEGY.md` — SEO implementation via Next.js Metadata API
- `05_CONTENT_ARCHITECTURE.md` — MDX content layer
- `06_SEO_CHECKLIST.md` — Pre-release verification
- `11_DESIGN_TOKENS.md` — CSS variable token definitions
- `12_CONTENT_SCHEMA.md` — Zod schemas for content validation
- `13_ARCHITECTURE_DECISIONS.md` — ADRs for all stack choices

---

## 1. Technology Philosophy

### 1.1 Core Principles

| Principle                   | Rule                                                                      |
| --------------------------- | ------------------------------------------------------------------------- |
| **Proven over trendy**      | Production-ready tools with clear documentation and long-term support     |
| **Minimal dependencies**    | Every library must justify its bundle size and maintenance cost           |
| **Performance is design**   | Lighthouse 95+ is a requirement, not a goal                               |
| **Type safety**             | TypeScript strict mode everywhere — no `any` without documented exception |
| **Custom UI**               | Handcrafted components — no component library skins                       |
| **Content as data**         | MDX + JSON frontmatter — UI is the shell                                  |
| **Static first**            | SSG/ISR by default — dynamic only when necessary                          |
| **Standards-based SEO**     | Metadata API, JSON-LD, hreflang — no SEO plugins                          |
| **Self-hosted assets**      | Fonts via `next/font` — no external CDN for critical resources            |
| **Feature-based structure** | Clear separation: UI · content · business logic                           |

### 1.2 Selection Test

Before adding any technology, answer:

1. Does it solve a problem the current stack cannot?
2. Is the bundle size justified?
3. Can it be replaced without rewriting the product?
4. Does it align with Codev_Tim performance targets?
5. Would this choice appear on an Engineering Record without embarrassment?

If any answer is **no** — do not adopt.

### 1.3 Forbidden Patterns

| Forbidden                                        | Reason                                                |
| ------------------------------------------------ | ----------------------------------------------------- |
| shadcn/ui, MUI, Ant Design, Bootstrap            | Violates custom UI principle — generic component look |
| Heavy CSS-in-JS runtime                          | Performance cost — Tailwind + CSS variables preferred |
| Client-side only rendering for indexable content | SEO and AI indexing require SSR/SSG                   |
| jQuery, lodash (full)                            | Unnecessary — native APIs or targeted utilities       |
| Moment.js                                        | Use native `Intl` or `date-fns` if dates needed       |
| Redux for simple state                           | React Context or Zustand sufficient                   |
| GraphQL for static content                       | MDX + JSON at build time is simpler                   |
| Third-party widget embeds                        | Social feeds, chat widgets — violate brand control    |
| Auto-generated UI from AI without review         | Must match Obsidian Console design language           |

### 1.4 Adoption Protocol

1. Propose in issue or `/docs` amendment
2. Document reason in this file (§4 Changelog)
3. Verify Lighthouse impact
4. Timur approval for new runtime dependencies

---

## 2. Codev_Tim Site Stack (Confirmed)

The engineering operating system — **Codev_Tim v0.9.4** — uses the following stack.

### 2.1 Core Framework

| Layer          | Technology | Version         | Purpose                                            |
| -------------- | ---------- | --------------- | -------------------------------------------------- |
| **Framework**  | Next.js    | 15 (App Router) | Routing, SSG/SSR, Metadata API, image optimization |
| **Language**   | TypeScript | strict mode     | Type safety across entire codebase                 |
| **Deployment** | Vercel     | —               | Edge CDN, analytics, preview deploys               |

### 2.2 Styling and Design Tokens

| Layer             | Technology            | Purpose                                           |
| ----------------- | --------------------- | ------------------------------------------------- |
| **CSS Framework** | Tailwind CSS          | v4 — utility-first styling                        |
| **Design Tokens** | CSS Variables         | Colors, spacing, motion — Obsidian Console system |
| **Class Merging** | tailwind-merge + clsx | Conditional class composition                     |
| **Component UI**  | Custom handcrafted    | No third-party component libraries                |

### 2.3 Typography

| Role                       | Font       | Loading                            |
| -------------------------- | ---------- | ---------------------------------- |
| **UI / Headings**          | Geist Sans | `next/font` — preload, self-hosted |
| **Mono / Terminal / Code** | Geist Mono | `next/font` — preload or async     |

### 2.4 Animation

| Layer      | Technology    | Usage                                                  |
| ---------- | ------------- | ------------------------------------------------------ |
| **Motion** | Framer Motion | Module transitions, scroll reveals, micro-interactions |
| **Policy** | Restrained    | Per Experience Spec — no bounce, parallax, particles   |

### 2.5 Internationalization

| Layer    | Technology | Locales              |
| -------- | ---------- | -------------------- |
| **i18n** | next-intl  | EN (default), RU, UZ |

### 2.6 Icons

| Layer     | Technology   | Style                                     |
| --------- | ------------ | ----------------------------------------- |
| **Icons** | Lucide React | 16px stroke, monochrome — per Brand Bible |

### 2.7 State Management

| Layer                    | Technology              | Scope                                                        |
| ------------------------ | ----------------------- | ------------------------------------------------------------ |
| **Global UI state**      | React Context           | Shell state, locale, terminal open/closed, theme             |
| **Complex client state** | Zustand                 | **Only if truly necessary** — default: avoid                 |
| **Server state**         | React Server Components | Data fetching at build/request time                          |
| **Persistence**          | localStorage            | Terminal history, layout preferences, recent palette actions |

### 2.8 Forms

| Layer          | Technology      | Usage                                               |
| -------------- | --------------- | --------------------------------------------------- |
| **Forms**      | React Hook Form | Communication Module                                |
| **Validation** | Zod             | Schema validation for forms and content frontmatter |

### 2.9 Content Layer

| Layer                 | Technology  | Usage                                                       |
| --------------------- | ----------- | ----------------------------------------------------------- |
| **Long-form content** | MDX         | Engineering Notes, Engineering Records, Principles          |
| **Structured data**   | JSON        | Site config, project meta, timeline, stack, knowledge graph |
| **Content location**  | `/content/` | Per `05_CONTENT_ARCHITECTURE.md`                            |

### 2.10 SEO and Discovery

| Layer               | Technology            | Usage                                         |
| ------------------- | --------------------- | --------------------------------------------- |
| **Metadata**        | Next.js Metadata API  | title, description, OG, Twitter, robots       |
| **Sitemap**         | Dynamic `sitemap.xml` | Generated at build — per `04_SEO_STRATEGY.md` |
| **Robots**          | `robots.txt`          | Static or dynamic                             |
| **Structured data** | JSON-LD               | Inline in layout/page components              |
| **hreflang**        | Metadata alternates   | EN / RU / UZ                                  |
| **Canonical**       | Metadata API          | Self-referencing per locale                   |
| **LLM discovery**   | `llms.txt`            | Static file in `/public`                      |
| **RSS**             | Generated feed.xml    | Knowledge Base syndication                    |

### 2.11 Images and Media

| Layer                  | Technology                 | Usage                                         |
| ---------------------- | -------------------------- | --------------------------------------------- |
| **Image optimization** | next/image                 | AVIF/WebP, responsive sizes                   |
| **Placeholders**       | Blur placeholders          | LCP optimization                              |
| **Diagrams**           | SVG inline                 | System Blueprint — no raster for architecture |
| **OG images**          | Static PNG or `@vercel/og` | 1200×630 — build-time generation              |

### 2.12 Analytics and Monitoring

| Layer                   | Technology            | Purpose                              |
| ----------------------- | --------------------- | ------------------------------------ |
| **Primary analytics**   | Vercel Analytics      | Performance, Web Vitals              |
| **Secondary analytics** | Google Analytics 4    | Traffic analysis                     |
| **Search monitoring**   | Google Search Console | Indexing, coverage, CWV              |
| **Session analytics**   | Microsoft Clarity     | Optional — heatmaps, session replay  |
| **Policy**              | Deferred loading      | No render-blocking analytics scripts |

### 2.13 Performance Strategy

| Technique                | Implementation                                      |
| ------------------------ | --------------------------------------------------- |
| **Static generation**    | SSG/ISR for all content pages                       |
| **Partial Prerendering** | Where applicable in Next.js 15                      |
| **Route prefetching**    | `<Link prefetch>` on module navigation              |
| **Code splitting**       | Terminal and Command Palette — dynamic import       |
| **Font optimization**    | `next/font` — subset weights                        |
| **Target**               | Lighthouse 95+ · LCP <1.5s · CLS <0.05 · INP <100ms |

### 2.14 Code Quality

| Tool                  | Purpose                              |
| --------------------- | ------------------------------------ |
| **ESLint**            | Linting — Next.js + TypeScript rules |
| **Prettier**          | Code formatting                      |
| **Husky**             | Git hooks                            |
| **lint-staged**       | Pre-commit lint on staged files      |
| **TypeScript strict** | `strict: true` in tsconfig           |

### 2.15 Architecture Pattern

```
Feature-based architecture

src/
├── app/                    # Next.js App Router — routes only
│   └── [locale]/
├── components/
│   ├── shell/              # AppShell, Header, Sidebar, StatusBar
│   ├── ui/                 # Primitives — Button, Badge, Card
│   └── modules/            # Module-specific components
├── features/               # Feature logic — terminal, palette, i18n
├── content/                # MDX + JSON (or symlink to /content)
├── lib/                    # Utilities, SEO helpers, schema generators
├── styles/                 # Global CSS, tokens
└── types/                  # Shared TypeScript types
```

**Separation rules:**

- UI components — no business logic
- Features — orchestration, hooks, state
- lib — pure functions, schema builders
- content — data only, no React

---

## 3. Product Stack — Codev ERP (Confirmed)

Technologies for registered product **Codev ERP** (Business Automation, In Development):

| Layer              | Technologies |
| ------------------ | ------------ |
| **Frontend**       | React        |
| **Backend**        | ASP.NET Core |
| **Database**       | PostgreSQL   |
| **Infrastructure** | Docker       |

**System Blueprint:** Client → API → Services → Database → Infrastructure

> Full Engineering Record: `03_ABOUT_TIMUR.md` §7.1

---

## 4. Timur's Technology Stack (Site Presentation)

Grouped by layer for Engineer Profile and terminal `stack` command.

### 4.1 Confirmed Categories

| Layer              | Codev_Tim Site                           | Production Products            | Status    |
| ------------------ | ---------------------------------------- | ------------------------------ | --------- |
| **Frontend**       | Next.js, TypeScript, React, Tailwind CSS | React, JavaScript              | Confirmed |
| **Backend**        | — (static site)                          | ASP.NET Core, C#, Python       | Confirmed |
| **Database**       | —                                        | PostgreSQL                     | Confirmed |
| **Infrastructure** | Vercel, Docker, Linux, Nginx             | Docker, Git, GitHub            | Confirmed |
| **Cloud**          | Vercel (hosting)                         | In learning                    | Partial   |
| **AI**             | —                                        | MCP, RAG, LLM, Assistant Agent | Confirmed |
| **Tools**          | ESLint, Prettier, Husky, Cursor          | Git, GitHub, DevTools          | Confirmed |

### 4.2 Presentation Rules

- Group by layer — never logo soup
- Text labels only in UI
- Official technology casing: `PostgreSQL`, `ASP.NET Core`, `Next.js`
- Hover tooltip with usage context (optional)
- Terminal `stack` command outputs this grouped list

---

## 5. Technology Selection Rules by Domain

### 5.1 When to Choose Next.js

Use for: content-heavy products, SEO-critical sites, hybrid static/dynamic apps.  
Codev_Tim site — canonical Next.js use case.

### 5.2 When to Choose React (SPA)

Use for: complex client-side applications (ERP Platform frontend), real-time dashboards.  
Pair with API backend — not for public SEO pages alone.

### 5.3 When to Choose ASP.NET Core

Use for: enterprise APIs, ERP backends, business logic layers, transactional systems.  
Timur's primary backend stack for production systems.

### 5.4 When to Choose PostgreSQL

Use for: relational data, complex queries, ERP transactional data, reporting.  
Default database for new products unless specific NoSQL requirement documented.

### 5.5 When to Choose Docker

Use for: consistent deployment, service isolation, CI/CD pipelines.  
Required for all production systems with multiple services.

### 5.6 When to Add Zustand

Only when:

- React Context causes unnecessary re-renders at scale
- State logic exceeds ~100 lines in Context provider
- Multiple unrelated consumers need fine-grained subscriptions

Default: **React Context first**.

### 5.7 When to Add a New npm Dependency

```
Bundle impact < 5kb gzipped     → consider
Bundle impact 5–20kb            → justify in PR
Bundle impact > 20kb            → Timur approval required
Alternative exists in stdlib    → use stdlib
```

### 5.8 When to Use MDX vs JSON

| Content Type                      | Format                                  |
| --------------------------------- | --------------------------------------- |
| Long-form prose, code, diagrams   | MDX                                     |
| Metadata, config, timeline, graph | JSON                                    |
| UI strings                        | `/messages/{locale}.json` via next-intl |
| Reusable data schemas             | Zod → JSON validation at build          |

---

## 6. Version Policy

### 6.1 Pinning

- Next.js: major version pinned (`15.x`)
- TypeScript: `strict: true` — upgrade minor freely
- Tailwind: v4 — follow migration guides
- Node.js: LTS only (20.x or 22.x)

### 6.2 Upgrade Protocol

1. Read Next.js release notes
2. Run Lighthouse before and after
3. Verify i18n, MDX, and Metadata API compatibility
4. Update this document version on breaking changes

---

## 7. Environment and Secrets

| Variable            | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `SITE_URL`          | Canonical domain — set at deploy                |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4                              |
| `CONTACT_FORM_*`    | Communication Module endpoint (when configured) |

**Policy:** No secrets in `/content/` or `/docs/`. Use environment variables only.

---

## 8. Changelog

| Version | Date       | Change                                                      |
| ------- | ---------- | ----------------------------------------------------------- |
| 1.0.0   | 2026-07-04 | Initial canonical stack                                     |
| 1.1.0   | 2026-07-04 | Timur production stack confirmed — AI, tools, Poj Pro stack |

---

## 9. Document Relationships

```
00_PROJECT_VISION.md     → Performance targets, engineering goals
03_ABOUT_TIMUR.md        → Product stacks, engineer profile
04_SEO_STRATEGY.md       → SEO implementation details
05_CONTENT_ARCHITECTURE.md → MDX/JSON content layer
08_TECH_STACK.md         → This document — technology decisions
```

---

_End of canonical specification. Technology changes require version increment and Timur confirmation._
