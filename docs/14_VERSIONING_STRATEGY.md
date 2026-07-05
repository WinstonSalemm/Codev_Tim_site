# Codev_Tim — Versioning Strategy

**Document ID:** `CT-DOC-14`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-05

---

## Preface

This document defines how Codev_Tim is versioned, released, branched, supported, and migrated. It applies to the site product, its content schema, and — from v2.0 — the public API.

Version numbers represent **product capability milestones**, not deploy frequency. A version advances only when Success Criteria in `ROADMAP.md` are met.

**Related documents:**

- `ROADMAP.md` — version milestones and Success Criteria
- `CHANGELOG.md` — architectural record per release
- `06_SEO_CHECKLIST.md` — pre-release verification (v1.0.0+)
- `CONTRIBUTING.md` — commit rules, Definition of Done
- `13_ARCHITECTURE_DECISIONS.md` — ADR governance on breaking changes

**Authority:** When this document conflicts with `ROADMAP.md` on version scope, `ROADMAP.md` defines _what_ ships; this document defines _how_ it ships.

---

## Versioning Strategy

### Principles

| Principle                      | Rule                                                                   |
| ------------------------------ | ---------------------------------------------------------------------- |
| **Capability over cadence**    | Version bumps align with roadmap milestones — not calendar sprints     |
| **Single source of truth**     | One version string visible across config, package, UI, and changelog   |
| **Documentation precedes tag** | `CHANGELOG.md` entry exists before git tag                             |
| **No silent breaking changes** | Breaking changes require MAJOR bump (or pre-1.0 minor bump) and ADR    |
| **Pre-1.0 honesty**            | `0.x.y` signals incomplete product — not production-ready until v1.0.0 |

### Version Surfaces

All surfaces must match at release time:

| Surface             | Location                               | Purpose                                  |
| ------------------- | -------------------------------------- | ---------------------------------------- |
| **Site version**    | `content/site/config.json` → `version` | Status bar, terminal `version`, metadata |
| **Package version** | `package.json` → `version`             | npm tooling, dependency references       |
| **Changelog**       | `docs/CHANGELOG.md`                    | Architectural release record             |
| **Git tag**         | `v{version}`                           | Immutable release pointer                |
| **Roadmap status**  | `docs/ROADMAP.md`                      | Milestone marked complete                |

Patch releases may omit roadmap status update. Minor and major releases require roadmap milestone alignment.

### Pre-1.0 Mapping (0.9.x)

Before v1.0.0, semver minor versions map to roadmap milestones:

| Version | Roadmap Milestone  | Capability Gate                                      |
| ------- | ------------------ | ---------------------------------------------------- |
| `0.9.0` | Foundation         | AppShell, routing, boot, module placeholders         |
| `0.9.5` | Operations Center  | Dashboard content, activity log, functional terminal |
| `0.9.8` | Content Registry   | Products, engineering records, knowledge base index  |
| `1.0.0` | Production Release | Public deploy, SEO, performance, accessibility       |

Intermediate patch versions (`0.9.1`, `0.9.2`, …) ship fixes and incremental work within the current milestone without advancing roadmap status.

Post-1.0 minor versions (`1.1`, `1.2`) follow `ROADMAP.md` directly.

### Post-1.0 Mapping

| Version Range | Meaning                                          |
| ------------- | ------------------------------------------------ |
| `1.x.y`       | Production product — writing expansion, AI layer |
| `2.x.y`       | Platform — public API, plugin system             |
| `3.x.y`       | Reserved — requires new roadmap horizon          |

---

## Semantic Versioning

Codev_Tim follows [Semantic Versioning 2.0.0](https://semver.org/) with pre-1.0 conventions.

**Format:** `MAJOR.MINOR.PATCH`

**Pre-release suffix (optional):** `-rc.1`, `-beta.1`, `-alpha.1`

**Example:** `1.0.0-rc.2`

### Major

Increment when:

- Breaking change to public URL structure or locale routing
- Breaking change to content schema (`12_CONTENT_SCHEMA.md`) for published content
- Breaking change to public API (v2.0+)
- Removal of a top-level module
- ADR supersession that changes fundamental architecture

**Pre-1.0:** Major remains `0`. Breaking changes increment **minor** instead (`0.9.0` → `0.10.0` only if roadmap defines such a jump; otherwise absorb into next milestone minor).

**Post-1.0:** `1.0.0` → `2.0.0` for platform layer per `ROADMAP.md`.

### Minor

Increment when:

- New module capability ships with roadmap Success Criteria met
- New feature backward-compatible with existing content and routes
- New terminal commands, dashboard cards, or module sections per spec
- New locale added (with full body translation)

**Pre-1.0:** Minor aligns with roadmap (`0.9.0` → `0.9.5` → `0.9.8`). Non-milestone increments use patch.

**Post-1.0:** `1.0.0` → `1.1.0` (Writing Expansion), `1.1.0` → `1.2.0` (AI Layer).

### Patch

Increment when:

- Bug fix with no spec change
- Accessibility fix
- Performance fix with no API or schema change
- Copy correction (ELS compliance)
- Dependency security patch
- Build or CI fix

**Never increment patch for:** new features, refactors that change behavior, or content additions.

### Pre-Release Identifiers

Used between feature-complete and production-ready:

| Suffix     | State                                     | Indexing                       |
| ---------- | ----------------------------------------- | ------------------------------ |
| `-alpha.N` | Experimental — incomplete milestone       | `noindex`                      |
| `-beta.N`  | Feature-complete, testing                 | `noindex`                      |
| `-rc.N`    | Release candidate — checklist in progress | `noindex` until Timur approves |

Drop suffix on production tag: `1.0.0-rc.3` → `1.0.0`.

---

## Branch Strategy

```
main          ─────●─────────●─────────●──────►  production releases (tags)
                    ╲       ╱
release/*     ───────●─●─●─●
                    ╱
develop       ──●──●──●──●──●──●──●──────────►  integration
               ╱              ╲
feature/*  ──●                 ╲
hotfix/*   ─────────────────────●──►  merged to main + develop
```

### `main`

- **Purpose:** Production history. Every commit is deployable or tagged.
- **Protection:** Direct push discouraged. Merge via PR or Timur-approved release merge.
- **Deploy target:** Vercel production (`SITE_URL`).
- **Tags:** `v*` tags created only on `main`.

### `develop`

- **Purpose:** Integration branch for the next minor or milestone version.
- **Source:** Feature branches merge here first.
- **Deploy target:** Vercel preview (optional persistent preview URL).
- **Rule:** Must pass `npm run validate` and `npm run build` before merge.

### `release/*`

- **Naming:** `release/{version}` — e.g. `release/1.0.0`, `release/0.9.5`
- **Purpose:** Stabilization window. Only fixes, checklist items, and version bumps — no new features.
- **Created from:** `develop` when milestone Success Criteria are met.
- **Merged to:** `main` (tag + deploy) and back-merge to `develop`.
- **Lifetime:** Deleted after merge. Tag persists.

### `hotfix/*`

- **Naming:** `hotfix/{version}-{slug}` — e.g. `hotfix/1.0.1-locale-redirect`
- **Purpose:** Urgent fix on production without waiting for `develop` cycle.
- **Created from:** `main` at current production tag.
- **Merged to:** `main` (patch tag) and `develop` (cherry-pick or merge).
- **Scope:** Minimal diff. No feature work.

### Feature Branches

- **Naming:** `{phase}/{feature}` or `{module}/{change}` — e.g. `phase-2/dashboard-cards`
- **Created from:** `develop`
- **Merged to:** `develop` via PR
- **Lifetime:** Deleted after merge

### Branch Flow Summary

| Action                | Branch flow                                                  |
| --------------------- | ------------------------------------------------------------ |
| New feature           | `feature/*` → `develop`                                      |
| Milestone complete    | `develop` → `release/*` → `main` + tag                       |
| Production bug        | `hotfix/*` → `main` + tag → `develop`                        |
| Docs-only fix on prod | `hotfix/*` or direct to `main` if trivial — Timur discretion |

---

## Definition of Production

**Production** is the publicly accessible Codev_Tim deployment on the confirmed canonical domain (`SITE_URL`).

A deployment qualifies as production when **all** conditions are true:

| Condition                                     | Verification                  |
| --------------------------------------------- | ----------------------------- |
| Version ≥ `1.0.0`                             | `content/site/config.json`    |
| Deployed on confirmed domain                  | Vercel production environment |
| `robots` allows indexing                      | `robots.ts` — not `noindex`   |
| `06_SEO_CHECKLIST.md` Critical section passed | Signed release record         |
| `SITE_URL` matches live domain                | Environment variable          |
| Communication Module delivers in production   | Resend configured             |
| Timur explicit launch approval                | Documented in CHANGELOG       |

**Pre-production deployments** (preview URLs, localhost, staging) are not production regardless of version string.

**v0.x deployments** may be public for demonstration but are **not** production per this definition — they remain pre-release.

---

## Definition of Stable

**Stable** is a release tagged on `main` that meets its milestone Success Criteria and passes full validation.

| Attribute      | Stable                           | Unstable                                   |
| -------------- | -------------------------------- | ------------------------------------------ |
| Version suffix | None (`1.0.0`, not `1.0.0-rc.1`) | `-alpha`, `-beta`, `-rc`                   |
| Branch         | Tagged on `main`                 | `develop`, `release/*` in progress         |
| Validation     | `validate` + `build` pass        | May fail during development                |
| Content        | Published content passes Zod     | Draft or invalid content allowed on branch |
| Roadmap        | Success Criteria checked         | In progress                                |
| Support        | Current stable receives patches  | Previous stable per Support Policy         |

**Current stable:** highest version tag on `main` without pre-release suffix.

**LTS (Long-Term Stable):** Not defined before v2.0. Single stable line only.

---

## Definition of Experimental

**Experimental** is any state that ships incomplete milestone scope, uses pre-release identifiers, or implements features behind no roadmap Success Criteria.

| Signal             | Experimental                                        |
| ------------------ | --------------------------------------------------- |
| Version            | `0.x.y` or `x.y.z-alpha/beta/rc`                    |
| Branch             | `develop`, feature branches, unreleased `release/*` |
| Indexing           | `noindex` required                                  |
| Terminal / palette | Partial command sets acceptable                     |
| Content            | Placeholder modules, skeleton dashboards            |
| API                | Not published (pre-v2.0)                            |
| Guarantee          | No backward-compatibility promise                   |

Experimental work must not be tagged as stable. Experimental features must not appear in production checklist as complete.

**Promotion path:** Experimental → Release Candidate → Stable. No skip.

---

## Release Checklist

Execute when merging `release/*` to `main` and creating a version tag.

### Version Alignment

- [ ] `content/site/config.json` version updated
- [ ] `package.json` version updated
- [ ] Versions match across all surfaces
- [ ] `docs/CHANGELOG.md` entry complete — Added, Changed, Fixed, Known Limitations
- [ ] `docs/ROADMAP.md` milestone marked complete (minor/major only)

### Code Quality

- [ ] `npm run validate` passes on release branch
- [ ] `npm run build` passes — no errors, no unexpected warnings
- [ ] No `.env` or secrets in repository
- [ ] No `console.log` debug output in production paths

### Git

- [ ] All commits follow Conventional Commits — `CONTRIBUTING.md`
- [ ] Release branch merged to `main`
- [ ] Release branch back-merged to `develop`
- [ ] Tag created: `git tag v{version}` with annotated message
- [ ] Tag pushed: `git push origin v{version}`

### Deploy

- [ ] Vercel production deploy triggered from `main`
- [ ] Deploy URL matches `SITE_URL`
- [ ] Smoke test: boot sequence, navigation, one module per type

### Communication

- [ ] Timur notified of release
- [ ] Activity log entry if milestone version — `content/activity/log.json`

---

## Pre-Release Checklist

Execute before creating `release/*` from `develop` — confirms milestone readiness.

### Milestone Verification

- [ ] All Success Criteria for target version checked in `ROADMAP.md`
- [ ] Phase exit criteria met in `10_IMPLEMENTATION_PLAN.md`
- [ ] No open Critical or High defects for this milestone

### Specification Compliance

- [ ] ELS copy audit on new strings — `02_ENGINEERING_LANGUAGE.md`
- [ ] Design token audit — no arbitrary values — `11_DESIGN_TOKENS.md`
- [ ] Content schema validation — `npm run build` with Zod gates
- [ ] ADRs referenced in CHANGELOG for architectural changes

### Functional

- [ ] All module routes render within persistent shell
- [ ] Boot sequence: cold once per session, warm restore works
- [ ] Terminal command registry complete for this version
- [ ] i18n: new keys present in `en`, `ru`, `uz`
- [ ] 404 and empty states follow ELS

### Non-Functional

- [ ] Lighthouse run on primary modules — record scores
- [ ] Keyboard navigation verified
- [ ] `prefers-reduced-motion` verified on new animations
- [ ] Bundle size recorded — compare to prior release

### v1.0.0 Additional Gate

- [ ] Full `06_SEO_CHECKLIST.md` passed
- [ ] hreflang validated
- [ ] JSON-LD validated per page type
- [ ] RSS feed validates
- [ ] `llms.txt` present and accurate

---

## Production Checklist

Execute on v1.0.0+ before enabling public indexing and declaring production per Definition of Production.

### Environment

- [ ] `SITE_URL` set to confirmed production domain
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` configured (if analytics enabled)
- [ ] Resend API key configured for Communication Module
- [ ] Vercel production environment variables secured — not in repo

### SEO and Discovery

- [ ] `robots.ts` — `allow` for production domain
- [ ] `sitemap.ts` generates complete URL set
- [ ] Canonical URLs resolve correctly per locale
- [ ] hreflang: `en`, `ru`, `uz`, `x-default` — no orphans
- [ ] Open Graph images serve correctly
- [ ] JSON-LD validates in Rich Results Test
- [ ] `feed.xml` accessible and valid

### Performance

- [ ] Lighthouse ≥95 on Operations Center, Product Registry, Engineer Profile
- [ ] LCP <1.5 s · CLS <0.05 · INP <100 ms
- [ ] Initial JS bundle ≤80 kb gzipped
- [ ] No render-blocking third-party scripts

### Accessibility

- [ ] WCAG AA audit complete — `06_SEO_CHECKLIST.md` §C
- [ ] Screen reader spot-check on navigation and form
- [ ] Skip link functional
- [ ] Focus trap verified on mobile sidebar and overlays

### Security

- [ ] No secrets in client bundle
- [ ] Contact form rate limiting active
- [ ] Dependencies audited — `npm audit` reviewed
- [ ] HTTPS enforced

### Operational

- [ ] Error monitoring configured (if adopted)
- [ ] Rollback procedure documented and tested
- [ ] Timur sign-off recorded in CHANGELOG release entry

---

## Hotfix Policy

### When to Hotfix

Hotfix when production (`main` tagged stable) has:

- Broken routing or locale redirect
- Accessibility regression blocking keyboard users
- Security vulnerability
- Data incorrectness in canonical content (factual error)
- Build failure on production deploy

Do **not** hotfix for: feature requests, SEO improvements, cosmetic polish, experimental branch issues.

### Hotfix Process

1. Branch `hotfix/{next-patch}-{slug}` from production tag on `main`
2. Minimal fix — single concern
3. Increment PATCH only
4. Update `CHANGELOG.md` under `### Fixed`
5. Run `npm run validate` and `npm run build`
6. Merge to `main`, tag `v{x.y.z}`, deploy
7. Cherry-pick or merge to `develop`
8. Delete hotfix branch

### Hotfix SLA

| Severity                           | Response    | Target deploy      |
| ---------------------------------- | ----------- | ------------------ |
| Critical (site down, security)     | Immediate   | Same day           |
| High (broken module, bad redirect) | Same day    | Within 24 h        |
| Medium (copy error, minor a11y)    | Next window | Next patch release |

Solo-maintainer project — SLA is target, not contractual.

### Hotfix Version Example

Production at `1.0.0`. Locale redirect broken.

```
hotfix/1.0.1-locale-redirect → main → tag v1.0.1 → develop
```

---

## Deprecation Policy

### Scope

Applies to: module routes, terminal commands, content schema fields, JSON-LD types, public API endpoints (v2.0+).

Does not apply to: experimental features, unreleased roadmap items.

### Process

1. **Announce** — document in `CHANGELOG.md` under `### Deprecated` at minor release
2. **Maintain** — deprecated item works for at least one full minor version cycle
3. **Warn** — terminal, docs, or API response includes deprecation notice
4. **Remove** — at next MAJOR (or pre-1.0 milestone minor if roadmap defines removal)
5. **Record** — ADR if architectural; CHANGELOG entry under `### Removed`

### Timeline

| Phase     | Duration        | Action                                      |
| --------- | --------------- | ------------------------------------------- |
| Announced | 1 minor version | Feature marked deprecated, still functional |
| Warning   | 1 minor version | Runtime or docs warning visible             |
| Removed   | Next major      | Feature deleted, migration path documented  |

**Example (v2.0 API):** Endpoint `/api/v1/search` deprecated in `2.1.0`, warned in `2.2.0`, removed in `3.0.0`.

### Content Schema Deprecation

- Add `deprecated: true` to Zod schema field — optional, documented
- Build continues to accept deprecated fields during warning phase
- Build fails on deprecated fields after removal version — forces migration

---

## Support Policy

### Version Support Matrix

| Version state            | Support level                                               |
| ------------------------ | ----------------------------------------------------------- |
| **Current stable**       | Full — patches and hotfixes                                 |
| **Previous stable**      | Security and critical fixes only — 90 days after superseded |
| **Older stable**         | Unsupported — upgrade recommended                           |
| **Pre-release**          | No support guarantee                                        |
| **Experimental (`0.x`)** | Best effort — no SLA                                        |

### What Support Includes

- Hotfixes per Hotfix Policy
- Dependency security patches on supported versions
- Documentation corrections

### What Support Excludes

- Feature backports to unsupported versions
- Content authoring assistance
- Third-party integration debugging (Vercel, Resend) beyond config documented in repo
- Custom deployments off Vercel

### Reporting Issues

Production defects: document in issue with version tag, URL, reproduction steps, expected ELS behavior.

Experimental defects: fix forward on `develop` — no hotfix unless demo deployment is publicly advertised as stable (it should not be).

---

## Migration Policy

### Site Version Migration

When upgrading between minor versions:

1. Read `CHANGELOG.md` for target version — Breaking Changes section
2. Run content validation: `npm run build` surfaces Zod errors
3. Update `messages/{locale}.json` if new keys added — compare with `en.json`
4. Update `content/site/config.json` version after merge (release process handles this)

No automated migration scripts before v2.0 — volume does not justify tooling.

### Content Migration

| Change type               | Migration action                                         |
| ------------------------- | -------------------------------------------------------- |
| New required schema field | Add to all published content files before release branch |
| Renamed field             | Update all MDX/JSON + CHANGELOG Breaking Changes         |
| Removed field             | Remove from content during deprecation warning phase     |
| Slug change               | Add redirect in `next.config` — ADR required             |

Engineering Record section order is immutable — migration means content rewrite, not reorder.

### URL and Route Migration

- Permanent redirects required for any changed public URL
- Redirects live in `next.config.ts` — documented in CHANGELOG
- hreflang and sitemap regenerated on deploy
- Old URLs remain redirected for minimum 12 months after change

### API Migration (v2.0+)

- API versioned in URL path: `/api/v1/`, `/api/v2/`
- v1 maintained minimum 12 months after v2 stable
- Migration guide in developer portal per deprecation cycle
- Breaking API changes require new major API version — never silent

### Database Migration

Not applicable — Codev_Tim uses git-backed MDX/JSON (`ADR-0009`). No runtime database.

---

## Version Lifecycle Diagram

```
Experimental          Release Candidate        Stable              Supported → Unsupported
(0.x, develop)        (release/*, -rc)         (main, tag)         (patch → end of support)

     ●────────────────────●────────────────────●──────────────────────────○
     │                    │                    │                          │
  noindex              noindex              index allowed              security only
  partial features     checklist run        full Success Criteria      then archived
  no hotfix SLA        Timur review         hotfix policy active
```

---

## Governance

| Action                              | Authority                                |
| ----------------------------------- | ---------------------------------------- |
| Advance minor/major version         | Timur — Success Criteria met             |
| Create production release (v1.0.0+) | Timur explicit approval                  |
| Hotfix to production                | Timur — or AI agent with Timur request   |
| Deprecate public surface            | Timur + CHANGELOG + ADR if architectural |
| Change branch strategy              | ADR required                             |
| Skip pre-release checklist item     | Timur documented exception in CHANGELOG  |

**Review cadence:** This document reviewed at v1.0.0 release and each major version thereafter.

---

## Quick Reference

| Task                         | Document                       |
| ---------------------------- | ------------------------------ |
| What ships in each version   | `ROADMAP.md`                   |
| Record what shipped          | `CHANGELOG.md`                 |
| SEO before v1.0.0            | `06_SEO_CHECKLIST.md`          |
| Commit and PR rules          | `CONTRIBUTING.md`              |
| Breaking architecture change | `13_ARCHITECTURE_DECISIONS.md` |
| Content schema changes       | `12_CONTENT_SCHEMA.md`         |

---

_End of versioning specification._
