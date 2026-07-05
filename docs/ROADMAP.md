# Codev_Tim — Product Roadmap

**Document ID:** `CT-DOC-ROADMAP`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-05

---

## Introduction

This document describes the **long-term engineering evolution** of Codev_Tim — not a task list, not sprint backlog, not git history.

It is a **product roadmap**: a sequence of version milestones that define what the system becomes, why each milestone exists, and what must be true before the next milestone begins. Each version represents a coherent capability increment aligned with the Engineering Operating System metaphor (`ADR-0010`).

**Authority hierarchy:**

1. `00_PROJECT_VISION.md` — direction
2. `10_IMPLEMENTATION_PLAN.md` — phase deliverables
3. This roadmap — version packaging and sequencing
4. `CHANGELOG.md` — what was actually shipped

When the roadmap and implementation plan diverge, the implementation plan defines _how_; this roadmap defines _when_ and _why_ at the product level.

**Audience:** Timur (product owner), future contributors, AI agents planning work across versions.

**Rule:** Versions are not released until Success Criteria are met. Partial milestones do not advance the version number.

---

## Version Timeline

```
2026 Q3          2026 Q4          2027 Q1          2027 Q2+
─────────────────────────────────────────────────────────────
v0.9.0           v0.9.5           v0.9.8           v1.0.0
Foundation  ──►  Operations  ──►  Content      ──►  Production
                 Center           Registry          Release
                                                    │
                                                    ├── v1.1 Writing
                                                    ├── v1.2 AI Layer
                                                    └── v2.0 Platform
```

| Version | Codename           | Primary Capability                       | Target Window |
| ------- | ------------------ | ---------------------------------------- | ------------- |
| v0.9.0  | Foundation         | Persistent AppShell, OS frame            | 2026-07       |
| v0.9.5  | Operations Center  | Richest screen — validates OS metaphor   | 2026 Q3       |
| v0.9.8  | Content Registry   | Products, records, knowledge             | 2026 Q4       |
| v1.0.0  | Production Release | Public deployment, SEO, performance      | 2027 Q1       |
| v1.1    | Writing Expansion  | Engineering Notes at scale               | 2027 Q1–Q2    |
| v1.2    | AI Layer           | Semantic discovery, command intelligence | 2027 Q2       |
| v2.0    | Platform           | Public API, extensibility                | 2027 H2+      |

---

## Milestones

| Milestone                     | Version | Definition of Done                                                                                                                            |
| ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **M1 — System Frame**         | v0.9.0  | Visitor opens `/en` and sees persistent shell with module navigation, status bar, boot sequence, and empty module viewport. All routes exist. |
| **M2 — Operations Validated** | v0.9.5  | Operations Center displays live system data, module shortcuts, activity log, and functional terminal. OS metaphor holds under real use.       |
| **M3 — Content Depth**        | v0.9.8  | Product Registry populated from canonical registry. At least one Engineering Record and Knowledge Base index operational.                     |
| **M4 — Production Ready**     | v1.0.0  | Public deployment on confirmed domain. SEO complete. Lighthouse 95+. WCAG AA verified. `06_SEO_CHECKLIST.md` passed.                          |
| **M5 — Knowledge Scale**      | v1.1    | Engineering Notes publishable via MDX. Search, tags, RSS operational.                                                                         |
| **M6 — Intelligent System**   | v1.2    | Semantic search, AI indexing layer, command palette intelligence.                                                                             |
| **M7 — Open Platform**        | v2.0    | Public API, developer portal, plugin architecture.                                                                                            |

---

## Future Architecture

Evolution from monolithic Next.js application toward a layered platform — without premature decomposition.

### v0.9.x — Modular Monolith (current)

```
┌─────────────────────────────────────────────┐
│  AppShell (persistent client + server)      │
│  ┌─────────┐ ┌──────────┐ ┌──────────────┐  │
│  │  Boot   │ │ Terminal │ │ Cmd Palette  │  │
│  └─────────┘ └──────────┘ └──────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │  Module Viewport (RSC pages)        │  │
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │  /content/ (MDX + JSON, git-backed) │  │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

Single deployment. Local content. No external CMS (`ADR-0009`).

### v1.0.0 — Production Layer

```
/content/          →  Zod validation at build
/lib/seo/          →  Metadata, JSON-LD, hreflang builders
/lib/content/      →  Loaders, indexes, compile-time aggregation
/public/           →  llms.txt, robots.txt, sitemap, OG assets
/api/contact       →  Communication Module endpoint (Resend)
```

SEO and analytics as first-class infrastructure, not page-level afterthoughts.

### v1.2 — Intelligence Layer

```
/lib/search/       →  Full-text + semantic index (build-time or edge)
/lib/ai/           →  Embedding pipeline, chunk registry
/features/palette/ →  Query router: modules · products · notes
/public/llms.txt   →  Machine-readable site map for LLM crawlers
```

Search index derived from validated content — not live CMS queries.

### v2.0 — Platform Layer

```
/api/v1/           →  Read-only public API (products, notes, status)
/packages/         →  Open component primitives (design system export)
/plugins/          →  Extension registry (module slots, terminal commands)
/docs/portal/      →  Developer documentation for API consumers
```

Platform scope requires proven v1.0 stability and documented content schema (`12_CONTENT_SCHEMA.md`).

---

## Long-term Vision

Codev_Tim evolves from a personal engineering operating system into a **reference implementation** of how a software engineer presents systems work — not as a portfolio, but as an operational product (`00_PROJECT_VISION.md`).

**Three horizons:**

| Horizon       | State                    | Operator Experience                                                                                                            |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **H1 — v1.0** | Public production system | CTO-credible. Developer opens terminal. Modules answer one question each.                                                      |
| **H2 — v1.2** | Intelligent system       | Command palette and search understand content graph. AI systems cite Codev_Tim accurately (`07_AI_INDEXING.md`).               |
| **H3 — v2.0** | Open platform            | External systems consume Codev_Tim data via API. Design system exportable. Extension points for modules and terminal commands. |

**Non-goals across all versions:**

- Headless CMS integration (`ADR-0009` rejected)
- Light theme (`11_DESIGN_TOKENS.md` §27 — not v1.0)
- Multi-tenant or user accounts
- Real-time collaboration
- Mobile native application

---

## v0.9.0 — Foundation

**Status:** Complete (2026-07-05)  
**Reference:** `CHANGELOG.md` · Phase 1 · Phase 1.5

### Goals

Establish the immutable system frame: persistent shell, design tokens, routing, internationalization, boot sequence, and placeholder module architecture. Prove the OS metaphor before investing in content depth.

### Major Features

- Next.js 15 App Router with TypeScript strict and Tailwind CSS v4 token system
- Persistent AppShell: System Header, Module Navigation, Content Viewport, System Status Bar
- Trilingual routing: `en`, `ru`, `uz` via next-intl (`ADR-0005`)
- Cold and warm boot sequence with session restore
- Command Palette skeleton and Terminal stub
- ModuleHeader, Missing Module 404, placeholder pages for all modules
- Operations Center structural skeleton (no content)
- Accessibility baseline: skip link, inert regions, focus trap, live announcer

### Success Criteria

- [x] `npm run validate` and `npm run build` pass without errors
- [x] All module routes render ModuleHeader within persistent shell
- [x] Boot sequence plays once per session; warm boot near-instant
- [x] ELS module identity names applied across navigation and headers
- [x] Phase 1 exit criteria met (`10_IMPLEMENTATION_PLAN.md` §1.12)

### Risks

| Risk                                                | Mitigation                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| OS metaphor feels like a website with extra steps   | Phase 2 Operations Center must validate with real data density    |
| Client JS budget exceeded early (~102 kb)           | Monitor bundle during v0.9.5; lazy load all non-critical features |
| ELS/i18n tension (immutable English terms in RU/UZ) | Document as canonical behavior; translate shell chrome only       |

### Dependencies

None. Initial release.

---

## v0.9.5 — Operations Center

**Status:** Planned  
**Maps to:** `10_IMPLEMENTATION_PLAN.md` Phase 2

### Goals

Transform Operations Center from structural skeleton into the richest screen — operational briefing with live system data, module shortcuts, session activity, and functional system console. Validate that the OS metaphor sustains under information density.

### Major Features

- **System Header Card** — status, mission, version, location, timezone from `config.json`
- **Dashboard cards (8)** — Products, Notes, Stack, Experience, Architecture, Activity, Principles with real preview data and links
- **Activity Log** — timestamped events from `content/activity/log.json` and optional session append
- **Terminal (functional)** — full command registry: `help`, `projects`, `about`, `stack`, `contact`, `status`, `mission`, `version`, `whoami`, `open`, `search`, `clear`, `lang` (`02_ENGINEERING_LANGUAGE.md` §10)
- **Card hover motion** — border brighten, signal line, translateY(-1px) per design tokens (`ADR-0008` activation)
- **Module transitions** — crossfade 200 ms, translateY 8 px, shell static
- **Responsive grid** — 3 / 2 / 1 column breakpoints
- **Dashboard metadata** — title, description, WebSite JSON-LD

### Success Criteria

- [ ] Operations Center displays live config data — no placeholder metrics
- [ ] All eight cards link to correct modules with real preview strings ≤60 chars
- [ ] Terminal executes full command registry with ELS responses
- [ ] Activity log renders at least three seed entries
- [ ] Module transition from dashboard card feels instant (≤240 ms to interactive)
- [ ] Phase 2 exit criteria met (`10_IMPLEMENTATION_PLAN.md` §2.9)
- [ ] Dashboard answers one question: _"What is the current state of the system?"_

### Risks

| Risk                                   | Mitigation                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------ |
| Fake or invented preview data on cards | All card data from compile-time indexes — Zod validated                              |
| Terminal scope creep                   | Strict command registry from ELS §10 — no custom scripting                           |
| Motion performance on low-end devices  | `prefers-reduced-motion` instant fallback; Framer Motion only where CSS insufficient |
| Dashboard becomes hero section         | No full-width banners, no metrics animation without data                             |

### Dependencies

- v0.9.0 Foundation complete
- `content/activity/log.json` seed file
- Product registry index (may be minimal until v0.9.8 — cards can show zero-state)
- `framer-motion` package installation (`ADR-0008`)

---

## v0.9.8 — Product Registry and Content Modules

**Status:** Planned  
**Maps to:** `10_IMPLEMENTATION_PLAN.md` Phase 3 · Phase 4 · partial Phase 5

### Goals

Populate the content layer: registered products, at least one full Engineering Record, Knowledge Base index, Engineer Profile, Engineering Protocols, and Communication Module. Transform Codev_Tim from an empty shell into a system with verifiable engineering depth.

### Major Features

- **Product Registry** — catalog grid, status badges, domain filters, product cards from `09_PRODUCT_REGISTRY.md`
- **Engineering Record** — MDX detail pages with immutable section order, System Blueprint diagrams, TOC (`12_CONTENT_SCHEMA.md` §7)
- **Knowledge Base** — index page, empty state, Engineering Note MDX template (no placeholder articles published)
- **Engineer Profile** — system record format: identity, deployment history, technology stack layers (`02_ENGINEERING_LANGUAGE.md` §9.3)
- **Engineering Protocols** — eight protocol entries from `03_ABOUT_TIMUR.md` §10
- **Communication Module** — availability block, contact form (React Hook Form + Zod), Resend API route
- **Content validation** — Zod schemas at build; fail on invalid published content
- **MDX pipeline** — `@next/mdx` or equivalent with custom components for diagrams, code blocks, callouts

### Success Criteria

- [ ] All products in `09_PRODUCT_REGISTRY.md` have Engineering Record routes
- [ ] At least one Engineering Record complete with System Blueprint
- [ ] Product Registry filterable by status and domain
- [ ] Engineer Profile uses data-row format — not biography prose
- [ ] Communication Module queues message with ELS confirmation
- [ ] Empty Knowledge Base state renders correctly — no fake articles
- [ ] All content passes Zod validation at build time
- [ ] Phases 3–4 exit criteria met

### Risks

| Risk                                    | Mitigation                                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| Content invention beyond canonical docs | All facts from `03_ABOUT_TIMUR.md`, `09_PRODUCT_REGISTRY.md` — agent stops and asks Timur |
| Engineering Record section order drift  | Immutable order enforced by MDX layout component                                          |
| MDX component scope explosion           | Phase 4 components only — no speculative abstractions                                     |
| Form spam on Communication Module       | Rate limiting, honeypot, server-side validation                                           |

### Dependencies

- v0.9.5 Operations Center (card previews link to populated modules)
- Confirmed product data in `09_PRODUCT_REGISTRY.md`
- MDX infrastructure decision finalized (`ADR-0007`)
- `zod`, `react-hook-form` installation
- Resend API key for Communication Module (production)

---

## v1.0.0 — Production Release

**Status:** Planned  
**Maps to:** `10_IMPLEMENTATION_PLAN.md` Phase 5 (SEO) · Phase 6 (Polish)

### Goals

Deploy Codev_Tim to production on confirmed domain. Enable discovery by search engines, AI systems, and humans. Meet performance, accessibility, and SEO checklists. Transition from `noindex` development state to indexed public system.

### Major Features

#### SEO

- Unique `title` and `description` per module — ELS compliant (`04_SEO_STRATEGY.md`)
- Canonical URLs and hreflang alternates: `en`, `ru`, `uz`, `x-default`
- `BreadcrumbList` JSON-LD on all modules except Operations Center
- `WebSite` + `SearchAction` JSON-LD on Operations Center
- `Person` JSON-LD on Engineer Profile
- `Product` / `SoftwareApplication` JSON-LD on Engineering Records
- Dynamic `sitemap.ts` and `robots.ts`
- `llms.txt` for AI crawler instruction (`07_AI_INDEXING.md`)

#### Analytics

- GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID` — deferred script load
- Core Web Vitals monitoring

#### RSS

- `feed.xml` for Knowledge Base Engineering Notes
- Feed discovery link in document head

#### OpenGraph

- OG images per module type — default + module-specific where applicable
- Twitter Card metadata
- `og:locale` and alternates

#### JSON-LD

- Centralized builders in `lib/seo/` — typed, tested, ELS-aligned labels
- No inline schema in page components

#### Performance

- Lighthouse 95+ on Operations Center, Product Registry, Engineer Profile
- LCP <1.5 s · CLS <0.05 · INP <100 ms (`08_TECH_STACK.md` §2.13)
- Initial JS bundle ≤80 kb gzipped (reduction from v0.9.x baseline)
- Image optimization via `next/image` — AVIF/WebP

#### Accessibility

- Full WCAG AA audit per `06_SEO_CHECKLIST.md` §C
- Keyboard operability on all modules
- Screen reader verification on navigation, terminal, form

#### Deployment

- Vercel production deployment on confirmed `SITE_URL`
- Environment variables secured — no secrets in repository
- Preview deployments for pull requests
- CI pipeline: `validate` on every push

### Success Criteria

- [ ] `06_SEO_CHECKLIST.md` fully passed
- [ ] `robots` allows indexing on production domain
- [ ] hreflang validated — no orphan alternates
- [ ] Lighthouse 95+ on three primary modules
- [ ] Communication Module delivers email in production
- [ ] No console errors in production build
- [ ] Version badge reads v1.0.0
- [ ] Timur confirms domain and approves public launch

### Risks

| Risk                                                | Mitigation                                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| SEO launch before content quality ready             | Gate v1.0.0 on v0.9.8 content completeness review                                      |
| Performance regression from JSON-LD and analytics   | Measure in CI; defer non-critical scripts                                              |
| hreflang errors with partial RU/UZ body translation | Exclude locale from hreflang when body untranslated (`05_CONTENT_ARCHITECTURE.md` §20) |
| Domain not confirmed                                | `SITE_URL` remains localhost until Timur confirms — blocks production only             |

### Dependencies

- v0.9.8 content modules complete
- Confirmed production domain
- GA4 property created
- Resend production configuration
- Full pre-release review against Brand Bible checklist (`01_BRAND_BIBLE.md` §17)

---

## v1.1 — Writing Expansion

**Status:** Planned  
**Maps to:** Post-v1.0 content scale · `12_CONTENT_SCHEMA.md` FAQ note

### Goals

Scale Knowledge Base from empty registry to publishable Engineering Notes. Enable discovery within notes via search, tags, and improved RSS. Establish sustainable content publishing workflow.

### Major Features

- **Engineering Notes** — MDX articles with frontmatter: title, summary, tags, cluster, category, `dateModified`
- **Knowledge Base index** — pagination (20 per page), filter by tag, cluster, category query params
- **In-note search** — client-side or build-time index across published notes
- **Tag and cluster taxonomy** — canonical tag registry, no orphan tags
- **RSS improvements** — full content or summary per feed policy, category tags, `dateModified` refresh
- **Optional FAQ blocks** — `FAQItem[]` on Engineering Records (`12_CONTENT_SCHEMA.md`)
- **Related notes / related projects** — bidirectional integrity enforced at build

### Success Criteria

- [ ] At least three published Engineering Notes — no placeholder content
- [ ] Notes pass ELS analytical register (`02_ENGINEERING_LANGUAGE.md` §9.2)
- [ ] Tag filter returns correct subset
- [ ] RSS validates and includes all published notes
- [ ] `dateModified` updates on content change — visible in feed and schema
- [ ] Empty states remain for zero-result filters

### Risks

| Risk                                                | Mitigation                                                     |
| --------------------------------------------------- | -------------------------------------------------------------- |
| Publishing placeholder articles to fill empty index | Empty Knowledge Base is valid — publish only confirmed content |
| Tag taxonomy drift                                  | Canonical tag list in `content/taxonomy/` — validated at build |
| RSS stale entries                                   | Rebuild on content change; CI content validation hook          |

### Dependencies

- v1.0.0 production deployment
- MDX pipeline stable from v0.9.8
- Timur-authored note content — not agent-generated

---

## v1.2 — AI Features

**Status:** Planned  
**Maps to:** `07_AI_INDEXING.md` · `04_SEO_STRATEGY.md` AI section

### Goals

Make Codev_Tim discoverable and queryable by AI systems and power users. Extend command palette and search from module list to semantic query across the full content graph.

### Major Features

- **Semantic Search** — embedding index over products, notes, profile sections; query via command palette and dedicated search module
- **AI Index** — structured `llms.txt`, enhanced JSON-LD graph, entity relationship markup, chunk-friendly heading structure
- **Recommendations** — related modules, products, and notes surfaced contextually (Operations Center, Engineering Record sidebar)
- **Command Intelligence** — palette understands natural language queries: _"open ERP project"_, _"notes about architecture"_ — routes to correct module or record
- **Terminal `search` command** — functional full-text and semantic query with ranked results
- **AI citation optimization** — first-paragraph factual density audit per `07_AI_INDEXING.md` §1

### Success Criteria

- [ ] Command palette returns relevant results for product and note queries
- [ ] Semantic search latency ≤500 ms on indexed corpus
- [ ] `llms.txt` accurately describes site structure and entity types
- [ ] External AI system (manual test: ChatGPT/Perplexity) cites Codev_Tim with correct attribution
- [ ] Search returns ELS empty state: `No matching modules or records.` — not generic errors
- [ ] Index rebuilds at compile time — no runtime embedding API calls on user requests

### Risks

| Risk                                   | Mitigation                                                     |
| -------------------------------------- | -------------------------------------------------------------- |
| Embedding cost and complexity          | Build-time index only; small corpus initially                  |
| AI feature feels gimmicky              | Every AI feature must serve OS metaphor — query, not chat      |
| Stale index after content update       | Index regeneration in build pipeline — fail if stale           |
| Over-exposure of private draft content | Only `publishStatus: published` content indexed — Zod enforced |

### Dependencies

- v1.1 published note corpus (minimum corpus for meaningful semantic search)
- v1.0.0 JSON-LD and `llms.txt` baseline
- Embedding model selection and cost review
- Sufficient content graph for recommendations — at least 2 products and 3 notes

---

## v2.0 — Platform

**Status:** Future  
**Horizon:** 2027 H2+

### Goals

Evolve Codev_Tim from a closed personal engineering system into an extensible platform: documented public API, exportable design system, and plugin architecture for modules and terminal commands. Requires proven v1.x stability.

### Major Features

- **Public API (`/api/v1/`)** — read-only REST endpoints: system status, product registry, published notes, engineer profile summary
- **Developer Portal** — API documentation, authentication model, rate limits, example clients
- **Open Components** — design system package export: tokens, primitives, ModuleHeader, System Blueprint diagram components
- **Plugin System** — extension registry for: terminal commands, command palette providers, dashboard card slots, status bar segments
- **Changelog and Colophon** — public system documentation pages (`12_CONTENT_SCHEMA.md` v2.0 notes)
- **Versioned API** — semantic versioning, deprecation policy, breaking change protocol

### Success Criteria

- [ ] API documented with OpenAPI specification
- [ ] Rate limiting and API key authentication operational
- [ ] Design system package consumable in external Next.js project
- [ ] At least one plugin loaded via registry — proof of extension model
- [ ] No regression to v1.0 performance and accessibility baselines
- [ ] ADR-0011+ recorded for all major platform decisions

### Risks

| Risk                                          | Mitigation                                                        |
| --------------------------------------------- | ----------------------------------------------------------------- |
| Premature platform abstraction                | Gate v2.0 on v1.0 running in production ≥3 months                 |
| API security exposure                         | Read-only v2.0 — no write endpoints; auth required                |
| Plugin system complexity                      | Start with terminal command plugins only — narrowest surface      |
| Maintenance burden of open components         | Version design system package independently from site             |
| Scope expansion beyond single-engineer system | v2.0 serves reference implementation goal — not multi-tenant SaaS |

### Dependencies

- v1.0.0 production stable ≥3 months
- v1.2 search and content graph mature
- Documented content schema stable (`12_CONTENT_SCHEMA.md` v1.x frozen)
- ADR process for platform API design (`13_ARCHITECTURE_DECISIONS.md` §ADR Governance)
- Timur explicit approval for public API scope

---

## Roadmap Governance

| Action                         | Rule                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| Advance version number         | All Success Criteria checked                                                     |
| Add feature to current version | Timur approval if scope expands                                                  |
| Add new version                | Document in this file + `CHANGELOG.md` on release                                |
| Defer feature                  | Move to Future Notes — do not silently drop                                      |
| Change architecture            | New ADR required — never silent (`13_ARCHITECTURE_DECISIONS.md` §ADR Governance) |

**Review cadence:** This roadmap is reviewed at each version release and updated when scope or sequencing changes.

---

**Related documents:** `CHANGELOG.md` · `10_IMPLEMENTATION_PLAN.md` · `00_PROJECT_VISION.md` · `13_ARCHITECTURE_DECISIONS.md`

---

_End of roadmap specification._
