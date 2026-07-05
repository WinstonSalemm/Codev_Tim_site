# Codev_Tim — Content Access Layer

**Document ID:** `CT-DOC-16`  
**Version:** 1.0.0  
**Status:** Canonical  
**Effective:** 2026-07-05

---

## 1. Purpose

The Content Access Layer is the **single source of truth** for all site content consumed by UI, terminal, dashboard loaders, and SEO builders.

UI components and feature modules **must not** read content files directly. They consume typed services from `src/lib/content/`.

This layer exists so storage can migrate from JSON → MDX → CMS → REST API → PostgreSQL **without changing components**.

---

## 2. Architecture

```
content/                          ← storage (JSON today; MDX/CMS/DB later)
  site/config.json
  registry/products.json
  ...

src/lib/content/
  index.ts                        ← public API barrel
  types.ts                        ← canonical TypeScript types
  config.ts                       ← getSiteConfig(), getSiteShellConfig()
  projects.ts                     ← getProjects(), getProject(), getFeaturedProject()
  articles.ts                     ← getArticles(), getArticle()
  technologies.ts                 ← getTechnologies(), getTechnologyStack()
  timeline.ts                     ← getTimeline()
  activity.ts                     ← getActivity()
  principles.ts                   ← getPrinciplesCount()
  navigation.ts                   ← getNavigation()
  search.ts                       ← buildSearchIndex(), searchContent()
  internal/
    sources.ts                    ← ONLY file that imports content/*.json
    cache.ts                      ← memoization helpers
```

### Data flow

```
Storage (JSON/MDX/CMS/DB)
        ↓
internal/sources.ts    parse + validate at boundary
        ↓
internal/cache.ts      memoize per process / build worker
        ↓
public service         typed getter functions
        ↓
lib/dashboard          presentation mappers
lib/terminal           command context builders
components             never import storage
```

---

## 3. Responsibilities

| Layer                                           | Responsibility                                       |
| ----------------------------------------------- | ---------------------------------------------------- |
| **`internal/sources.ts`**                       | Read raw storage, parse, runtime shape validation    |
| **`internal/cache.ts`**                         | Avoid duplicate parsing; SSG/ISR-friendly singletons |
| **Public services**                             | Stable typed API for each domain                     |
| **`search.ts`**                                 | Aggregate searchable metadata; token scoring         |
| **Consumers (`lib/dashboard`, `lib/terminal`)** | Map content types to UI/terminal views               |

---

## 4. Public API

Import from `@/lib/content`:

| Function                         | Returns                                      |
| -------------------------------- | -------------------------------------------- |
| `getSiteConfig()`                | Full site configuration                      |
| `getSiteShellConfig()`           | Shell projection (name, version, mission, …) |
| `getEngineerIdentity()`          | Roles and focus                              |
| `getProjects()`                  | All products                                 |
| `getProject(slug)`               | Single product                               |
| `getFeaturedProject()`           | Latest / featured product                    |
| `getLatestProjectSlug()`         | Featured slug                                |
| `getArticles()`                  | All engineering notes                        |
| `getArticle(slug)`               | Single note                                  |
| `getTechnologies()`              | Stack layers                                 |
| `getTechnologyStack()`           | Layers + top tags                            |
| `getTimeline()`                  | Experience summary                           |
| `getActivity()`                  | Activity log entries                         |
| `getPrinciplesCount()`           | Protocol count                               |
| `getNavigation()`                | Module navigation metadata                   |
| `buildSearchIndex()`             | All searchable documents                     |
| `searchContent(query, options?)` | Ranked search results                        |

Each domain service also exposes `get*SearchMetadata()` for index construction.

---

## 5. Extension Rules

### Allowed

- Add new getters to existing service files
- Add new service files under `src/lib/content/`
- Add parsers in `internal/sources.ts` when new storage files appear
- Add Zod schemas co-located with parsers (future)

### Forbidden

```typescript
// ❌ In components or feature UI
import products from "../../../content/registry/products.json";

// ❌ In lib/dashboard, lib/terminal, lib/seo consumers
import stack from "../../../content/profile/stack.json";

// ✅ Always
import { getProjects } from "@/lib/content";
```

**Exception:** `src/i18n/request.ts` loads `messages/{locale}.json` — i18n messages are not domain content.

---

## 6. Search Foundation

Every content service exposes normalized metadata:

```typescript
type SearchableMetadata = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  tags: string[];
  keywords: string[];
  category: SearchableCategory;
  language: ContentLocale;
  href?: string;
};
```

`buildSearchIndex()` memoizes the union of all domain indexes.  
`searchContent()` performs token scoring — internal utility only (no UI in this layer).

Terminal `search` command retains its own handler today; it may delegate to `searchContent()` in a future phase without UI changes.

---

## 7. Cache Strategy

- `createCachedLoader()` wraps each storage read — **one parse per process**
- Compatible with Next.js SSG: build workers get isolated caches
- Future ISR: swap loader internals to fetch + revalidate; public API unchanged
- Future Redis/DB: add adapter behind `internal/sources.ts`

---

## 8. Type Safety

- No `any`
- No unsafe casts at public API boundaries
- Runtime guards in `internal/sources.ts` until Zod is installed
- Public types live in `types.ts` — consumers import types from `@/lib/content`

---

## 9. Examples

### Dashboard loader

```typescript
import { getProjects, getFeaturedProject } from "@/lib/content";

const count = getProjects().length;
const latest = getFeaturedProject()?.title;
```

### Terminal context

```typescript
import { getSiteConfig, getEngineerIdentity, getProjects } from "@/lib/content";

const config = getSiteConfig();
const products = getProjects();
```

### Internal search (Phase 5+ UI)

```typescript
import { searchContent } from "@/lib/content";

const results = searchContent("erp", { locale: "en", limit: 10 });
```

---

## 10. Future Database Migration

To replace JSON with PostgreSQL:

1. Implement `internal/adapters/postgres/` with same return types as parsers
2. Switch `internal/sources.ts` to call adapter instead of JSON import
3. **Do not change** `getProjects()`, `getSiteConfig()`, or any public signature
4. Add connection env vars; keep cache layer for query memoization

MDX migration follows the same pattern: MDX loader in `internal/sources.ts`, public API unchanged.

---

## 11. Governance

| Change                       | Requirement                                         |
| ---------------------------- | --------------------------------------------------- |
| New content domain           | New service file + types + search metadata + parser |
| New storage file             | Parser in `internal/sources.ts` only                |
| Public API break             | ADR + version entry in `CHANGELOG.md`               |
| Component direct JSON import | **Reject** — use content layer                      |

**Related:** `12_CONTENT_SCHEMA.md` · `05_CONTENT_ARCHITECTURE.md` · `15_PHASE_2_CONTRACT.md`

---

_End of document._
