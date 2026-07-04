# Codev_Tim — Architecture Decision Records (ADR)

**Document ID:** `CT-DOC-13`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-05

---

## Preface

This document records **Architecture Decision Records (ADR)** for the Codev_Tim ecosystem. Each ADR is immutable once accepted. Superseded decisions receive new ADR numbers — never silent changes.

**ADR format:**

| Field | Description |
|-------|-------------|
| **Status** | Accepted · Proposed · Deprecated · Superseded |
| **Context** | Why the decision was needed |
| **Decision** | What was chosen |
| **Alternatives Considered** | What else was evaluated |
| **Consequences** | Positive and negative outcomes |
| **Trade-offs** | Explicit compromises |
| **Future Review Conditions** | When to revisit |
| **Cross References** | Related docs |

**Related documents:** `08_TECH_STACK.md` · `00_PROJECT_VISION.md` · `10_IMPLEMENTATION_PLAN.md`

---

## ADR Index

| ID | Title | Status |
|----|-------|--------|
| ADR-0001 | Why Next.js 15 | Accepted |
| ADR-0002 | Why App Router | Accepted |
| ADR-0003 | Why TypeScript | Accepted |
| ADR-0004 | Why Tailwind CSS v4 | Accepted |
| ADR-0005 | Why next-intl | Accepted |
| ADR-0006 | Why Modular Monolith | Accepted |
| ADR-0007 | Why MDX | Accepted |
| ADR-0008 | Why Framer Motion | Accepted |
| ADR-0009 | Why Local Content instead of CMS | Accepted |
| ADR-0010 | Why Engineering OS instead of Portfolio | Accepted |

---

## ADR-0001 — Why Next.js 15

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `08_TECH_STACK.md` §2.1 · `04_SEO_STRATEGY.md` §2.1 · `10_IMPLEMENTATION_PLAN.md` Phase 1

### Context

Codev_Tim requires SSG/SSR for SEO and AI indexing, Metadata API for hreflang/JSON-LD, image optimization, i18n routing, and deployment on Vercel. The site is content-heavy with a persistent application shell.

### Decision

Use **Next.js 15** with App Router as the sole framework.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Remix** | Strong, but team stack aligned with Next.js; Metadata API and Vercel integration more mature for this use case |
| **Astro** | Excellent for content, but OS shell with client-heavy terminal/palette fits React ecosystem better |
| **Vite + React SPA** | Fails SEO/AI crawl requirement without SSR complexity added manually |
| **Nuxt** | Vue ecosystem — Timur's stack is React/ASP.NET |

### Consequences

**Positive:**
- Metadata API, sitemap, robots native
- RSC for content pages — minimal client JS
- Vercel deployment zero-config
- Partial Prerendering in Next.js 15
- Image optimization built-in

**Negative:**
- Framework coupling to Vercel ecosystem (acceptable — confirmed deployment target)
- Next.js upgrade cadence requires maintenance

### Trade-offs

Accept vendor alignment with Vercel in exchange for performance, SEO, and deployment simplicity.

### Future Review Conditions

Revisit if:
- Next.js App Router stability regresses
- A framework offers significantly better RSC + i18n + MDX with lower bundle cost
- Deployment target changes from Vercel

---

## ADR-0002 — Why App Router

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `08_TECH_STACK.md` §2.1 · `10_IMPLEMENTATION_PLAN.md` · `.cursor/rules.md`

### Context

Codev_Tim needs nested layouts (persistent AppShell), locale-based routing, server components for content, and parallel route segments for shell vs content.

### Decision

Use **App Router exclusively** — no Pages Router.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Pages Router** | No nested layout persistence for OS shell without workarounds |
| **Hybrid App + Pages** | Two routing models increase complexity — forbidden |

### Consequences

**Positive:**
- `app/[locale]/layout.tsx` — AppShell wraps all modules once
- Server Components default for MDX content
- Layout-level metadata and JSON-LD
- Route groups for organization

**Negative:**
- Learning curve for RSC boundaries
- Some client features (terminal) require explicit `'use client'`

### Trade-offs

Accept RSC complexity in exchange for persistent shell and server-rendered content.

### Future Review Conditions

Revisit if App Router is deprecated or Next.js introduces a superior routing model.

---

## ADR-0003 — Why TypeScript

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `08_TECH_STACK.md` §2.1 · `12_CONTENT_SCHEMA.md` · `.cursor/rules.md`

### Context

Content schemas, design tokens, SEO builders, and component props require type safety. Content validation pairs with Zod — TypeScript interfaces inferred from schemas.

### Decision

**TypeScript strict mode** for entire codebase. No JavaScript files in `src/`.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **JavaScript only** | Content schema drift, SEO bugs, refactor risk |
| **JSDoc types** | Insufficient enforcement at scale |

### Consequences

**Positive:**
- Compile-time content type safety
- IDE autocomplete for tokens, schemas, components
- Safer refactors across 6 modules

**Negative:**
- Slightly slower initial development
- Zod + TypeScript duplication (mitigated by `z.infer<>`)

### Trade-offs

Development velocity for long-term maintainability.

### Future Review Conditions

Never — TypeScript is non-negotiable for this project.

---

## ADR-0004 — Why Tailwind CSS v4

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `11_DESIGN_TOKENS.md` · `08_TECH_STACK.md` §2.2 · `01_BRAND_BIBLE.md`

### Context

Obsidian Console requires CSS variable-based design tokens, utility-first styling, purge for Lighthouse 95+, and zero runtime CSS-in-JS.

### Decision

**Tailwind CSS v4** + CSS custom properties in `tokens.css`. Use `clsx` + `tailwind-merge` for class composition.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **CSS Modules** | Token mapping verbose; no utility speed |
| **Styled Components / Emotion** | Runtime cost — violates performance goals |
| **shadcn/ui + Tailwind** | shadcn forbidden — generic component look |
| **Pure CSS** | No purge, harder to enforce token usage |

### Consequences

**Positive:**
- Token-mapped utilities
- Minimal CSS bundle with purge
- No runtime styling cost
- Matches Vercel/Linear engineering aesthetic

**Negative:**
- Long class strings — mitigated by component extraction
- Tailwind v4 migration from v3 if examples use v3 syntax

### Trade-offs

Accept utility-class verbosity for performance and token enforcement.

### Future Review Conditions

Revisit if Tailwind v4 fails to support CSS variable theming adequately.

---

## ADR-0005 — Why next-intl

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `08_TECH_STACK.md` §2.5 · `04_SEO_STRATEGY.md` §14 · `05_CONTENT_ARCHITECTURE.md` §20

### Context

Codev_Tim requires EN/RU/UZ with locale-prefixed routes, hreflang, UI string translation, and client-side locale switch without full reload break.

### Decision

**next-intl** for all internationalization.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **next-i18next** | Pages Router oriented; App Router support weaker |
| **react-intl** | No routing integration |
| **Manual i18n** | hreflang, routing, message loading reinvented |
| **Separate domains per locale** | SEO and deployment complexity |

### Consequences

**Positive:**
- `/[locale]/` routing native
- Message files in `/messages/{locale}.json`
- Server and client component support
- hreflang integration with Metadata API

**Negative:**
- MDX content i18n requires separate files per locale — manual

### Trade-offs

Accept per-locale MDX files for full routing and SEO compliance.

### Future Review Conditions

Revisit if next-intl fails App Router compatibility in future Next.js versions.

---

## ADR-0006 — Why Modular Monolith

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `03_ABOUT_TIMUR.md` §13 · `00_PROJECT_VISION.md`

### Context

Timur's preferred architecture for ERP and enterprise systems. Codev_Tim site itself is a modular monolith — feature folders, shared shell, isolated modules.

### Decision

**Modular Monolith** as the default architecture pattern for:
1. Codev_Tim codebase (feature-based folders)
2. Codev ERP product architecture (documented in Engineering Records)
3. Recommended pattern in System Blueprint diagrams

Microservices only when objectively necessary at scale.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Microservices default** | Over-engineering for current scale |
| **Flat monolith** | No module boundaries — harder to maintain |
| **Monorepo micro-frontends** | Complexity unjustified for personal site + ERP MVP |

### Consequences

**Positive:**
- Clear module boundaries in code and content
- Single deployment unit — simpler CI/CD
- Aligns with Timur's engineering philosophy

**Negative:**
- Must enforce module isolation discipline manually

### Trade-offs

Simplicity and maintainability over distributed architecture prestige.

### Future Review Conditions

Revisit for Codev ERP when: team >5 engineers, independent scaling requirements per service, or deployment frequency conflicts.

---

## ADR-0007 — Why MDX

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `08_TECH_STACK.md` §2.9 · `05_CONTENT_ARCHITECTURE.md` · `12_CONTENT_SCHEMA.md`

### Context

Engineering Records and Engineering Notes require long-form prose, code blocks, architecture diagrams, trade-off tables, and custom components — not plain Markdown.

### Decision

**MDX** for all long-form content: projects, writing, principles. **JSON** for structured metadata.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Plain Markdown** | No custom components (TradeoffTable, ArchitectureDiagram) |
| **CMS rich text** | Violates ADR-0009 |
| **React pages only** | Content not separable from code — non-engineer unfriendly |
| **Notion export** | Uncontrolled HTML, SEO issues |

### Consequences

**Positive:**
- Content-as-data with React components
- Git-versioned content
- Build-time validation with Zod on frontmatter
- Code blocks with syntax highlighting

**Negative:**
- MDX compilation adds build time
- Component imports must be stable — breaking changes affect all content

### Trade-offs

Build complexity for content flexibility and version control.

### Future Review Conditions

Revisit if MDX tooling breaks Next.js 15 compatibility persistently.

---

## ADR-0008 — Why Framer Motion

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `11_DESIGN_TOKENS.md` §15 · `01_BRAND_BIBLE.md` §7.5 · `08_TECH_STACK.md` §2.4

### Context

Codev_Tim requires module transitions, scroll reveals, card hovers, boot sequence, and command palette animations — with `prefers-reduced-motion` support.

### Decision

**Framer Motion** for all UI animation. CSS transitions for micro-interactions (border, color) where sufficient.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **CSS only** | Module transition orchestration, stagger, exit animations harder |
| **GSAP** | Larger, imperative API — less React-native |
| **React Spring** | Bounce/elastic default — violates calm motion spec |
| **No animation** | Violates Experience Design — OS metaphor needs module transitions |

### Consequences

**Positive:**
- Declarative React animations
- `useReducedMotion` hook native
- AnimatePresence for module transitions

**Negative:**
- ~25–30kb gzipped — must lazy load where possible
- Risk of over-animation — governed by `11_DESIGN_TOKENS.md` §15

### Trade-offs

Bundle cost for precise motion control and reduced-motion support.

### Future Review Conditions

Revisit if:
- Framer Motion bundle exceeds 40kb after tree-shaking
- CSS `@starting-style` and View Transitions API cover all required patterns natively

---

## ADR-0009 — Why Local Content instead of CMS

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `05_CONTENT_ARCHITECTURE.md` · `12_CONTENT_SCHEMA.md` · `08_TECH_STACK.md` §2.9

### Context

Codev_Tim content includes Engineering Records, profile data, site config, and future Engineering Notes. Content must be version-controlled, validated at build, and free of CMS vendor lock-in.

### Decision

**Local content only** — `/content/` directory with MDX + JSON. No headless CMS in v1.0.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Contentful / Sanity** | Vendor lock-in, API latency, cost, content not in git |
| **Notion as CMS** | Uncontrolled output, SEO risk, not engineer-native |
| **WordPress headless** | Wrong paradigm for engineering OS |
| **Database-driven content** | Over-engineering for current scale |

### Consequences

**Positive:**
- Git history for all content changes
- Zod validation at build — no invalid content ships
- Offline authoring
- AI agents can read/edit content files directly
- Matches engineer workflow

**Negative:**
- Non-technical editing requires MDX knowledge
- No real-time preview without dev server
- Translations require duplicate files per locale

### Trade-offs

Authoring convenience for control, validation, and version control.

### Future Review Conditions

Revisit if:
- Content editors beyond Timur need GUI authoring
- Content volume exceeds 200+ articles making git unwieldy
- Real-time updates required without redeploy (then ISR + CMS, not SSR CMS)

---

## ADR-0010 — Why Engineering OS instead of Portfolio

**Status:** Accepted  
**Date:** 2026-07-04  
**Cross References:** `00_PROJECT_VISION.md` · `01_BRAND_BIBLE.md` · `02_ENGINEERING_LANGUAGE.md` · `03_ABOUT_TIMUR.md`

### Context

Timur's positioning requires communicating system design and product maturity — not freelance availability. Traditional portfolios optimize for hiring funnels and visual showcase.

### Decision

Codev_Tim is an **Engineering Operating System** — admin dashboard metaphor, module navigation, persistent shell, system language, Product Registry — not a portfolio.

### Alternatives Considered

| Alternative | Rejected because |
|-------------|------------------|
| **Classic portfolio** | Wrong positioning — Timur builds products, not pages |
| **Freelancer landing** | Violates brand — `03_ABOUT_TIMUR.md` §1.3 |
| **Resume site** | HR format — not product engineering proof |
| **Blog-first site** | Puts writing before systems — wrong hierarchy |
| **Dribbble showcase** | Visual-first — forbidden by Brand Bible |

### Consequences

**Positive:**
- Differentiated positioning for CTO/founder audience
- Terminal, command palette, status bar — proof of engineering
- ELS prevents portfolio creep in copy and UI
- Scales to Codev ecosystem brand

**Negative:**
- Unfamiliar pattern for HR recruiters expecting CV format
- Higher implementation complexity than template portfolio
- Risk of gimmickry if behavior doesn't match metaphor — mitigated by Experience Spec

### Trade-offs

HR convenience for CTO/founder trust and long-term Codev brand building.

### Future Review Conditions

Never change core positioning. Module additions allowed. Never revert to portfolio patterns.

---

## ADR Governance

### Adding New ADRs

1. Assign next sequential ID
2. Use template fields from this document
3. Cross-reference related docs
4. Timur approval for architectural decisions
5. Increment `CT-DOC-13` version

### Superseding ADRs

```
ADR-0004 v2 → ADR-0011 Why Tailwind CSS v5 (example)
Mark ADR-0004 status: Superseded by ADR-0011
```

Never delete ADRs — historical record.

---

## Document Relationships

```
13_ARCHITECTURE_DECISIONS.md  → This document — why decisions were made
08_TECH_STACK.md              → What technologies are used
10_IMPLEMENTATION_PLAN.md     → How to implement
.cursor/rules.md              → AI enforcement of these decisions
```

---

*End of canonical specification.*
