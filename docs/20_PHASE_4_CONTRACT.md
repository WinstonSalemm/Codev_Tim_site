# Codev_Tim — Phase 4 Engineering Record Contract

**Document ID:** `CT-DOC-20`  
**Version:** 1.0.0  
**Status:** Canonical — Active during Phase 4  
**Effective:** 2026-07-05  
**Scope:** Engineering Record content pipeline (Phase 4.0 foundation)

---

## Preface

This document is the **development contract** for Phase 4 Engineering Records. It defines MDX ownership, content flow, section order, and frontmatter schema.

Phase 4.0 establishes the **document infrastructure only**. UI (`ProjectDocLayout`), routes, metadata, and MDX compilation are **out of scope** until Phase 4.1+.

**Authority:**

1. This contract governs Engineering Record content shape and loader boundaries
2. `16_CONTENT_LAYER.md` governs Content layer access rules
3. `17_DOMAIN_LAYER.md` / `18_APPLICATION_LAYER.md` govern view-model and use-case exposure
4. Foundation architecture remains frozen — Phase 4 work is additive

---

## 1. MDX Ownership

| Concern                       | Owner                  | Location                                                                                                |
| ----------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Raw MDX files                 | **Storage**            | `content/projects/{slug}/index.{locale}.mdx`                                                            |
| File read (fs)                | **Content — internal** | `src/lib/content/internal/project-mdx-sources.ts`                                                       |
| Frontmatter parse             | **Content — internal** | `src/lib/content/internal/project-frontmatter.ts`                                                       |
| Section parse + validation    | **Content — internal** | `src/lib/content/internal/engineering-record-parser.ts`                                                 |
| Canonical section order       | **Content — internal** | `src/lib/content/internal/engineering-record-sections.ts`                                               |
| Public record loader (server) | **Content**            | `src/lib/content/engineering-record.ts` → `getProjectEngineeringRecord(slug, locale)`                   |
| View model assembly           | **Domain**             | `src/lib/domain/projects/record.ts` → `buildProjectRecordVM(slug, locale)`                              |
| Use case entry point          | **Application**        | `src/lib/application/projects/load-project-record.ts` → `loadProjectRecord(slug, locale)` (server-only) |

### Ownership rules

1. **Only Content internal modules** read MDX from disk.
2. **`content/index.ts` barrel** does **not** export fs-based loaders (`engineering-record.ts`, `project-content.ts`).
3. **Domain** imports `@/lib/content/engineering-record` directly (server-only path).
4. **Presentation** must call **`loadProjectRecord`** — never read `content/projects/` or import Content internal modules.
5. **`meta.json`** remains the registry source of truth for card/list views; MDX frontmatter mirrors display fields for the Engineering Record page.

---

## 2. Content Flow

```
content/projects/{slug}/index.{locale}.mdx
        ↓
internal/project-mdx-sources.ts       fs read + slug/locale guard
        ↓
internal/engineering-record-parser.ts split frontmatter + ## sections
        ↓
engineering-record.ts                 getProjectEngineeringRecord(slug, locale)
        ↓
domain/projects/record.ts               buildProjectRecordVM(slug, locale)
        ↓
application/projects/load-project-record.ts   loadProjectRecord(slug, locale)
        ↓
Presentation (Phase 4.1+)               ProjectDocLayout, MDX render
```

### Locale files

Each registered product requires three MDX files:

```
content/projects/{slug}/index.en.mdx
content/projects/{slug}/index.ru.mdx
content/projects/{slug}/index.uz.mdx
```

Section **headings** are English and canonical across all locales. Section **body** copy is localized per file.

---

## 3. Section Order

Engineering Records contain **exactly nine sections** in this immutable order:

| #   | Section ID          | MDX Heading       |
| --- | ------------------- | ----------------- |
| 1   | `overview`          | Overview          |
| 2   | `problem-statement` | Problem Statement |
| 3   | `business-context`  | Business Context  |
| 4   | `system-blueprint`  | System Blueprint  |
| 5   | `technology-stack`  | Technology Stack  |
| 6   | `trade-offs`        | Trade-offs        |
| 7   | `roadmap`           | Roadmap           |
| 8   | `interface-record`  | Interface Record  |
| 9   | `lessons-recorded`  | Lessons Recorded  |

Parser behavior:

- Sections are delimited by `## {Heading}` markers.
- All nine headings must be present, in order, with non-empty body text.
- Unknown or reordered headings fail at build/load time with an explicit error.

Canonical constants: `ENGINEERING_RECORD_SECTION_ORDER`, `ENGINEERING_RECORD_SECTION_HEADINGS` in `engineering-record-sections.ts`.

---

## 4. Frontmatter Schema

Each MDX file begins with YAML frontmatter delimited by `---`.

| Field       | Type             | Required | Notes                                                      |
| ----------- | ---------------- | -------- | ---------------------------------------------------------- |
| `title`     | `string`         | yes      | Product display name                                       |
| `subtitle`  | `string`         | yes      | Short classification line                                  |
| `version`   | `string \| null` | yes      | Use `null` when unset                                      |
| `status`    | `ProductStatus`  | yes      | `Production`, `In Development`, `Experimental`, `Archived` |
| `domain`    | `string`         | yes      | Domain label (Title Case)                                  |
| `stack`     | `string[]`       | yes      | Min 1 item; YAML list syntax                               |
| `updatedAt` | `string`         | yes      | ISO date `YYYY-MM-DD`                                      |

Example:

```yaml
---
title: Codev ERP
subtitle: Business Automation
version: null
status: In Development
domain: ERP Systems
stack:
  - TypeScript
updatedAt: 2026-07-05
---
```

TypeScript types: `EngineeringRecordFrontmatter`, `ProjectEngineeringRecord`, `ProjectRecordVM`.

---

## 5. Phase 4.0 Boundaries

### In scope (Phase 4.0)

- MDX file structure and placeholder content for all registered products
- Frontmatter parser and section validator
- `getProjectEngineeringRecord` / `loadProjectRecord` pipeline
- This contract document

### Out of scope (Phase 4.1+)

- `ProjectDocLayout` and Engineering Record UI
- Route or metadata changes
- `@next/mdx` compilation (`compileProjectMdx`)
- Search index integration for record body text
- Presentation alignment with `EngineeringRecordShellVM` section IDs

---

## 6. Registered Products

All products in `PROJECT_META_MANIFEST` must ship Phase 4.0 MDX placeholders:

| Slug                    | Locales    |
| ----------------------- | ---------- |
| `codev-erp`             | en, ru, uz |
| `poj-pro-platform`      | en, ru, uz |
| `codev-tim`             | en, ru, uz |
| `assistant-agent`       | en, ru, uz |
| `poj-pro-api-contracts` | en, ru, uz |
| `poj-pro-telegram-bots` | en, ru, uz |

---

## 7. Verification Checklist

- [ ] All 18 MDX files parse without error
- [ ] `loadProjectRecord(slug, locale)` returns `ProjectRecordVM` with 9 sections
- [ ] No fs loaders exported from `content/index.ts`
- [ ] No Presentation imports of Content internal modules
- [ ] `npm run typecheck` and `npm run build` pass

---

_End of Phase 4 Engineering Record Contract._
