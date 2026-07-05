# Codev_Tim — Contributing Guide

**Document ID:** `CT-CONTRIB`  
**Version:** 1.0.0  
**Status:** Canonical — Mandatory for all contributors  
**Last Updated:** 2026-07-05

---

## Mission

Codev_Tim is an **Engineering Operating System** — a premium digital product that represents software engineer Timur as an operational system, not as a portfolio or marketing site.

This repository is developed with assistance from multiple AI coding agents and maintained by Timur. Every contributor — human or AI — operates under the same engineering standards. There is no reduced bar for automated tooling.

The mission of this guide is to preserve system integrity: architecture, language, accessibility, performance, and factual accuracy must remain consistent regardless of who writes the code.

---

## Repository Philosophy

### What This Repository Is

- A modular monolith built on Next.js 15, TypeScript strict, Tailwind CSS v4, and next-intl
- A persistent AppShell with module-based navigation, terminal, and command palette
- A git-backed content system — MDX and JSON validated at build time
- A specification-driven codebase — behavior is defined in `/docs` before implementation

### What This Repository Is Not

- A portfolio template or freelancer landing page
- A generic open-source starter
- A CMS-driven marketing site
- A playground for unreviewed AI output

### Core Beliefs

| Belief                        | Implication                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| Documentation precedes code   | Read specs before writing implementation                                  |
| Facts are canonical           | Biographical and product data come from confirmed sources only            |
| The OS metaphor is structural | Persistent shell, module transitions, system voice — not decorative theme |
| Performance is design         | Lighthouse 95+ is a release requirement, not an aspiration                |
| Custom UI only                | No component library skins; Obsidian Console is handcrafted               |

### Authority Hierarchy

When documents conflict, resolve in this order:

```
1. docs/00_PROJECT_VISION.md
2. docs/01_BRAND_BIBLE.md
3. docs/02_ENGINEERING_LANGUAGE.md
4. docs/03_ABOUT_TIMUR.md
5. docs/09_PRODUCT_REGISTRY.md
6. docs/11_DESIGN_TOKENS.md
7. docs/12_CONTENT_SCHEMA.md
8. docs/13_ARCHITECTURE_DECISIONS.md
9. docs/04–08, 10
10. docs/06_SEO_CHECKLIST.md
```

`.cursor/rules.md` mirrors these standards for AI agents in Cursor. It does not override `/docs`.

---

## Documentation First

### Rule

No implementation without reading the relevant specification.

### Before Any Change

1. Identify the phase and module affected — `docs/10_IMPLEMENTATION_PLAN.md`
2. Read the canonical doc for that domain (design tokens, content schema, ELS, ADR)
3. Verify the change does not contradict an accepted ADR — `docs/13_ARCHITECTURE_DECISIONS.md`
4. If scope is undefined — stop and ask Timur

### Canonical Data Sources

| Data               | Source                            |
| ------------------ | --------------------------------- |
| Engineer profile   | `docs/03_ABOUT_TIMUR.md`          |
| Products           | `docs/09_PRODUCT_REGISTRY.md`     |
| UI copy and labels | `docs/02_ENGINEERING_LANGUAGE.md` |
| Visual values      | `docs/11_DESIGN_TOKENS.md`        |
| Content structure  | `docs/12_CONTENT_SCHEMA.md`       |
| Version roadmap    | `docs/ROADMAP.md`                 |
| Shipped history    | `docs/CHANGELOG.md`               |

### Never Invent

- UI patterns not defined in specifications
- Biographical facts, timeline entries, or metrics
- Products not listed in `09_PRODUCT_REGISTRY.md`
- Contact URLs not in `03_ABOUT_TIMUR.md`
- Marketing copy, superlatives, or placeholder lorem ipsum in production content

When information is missing: **stop, ask Timur, do not ship guesses.**

---

## Engineering Language

All user-facing text must conform to the Engineering Language System (ELS) — `docs/02_ENGINEERING_LANGUAGE.md`.

### Applicability Test

> Could this sentence exist inside Linear, Stripe, or Vercel?  
> If not — rewrite.

### Voice

| Context                    | Voice                                               |
| -------------------------- | --------------------------------------------------- |
| UI labels, status, errors  | System voice — impersonal, third person             |
| Engineering records, notes | Engineer voice — first person allowed, factual only |
| Terminal                   | Shell voice — command/response protocol             |
| Engineer Profile           | Record voice — data-oriented                        |

### Forbidden Language

Never use: passionate, guru, rockstar, ninja, expert, amazing, awesome, hire me, portfolio, freelancer, journey, or similar marketing register.

Never use exclamation marks in UI.

### Immutable Module Names

These terms remain in English across all locales:

- Operations Center
- Product Registry
- Engineering Protocols
- Knowledge Base
- Engineer Profile
- Communication Module

Shell chrome (navigation labels, status text) is translated via `/messages/{locale}.json`.

---

## Architecture Rules

Reference: `docs/13_ARCHITECTURE_DECISIONS.md` · `docs/10_IMPLEMENTATION_PLAN.md` · `docs/08_TECH_STACK.md`

### Directory Structure

```
src/
├── app/[locale]/          # Routes only — thin page files
├── components/shell/      # AppShell, Header, Sidebar, StatusBar
├── components/ui/         # Primitives
├── components/modules/    # Module-specific components
├── features/              # terminal, palette, boot, i18n
├── lib/                   # content, seo, schemas, utils
├── context/               # Shell and boot providers
└── types/
```

### Module Isolation

- Each module owns components in `components/modules/{module}/`
- Shell components never import module-specific logic
- Shared logic used twice or more belongs in `lib/`
- Routes in `app/[locale]/` delegate to module components — no business logic in page files

### Server Components Default

- Pages and layouts are Server Components unless client interactivity is required
- Mark `'use client'` only for: terminal, command palette, forms, animations, locale switcher, scroll spy
- Fetch content in Server Components — pass as props to client children
- Never use `useEffect` for data fetching

### State Management

| Layer                            | Tool                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| Shell UI state                   | React Context                                                |
| Terminal history, palette recent | localStorage                                                 |
| Server content                   | RSC + props — never global client state                      |
| Complex client state             | Zustand only if Context causes measurable re-render problems |

Default: React Context. Zustand requires justification.

### Composition

- Small composable components
- No class components
- No HOCs unless unavoidable
- Dynamic import for terminal and command palette

### Technology Constraints

Accepted stack is defined by ADR-0001 through ADR-0010. Do not introduce alternatives without a new ADR.

Forbidden: shadcn/ui, MUI, Ant Design, Bootstrap, CSS-in-JS runtimes, headless CMS integration, client-only rendering for indexable content.

---

## Before Writing Code

Complete this sequence before opening an editor:

1. **Confirm phase** — `docs/10_IMPLEMENTATION_PLAN.md`. Do not implement Phase 4 MDX components during Phase 1 unless Timur directs otherwise.
2. **Read domain docs** — tokens, schema, ELS, relevant ADR.
3. **Locate existing patterns** — search `src/` for similar components before creating new abstractions.
4. **Define scope boundary** — one module, one feature, one concern per change set.
5. **Verify data source** — all facts from canonical docs; no invented content.
6. **Check dependencies** — new npm packages >20 kb gzipped require Timur approval (`docs/08_TECH_STACK.md` §5.7).

### Allowed Without Asking

- Implementation files in `src/` per implementation plan
- Content files matching `12_CONTENT_SCHEMA.md` with confirmed data
- Translation keys in `/messages/`

### Requires Timur Confirmation

- New products in registry
- New ADRs
- New design tokens not in `11_DESIGN_TOKENS.md`
- New npm dependencies >20 kb gzipped
- New top-level navigation modules
- Biographical content changes
- New `/docs` specifications

---

## Before Refactoring

Refactoring is permitted when it reduces duplication, improves type safety, or aligns code with current specifications. Refactoring is not permitted when it expands scope, changes behavior without spec update, or restructures architecture without ADR.

### Checklist

1. **Behavior unchanged** — unless spec explicitly requires change
2. **Tests and validation pass** — `npm run validate` and `npm run build`
3. **No drive-by changes** — unrelated files stay untouched
4. **Token compliance preserved** — no hardcoded values introduced during cleanup
5. **Module boundaries respected** — shell does not absorb module logic
6. **If architecture changes** — new ADR required before merge

### Prohibited Refactoring Patterns

- Renaming ELS module identifiers without spec update
- Extracting abstractions used once
- Replacing Context with Zustand without measured re-render problem
- Consolidating modules that the implementation plan keeps separate
- "Modernizing" to patterns not in `08_TECH_STACK.md`

---

## Design Token Rules

Reference: `docs/11_DESIGN_TOKENS.md` · ADR-0004

Every visual value must reference a token from `src/styles/tokens.css`. Arbitrary values are forbidden unless added to the token specification first.

### Required

- Tailwind utilities mapped to design tokens
- CSS variables from `tokens.css`
- `clsx` + `tailwind-merge` for conditional classes

### Forbidden

- Inline `style={{}}` except dynamic values impossible in Tailwind
- Hardcoded colors: `#07090F`, `#F0B429`, `rgb(...)` in components
- Arbitrary spacing: `p-[13px]`, `mt-[22px]`, `gap-[18px]`
- Arbitrary motion: `duration-[350ms]`
- CSS-in-JS (styled-components, emotion)
- Global class overrides outside `globals.css` and `tokens.css`

### Token Categories

```
--color-*     Colors (Obsidian Console palette)
--space-*     Spacing scale
--motion-*    Duration and easing
--radius-*    Border radius
--z-*         Layer stack
--a11y-*      Accessibility (focus ring, touch targets)
```

Dark theme only for v1.0. Light theme is explicitly out of scope.

---

## Accessibility Rules

Reference: `docs/11_DESIGN_TOKENS.md` §25 · `docs/06_SEO_CHECKLIST.md` §C

WCAG AA is the minimum standard for all modules.

### Required

- Full keyboard operability — no mouse-only interactions
- `:focus-visible` with amber focus ring on all interactive elements
- Skip to content link — first focusable element in DOM order
- Semantic landmarks: `header`, `nav`, `main`, `article`, `footer`, `time`
- One `<h1>` per page — inside `<main>` only
- ARIA labels on icon-only buttons
- Screen reader announcement on module navigation
- Touch targets ≥48 px on mobile
- `prefers-reduced-motion` respected on all animations

### Verification

Run `npm run a11y:validate` for token contrast checks. Manual keyboard and screen reader verification required before v1.0.0 release.

---

## Localization Rules

Reference: ADR-0005 · `docs/05_CONTENT_ARCHITECTURE.md` §20

### Locales

| Code | Language | Default |
| ---- | -------- | ------- |
| `en` | English  | Yes     |
| `ru` | Russian  |         |
| `uz` | Uzbek    |         |

### UI Strings

All shell chrome strings live in `/messages/{locale}.json` via next-intl. Never hardcode UI copy in components.

### Content

Long-form content uses `index.{locale}.mdx` per locale. Same slug across all locales.

### hreflang

Exclude a locale from hreflang alternates if the page body is not translated for that locale. Do not advertise untranslated content as available.

### ELS Terms

Immutable module identity names stay in English in all locales. Only descriptive shell chrome is translated.

---

## SEO Rules

Reference: `docs/04_SEO_STRATEGY.md` · `docs/06_SEO_CHECKLIST.md` · `docs/12_CONTENT_SCHEMA.md`

SEO infrastructure is not optional for indexable pages. Metadata is generated via Next.js Metadata API using helpers in `lib/seo/`.

### Every Indexable Page Requires

- Unique `title` and `description` — ELS compliant
- Canonical URL
- hreflang alternates: `en`, `ru`, `uz`, `x-default`
- Open Graph and Twitter Card metadata
- JSON-LD appropriate to page type
- `BreadcrumbList` (except Operations Center)
- One `<h1>`, semantic landmarks
- No orphan pages

### Pre-Release

Run `docs/06_SEO_CHECKLIST.md` in full before v1.0.0 production deploy. Release blocked on any Critical failure.

### Development State

`robots` may disallow indexing until v1.0.0. Do not enable indexing without Timur confirmation and checklist completion.

---

## Motion Rules

Reference: `docs/11_DESIGN_TOKENS.md` §15 · ADR-0008

Motion explains state — it does not decorate.

### Permitted

- Module switch crossfade (200 ms)
- Card hover: border brighten, signal line, `translateY(-1px)` max
- Boot sequence (cold session only)
- Loading indicators tied to real async work

### Forbidden

- Parallax, bounce, elastic easing, particles, glow pulse, floating elements
- Duration exceeding `--motion-duration-reveal` (600 ms) for UI transitions
- Animation without `prefers-reduced-motion` fallback
- Framer Motion without `useReducedMotion()` hook

Framer Motion is permitted only where CSS transitions are insufficient. Default to CSS.

---

## Component Rules

### Primitives (`components/ui/`)

- Stateless where possible
- Token-compliant styling only
- Explicit TypeScript interfaces for all props
- No module-specific logic

### Shell (`components/shell/`)

- Persistent across navigation
- No content fetching — receives data via layout or config
- Keyboard shortcuts registered in one manager

### Modules (`components/modules/`)

- Each module exports a page-level component consumed by route
- `ModuleHeader` required on every module page
- Empty states follow ELS — one sentence + action, no illustration clutter

### Content Components

- MDX components defined in Phase 4 scope — System Blueprint, code blocks, callouts
- Engineering Record section order is immutable — `docs/12_CONTENT_SCHEMA.md` §7

### Naming

- PascalCase for components
- kebab-case for routes and slugs
- Feature folders in `features/` for cross-cutting client capabilities (boot, terminal, palette)

---

## Git Rules

### Branching

- `main` — stable, deployable history
- Feature branches: `{phase}/{feature}` or `{module}/{change}` — e.g. `phase-2/dashboard-cards`
- One logical change per branch

### Prohibited Operations

- Do not modify git config
- Do not force push to `main` without Timur explicit request
- Do not skip hooks (`--no-verify`) unless Timur explicitly requests
- Do not commit `.env`, secrets, or API keys
- Do not commit content with `publishStatus: published` that fails Zod validation

### Hooks

Husky runs on every commit:

- **pre-commit** — lint-staged (ESLint + Prettier on staged files)
- **commit-msg** — commitlint (Conventional Commits)

Install hooks: `npm install` triggers `prepare` → husky.

---

## Commit Rules

Format: [Conventional Commits](https://www.conventionalcommits.org/)

```
<type>(<optional scope>): <subject>

[optional body]
```

### Allowed Types

`feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

### Subject Rules

- Lowercase subject — no PascalCase or Start Case
- Max 100 characters
- Imperative mood: `add module header` not `added module header`
- No period at end

### Examples

```
feat(dashboard): add system header card from config
fix(boot): restore warm session without replaying cold sequence
docs: add roadmap for v0.9.5 through v2.0
refactor(shell): extract module registry to lib/shell/modules
```

### Scope

Use module or feature name when applicable: `shell`, `boot`, `terminal`, `palette`, `dashboard`, `projects`, `i18n`, `seo`.

### Body

Include body when the change requires context: ADR reference, breaking change note, or spec section cited.

### AI Agent Commits

AI agents must not commit unless Timur explicitly requests. When requested, follow the same format and run validation before commit.

---

## Pull Request Checklist

Complete before requesting review.

### Specification Compliance

- [ ] Relevant `/docs` files read and followed
- [ ] No conflict with accepted ADRs
- [ ] Copy matches ELS — `docs/02_ENGINEERING_LANGUAGE.md`
- [ ] Facts from canonical sources — nothing invented
- [ ] Phase scope respected — `docs/10_IMPLEMENTATION_PLAN.md`

### Code Quality

- [ ] `npm run validate` passes
- [ ] `npm run build` passes
- [ ] TypeScript strict — no `any`, no `@ts-ignore`
- [ ] No unnecessary `'use client'` directives
- [ ] No duplicate logic — extracted to `lib/` if reused

### Visual and UX

- [ ] Design tokens used — no arbitrary values
- [ ] Motion has `prefers-reduced-motion` fallback
- [ ] Module feels like OS navigation — shell persists, content transitions
- [ ] No hero sections, skill bars, testimonial patterns, or decorative clutter

### Accessibility

- [ ] Keyboard operable
- [ ] Focus visible on interactive elements
- [ ] Semantic HTML and single `<h1>`
- [ ] ARIA labels on icon-only controls

### i18n

- [ ] New UI strings added to all locale files (`en`, `ru`, `uz`)
- [ ] ELS immutable terms unchanged

### SEO (if indexable page touched)

- [ ] Metadata via `lib/seo/` helpers
- [ ] JSON-LD type correct for page
- [ ] hreflang alternates present

### Dependencies

- [ ] New packages justified and within bundle budget
- [ ] Packages >20 kb gzipped approved by Timur

---

## Definition of Done

A change is done when all conditions are met — not when the code compiles.

### Universal

- [ ] Implements spec as written — no undocumented behavior
- [ ] `npm run validate` and `npm run build` pass locally
- [ ] No console errors in production build
- [ ] No secrets or `.env` files in diff
- [ ] CHANGELOG updated if version-visible behavior changed (on Timur request)

### UI Module

- [ ] `ModuleHeader` present with correct ELS title and description
- [ ] Empty state follows ELS if no content yet
- [ ] Responsive at mobile (<768 px), tablet, desktop breakpoints
- [ ] Shell remains static during module transition

### Content

- [ ] Zod validation passes at build
- [ ] Slugs kebab-case, globally unique
- [ ] `dateModified` updated if content changed
- [ ] No placeholder articles published

### Phase Exit

Phase completion requires all exit criteria in `docs/10_IMPLEMENTATION_PLAN.md` for that phase — not individual PR merge.

---

## Rules for AI Agents

This repository expects multiple AI coding agents. All agents — regardless of platform — are contributors bound by this document.

### Universal Agent Rules

1. Read `/docs` and `.cursor/rules.md` before writing code
2. Never invent biographical, product, or metric data
3. Stop and ask Timur when information is missing
4. Minimize scope — smallest correct diff
5. Match existing code conventions — read surrounding files first
6. Do not commit, push, or open PRs unless Timur explicitly requests
7. Do not create new `/docs` specifications without explicit request
8. Run `npm run validate` and `npm run build` after implementation changes
9. Report what was verified and what was not
10. STOP when the user says STOP — do not continue to next phase

### Cursor

Primary development environment for Codev_Tim.

- Rules file: `.cursor/rules.md` — mandatory, mirrors this guide
- Agent skills in `.cursor/skills-cursor/` apply when invoked
- Use phase awareness from `docs/10_IMPLEMENTATION_PLAN.md`
- Prefer editing existing files over creating new ones
- Background tasks must not leave `.next` lock conflicts — verify build after parallel runs

### Claude

When used outside Cursor (Claude.ai, API, or other IDEs):

- Same authority hierarchy as Cursor agents
- Cannot assume repository context — request or read file contents explicitly
- Do not restate specs from memory — verify against `/docs`
- Output code must match project structure exactly — no generic React patterns
- Refuse to generate marketing copy, placeholder biography, or portfolio patterns

### ChatGPT

When used for code generation or review:

- Treat `/docs` as source of truth over training data
- Do not suggest shadcn/ui, MUI, or CMS integrations — all rejected by ADR
- Do not rename modules to conventional portfolio labels (About Me, Projects, Blog)
- Review output against ELS forbidden word list before submitting

### GitHub Copilot

Inline completion only — not architectural authority.

- Copilot suggestions that introduce arbitrary Tailwind values, hardcoded colors, or `any` types must be rejected
- Do not accept suggestions that add `'use client'` to static pages
- Do not accept suggestions that import forbidden UI libraries
- Human or primary AI agent remains responsible for spec compliance

### Future Agents

Any new AI tool integrated into this workflow inherits these rules automatically.

Before first use:

1. Load authority hierarchy from this document
2. Load `.cursor/rules.md` if operating in Cursor
3. Confirm current phase from `docs/10_IMPLEMENTATION_PLAN.md` and version from `docs/CHANGELOG.md`
4. Identify canonical data sources before content work

Agent-specific config files must not override `/docs`. They may summarize — not replace — canonical specifications.

---

## Mandatory Rule

**If implementation conflicts with documentation — documentation wins.**

This applies to:

- Code vs `/docs` specifications
- Agent suggestions vs ADR decisions
- Faster shortcuts vs ELS, token, or accessibility rules
- "Common practice" vs Codev_Tim engineering culture

When unsure:

1. Read the relevant doc
2. Ask Timur
3. Do not ship guesses

---

## Quick Reference

| Need                   | Read                                |
| ---------------------- | ----------------------------------- |
| Project direction      | `docs/00_PROJECT_VISION.md`         |
| Visual identity        | `docs/01_BRAND_BIBLE.md`            |
| UI copy and voice      | `docs/02_ENGINEERING_LANGUAGE.md`   |
| Engineer facts         | `docs/03_ABOUT_TIMUR.md`            |
| SEO strategy           | `docs/04_SEO_STRATEGY.md`           |
| Content architecture   | `docs/05_CONTENT_ARCHITECTURE.md`   |
| Pre-release checklist  | `docs/06_SEO_CHECKLIST.md`          |
| AI indexing            | `docs/07_AI_INDEXING.md`            |
| Technology stack       | `docs/08_TECH_STACK.md`             |
| Products               | `docs/09_PRODUCT_REGISTRY.md`       |
| Implementation phases  | `docs/10_IMPLEMENTATION_PLAN.md`    |
| Design tokens          | `docs/11_DESIGN_TOKENS.md`          |
| Content schema         | `docs/12_CONTENT_SCHEMA.md`         |
| Architecture decisions | `docs/13_ARCHITECTURE_DECISIONS.md` |
| Version roadmap        | `docs/ROADMAP.md`                   |
| Shipped versions       | `docs/CHANGELOG.md`                 |
| Cursor agent rules     | `.cursor/rules.md`                  |

---

_Mandatory for all contributors — human and AI — working in this repository._
