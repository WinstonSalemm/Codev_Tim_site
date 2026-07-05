# Codev_Tim — Phase 2 Development Contract

**Document ID:** `CT-DOC-15`  
**Version:** 1.0.0  
**Status:** Canonical — Active during Phase 2  
**Effective:** 2026-07-05  
**Target release:** v0.9.5 — Operations Center (`ROADMAP.md`)

---

## Preface

This document is the **development contract** for Phase 2. It binds all contributors — human and AI — for the duration of Operations Center implementation.

Foundation is LOCKED after Phase 1.5. See `CHANGELOG.md` → [Foundation Status](#foundation-status).

Phase 2 adds value inside the Operations Center module. It does not revise the system frame.

**Authority:**

1. This contract governs Phase 2 scope boundaries
2. `10_IMPLEMENTATION_PLAN.md` §2 governs Phase 2 deliverables
3. `ROADMAP.md` v0.9.5 governs Success Criteria
4. Foundation changes require ADR regardless of this contract

---

## Phase 2 Development Contract

### Locked Systems

This phase must **NOT** modify:

| System                      | Scope                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **AppShell**                | `src/components/shell/*`, `ShellProvider`, header, sidebar, status bar, mobile nav, content viewport shell chrome                |
| **Boot System**             | `src/features/boot/*`, `src/styles/boot.css`, boot session logic, cold/warm sequence                                             |
| **Design Tokens**           | `src/styles/tokens.css`, `src/styles/theme.css`, `src/lib/theme/*` — no new tokens without ADR + `11_DESIGN_TOKENS.md` amendment |
| **Global Layout**           | `src/styles/layout.css`, `globals.css`, shell grid, viewport structure, `AppShell` composition                                   |
| **Foundation Architecture** | Locale routing, middleware, module registry shape, `ShellContext` core API, feature folder boundaries established in Phase 1     |

These systems are considered **LOCKED** after Phase 1.5.

### Allowed Scope

Only **Dashboard-related** (Operations Center) code may be created or modified:

| Area                         | Allowed action                                                                                                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Operations Center module** | Create and modify dashboard components, cards, activity log, system header card                                                                                      |
| **Dashboard route**          | Modify `app/[locale]/` dashboard page — thin delegate only                                                                                                           |
| **Dashboard styles**         | Add or extend module-scoped CSS — e.g. `src/styles/module.css` dashboard section                                                                                     |
| **Activity content**         | Create or modify `content/activity/log.json`                                                                                                                         |
| **Terminal commands**        | Extend command registry and handlers in `src/features/terminal/` — Phase 2 deliverable per `10_IMPLEMENTATION_PLAN.md` §2.4; do not restructure terminal panel shell |
| **Dashboard data loaders**   | Add loaders in `src/lib/` scoped to dashboard previews — read-only consumption of config and registry                                                                |
| **Dashboard i18n**           | Add keys to `/messages/{locale}.json` under dashboard and terminal command namespaces                                                                                |
| **Dashboard SEO**            | Add metadata helpers and JSON-LD for Operations Center only — `lib/seo/` dashboard builders                                                                          |
| **Dashboard motion**         | Install and use Framer Motion for card hover and module transition — ADR-0008 activation scoped to dashboard                                                         |

### Prohibited Without ADR

- Refactoring shell components for dashboard convenience
- Changing boot timing, overlay, or session restore behavior
- Adding or renaming design tokens
- Modifying sidebar module order or module registry entries
- Changing `ShellContext` shape or provider hierarchy
- Moving terminal or command palette out of `features/`
- Global CSS changes that affect non-dashboard modules
- Routing structure changes, new top-level modules, locale config changes

---

## Foundation Change Protocol

If a Foundation change appears necessary:

1. **Stop.** Do not implement.
2. **Explain why** — describe the defect or capability gap with evidence.
3. **Reference affected ADR** — identify which accepted ADR the change supersedes or extends.
4. **Wait for approval** — Timur must accept a new or amended ADR before any Foundation code changes.

**Do not silently modify Foundation.**

Silent Foundation edits — drive-by refactors, opportunistic token tweaks, shell layout adjustments — are contract violations. Revert and redirect work to allowed Phase 2 scope.

### Critical Fix Exception

Foundation may be touched **only** for Critical regressions:

- Broken locale routing or redirect
- Boot loop or shell not rendering
- Accessibility baseline failure (skip link, keyboard trap)
- Build failure on `main`

Critical fixes require:

- Minimal diff — single concern
- No scope expansion
- Entry under `CHANGELOG.md` → `### Fixed`
- No ADR unless behavior change exceeds bug restoration

---

## Phase 2 Deliverables Reference

Full specification: `10_IMPLEMENTATION_PLAN.md` §2.1–§2.9.

| Deliverable               | Contract note                                            |
| ------------------------- | -------------------------------------------------------- |
| System Header Card        | Dashboard module only — reads `content/site/config.json` |
| 8 dashboard cards         | Real preview data — no fake metrics                      |
| Activity log              | `ActivityLog` component + seed data                      |
| Terminal command registry | Extend handlers — panel UI unchanged                     |
| Card hover motion         | Framer Motion or CSS within dashboard scope              |
| Module transition         | Triggered from dashboard cards — shell remains static    |
| Responsive grid           | Dashboard layout breakpoints only                        |
| Dashboard metadata        | WebSite JSON-LD on Operations Center                     |

### Exit Criteria

> Dashboard feels like an operations center — status, mission, module shortcuts, activity, terminal — not a hero section.

Success Criteria: `ROADMAP.md` → v0.9.5.

---

## File Path Allowlist

Use this table to validate diffs before commit.

### Create / Modify Allowed

```
src/components/modules/dashboard/**
src/app/[locale]/page.tsx                  # Operations Center route
content/activity/log.json
src/features/terminal/commands/**          # Command registry expansion
src/features/terminal/registry.ts          # Command list — if present
src/lib/dashboard/**
src/lib/seo/dashboard*.ts                  # Dashboard metadata builders
messages/*.json                            # dashboard.*, terminal command keys only
src/styles/module.css                      # dashboard section only
```

### Do Not Modify

```
src/components/shell/**
src/features/boot/**
src/features/palette/**                    # Phase 5 search scope
src/context/shell/**                       # Unless Critical fix — ADR required
src/styles/tokens.css
src/styles/theme.css
src/styles/boot.css
src/styles/layout.css
src/lib/shell/modules.ts                   # Registry shape locked
src/middleware.ts
src/i18n/**
```

---

## Agent Instructions

AI agents working on Phase 2 must:

1. Read this contract before first edit
2. Confirm every changed file path against the allowlist
3. Reject tasks that require Foundation modification — escalate via Foundation Change Protocol
4. Implement Phase 2 deliverables in dependency order per `10_IMPLEMENTATION_PLAN.md` §2
5. Run `npm run validate` and `npm run build` after dashboard changes
6. Not commit unless Timur explicitly requests

---

## Governance

| Event                    | Action                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Phase 2 complete         | Mark v0.9.5 Success Criteria in `ROADMAP.md`; update `CHANGELOG.md`; this contract superseded by Phase 3 contract when written |
| Contract violation in PR | Reject — revert Foundation changes, resubmit dashboard-only diff                                                               |
| Foundation ADR approved  | Amend this contract or `CHANGELOG.md` Foundation Status with ADR reference                                                     |
| Phase 2 scope creep      | Stop — new scope requires Timur approval and plan amendment                                                                    |

---

**Related:** `CHANGELOG.md` (Foundation Status) · `10_IMPLEMENTATION_PLAN.md` §2 · `ROADMAP.md` (v0.9.5) · `CONTRIBUTING.md` · `.cursor/rules.md`

---

_End of Phase 2 Development Contract._
