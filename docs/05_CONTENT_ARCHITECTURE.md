# Codev_Tim — Content Architecture

**Document ID:** `CT-DOC-05`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Preface

This document defines the **complete content architecture** for the Codev_Tim ecosystem. It governs how all content is structured, related, published, and scaled — from a single Engineering Record to hundreds of Engineering Notes without restructuring.

**Design constraint:** Architecture must support **100+ Engineering Notes** and **50+ Engineering Records** without URL, schema, or navigation changes.

**Related documents:**
- `00_PROJECT_VISION.md` — Module registry, product philosophy
- `02_ENGINEERING_LANGUAGE.md` — Terminology, content language
- `03_ABOUT_TIMUR.md` — Engineer profile source data
- `04_SEO_STRATEGY.md` — SEO metadata, sitemaps, hreflang

**Content principle:** Content is **structured data**. UI is the shell. All content lives in version-controlled files (MDX/Markdown + JSON), consumed at build time.

**Schema specification:** `12_CONTENT_SCHEMA.md` — TypeScript interfaces, Zod validation, all content models.

---

## 1. Content Architecture Philosophy

### 1.1 Core Principles

| Principle | Rule |
|-----------|------|
| **Data-first** | Content in files with typed frontmatter — not hardcoded in components |
| **Slug-stable** | URLs never change; slug renames require 301 and `previousSlugs` |
| **Locale-aware** | Same slug, localized body content, shared metadata keys |
| **Graph-connected** | Every content item connects to the knowledge graph |
| **Module-aligned** | Content types map 1:1 to modules |
| **ELS-native** | Field names and UI labels follow Engineering Language System |
| **Scalable** | Flat slug namespaces, paginated indexes, tag-based discovery |
| **Single source** | One file = one canonical content record |

### 1.2 Content vs Configuration

| Type | Location | Examples |
|------|----------|----------|
| **Content** | `/content/` | Projects, notes, principles |
| **Configuration** | `/content/site/` | Site status, mission, version, profile |
| **Documentation** | `/docs/` | Canonical specs (not public content) |
| **i18n UI strings** | `/messages/{locale}.json` | Module labels, system messages |

---

## 2. Content Hierarchy

### 2.1 Top-Level Tree

```
Codev_Tim (Site)
│
├── Site Configuration          [config]
│   ├── version, status, mission, location, timezone, availability
│   └── navigation, feature flags
│
├── Operations Center           [module — generated from config + indexes]
│
├── Product Registry            [collection]
│   └── Engineering Records     [content type: project]
│       ├── Overview sections
│       ├── System Blueprint
│       └── Interface Records
│
├── Engineer Profile            [singleton]
│   ├── Identity
│   ├── Deployment History
│   └── Technology Stack
│
├── Engineering Protocols       [collection]
│   └── Protocol entries        [content type: principle]
│
├── Knowledge Base              [collection]
│   └── Engineering Notes       [content type: article]
│
└── Communication Module        [singleton — form config only]
```

### 2.2 Content Type Registry

| Content Type | Module | Collection Path | URL Pattern | Index Page |
|--------------|--------|-----------------|-------------|------------|
| `site-config` | All | `/content/site/config.json` | — | — |
| `profile` | Engineer Profile | `/content/profile/` | `/{locale}/about` | — |
| `project` | Product Registry | `/content/projects/{slug}/` | `/{locale}/projects/{slug}` | `/{locale}/projects` |
| `principle` | Engineering Protocols | `/content/principles/` | `/{locale}/principles` | — |
| `article` | Knowledge Base | `/content/writing/{slug}/` | `/{locale}/writing/{slug}` | `/{locale}/writing` |
| `activity` | Dashboard | `/content/activity/log.json` | — | — |

### 2.3 Depth Limits

```
Maximum URL depth: 3 levels
  /{locale}                    → depth 1
  /{locale}/projects           → depth 2
  /{locale}/projects/{slug}    → depth 3

Section deep-links use hash anchors — not separate URLs:
  /{locale}/projects/codev-erp#system-blueprint
```

---

## 3. Content Relationships

### 3.1 Relationship Types

| Relationship | From | To | Cardinality | Field |
|--------------|------|----|-------------|-------|
| `authoredBy` | project, article | profile (Timur) | N:1 | implicit |
| `documentsProduct` | article | project | N:M | `relatedProjects: []` |
| `documentedIn` | project | article | N:M | `relatedNotes: []` |
| `usesStack` | project | tech items | N:M | `stack: []` |
| `precededBy` | project | project | 1:1 | `prevProject: slug` |
| `followedBy` | project | project | 1:1 | `nextProject: slug` |
| `referencesPrinciple` | project, article | principle | N:M | `principles: []` |
| `sameDomain` | project | project | N:M | `domain: string` |
| `sameTag` | article | article | N:M | `tags: []` |
| `sameCluster` | article, project | cluster | N:M | `cluster: string` |

### 3.2 Relationship Rules

- **Bidirectional integrity:** if `article.relatedProjects` includes `codev-erp`, then `project.relatedNotes` should include article slug (enforced at build/lint)
- **Max related links:** 2 per direction per content item
- **No circular prev/next** in project chain
- **Orphan detection:** build warns on content unreachable from index within 3 hops

---

## 4. Parent/Child Structure

### 4.1 Hierarchy Table

| Parent | Child | Relationship |
|--------|-------|--------------|
| Codev_Tim (site) | All modules | contains |
| Product Registry | Engineering Records | collection/item |
| Knowledge Base | Engineering Notes | collection/item |
| Engineering Protocols | Protocol entries | collection/item |
| Engineering Record | Document sections | MDX headings — not separate URLs |
| Engineering Note | Document sections | MDX headings |
| Engineer Profile | Deployment History entries | timeline data |
| Engineer Profile | Technology Stack layers | grouped data |
| Dashboard | Activity log entries | generated or static |

### 4.2 Engineering Record Section Order (Immutable)

```
1. Overview
2. Problem Statement
3. Business Context
4. System Blueprint
5. Technology Stack
6. Trade-offs
7. Roadmap
8. Interface Record
9. Lessons Recorded
```

Optional sections may be empty. Heading structure remains for TOC consistency.

### 4.3 Engineering Note Structure

```
Required frontmatter: title, summary, datePublished, tags, category, cluster
Recommended body:
  - Thesis opening paragraph (answer-first for SEO/LLM)
  - Body sections (h2/h3)
  - Related systems / Related notes (footer or MDX)
```

---

## 5. Topic Clusters

### 5.1 Cluster Strategy

Topic clusters organize content for SEO and internal linking:

- **Pillar content:** Engineering Record or long Engineering Note
- **Supporting notes:** 3+ notes linking to pillar
- **Shared `cluster` ID + tags**

### 5.2 Seed Clusters

| Cluster ID | Pillar | Domain | Status |
|------------|--------|--------|--------|
| `erp-systems` | Engineering Record: Codev ERP | Business Automation | Confirmed |
| `system-architecture` | TBD | Architecture | Pending content |
| `business-automation` | TBD | Automation | Pending content |
| `ai-integration` | TBD | AI | Pending content |

### 5.3 Cluster Scaling Rule

When a cluster exceeds 20 notes:

- Paginate Knowledge Base index
- Add cluster filter (query param — not new URL tier)
- Optional static cluster description page at `/content/clusters/{id}.mdx` (future)
- Do **not** restructure URL hierarchy

---

## 6. Knowledge Graph

### 6.1 Graph Model

```
Node types:  Site, Module, Project, Article, Principle, Tag, Cluster, Technology, Person
Edge types:  authoredBy, relatedTo, usesTech, belongsToCluster, taggedWith,
             precedes, follows, referencesPrinciple, partOfRegistry, partOfKnowledgeBase
```

### 6.2 Generated Assets (Build Time)

```
/data/knowledge-graph.json     → full graph for related content + palette
/data/search-index.json        → Pagefind or custom search index
```

### 6.3 Runtime Queries

| Query | Use |
|-------|-----|
| Related notes for project X | Engineering Record sidebar/footer |
| Related projects for note Y | Engineering Note footer |
| Same cluster | Recommendations |
| Shared technology | Cross-link suggestions at build |
| Prev/Next project | Registry navigation |

### 6.4 LLM Optimization

Relationships explicit in frontmatter — not inferred at runtime. First paragraph of each record/note is self-contained for extraction.

---

## 7. Internal Linking Architecture

### 7.1 Automatic Links (Generated)

| Source | Target | Rule |
|--------|--------|------|
| Product Registry | All published projects | Auto-list |
| Knowledge Base | All published notes | Auto-list, date desc |
| Dashboard cards | Module indexes | Config-driven |
| Engineering Record | prev/next project | frontmatter chain |
| Engineering Record | related notes | `relatedNotes` |
| Engineering Note | related projects | `relatedProjects` |
| Engineering Note | 2 related notes | same cluster/tag if not specified |
| Breadcrumbs | Parent modules | URL hierarchy |

### 7.2 Manual Links (MDX)

Authors use locale-aware Link component — path without locale prefix:

```mdx
See [System Blueprint](/projects/codev-erp#system-blueprint) for architecture details.
```

### 7.3 Cross-Reference Component

```mdx
<CrossRef type="project" slug="codev-erp" />
<CrossRef type="article" slug="erp-data-architecture" />
<CrossRef type="principle" id="01-reliability" />
```

### 7.4 Link Integrity

- Build-time link checker — fail on broken internal links
- Hash anchors must match generated heading IDs
- See `04_SEO_STRATEGY.md` §15 for SEO linking rules

---

## 8. Navigation Hierarchy

### 8.1 Primary Navigation (Fixed — Never Grows)

```
Operations Center     /{locale}
Product Registry      /{locale}/projects
Engineer Profile      /{locale}/about
Engineering Protocols /{locale}/principles
Knowledge Base        /{locale}/writing
Communication Module  /{locale}/contact
```

### 8.2 Secondary Navigation

| Context | Navigation |
|---------|------------|
| Engineering Record | TOC sidebar (sections) |
| Engineering Note | TOC sidebar (sections) |
| Product Registry | Filter bar (status, domain, cluster) |
| Knowledge Base | Filter bar (tag, cluster, category) |
| Engineering Record footer | ← Previous Record · Next Record → |

### 8.3 Utility Navigation

| Element | Function |
|---------|----------|
| Command Palette (⌘K) | Search all content |
| System Console | `open`, `projects`, `search` commands |
| Module Path | Breadcrumb in System Header |
| Status Bar | System status, focus, version |

### 8.4 Scaling Rule

**Primary nav never exceeds 6 modules.** New content discovered via filters, search, clusters, and cross-references — not new nav items.

---

## 9. Tagging System

### 9.1 Tag Types

| Type | Applied To | Field | Example |
|------|------------|-------|---------|
| **Domain** | projects | `domain` | `Business Automation` |
| **Status** | projects | `status` | `In Development` |
| **Tech** | projects, articles | `stack`, `tags` | `PostgreSQL` |
| **Topic** | articles | `tags` | `architecture`, `erp` |
| **Cluster** | projects, articles | `cluster` | `erp-systems` |

### 9.2 Tag Rules

```
Format:     lowercase-kebab-case (tags), Title Case (domain display)
Max tags:   5 per article
Controlled: status, cluster from enums
New tags:   allowed — build reports inventory for review
```

### 9.3 Status Enum

`Production` · `In Development` · `Experimental` · `Archived` · `Deprecated` · `Scheduled`

### 9.4 Domain Enum (Seed)

- `Business Automation` (confirmed)
- `ERP Systems` (confirmed via ERP Platform)
- Extend via Timur confirmation

### 9.5 Recommended Topic Tags (Seed)

`architecture` · `erp` · `automation` · `postgresql` · `react` · `aspnet-core` · `docker` · `system-design` · `trade-offs` · `ai`

---

## 10. Categories

### 10.1 Category vs Tag vs Cluster

| Concept | Purpose | Scope |
|---------|---------|-------|
| **Category** | High-level Knowledge Base grouping | Articles |
| **Tag** | Cross-cutting discovery | Articles, optional on projects |
| **Cluster** | SEO topic cluster | Articles + projects |
| **Domain** | Business domain | Projects |

### 10.2 Knowledge Base Categories

| Category | Description |
|----------|-------------|
| `Architecture` | System design, blueprints, patterns |
| `Product` | Product thinking, requirements |
| `Process` | Engineering workflow, delivery |
| `Infrastructure` | DevOps, deployment, operations |
| `Domain` | ERP, automation domain knowledge |

**Field:** `category: Architecture` — single value per article.

---

## 11. URL Hierarchy

### 11.1 Complete URL Map

```
/{locale}                              Operations Center
/{locale}/projects                     Product Registry
/{locale}/projects/{slug}              Engineering Record
/{locale}/about                        Engineer Profile
/{locale}/principles                   Engineering Protocols
/{locale}/contact                      Communication Module
/{locale}/writing                      Knowledge Base
/{locale}/writing/{slug}               Engineering Note

# Section anchors
/{locale}/projects/{slug}#system-blueprint

# Filters (query — canonical to base by default)
/{locale}/projects?status=in-development
/{locale}/writing?tag=architecture
/{locale}/writing?cluster=erp-systems
/{locale}/writing?category=Architecture
/{locale}/writing?page=2

# Discovery
/feed.xml · /sitemap.xml · /robots.txt · /llms.txt

# Not public
/docs/*
```

### 11.2 Slug Rules

```
Format:    lowercase-kebab-case
Charset:   a-z, 0-9, hyphen
Max:       80 characters
Scope:     global — unique across site, same slug all locales
Rename:    previousSlugs + 301 redirect
```

---

## 12. Content Lifecycle

### 12.1 States

| State | Visible | Indexable |
|-------|---------|-----------|
| `draft` | No | No |
| `review` | Preview only | No |
| `published` | Yes | Yes |
| `archived` | Yes (Archived badge) | Yes (optional noindex) |
| `deprecated` | Yes (Deprecated badge) | noindex recommended |

### 12.2 Transitions

```
draft → review → published
published → archived | deprecated
archived → published (reinstate)
deprecated → archived
```

### 12.3 Versioning Fields

```yaml
datePublished: 2026-03-15
dateModified: 2026-07-01
version: 1.2.0          # optional — engineering records
supersededBy: new-slug  # when replaced
previousSlugs: []       # for 301 redirects
```

### 12.4 Deprecation Protocol

1. Set deprecated status
2. Add `supersededBy` if replaced
3. UI banner: `This record is deprecated. See {new-slug}.`
4. Set noindex if misleading
5. Keep URL alive — 301 only when slug changes

---

## 13. Publishing Workflow

### 13.1 Stages

```
1. Author       Write MDX in /content — status: draft
2. Lint         Frontmatter, links, ELS, relationships
3. Preview      Local / preview deploy
4. Review       Timur approves content and translations
5. Translate    RU/UZ content added
6. Publish      status: published, dateModified updated
7. Deploy       CI rebuilds sitemap, search index, OG images
8. Verify       SEO checklist — 04_SEO_STRATEGY §30
```

### 13.2 CI Gates

**Build fails if:**
- Published content missing required frontmatter
- Broken internal link
- Duplicate slug
- Missing EN locale for published content

**Build warns if:**
- Missing RU/UZ translation
- Orphan content
- Missing related links on Engineering Record
- New tag not in registry report

### 13.3 File Structure

```
/content/
├── site/
│   ├── config.json
│   ├── config.ru.json
│   └── config.uz.json
├── profile/
│   ├── index.en.mdx
│   ├── index.ru.mdx
│   ├── timeline.json
│   └── stack.json
├── projects/
│   └── codev-erp/
│       ├── index.en.mdx
│       ├── index.ru.mdx
│       ├── index.uz.mdx
│       ├── meta.json
│       └── assets/
├── principles/
│   └── 01-reliability.mdx
├── writing/
│   └── {slug}/
│       ├── index.en.mdx
│       └── meta.json
└── activity/
    └── log.json
```

---

## 14. Frontmatter Schemas

### 14.1 Site Config

```json
{
  "version": "0.9.4",
  "status": "Operational",
  "mission": "Building Codev ERP",
  "location": "Tashkent",
  "timezone": "UTC+5",
  "availability": "Open for interesting opportunities",
  "responseTime": "6 hours",
  "engineer": {
    "name": "Timur",
    "fullName": {
      "ru": "Искандаров Тимур Баходирович",
      "en": "Iskandarov Timur Baxodirovich"
    },
    "email": "timaiskandarov5@gmail.com",
    "emailSecondary": "winston234123@gmail.com",
    "github": "https://github.com/WinstonSalemm",
    "roles": [
      "Software Engineer",
      "System Architect",
      "Product Builder",
      "ERP Developer",
      "Automation Engineer",
      "AI Enthusiast"
    ]
  }
}
```

### 14.2 Project meta.json

```json
{
  "slug": "codev-erp",
  "previousSlugs": ["erp-platform"],
  "title": "Codev ERP",
  "subtitle": "Business Automation",
  "status": "In Development",
  "domain": "Business Automation",
  "cluster": "erp-systems",
  "version": null,
  "since": null,
  "stack": ["React", "ASP.NET Core", "PostgreSQL", "Docker"],
  "architecture": ["Client", "API", "Services", "Database", "Infrastructure"],
  "relatedNotes": [],
  "prevProject": null,
  "nextProject": null,
  "principles": [],
  "datePublished": null,
  "dateModified": null,
  "previousSlugs": [],
  "featured": true,
  "order": 1,
  "publishStatus": "published"
}
```

### 14.3 Article meta.json

```json
{
  "slug": "erp-data-architecture",
  "title": "Why ERP Requires Proper Data Architecture",
  "summary": "One-sentence thesis for SEO and previews.",
  "category": "Architecture",
  "cluster": "erp-systems",
  "tags": ["erp", "architecture", "postgresql"],
  "relatedProjects": ["codev-erp"],
  "relatedNotes": [],
  "principles": [],
  "datePublished": "2026-03-15",
  "dateModified": "2026-03-15",
  "readingTime": 8,
  "previousSlugs": [],
  "featured": false,
  "publishStatus": "published"
}
```

### 14.4 Principle

```json
{
  "id": "01-reliability",
  "number": "01",
  "title": "Reliability Over Speed",
  "order": 1
}
```

---

## 15. SEO Content Strategy

### 15.1 Content Pillars

| Pillar | Type | Search Intent |
|--------|------|---------------|
| Engineer identity | Engineer Profile | Name, role, location |
| Product proof | Engineering Records | ERP, automation, architecture |
| Thought leadership | Engineering Notes | Technical how/why |
| System credibility | Dashboard, Protocols | Brand |

### 15.2 Answer-First Rule

Every Engineering Record Overview and Engineering Note opening must:

1. State subject in first sentence
2. Include primary keyword naturally
3. Be factual — ELS compliant
4. Stand alone as search/LLM snippet

### 15.3 Pagination (100+ Articles)

| Threshold | Action |
|-----------|--------|
| 20+ notes | Paginate Knowledge Base — 20 per page |
| 20+ records | Paginate Product Registry — 20 per page |
| 50+ total | Enable Pagefind search index |
| Any scale | RSS always includes latest 50 items |

Full SEO spec: `04_SEO_STRATEGY.md`

---

## 16. Article Strategy (Engineering Notes)

### 16.1 Purpose

Document **how Timur thinks** — engineering analysis, not lifestyle or personal branding.

### 16.2 Article Types

| Type | Focus |
|------|-------|
| **Architecture** | System design decisions |
| **Implementation** | Technical patterns from real work |
| **Trade-off** | Decision analysis |
| **Process** | Engineering workflow |
| **Domain** | ERP, automation domain knowledge |

### 16.3 Length Targets

| Type | Words |
|------|-------|
| Short | 600–1,000 |
| Standard | 1,000–2,000 |
| Deep dive | 2,000–4,000 |

### 16.4 Quality Gates

- [ ] Unique `summary` in frontmatter
- [ ] ≥1 related project or cluster
- [ ] ≥2 h2 sections
- [ ] Code blocks have language tags
- [ ] Passes ELS lint
- [ ] Answer-first opening
- [ ] Unique title

---

## 17. Project Documentation Strategy (Engineering Records)

### 17.1 Purpose

Document **how systems were engineered** — architectural proof, not visual showcase.

### 17.2 Minimum Viable Record

```
✅ Overview
✅ Problem Statement
✅ System Blueprint
✅ Technology Stack
✅ Status
```

### 17.3 Confirmed Seed Record

| Field | Value |
|-------|-------|
| slug | `codev-erp` |
| title | Codev ERP |
| subtitle | Business Automation |
| status | In Development |
| stack | React, ASP.NET Core, PostgreSQL, Docker |
| architecture | Client → API → Services → Database → Infrastructure |

### 17.4 Publish Trigger

Publish when architecture is documentable — at MVP milestone or equivalent.

---

## 18. Knowledge Base Strategy

### 18.1 Organization Layers

```
Layer 1: Index           /writing — paginated
Layer 2: Filters         tag, cluster, category
Layer 3: Search          Command Palette + Pagefind
Layer 4: Relationships   related projects, notes
Layer 5: RSS             feed.xml
```

### 18.2 Sort Orders

| View | Sort |
|------|------|
| Index | datePublished desc |
| Related | shared tags/cluster relevance |
| Search | relevance score |
| Dashboard featured | featured first, then date |

### 18.3 Duplicate Prevention

- Slug uniqueness at build
- Title similarity lint (>80% → warn)
- `supersededBy` for updated topics — no duplicate articles

---

## 19. Future Documentation Strategy

### 19.1 Planned Extensions

| Type | When | URL Impact |
|------|------|------------|
| Cluster description page | Cluster >20 notes | Optional `/writing/clusters/{id}` — requires doc amendment |
| Colophon | Post-implementation | `/{locale}/colophon` |
| Changelog | Version history needed | `/{locale}/changelog` |

### 19.2 New Content Type Protocol

1. Amend `/docs` — version increment
2. Define frontmatter schema in this document
3. Define URL pattern — must not break existing hierarchy
4. Update SEO spec with schema and meta templates
5. Update ELS if new terminology required
6. Timur confirmation required

### 19.3 What Never Changes

- Primary nav modules (6 max)
- URL depth (3 levels max)
- Slug namespace pattern (`/projects/{slug}`, `/writing/{slug}`)
- Locale prefix pattern (`/{locale}/...`)
- Engineering Record section order
- Content-as-files architecture

---

## 20. i18n Content Architecture

### 20.1 Locale Files

```
index.en.mdx    — required for publish
index.ru.mdx    — required for full hreflang
index.uz.mdx    — required for full hreflang
meta.json       — locale-neutral metadata
```

### 20.2 Translation Rules

- Same slug all locales
- `title` and `summary` translatable in meta or locale files
- Code blocks, stack names — not translated
- UI strings in `/messages/{locale}.json` — not in content files

### 20.3 Fallback Policy

If RU/UZ body missing at launch:

- UI fully translated via i18n messages
- Body falls back to EN with `<html lang>` accurate
- Exclude locale from hreflang until translated

---

## 21. Dashboard Content Model

Dashboard is **generated** — not authored as MDX.

### 21.1 Data Sources

| Panel | Source |
|-------|--------|
| System Overview | `/content/site/config.json` |
| Projects panel | `/content/projects/` — count + latest |
| Knowledge Base panel | `/content/writing/` — count + latest |
| Technology panel | `/content/profile/stack.json` |
| Experience panel | `/content/profile/timeline.json` |
| Architecture panel | Featured project blueprint preview |
| Activity Log | `/content/activity/log.json` + session-generated |

### 21.2 Freshness

Dashboard reflects live content counts at build time. ISR or rebuild on publish.

---

## 22. Engineer Profile Content Model

Singleton — not a collection.

### 22.1 Data Sources

| Section | Source |
|---------|--------|
| Identity | site config + profile |
| Deployment History | `/content/profile/timeline.json` |
| Technology Stack | `/content/profile/stack.json` |
| Availability | site config |
| Body prose | `/content/profile/index.{locale}.mdx` (optional minimal) |

### 22.2 Timeline Entry Schema

```json
{
  "period": "2022 — present",
  "role": "Software Engineer",
  "context": "Company or independent",
  "focus": "One-line focus area"
}
```

> Timeline entries pending Timur confirmation — see `03_ABOUT_TIMUR.md`.

---

## 23. Scalability Summary

| Scale | Mechanism | URL Change |
|-------|-----------|------------|
| 1–20 notes | Flat index | No |
| 20–100 notes | Pagination + filters | No |
| 100–500 notes | Pagefind search + clusters | No |
| 1–20 records | Flat registry | No |
| 20–50 records | Pagination + filters | No |
| 50+ records | Search + status/domain filter | No |
| 3 locales | Same slugs, locale prefix | No |
| New content type | Add to existing module | Only with doc amendment |

**Architecture guarantee:** Growth to hundreds of items requires no restructuring — only pagination, search, and filters activate at thresholds.

---

## 24. Document Relationships

```
00_PROJECT_VISION.md       → Module registry, goals
01_BRAND_BIBLE.md          → Brand vocabulary, principles
02_ENGINEERING_LANGUAGE.md → Content language, field labels
03_ABOUT_TIMUR.md          → Profile source data
04_SEO_STRATEGY.md         → Metadata, sitemaps, schema
05_CONTENT_ARCHITECTURE.md → This document — content structure
06_SEO_CHECKLIST.md        → Pre-release verification
07_AI_INDEXING.md          → AI-readable content rules, pillar pages
08_TECH_STACK.md           → Technology stack and selection rules
```

---

## 25. Content Architecture Checklist

Before publishing new content:

- [ ] Frontmatter schema valid for content type
- [ ] Slug unique, kebab-case
- [ ] EN locale present
- [ ] ELS lint pass (title, summary)
- [ ] Internal links valid
- [ ] Related content fields populated
- [ ] Cluster assigned
- [ ] SEO summary written (answer-first)
- [ ] datePublished / dateModified set
- [ ] Assets in `/assets/` subfolder, optimized
- [ ] Added to knowledge graph (automatic on build)
- [ ] Sitemap will include on next deploy

---

*End of canonical specification. Amendments require version increment and cross-document consistency check.*
