# Codev_Tim — Cursor AI Rules

**Version:** 1.0.0  
**Status:** Canonical — Mandatory for all AI agents  
**Last Updated:** 2026-07-05

---

## Authority Hierarchy

When documents conflict, resolve in this order:

```
1. docs/00_PROJECT_VISION.md          — Highest authority
2. docs/01_BRAND_BIBLE.md
3. docs/02_ENGINEERING_LANGUAGE.md
4. docs/03_ABOUT_TIMUR.md             — Confirmed facts only
5. docs/09_PRODUCT_REGISTRY.md
6. docs/11_DESIGN_TOKENS.md
7. docs/12_CONTENT_SCHEMA.md
8. docs/13_ARCHITECTURE_DECISIONS.md
9. docs/04–08, 10                    — SEO, content, stack, plan
10. docs/06_SEO_CHECKLIST.md         — Pre-release verification
```

**If implementation conflicts with documentation — documentation wins.**

---

## Project Understanding

### Before Any Implementation

1. **Read relevant `/docs` files** before writing code
2. Understand Codev_Tim is an **Engineering Operating System** — not a portfolio
3. Never describe the project as portfolio, blog, landing page, or freelancer site
4. Reference canonical docs — do not restate or contradict them in code comments

### What Codev_Tim Is

- Premium digital product representing software engineer Timur
- Persistent AppShell: header, sidebar, status bar, terminal, command palette
- Module-based navigation: Dashboard, Product Registry, Engineer Profile, etc.
- Dark theme only (v1.0): Obsidian Console — `11_DESIGN_TOKENS.md`
- Trilingual: EN (default), RU, UZ

### Canonical Data Sources

| Data | Source |
|------|--------|
| Engineer profile | `docs/03_ABOUT_TIMUR.md` |
| Products | `docs/09_PRODUCT_REGISTRY.md` |
| Site config values | `docs/03_ABOUT_TIMUR.md` + `docs/12_CONTENT_SCHEMA.md` |
| Copy / labels | `docs/02_ENGINEERING_LANGUAGE.md` |
| Design values | `docs/11_DESIGN_TOKENS.md` |

---

## Implementation Rules

### Never Invent

- ❌ UI patterns not in specs
- ❌ Content, biography, timeline entries
- ❌ Products not in `09_PRODUCT_REGISTRY.md`
- ❌ Engineering history or metrics
- ❌ Contact URLs not in `03_ABOUT_TIMUR.md`
- ❌ Marketing copy or superlatives
- ❌ Placeholder lorem ipsum in production content

### When Information Is Missing

1. **Stop**
2. **Ask Timur** — do not guess
3. Do not use placeholder text that could ship to production
4. Do not fill gaps with "reasonable defaults" for biographical or product data

### Copy Rules

- All UI strings must follow `02_ENGINEERING_LANGUAGE.md`
- Never use forbidden words: passionate, guru, rockstar, ninja, expert, amazing, awesome, hire me, portfolio, etc.
- No exclamation marks in UI
- System voice by default — not personal marketing voice
- Pass the test: *Could this exist in Linear, Stripe, or Vercel?*

### UI Rules

- Never use shadcn/ui, MUI, Ant Design, Bootstrap
- Never copy Vercel, Linear, Stripe layouts directly — inspired only
- Never add decorative elements without purpose
- Never add hero sections, skill bars, logo grids, testimonial carousels
- Never add social media feed embeds

---

## Architecture Rules

Reference: `13_ARCHITECTURE_DECISIONS.md` · `10_IMPLEMENTATION_PLAN.md` · `08_TECH_STACK.md`

### Feature-Based Structure

```
src/
├── app/[locale]/          # Routes only
├── components/shell/      # AppShell, Header, Sidebar, StatusBar
├── components/ui/         # Primitives
├── components/modules/    # Module-specific
├── features/              # terminal, palette, boot, i18n
├── lib/                   # content, seo, schemas, utils
└── types/
```

### Module Isolation

- Each module (dashboard, projects, about, etc.) owns its components in `components/modules/`
- Shared primitives live in `components/ui/`
- Shell components never import module-specific logic
- Do not duplicate logic — extract to `lib/` when used twice

### Composition Over Inheritance

- Prefer small composable components
- No class components
- No HOCs unless absolutely necessary

### State Management

- **React Context** for shell UI state (terminal open, sidebar collapsed, locale)
- **Zustand** only if Context causes measurable re-render problems — default: avoid
- **localStorage** for terminal history, palette recent, layout preferences
- **Never** global state for server content — use RSC + props

---

## React Rules

Reference: ADR-0002 · `08_TECH_STACK.md` §2.7

### Server Components Default

- All pages and layouts are Server Components unless client interactivity required
- Mark `'use client'` only for: terminal, command palette, form, animations, locale switcher, scroll spy
- Fetch content in Server Components — pass as props to client children

### Avoid

- ❌ Unnecessary `'use client'` on pages that only display static content
- ❌ `useEffect` for data fetching — use server async
- ❌ `useEffect` for derived state — compute inline or useMemo sparingly
- ❌ Unnecessary `useMemo` / `useCallback` — default: no memoization
- ❌ Prop drilling beyond 2 levels — use composition or context

### Preferred Patterns

- Server Component page → client interactive islands
- `next/link` for all internal navigation
- Prefetch on nav hover (>100ms)
- Dynamic import for terminal and command palette

---

## TypeScript Rules

Reference: ADR-0003 · `12_CONTENT_SCHEMA.md`

- **`strict: true`** — always
- **No `any`** — use `unknown` + type guards if needed
- **Explicit interfaces** for props, content types, SEO builders
- **Zod schemas** for all content — infer types with `z.infer<typeof schema>`
- **Never `@ts-ignore`** — fix the type error
- **Never `@ts-expect-error`** without comment explaining why

---

## Styling Rules

Reference: `11_DESIGN_TOKENS.md` · ADR-0004

### Required

- ✅ Tailwind CSS utilities mapped to design tokens
- ✅ CSS variables from `src/styles/tokens.css`
- ✅ `clsx` + `tailwind-merge` for conditional classes

### Forbidden

- ❌ Inline `style={{}}` — except dynamic values impossible in Tailwind (rare)
- ❌ Hardcoded colors: `#07090F`, `#F0B429`, `rgb(...)` in components
- ❌ Arbitrary spacing: `p-[13px]`, `mt-[22px]`, `gap-[18px]`
- ❌ Arbitrary motion: `duration-[350ms]`
- ❌ CSS-in-JS (styled-components, emotion)
- ❌ Global class overrides outside `globals.css` and `tokens.css`

### Token Reference

Always use tokens from `11_DESIGN_TOKENS.md`:
- Colors: `--color-bg-*`, `--color-text-*`, `--color-accent`
- Spacing: `--space-*`
- Motion: `--motion-duration-*`, `--motion-ease-*`
- Radius: `--radius-*`
- z-index: `--z-*`

---

## Animation Rules

Reference: `11_DESIGN_TOKENS.md` §15 · ADR-0008

- Animations **explain state** — module switch, hover hierarchy, loading
- Never decorate for decoration's sake
- Never exceed `--motion-duration-reveal` (600ms) for UI
- Never: parallax, bounce, elastic, particles, glow pulse, floating
- Always implement `prefers-reduced-motion` fallback
- Framer Motion: use `useReducedMotion()` hook
- Card hover: `--motion-duration-fast` + translateY(-1px) max

---

## Accessibility Rules

Reference: `11_DESIGN_TOKENS.md` §25 · `06_SEO_CHECKLIST.md` §C

- **Keyboard first** — full site operable without mouse
- **`:focus-visible`** with amber focus ring on all interactive elements
- **Skip to content** link — first focusable element
- **Semantic HTML**: `header`, `nav`, `main`, `article`, `footer`, `time`
- **One `<h1>`** per page — in `<main>` only
- **ARIA labels** on icon-only buttons
- **Screen reader** announces module on navigation
- **WCAG AA** contrast minimum
- **Touch targets** ≥48px on mobile

---

## Performance Rules

Reference: `04_SEO_STRATEGY.md` §20 · `08_TECH_STACK.md` §2.13

- **Lighthouse ≥95** on all primary modules
- **LCP <1.5s** · **CLS <0.05** · **INP <100ms**
- Lazy load terminal and command palette
- Lazy load below-fold images — never LCP candidate
- `next/image` for all raster images — AVIF/WebP
- SVG inline for System Blueprint diagrams
- Initial JS bundle <80kb gzipped
- Defer analytics scripts
- No unnecessary third-party scripts

---

## SEO Rules

Reference: `04_SEO_STRATEGY.md` · `06_SEO_CHECKLIST.md` · `12_CONTENT_SCHEMA.md`

Every indexable page must have:

- [ ] Unique `title` and `description` — ELS compliant
- [ ] Canonical URL
- [ ] hreflang alternates (EN, RU, UZ, x-default)
- [ ] Open Graph + Twitter Card metadata
- [ ] JSON-LD appropriate to page type
- [ ] BreadcrumbList (except Dashboard)
- [ ] One `<h1>`, semantic landmarks
- [ ] No orphan pages

Generate metadata via Next.js Metadata API — use helpers in `lib/seo/`.

---

## Content Rules

Reference: `05_CONTENT_ARCHITECTURE.md` · `12_CONTENT_SCHEMA.md`

- Content lives in `/content/` — MDX + JSON
- Validate with Zod at build — fail on published content errors
- Slugs: kebab-case, globally unique — `09_PRODUCT_REGISTRY.md`
- Engineering Record section order is **immutable** — see `12_CONTENT_SCHEMA.md` §7
- Never publish placeholder articles — empty Knowledge Base is valid
- `dateModified` must update on content changes
- Bidirectional `relatedNotes` ↔ `relatedProjects` integrity

---

## i18n Rules

Reference: ADR-0005 · `05_CONTENT_ARCHITECTURE.md` §20

- UI strings: `/messages/{locale}.json` via next-intl
- Content: `index.{locale}.mdx` per locale
- Same slug across all locales
- Default locale: `en`
- Exclude locale from hreflang if body not translated
- Terminal `lang` command switches locale

---

## Git and Code Quality

Reference: `08_TECH_STACK.md` §2.14

- ESLint + Prettier — run before commit
- Husky + lint-staged — pre-commit hooks
- No committing `.env` files or secrets
- No committing unvalidated content with `publishStatus: published` that fails Zod
- Do not modify git config
- Do not force push unless Timur explicitly requests

---

## Code Review Checklist

Before completing any implementation, verify:

| Question | Reference |
|----------|-----------|
| Does this follow Brand Bible? | `01_BRAND_BIBLE.md` |
| Does copy match Engineering Language? | `02_ENGINEERING_LANGUAGE.md` |
| Does this match Project Vision? | `00_PROJECT_VISION.md` |
| Are facts from About Timur — not invented? | `03_ABOUT_TIMUR.md` |
| Are design tokens used — no arbitrary values? | `11_DESIGN_TOKENS.md` |
| Does content match schema? | `12_CONTENT_SCHEMA.md` |
| Does architecture follow ADRs? | `13_ARCHITECTURE_DECISIONS.md` |
| Is it accessible? | §Accessibility Rules above |
| Is it performant? | §Performance Rules above |
| Is it maintainable? | Feature isolation, no duplication |
| Does it feel like OS — not website? | Persistent shell, module transition |

---

## Phase Awareness

Reference: `10_IMPLEMENTATION_PLAN.md`

Implement in phase order unless Timur directs otherwise:

1. **Phase 1** — Foundation: shell, tokens, routing, boot, stubs
2. **Phase 2** — Dashboard
3. **Phase 3** — Product Registry
4. **Phase 4** — Engineering Record detail
5. **Phase 5** — About, Principles, Contact, Writing, SEO
6. **Phase 6** — Polish, checklist, deploy

Do not implement Phase 4 MDX components during Phase 1 unless explicitly asked.

---

## File Creation Rules

### Allowed without asking

- Implementation files in `src/` per plan
- Content files matching `12_CONTENT_SCHEMA.md` with confirmed data
- Translation keys in `/messages/`

### Requires Timur confirmation

- New products in registry
- New ADRs
- New design tokens not in `11_DESIGN_TOKENS.md`
- New npm dependencies >20kb
- New top-level navigation modules
- Biographical content changes

### Never create without permission

- New `/docs` specifications (Timur or explicit request)
- Marketing copy
- Placeholder biographical content

---

## General Rule

> **If there is ANY conflict between implementation and documentation — documentation wins.**

When unsure:

1. Read the doc
2. Ask Timur
3. Do not ship guesses

---

## Quick Reference

| Need | Read |
|------|------|
| Colors, spacing, motion | `docs/11_DESIGN_TOKENS.md` |
| Content structure | `docs/12_CONTENT_SCHEMA.md` |
| Why a technology | `docs/13_ARCHITECTURE_DECISIONS.md` |
| What to build next | `docs/10_IMPLEMENTATION_PLAN.md` |
| UI copy | `docs/02_ENGINEERING_LANGUAGE.md` |
| Timur's data | `docs/03_ABOUT_TIMUR.md` |
| Products | `docs/09_PRODUCT_REGISTRY.md` |
| Pre-release | `docs/06_SEO_CHECKLIST.md` |

---

*Mandatory for all AI agents working in this repository.*
