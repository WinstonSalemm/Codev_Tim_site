# Codev_Tim — Domain Layer

**Document ID:** `CT-DOC-17`  
**Version:** 1.0.0  
**Status:** Canonical  
**Effective:** 2026-07-05

---

## 1. Purpose

The Domain Layer owns **business logic and view models**. It sits between UI/features and the Content Access Layer.

```
UI / Features
     ↓
Domain Layer        ← business rules, view models, ranking
     ↓
Content Layer       ← typed storage access, search index
     ↓
Storage             ← JSON / MDX / CMS / API / DB
```

UI never assembles business objects, merges datasets, sorts content, or calculates metrics.

---

## 2. Architecture

```
src/lib/domain/
  shared/           constants, text helpers, shell projection
  dashboard/        Operations Center view models + services
  projects/         Product Registry domain (Phase 3-ready)
  articles/         Knowledge Base domain
  navigation/       module navigation metadata
  search/           ranking, filtering, relevance
  terminal/         terminal context assembly
  index.ts          public API
```

---

## 3. Boundaries

| Layer                           | May import                                                                           | Must not import                              |
| ------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------- |
| **UI / Components**             | `@/lib/domain`, presentation utils (`lib/dashboard/motion`, `lib/dashboard/metrics`) | `@/lib/content`, `content/*.json`            |
| **Domain**                      | `@/lib/content`                                                                      | React, components, `content/*.json` directly |
| **Content**                     | `content/*` via `internal/sources.ts` only                                           | Domain, UI                                   |
| **Features (terminal execute)** | `@/lib/domain`, `@/lib/terminal` (parser/registry)                                   | `@/lib/content` for command data             |

---

## 4. Domain vs Content

| Concern                    | Content Layer | Domain Layer |
| -------------------------- | ------------- | ------------ |
| Read JSON                  | ✅            | ❌           |
| Parse raw records          | ✅            | ❌           |
| Search index metadata      | ✅            | ❌           |
| Card preview truncation    | ❌            | ✅           |
| Status counting rules      | ❌            | ✅           |
| Activity sort/merge/format | ❌            | ✅           |
| Search ranking weights     | ❌            | ✅           |
| View models                | ❌            | ✅           |
| Terminal context assembly  | ❌            | ✅           |

---

## 5. Public API

### Dashboard

| Function                     | Returns                      |
| ---------------------------- | ---------------------------- |
| `getOperationsCenter()`      | `OperationsCenterVM`         |
| `getDashboardCards()`        | `DashboardCardVM[]`          |
| `getDashboardMetrics()`      | `DashboardMetricsVM`         |
| `getActivityFeed()`          | `ActivityEntryVM[]`          |
| `getStaticActivityRecords()` | raw records for client merge |
| `getHeaderInformation()`     | `HeaderVM`                   |
| `getCurrentMission()`        | `string`                     |

### Projects (Phase 3-ready)

| Function                   | Returns             |
| -------------------------- | ------------------- |
| `getProductRegistry()`     | `ProductRegistryVM` |
| `getProjectBySlug(slug)`   | `RegistryCardVM`    |
| `getProductMetrics()`      | `ProductMetricsVM`  |
| `getProductionProducts()`  | `RegistryCardVM[]`  |
| `getDevelopmentProducts()` | `RegistryCardVM[]`  |

### Articles

| Function                 | Returns           |
| ------------------------ | ----------------- |
| `getKnowledgeBase()`     | `KnowledgeBaseVM` |
| `getArticleBySlug(slug)` | `ArticleCardVM`   |
| `getRecentArticles()`    | `ArticleCardVM[]` |

### Search

| Function                         | Returns          |
| -------------------------------- | ---------------- |
| `searchContent(query, options?)` | `SearchResult[]` |

### Terminal

| Function               | Returns             |
| ---------------------- | ------------------- |
| `getTerminalContext()` | `TerminalContextVM` |

---

## 6. View Models

UI consumes **ViewModels only** — never raw content types.

| ViewModel           | Used by                    |
| ------------------- | -------------------------- |
| `DashboardCardVM`   | Dashboard cards            |
| `HeaderVM`          | Operations Center header   |
| `ActivityEntryVM`   | Activity log               |
| `RegistryCardVM`    | Product Registry (Phase 3) |
| `TerminalContextVM` | Terminal panel             |

---

## 7. Extension Rules

1. Add business logic to Domain — never to components
2. Add storage reads to Content — never to Domain directly from JSON
3. New module → new domain folder + view models
4. Command handlers call Domain services (`getProductRegistry()`, not `getProjects()`)
5. Search ranking changes only in `domain/search/`

---

## 8. Examples

```typescript
// ✅ Component
import { getDashboardCards } from "@/lib/domain";

// ✅ Terminal command
import { getProductRegistry } from "@/lib/domain/projects";

// ✅ Domain service
import { getProjects } from "@/lib/content";

// ❌ Component
import { getProjects } from "@/lib/content";
```

---

## 9. Future Compatibility

| Migration   | Change scope                             |
| ----------- | ---------------------------------------- |
| MDX content | `content/internal/sources.ts` only       |
| CMS / REST  | Content adapters only                    |
| PostgreSQL  | Content adapters only                    |
| AI search   | `domain/search/` ranking pipeline        |
| Phase 3 UI  | Consumes existing `getProductRegistry()` |

---

**Related:** `16_CONTENT_LAYER.md` · `15_PHASE_2_CONTRACT.md` · `12_CONTENT_SCHEMA.md`

---

_End of document._
