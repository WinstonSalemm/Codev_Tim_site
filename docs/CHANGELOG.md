# Changelog

This document records the **architectural evolution** of Codev_Tim — not git history, not commit logs.

Each version describes what the system gained, what changed at the structural level, which decisions were applied, and which constraints remain. Entries follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) section semantics, adapted for an engineering operating system: versions represent product capability milestones, not arbitrary deploy tags.

**Authority:** When this document conflicts with implementation, `/docs` canonical specifications take precedence until a new version entry records the change.

**Related:** `13_ARCHITECTURE_DECISIONS.md` · `10_IMPLEMENTATION_PLAN.md` · `02_ENGINEERING_LANGUAGE.md` · `ROADMAP.md` · `14_VERSIONING_STRATEGY.md`

---

## Foundation Status

**Status:** LOCKED  
**Effective:** 2026-07-05  
**Scope:** Phase 1 (Foundation) · Phase 1.5 (Foundation Stabilization)

The system frame is complete. Foundation is frozen.

| Rule                 | Policy                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change allowance** | Critical bug fixes only — regressions that break routing, boot, shell persistence, locale switching, or accessibility baseline                    |
| **Architecture**     | No structural changes without a new ADR in `13_ARCHITECTURE_DECISIONS.md` — accepted before implementation                                        |
| **Forward work**     | All new capability starts from Phase 2 (Operations Center) per `10_IMPLEMENTATION_PLAN.md`                                                        |
| **Prohibited**       | Refactoring foundation for polish, speculative abstractions, dependency swaps, shell layout changes, boot sequence tuning without measured defect |

Foundation code paths — AppShell, boot, routing, i18n middleware, design tokens, module registry, palette/terminal stubs — are stable interfaces. Phase 2 builds on them; it does not revise them.

**Governance:** Any pull request touching Phase 1 scope requires explicit justification as Critical fix or linked ADR. Otherwise reject and redirect to Phase 2.

---

## Phase 2 Status

**Status:** ACTIVE  
**Effective:** 2026-07-05  
**Contract:** `15_PHASE_2_CONTRACT.md`

Operations Center development is in progress. Foundation remains LOCKED.

| Rule                  | Policy                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **Allowed scope**     | Dashboard module, activity log, terminal command registry, dashboard SEO, dashboard i18n |
| **Locked**            | AppShell, Boot System, Design Tokens, Global Layout, Foundation Architecture             |
| **Foundation change** | Stop → explain → reference ADR → wait for approval. No silent edits.                     |

---

## [0.9.0] — Foundation Complete

**Release date:** 2026-07-05  
**Phase scope:** Phase 1 (Foundation) · Phase 1.5 (Foundation Stabilization)  
**Foundation status:** LOCKED — see [Foundation Status](#foundation-status)  
**System state:** Persistent AppShell operational. All module routes exist as placeholders. Operations Center contains structural skeleton only. No module content beyond canonical site config.

---

### Added

#### Repository and Tooling

- Next.js 15 App Router project with TypeScript strict mode, ESLint, Prettier, Husky, lint-staged, and commitlint (`08_TECH_STACK.md` §2.14).
- `npm run validate` pipeline: typecheck, lint, format check, design token accessibility validation.
- Path alias `@/*` mapped to `src/`.
- Environment template `.env.example` with `SITE_URL` and Phase 5 placeholders.
- Canonical site config at `content/site/config.json` — version, mission, status, availability, engineer timezone (`05_CONTENT_ARCHITECTURE.md` §14.1, `03_ABOUT_TIMUR.md`).

#### Design Token System

- `src/styles/tokens.css` — source of truth for color, typography, spacing, motion, z-index, shell dimensions (`11_DESIGN_TOKENS.md`).
- `src/styles/theme.css` — Tailwind CSS v4 `@theme` bridge.
- `src/lib/theme/constants.ts` and `values.ts` — TypeScript mirror for tooling and tests.
- `src/styles/utilities.css` — `.ds-*` utility classes.
- `scripts/validate-a11y-tokens.mjs` — automated WCAG contrast validation for token pairs.

#### Global Styling Foundation

- `reset.css`, `layout.css`, `globals.css` — dark-only Obsidian Console baseline.
- Geist Sans and Geist Mono via `next/font/google` — self-hosted at build, no CDN requests.
- Focus ring, scrollbars, text selection, and `prefers-reduced-motion` global gate.

#### Internationalization

- next-intl with locales `en`, `ru`, `uz` — prefix always (`/en`, `/ru`, `/uz`) (`ADR-0005`).
- Middleware locale detection and redirect from `/` to `/en`.
- Message files at `messages/{locale}.json` for shell, modules, palette, terminal, errors, metadata.

#### AppShell

- Persistent shell grid: System Header, Module Navigation sidebar, Content Viewport, System Status Bar (`00_PROJECT_VISION.md` §5.6).
- `ShellProvider` / `ShellContext` — mobile navigation, status panel, terminal state, command palette state.
- Responsive behavior: tablet collapsed sidebar, mobile overlay sidebar with bottom module tabs.
- `ContentViewport` with `#content` landmark.

#### Module Navigation

- Fixed module order per `10_IMPLEMENTATION_PLAN.md` §1.6:
  Operations Center · Product Registry · Engineering Protocols · Knowledge Base · Engineer Profile · Communication Module.
- Active indicator: amber left rail, elevated background.
- Keyboard navigation: Arrow Up/Down, Home, End, Escape.
- Language switch in sidebar footer with `lang` and `hrefLang` attributes.
- Terminal toggle in sidebar footer.

#### System Header

- Wordmark, version badge, system label, live system clock with valid `datetime`, operational status indicator, command palette trigger.
- Dynamic breadcrumb reflecting current module identity name.

#### System Status Bar

- Segments: Operational, Focus (mission from config), Availability (from config), Terminal state, Timezone, Version.
- Expandable system details panel architecture (`#status-panel`).

#### Operations Center Skeleton

- `DashboardSkeleton` — pure structural placeholders: system header slot, mission slot, eight card slots, activity log slot, quick actions slot, terminal slot. No metrics, no fake data.

#### Boot Sequence

- `BootProvider` with cold boot (1000 ms canonical sequence) and warm boot (session restore via `sessionStorage`).
- CSS-driven phase animations aligned to `10_IMPLEMENTATION_PLAN.md` §1.7.
- Status indicator pulse on operational dots (`--motion-duration-pulse`, `--motion-duration-pulse-interval`).
- Performance marks via `performance.mark` / `performance.measure` (`codev:boot:*`).
- Module mount completion on render (double `requestAnimationFrame`) with 240 ms safety cap.

#### Command Palette (Skeleton)

- Lazy-loaded `CommandPalette` — Ctrl+K / ⌘K toggle, blur backdrop, module list navigation, Esc dismiss, Arrow Up/Down, Enter select (`10_IMPLEMENTATION_PLAN.md` §1.8).

#### Terminal (Stub)

- Lazy-loaded `TerminalPanel` — collapsible system console above status bar.
- Toggle: sidebar button and `` ` `` keyboard shortcut.
- Commands: `help`, `clear`, `version` with ELS responses (`02_ENGINEERING_LANGUAGE.md` §10).
- Session command history in `sessionStorage`.

#### Module System

- `ModuleHeader` component — MODULE label, identity name, description.
- `ModulePlaceholderPage` on all module routes.
- `MissingModulePage` on 404 — ELS message `Module not found.` with `Return to Operations Center`.
- Per-module metadata via `createModuleMetadata()` (`04_SEO_STRATEGY.md` module titles).
- Central module registry at `src/lib/shell/modules.ts`.

#### Accessibility

- Skip to content link — first focusable element, targets `#content`.
- `inert` on shell during boot initialization.
- `inert` on background chrome when mobile Module Navigation is open.
- Focus trap in mobile sidebar overlay.
- Single `aria-live="polite"` announcer for navigation and locale sync events.
- Removed competing `role="status"` regions from boot overlay and status indicators.

---

### Changed

- Module identity names aligned to Engineering Language System across navigation, breadcrumb, headers, metadata, and placeholders — e.g. Operations Center replaces Dashboard, Product Registry replaces Projects (`02_ENGINEERING_LANGUAGE.md` §3.1).
- Boot module mount: artificial 400 ms timer replaced with render-bound completion and 240 ms maximum (`01_BRAND_BIBLE.md` §15.6 instant navigation target).
- Boot type model: `sessionType` (`cold` | `warm`) separated from `isBootComplete`; `data-boot-session` replaces ambiguous `data-boot-mode="ready"`.
- Warm boot: session restore reduced to double `requestAnimationFrame` — near-instant overlay, not fixed 240 ms delay.
- Geist font subsets extended from `latin` only to `latin`, `latin-ext`, `cyrillic` for Russian and Uzbek script coverage.
- Breadcrumb: static placeholder replaced with route-derived module identity name.
- System clock: static `--:--:--` placeholder replaced with live clock and ISO `datetime`.
- Command palette trigger: `aria-disabled` stub replaced with functional opener wired to `ShellContext`.
- Shell localization: RU and UZ message files populated for shell chrome, panel labels, skip link, announcer, and metadata descriptions. ELS immutable terms remain English in all locales per `02_ENGINEERING_LANGUAGE.md` §3.1.

---

### Fixed

- Phase 1 deliverable gaps: null placeholder pages, null 404, disabled command palette, missing terminal, missing ModuleHeader.
- Boot focus management: shell elements no longer focusable while `opacity: 0` during cold boot initialization.
- Boot JS/CSS phase desynchronization: shell chrome animations persist through `status-active` before wordmark reveal at 300 ms.
- Status bar operational dot selector: `:first-child` dependency replaced with semantic `.ds-status-dot-operational` class.
- `sessionStorage` writes wrapped in try/catch for private mode and quota failures.
- `BootContentGate` pathname detection: corrected to use next-intl `usePathname` (locale Stripped) instead of raw Next.js pathname.
- next/font compile error: subsets array must be literal at build time — spread syntax rejected by compiler.

---

### Architecture Decisions

The following accepted ADRs govern this release:

| ADR                                                                                        | Decision          | Manifestation in v0.9.0                                                 |
| ------------------------------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------- |
| [ADR-0001](13_ARCHITECTURE_DECISIONS.md#adr-0001--why-nextjs-15)                           | Next.js 15        | App Router, Metadata API, SSG for locale routes, Turbopack dev          |
| [ADR-0002](13_ARCHITECTURE_DECISIONS.md#adr-0002--why-app-router)                          | App Router        | Server Components default, client islands for shell interactivity       |
| [ADR-0003](13_ARCHITECTURE_DECISIONS.md#adr-0003--why-typescript)                          | TypeScript strict | `strict: true`, `noUncheckedIndexedAccess`, no `any`                    |
| [ADR-0004](13_ARCHITECTURE_DECISIONS.md#adr-0004--why-tailwind-css-v4)                     | Tailwind CSS v4   | `@theme` aliases, token-mapped utilities, component CSS layers          |
| [ADR-0005](13_ARCHITECTURE_DECISIONS.md#adr-0005--why-next-intl)                           | next-intl         | `/[locale]/` routing, message files, middleware                         |
| [ADR-0006](13_ARCHITECTURE_DECISIONS.md#adr-0006--why-modular-monolith)                    | Modular Monolith  | `src/features/`, `src/components/modules/`, `src/lib/shell/` isolation  |
| [ADR-0009](13_ARCHITECTURE_DECISIONS.md#adr-0009--why-local-content-instead-of-cms)        | Local Content     | `content/site/config.json` loaded at build, no CMS                      |
| [ADR-0010](13_ARCHITECTURE_DECISIONS.md#adr-0010--why-engineering-os-instead-of-portfolio) | Engineering OS    | Persistent shell, module identity names, system initialization language |

**Deferred ADRs (not yet applied in runtime):**

| ADR                      | Status in v0.9.0                               |
| ------------------------ | ---------------------------------------------- |
| ADR-0007 (MDX)           | Routes exist; MDX pipeline not wired           |
| ADR-0008 (Framer Motion) | CSS-only motion in boot; package not installed |

---

### Documentation Updated

Canonical specifications consumed and validated against this release:

| Document                       | Role in v0.9.0                                                |
| ------------------------------ | ------------------------------------------------------------- |
| `00_PROJECT_VISION.md`         | OS metaphor, persistent shell, immersion principles           |
| `01_BRAND_BIBLE.md`            | Visual identity, UX principles, loading as initializing       |
| `02_ENGINEERING_LANGUAGE.md`   | All UI copy, module names, terminal responses, error messages |
| `03_ABOUT_TIMUR.md`            | Site config: engineer identity, timezone, availability        |
| `08_TECH_STACK.md`             | Stack selection, tooling, quality gates                       |
| `10_IMPLEMENTATION_PLAN.md`    | Phase 1 deliverables, boot sequence, palette/terminal stubs   |
| `11_DESIGN_TOKENS.md`          | Token values, motion rules, accessibility thresholds          |
| `12_CONTENT_SCHEMA.md`         | Site config schema, ModuleHeader structure                    |
| `13_ARCHITECTURE_DECISIONS.md` | ADR-0001 through ADR-0010                                     |
| `.cursor/rules.md`             | Agent implementation rules aligned to `/docs` authority       |

Project-level documentation created or updated during foundation:

- `README.md` — setup, scripts, structure
- `.env.example` — environment variable reference
- `docs/CHANGELOG.md` — this document (initial release)

---

### Known Limitations

- **Operations Center content:** Structural skeleton only. System Header Card, dashboard cards, activity log, and functional terminal commands beyond stub are Phase 2 scope (`10_IMPLEMENTATION_PLAN.md` Phase 2).
- **Module content:** All modules except Operations Center render ModuleHeader only. No Product Registry entries, Engineering Notes, Engineer Profile data, or Communication Module form.
- **Engineering Record / Engineering Note detail routes:** Placeholder ModuleHeader on `[slug]` routes. No MDX content pipeline (Phase 3–5).
- **Command palette search:** Static module list only. Full query across products and notes is Phase 5.
- **Terminal commands:** `help`, `clear`, `version` only. Full command registry is Phase 2 (`02_ENGINEERING_LANGUAGE.md` §10.2).
- **Module mount detection:** Render-bound double `requestAnimationFrame`, not React Suspense or `useTransition`. Acceptable for foundation; Phase 2 may bind to route transition lifecycle.
- **Language switcher placement:** Sidebar footer, not System Header dropdown (`10_IMPLEMENTATION_PLAN.md` §1.6 deviation).
- **Visual atmosphere tokens:** `--opacity-noise` and `--opacity-grid` defined but not applied to shell surfaces.
- **SEO infrastructure:** `robots: noindex` on all routes. hreflang alternates, JSON-LD, sitemap, and Open Graph are Phase 5 (`04_SEO_STRATEGY.md`, `06_SEO_CHECKLIST.md`).
- **Dependencies not installed:** `framer-motion`, `lucide-react`, `zod`, `clsx`, `tailwind-merge` — specified in plan, required in later phases.
- **CI pipeline:** No GitHub Actions workflow. Validation runs locally via `npm run validate` only.
- **Automated tests:** No unit, integration, or visual regression tests for boot timing, shell behavior, or accessibility.
- **Initial JS bundle:** ~102 kb First Load JS shared — above Phase 6 target of 80 kb (`08_TECH_STACK.md` §2.13). Monitor during Phase 2 feature additions.
- **text-tertiary contrast:** 2.96:1 on base background — WARN in a11y validation. Restricted to MODULE labels and muted placeholders per token usage constraints.

---

### Breaking Changes

None. Initial public foundation release.

---

### Future Notes

> **Active phase:** Phase 2. Foundation is LOCKED. Do not extend Phase 1 scope.

- **Phase 2 — Operations Center:** System Header Card with live config, eight dashboard cards with real preview data, activity log, full terminal command registry, card hover motion, module transitions, responsive grid, dashboard metadata and WebSite JSON-LD (`10_IMPLEMENTATION_PLAN.md` §2).
- **Phase 3 — Product Registry:** Product cards, filters, registry index from `09_PRODUCT_REGISTRY.md`.
- **Phase 4 — Engineering Record:** MDX detail pages, System Blueprint diagrams, immutable section order (`12_CONTENT_SCHEMA.md` §7).
- **Phase 5 — Remaining Modules + SEO:** Engineer Profile, Engineering Protocols, Knowledge Base, Communication Module, hreflang, JSON-LD, sitemap, RSS, analytics.
- **Phase 6 — Polish:** Motion refinement, Lighthouse 95+, pre-release checklist (`06_SEO_CHECKLIST.md`).
- **ADR-0008 activation:** Install Framer Motion when Phase 2 card hover and module transitions require programmatic motion beyond CSS tokens.
- **Boot performance:** Consider formal state machine if boot phases expand beyond cold/warm/module-mount (locale sync, terminal gate, error recovery).

---

_End of v0.9.0 entry._
