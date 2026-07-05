# Codev_Tim — Content Schema Specification

**Document ID:** `CT-DOC-12`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-05

---

## Preface

This document defines **every content model** used by Codev_Tim. All content is structured data validated at build time with **Zod** (runtime) and **TypeScript** (compile time).

**Related documents:**

- `05_CONTENT_ARCHITECTURE.md` — Content hierarchy, file locations, lifecycle
- `03_ABOUT_TIMUR.md` — Canonical profile and product data
- `09_PRODUCT_REGISTRY.md` — Registered product slugs
- `02_ENGINEERING_LANGUAGE.md` — Field labels and status vocabulary
- `04_SEO_STRATEGY.md` — SEO metadata templates
- `11_DESIGN_TOKENS.md` — Status color mapping

**Implementation:**

```
src/lib/schemas/          → Zod schemas (source of validation)
src/types/content.ts      → TypeScript interfaces (inferred from Zod)
/content/                 → Content files
```

**Rule:** Schemas in this document are authoritative. Zod implementations must match exactly.

---

## 1. Global Conventions

### 1.1 Slug Rules

```typescript
// Pattern: lowercase-kebab-case, a-z 0-9 hyphen, max 80 chars
type Slug = string; // validated: /^[a-z0-9]+(-[a-z0-9]+)*$/
```

- Global uniqueness across site
- Same slug all locales — content keyed by slug, not translated slug
- Renames: add to `previousSlugs[]`, configure 301 redirect

### 1.2 Publish Status

```typescript
type PublishStatus =
  "draft" | "review" | "published" | "archived" | "deprecated";
```

Only `published` content appears in production UI, sitemap, RSS.

### 1.3 Locale

```typescript
type Locale = "en" | "ru" | "uz";
const DEFAULT_LOCALE: Locale = "en";
```

### 1.4 Date Fields

```typescript
// ISO 8601 date or datetime
type ISODate = string; // YYYY-MM-DD
type ISODateTime = string; // YYYY-MM-DDTHH:mm:ss+05:00
```

### 1.5 Naming Conventions

| Context         | Convention               |
| --------------- | ------------------------ |
| JSON field keys | camelCase                |
| Slugs           | kebab-case               |
| Status values   | Title Case — matches ELS |
| Tags            | kebab-case               |
| Cluster IDs     | kebab-case               |
| Domain labels   | Title Case               |

---

## 2. SiteConfig

**Purpose:** Global system configuration — powers Dashboard, StatusBar, Terminal, and shell.

**Source:** `/content/site/config.json` (+ optional locale overrides)

```typescript
interface SiteConfig {
  version: string; // semver: "0.9.4" — displayed as v0.9.4
  status: SystemStatusLabel;
  mission: string; // ELS: "Building Codev ERP"
  location: string; // "Tashkent"
  timezone: string; // "UTC+5"
  availability: string; // ELS confirmed phrase
  responseTime: string; // "6 hours"
  engineer: EngineerIdentity;
}

interface EngineerIdentity {
  name: string; // "Timur"
  fullName: {
    ru: string;
    en: string;
  };
  email: string; // primary
  emailSecondary?: string;
  github: string; // URL
  linkedin?: string | null; // null if not used
  roles: string[]; // from 03_ABOUT_TIMUR.md
}
```

| Field        | Required | Validation              |
| ------------ | -------- | ----------------------- |
| version      | ✅       | semver pattern          |
| status       | ✅       | SystemStatusLabel enum  |
| mission      | ✅       | max 80 chars, ELS lint  |
| location     | ✅       | —                       |
| timezone     | ✅       | —                       |
| availability | ✅       | ELS lint                |
| responseTime | ✅       | —                       |
| engineer     | ✅       | EngineerIdentity schema |

**Relationships:** Referenced by Dashboard, StatusBar, Terminal, About (partial).

**Extensibility:** Add `featureFlags: Record<string, boolean>` for toggling modules.

---

## 3. Navigation

**Purpose:** Module Navigation items — fixed set, i18n labels from messages, routes from config.

```typescript
interface NavigationItem {
  id: ModuleId;
  route: string; // "/projects" — locale prefix added by router
  icon: string; // Lucide icon name
  identityName: string; // i18n key: "nav.dashboard"
  internalName: string; // "dashboard" — for terminal/palette
  order: number;
}

type ModuleId =
  "dashboard" | "projects" | "about" | "principles" | "writing" | "contact";

interface NavigationConfig {
  items: NavigationItem[];
}
```

| Field        | Required |
| ------------ | -------- |
| id           | ✅       |
| route        | ✅       |
| icon         | ✅       |
| identityName | ✅       |
| order        | ✅       |

**Rule:** Max 6 items — `05_CONTENT_ARCHITECTURE.md` §8.4. Do not add nav items for individual products.

---

## 4. DashboardCard

**Purpose:** Operations Center module shortcut cards — generated, not authored as content files.

```typescript
interface DashboardCard {
  id: string;
  label: string; // i18n MODULE label category
  title: string; // Card title — i18n
  preview: string; // One line, ≤60 chars — ELS
  href: string; // Target module route
  meta?: DashboardCardMeta;
}

interface DashboardCardMeta {
  count?: number; // e.g. 6 products
  latest?: string; // e.g. latest project name
  layers?: string[]; // e.g. stack layer names
}
```

**Generation:** Built at compile time from SiteConfig + content indexes.  
**Validation:** preview max 60 chars, href must be valid internal route.

---

## 5. ActivityLogEntry

**Purpose:** Dashboard Activity Log — timestamped system events.

**Source:** `/content/activity/log.json` + optional client-generated session entries.

```typescript
interface ActivityLogEntry {
  id: string;
  timestamp: ISODateTime;
  action: ActivityAction;
  target?: string; // module name, project slug, etc.
  href?: string;
}

type ActivityAction =
  | "session_started"
  | "session_restored"
  | "module_accessed"
  | "query_executed"
  | "system_event";
```

| Field     | Required |
| --------- | -------- |
| id        | ✅       |
| timestamp | ✅       |
| action    | ✅       |
| target    | Optional |

**Display format:** `[HH:MM:SS] Module accessed: {target}` — monospace.  
**Max visible:** 10 entries on Dashboard, 3 in preview.

---

## 6. Status

**Purpose:** Unified status model for system and products.

```typescript
type SystemStatusLabel =
  "Operational" | "Initializing" | "Maintenance" | "Paused" | "Offline";

type ProductStatusLabel =
  | "Production"
  | "In Development"
  | "Experimental"
  | "Archived"
  | "Deprecated"
  | "Scheduled";

interface Status {
  label: SystemStatusLabel | ProductStatusLabel;
  dotColor: string; // maps to 11_DESIGN_TOKENS status colors
  pulse?: boolean; // true for Operational
}
```

Reference: `02_ENGINEERING_LANGUAGE.md` §6.

---

## 7. Project

**Purpose:** Registered product in Product Registry.

**Source:** `/content/projects/{slug}/meta.json` + `/content/projects/{slug}/index.{locale}.mdx`

```typescript
interface Project {
  slug: Slug;
  previousSlugs: Slug[];
  title: string;
  subtitle: string;
  status: ProductStatusLabel;
  domain: string;
  cluster: ClusterId;
  version: string | null;
  since: string | null; // year or period
  stack: string[];
  architecture: ArchitectureLayer[];
  relatedNotes: Slug[];
  prevProject: Slug | null;
  nextProject: Slug | null;
  principles: string[]; // principle IDs
  datePublished: ISODate | null;
  dateModified: ISODate | null;
  featured: boolean;
  order: number;
  publishStatus: PublishStatus;
  github?: string; // URL
  externalUrl?: string; // live product URL
  metrics?: ProjectMetrics;
}

type ArchitectureLayer =
  "Client" | "Gateway" | "API" | "Services" | "Database" | "Infrastructure";

type ClusterId =
  | "erp-systems"
  | "business-automation"
  | "ai-integration"
  | "system-architecture"
  | string; // extensible — build warns on new
```

| Field         | Required | Validation           |
| ------------- | -------- | -------------------- |
| slug          | ✅       | slug pattern, unique |
| title         | ✅       | max 60 chars         |
| subtitle      | ✅       | max 80 chars         |
| status        | ✅       | ProductStatusLabel   |
| domain        | ✅       | —                    |
| cluster       | ✅       | —                    |
| stack         | ✅       | min 1 item           |
| architecture  | ✅       | min 2 layers         |
| publishStatus | ✅       | —                    |
| order         | ✅       | number               |
| featured      | ✅       | boolean              |

**Relationships:**

- `relatedNotes` ↔ Article.relatedProjects (bidirectional integrity)
- `prevProject` / `nextProject` — linked list, no cycles
- Author: implicit Timur

**Canonical slugs:** `09_PRODUCT_REGISTRY.md`

---

## 8. ProjectMetrics

**Purpose:** Optional outcome metrics on project cards (hover) and detail pages.

```typescript
interface ProjectMetrics {
  users?: string; // e.g. "internal" — only confirmed facts
  uptime?: string;
  transactions?: string;
  custom?: Record<string, string>;
}
```

All fields optional. **Never invent metrics** — only from Timur confirmation.

---

## 9. ArchitectureNode

**Purpose:** System Blueprint diagram nodes — interactive SVG.

```typescript
interface ArchitectureNode {
  id: string;
  layer: ArchitectureLayer;
  label: string; // display name
  technology?: string; // e.g. "React SPA"
  description?: string; // tooltip content
  order: number;
}

interface ArchitectureEdge {
  from: string; // node id
  to: string;
  label?: string; // e.g. "HTTPS"
}

interface SystemBlueprint {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
```

**Default vertical flow:** Client → [Gateway] → API → Services → Database → Infrastructure

Derived from `Project.architecture[]` when full blueprint not specified.

---

## 10. Technology

**Purpose:** Technology stack items for profile and terminal.

**Source:** `/content/profile/stack.json`

```typescript
interface TechnologyStack {
  layers: TechnologyLayer[];
}

interface TechnologyLayer {
  id: string; // "frontend", "backend", etc.
  label: string; // "Frontend" — Title Case
  items: Technology[];
}

interface Technology {
  name: string; // official casing: "PostgreSQL"
  description?: string; // hover tooltip — usage context
  usedIn?: Slug[]; // project slugs
}
```

Layer IDs (canonical): `frontend` · `backend` · `database` · `infrastructure` · `cloud` · `ai` · `tools`

---

## 11. Article / EngineeringNote

**Purpose:** Knowledge Base entry. `Article` is the schema name; UI label is **Engineering Note** per ELS.

**Source:** `/content/writing/{slug}/meta.json` + `index.{locale}.mdx`

```typescript
interface Article {
  slug: Slug;
  previousSlugs: Slug[];
  title: string;
  summary: string; // ≤170 chars — SEO + AI snippet
  category: ArticleCategory;
  cluster: ClusterId;
  tags: Tag[];
  relatedProjects: Slug[];
  relatedNotes: Slug[]; // max 2
  principles: string[];
  datePublished: ISODate;
  dateModified: ISODate;
  readingTime: number; // minutes — computed or manual
  featured: boolean;
  order: number | null;
  publishStatus: PublishStatus;
  author: string; // "Timur" — fixed
}

type ArticleCategory =
  "Architecture" | "Product" | "Process" | "Infrastructure" | "Domain";

type Tag = string; // kebab-case, max 5 per article
```

| Field         | Required | Validation                 |
| ------------- | -------- | -------------------------- |
| slug          | ✅       | unique                     |
| title         | ✅       | ELS lint, no clickbait     |
| summary       | ✅       | 70–170 chars, answer-first |
| category      | ✅       | ArticleCategory            |
| cluster       | ✅       | —                          |
| tags          | ✅       | max 5                      |
| datePublished | ✅       | —                          |
| dateModified  | ✅       | —                          |
| publishStatus | ✅       | —                          |

**At launch:** Zero published articles — empty Knowledge Base is valid per `03_ABOUT_TIMUR.md` §23.

---

## 12. Principle

**Purpose:** Engineering Protocols entries.

**Source:** `/content/principles/{id}.mdx` or JSON frontmatter

```typescript
interface Principle {
  id: string; // "01-reliability"
  number: string; // "01"
  title: string;
  description: string; // 1–2 sentences, ELS
  order: number;
  publishStatus: PublishStatus;
}
```

Canonical set: `03_ABOUT_TIMUR.md` §10 — 8 principles.

---

## 13. TimelineEvent / Experience

**Purpose:** Deployment History on Engineer Profile.

**Source:** `/content/profile/timeline.json`

```typescript
interface TimelineEvent {
  id: string;
  period: string; // "May 2025 – Feb 2026"
  role: string;
  context: string; // company or "Independent"
  focus: string; // one line
  order: number;
}

// Alias
type Experience = TimelineEvent;
```

**Validation:** order unique, period required. Never invent entries.

---

## 14. Skill

**Purpose:** Deprecated as standalone model — use `Technology` grouped by layer instead.

```typescript
// DO NOT USE — retained for schema migration only
interface Skill {
  name: string;
  layer: string;
}
```

ELS replaces "Skills" with Technology Stack — `02_ENGINEERING_LANGUAGE.md`.

---

## 15. Command (Terminal)

**Purpose:** System Console command registry.

```typescript
interface TerminalCommand {
  name: string; // lowercase: "help"
  args?: string; // "[module]"
  description: string;
  handler: CommandHandler;
}

type CommandHandler =
  | "static" // fixed response
  | "navigate" // opens module
  | "query"; // search content

interface TerminalResponse {
  lines: string[];
  action?: TerminalAction;
}

interface TerminalAction {
  type: "navigate" | "clear" | "setLocale";
  payload?: string;
}
```

Reference: `02_ENGINEERING_LANGUAGE.md` §10 — full command list.

---

## 16. SearchResult

**Purpose:** Command Palette and search index results.

```typescript
interface SearchResult {
  id: string;
  category: SearchCategory;
  title: string;
  meta?: string; // status, date, etc.
  href: string;
  score?: number; // relevance for ranked results
}

type SearchCategory =
  "Modules" | "Products" | "Engineering Notes" | "Commands" | "Recent";
```

---

## 17. ContactMessage

**Purpose:** Communication Module form submission.

```typescript
interface ContactMessage {
  name: string;
  email: string;
  intent: EngagementType;
  message: string;
  submittedAt: ISODateTime;
  locale: Locale;
}

type EngagementType =
  "Product Build" | "Technical Advisory" | "Collaboration" | "Other";
```

**Validation (Zod):**

- name: min 1, max 100
- email: valid email
- message: min 10, max 5000
- intent: EngagementType enum

**Never stored in repo** — sent to API/email service. Not content.

---

## 18. SEOMetadata

**Purpose:** Per-page SEO — generated via Next.js Metadata API.

Reference: `04_SEO_STRATEGY.md` §5–§7.

```typescript
interface SEOMetadata {
  title: string; // 30–70 chars
  description: string; // 70–170 chars
  canonical: string; // absolute URL
  robots: RobotsDirective;
  alternates: HreflangAlternate[];
}

type RobotsDirective = "index, follow" | "noindex, follow";

interface HreflangAlternate {
  locale: Locale | "x-default";
  url: string;
}
```

---

## 19. OpenGraphMetadata

```typescript
interface OpenGraphMetadata {
  type: OGType;
  siteName: string; // "Codev_Tim"
  title: string;
  description: string;
  url: string;
  locale: OGLocale;
  alternateLocales: OGLocale[];
  image: OGImage;
}

type OGType = "website" | "article" | "profile";

type OGLocale = "en_US" | "ru_RU" | "uz_UZ";

interface OGImage {
  url: string; // absolute, 1200×630
  width: 1200;
  height: 630;
  alt: string;
}
```

---

## 20. Breadcrumb

```typescript
interface BreadcrumbItem {
  label: string; // ELS module name
  href?: string; // undefined for current page
  position: number;
}

interface Breadcrumb {
  items: BreadcrumbItem[];
}
```

**Rule:** Dashboard not linked as current page. Current item has no href.

---

## 21. FooterLink

**Purpose:** Status bar and footer utility links.

```typescript
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}
```

Minimal set: Engineer Profile, Communication Module, GitHub.

---

## 22. SocialLink

```typescript
interface SocialLink {
  platform: "github" | "email";
  url: string;
  label: string;
}
```

**Confirmed:** GitHub only. LinkedIn/Twitter not used — `03_ABOUT_TIMUR.md` §8.

---

## 23. RSSEntry

```typescript
interface RSSEntry {
  title: string;
  link: string; // absolute canonical URL
  guid: string;
  pubDate: string; // RFC 822
  description: string;
  category?: string;
  author: string; // "Timur"
}
```

---

## 24. SitemapEntry

```typescript
interface SitemapEntry {
  loc: string;
  lastmod: ISODate;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number; // 0.0–1.0
  alternates: HreflangAlternate[];
}
```

Reference priorities: `04_SEO_STRATEGY.md` §10.4.

---

## 25. JSON-LD Objects

Reference: `04_SEO_STRATEGY.md` §11. TypeScript shapes for builders in `src/lib/seo/schema.ts`.

```typescript
interface JsonLdPerson {
  "@type": "Person";
  "@id": string;
  name: string;
  alternateName?: string;
  url: string;
  email?: string;
  jobTitle: string[];
  knowsAbout: string[];
  address: PostalAddress;
  sameAs: string[];
  worksFor?: Organization;
}

interface JsonLdWebSite {
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  inLanguage: Locale[];
  author: { "@id": string };
  potentialAction?: SearchAction;
}

interface JsonLdTechArticle {
  "@type": "TechArticle";
  headline: string;
  description: string;
  author: { "@id": string };
  datePublished: ISODateTime;
  dateModified: ISODateTime;
  inLanguage: Locale;
  image?: string;
}

interface JsonLdSoftwareApplication {
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  softwareVersion?: string;
  author: { "@id": string };
  description: string;
}

interface JsonLdBreadcrumbList {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

interface JsonLdItemList {
  "@type": "ItemList";
  itemListElement: ListItem[];
}

interface PostalAddress {
  "@type": "PostalAddress";
  addressLocality: string;
  addressCountry: string;
}

interface Organization {
  "@type": "Organization";
  name: string;
  url: string;
}

interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

interface SearchAction {
  "@type": "SearchAction";
  target: { "@type": "EntryPoint"; urlTemplate: string };
  "query-input": string;
}
```

**Rule:** JSON-LD content must match visible page content — no schema spam.

---

## 26. KnowledgeGraph (Generated)

**Purpose:** Build-time relationship graph.

**Output:** `/data/knowledge-graph.json`

```typescript
interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphNode {
  id: string; // "project:codev-erp"
  type: "Person" | "Project" | "Article" | "Module" | "Principle";
  url: string;
  title: string;
}

interface GraphEdge {
  from: string;
  to: string;
  type:
    "authorOf" | "relatedTo" | "documentedIn" | "partOfRegistry" | "taggedWith";
}
```

Reference: `05_CONTENT_ARCHITECTURE.md` §6, `07_AI_INDEXING.md` §9.

---

## 27. Zod Validation Strategy

```typescript
// src/lib/schemas/index.ts
// Export: siteConfigSchema, projectMetaSchema, articleMetaSchema, etc.

// Build pipeline:
// 1. Parse all /content files
// 2. Validate against Zod schemas
// 3. Fail build on published content errors
// 4. Warn on missing translations, orphan content
```

| Gate                                | Severity               |
| ----------------------------------- | ---------------------- |
| Published missing required field    | **Error** — fail build |
| Broken internal link                | **Error**              |
| Duplicate slug                      | **Error**              |
| Missing EN locale                   | **Error**              |
| Missing RU/UZ                       | **Warning**            |
| New tag not in registry             | **Warning**            |
| ELS forbidden word in title         | **Error**              |
| relatedNotes bidirectional mismatch | **Warning**            |

---

## 28. Future Extensibility

| Extension            | Schema change                                                     |
| -------------------- | ----------------------------------------------------------------- |
| New product          | Add to `09_PRODUCT_REGISTRY.md` + Project schema unchanged        |
| New article category | Extend `ArticleCategory` union + doc amendment                    |
| New module           | Requires `05_CONTENT_ARCHITECTURE.md` amendment — not schema-only |
| Colophon page        | New singleton content type — v2.0                                 |
| Changelog            | `ChangelogEntry` schema — v2.0                                    |
| FAQ on records       | `FAQItem[]` optional on Project — v1.1                            |

**Versioning:** Schema changes increment this document version. Migrations documented in changelog.

---

## 29. Document Relationships

```
05_CONTENT_ARCHITECTURE.md  → File locations, lifecycle, frontmatter examples
12_CONTENT_SCHEMA.md        → This document — TypeScript + validation
09_PRODUCT_REGISTRY.md      → Canonical product slugs
03_ABOUT_TIMUR.md           → Source data for profile and products
04_SEO_STRATEGY.md          → SEO/JSON-LD field requirements
```

---

_End of canonical specification._
