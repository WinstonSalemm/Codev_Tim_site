# Codev_Tim — SEO Strategy

**Document ID:** `CT-DOC-04`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Preface

This document defines the **complete SEO specification** for the Codev_Tim ecosystem. It is production-ready for:

- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster
- AI search engines (Perplexity, ChatGPT Search, Google AI Overviews)
- LLM indexing (structured, crawlable, citation-friendly content)

**Governance:** All SEO implementation must conform to this document and `02_ENGINEERING_LANGUAGE.md`. SEO copy uses ELS internally but may include discoverability terms (software engineer, ERP, system architecture) where search intent requires them — never marketing superlatives.

**Related documents:**
- `00_PROJECT_VISION.md` — Module registry, performance targets
- `02_ENGINEERING_LANGUAGE.md` — Language rules
- `05_CONTENT_ARCHITECTURE.md` — URL hierarchy, content relationships

**Configurable constant:**

```
SITE_URL = https://[confirmed-domain]
```

Domain is not yet confirmed in canonical records. All examples use `{SITE_URL}`. Replace at deployment.

**Default locale:** `en`  
**Supported locales:** `en`, `ru`, `uz`

---

## 1. SEO Philosophy

### 1.1 Positioning in Search

Codev_Tim must rank and appear as:

> A software engineer who builds production systems — ERP, automation, architecture — not a freelancer portfolio.

### 1.2 SEO Principles

| Principle | Rule |
|-----------|------|
| **Technical first** | Crawlable, fast, semantic — before keyword optimization |
| **ELS-aligned** | Titles and descriptions are precise, not clickbait |
| **Locale-complete** | Every indexable page has EN/RU/UZ variants with hreflang |
| **Structured** | JSON-LD on every page type — machines read what humans see |
| **Citation-friendly** | Clear headings, factual statements, author attribution for LLMs |
| **No keyword stuffing** | Natural engineering language |
| **Index what matters** | Utility pages (404 shell states, command palette) — noindex where appropriate |

### 1.3 Target Search Intents

| Intent | Target Pages | Example Queries |
|--------|--------------|-----------------|
| Brand | Dashboard | `Codev_Tim`, `Codev Tim engineer` |
| Expertise | Engineer Profile, Engineering Records | `ERP developer Tashkent`, `ASP.NET ERP architect` |
| Technical depth | Engineering Records, Knowledge Base | `ERP system architecture React ASP.NET` |
| Thought leadership | Engineering Notes | `[topic] engineering architecture` |
| Product discovery | Product Registry | `Timur ERP platform`, `business automation engineer` |

---

## 2. Technical SEO

### 2.1 Rendering Strategy

| Requirement | Specification |
|-------------|---------------|
| Rendering | **SSG/SSR** — fully rendered HTML at crawl time |
| JavaScript | Progressive enhancement; core content visible without JS |
| SPA behavior | Client navigation for operators; crawlers receive full HTML per URL |
| Dynamic routes | Pre-render all known slugs at build; ISR for new content |

### 2.2 Crawlability Requirements

- Every indexable URL returns `200 OK` with unique content
- No orphan pages — all content reachable within 3 clicks from Dashboard
- No infinite URL spaces — filter states use query params, canonical to base or self with param rules (see §6)
- Pagination: `rel="next"` / `rel="prev"` when lists exceed 20 items
- No content behind authentication
- No `noindex` on primary modules unless explicitly specified

### 2.3 Indexability Matrix

| URL Pattern | Index | Follow | Notes |
|-------------|-------|--------|-------|
| `/{locale}/` | ✅ | ✅ | Dashboard |
| `/{locale}/projects` | ✅ | ✅ | Product Registry |
| `/{locale}/projects/{slug}` | ✅ | ✅ | Engineering Record |
| `/{locale}/about` | ✅ | ✅ | Engineer Profile |
| `/{locale}/principles` | ✅ | ✅ | Engineering Protocols |
| `/{locale}/writing` | ✅ | ✅ | Knowledge Base index |
| `/{locale}/writing/{slug}` | ✅ | ✅ | Engineering Note |
| `/{locale}/contact` | ✅ | ✅ | Communication Module |
| `/{locale}/404` | ❌ | ✅ | Return 404 status |
| `/?*` filter-only views | ⚠️ | ✅ | Canonical to unfiltered base when no unique content |
| `/api/*` | ❌ | ❌ | Block in robots.txt |
| `/_next/*` | ❌ | ❌ | Block in robots.txt |
| `/admin/*` (future) | ❌ | ❌ | Block in robots.txt |

### 2.4 HTTPS and Security

- HTTPS only — HSTS enabled
- No mixed content
- Security headers: `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`

### 2.5 Mobile

- Mobile-first indexing compliant
- Responsive viewport meta on all pages
- Tap targets ≥48px
- No intrusive interstitials

---

## 3. Semantic HTML Rules

### 3.1 Document Structure

Every indexable page:

```html
<!DOCTYPE html>
<html lang="{locale}">
  <head>...</head>
  <body>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header role="banner">...</header>       <!-- System Header -->
    <nav aria-label="Module Navigation">...</nav>
    <main id="main-content" role="main">...</main>
    <footer role="contentinfo">...</footer>  <!-- Status Bar -->
  </body>
</html>
```

### 3.2 Landmark Rules

| Element | Usage |
|---------|-------|
| `<header>` | System Header — once per page |
| `<nav>` | Module Navigation, breadcrumb, TOC — label with `aria-label` |
| `<main>` | Single main content area — one per page |
| `<article>` | Engineering Notes, Engineering Records |
| `<section>` | Major content panels with accessible name |
| `<aside>` | TOC sidebar, related links |
| `<footer>` | Status Bar / page footer links |
| `<time datetime="">` | All dates — machine-readable |
| `<figure>` / `<figcaption>` | Interface Record screenshots, diagrams |

### 3.3 Prohibited Patterns

- No `<div>` soup without landmarks
- No skipped heading levels (`h1` → `h3`)
- No `role="main"` on multiple elements
- No `<b>` / `<i>` for semantics — use `<strong>` / `<em>` sparingly
- No empty headings for SEO
- No hidden text or cloaking

### 3.4 Application Shell vs Crawl Content

The OS shell (sidebar, status bar, terminal) uses semantic landmarks but **does not contain duplicate `<h1>` elements**. Each module has exactly one `<h1>` in `<main>`.

---

## 4. URL Conventions

### 4.1 URL Structure

```
{SITE_URL}/{locale}/{module}/{slug?}?{query}
```

### 4.2 Canonical URL Patterns

| Module | URL Pattern | Example |
|--------|-------------|---------|
| Dashboard | `/{locale}` | `/en` |
| Product Registry | `/{locale}/projects` | `/en/projects` |
| Engineering Record | `/{locale}/projects/{slug}` | `/en/projects/erp-platform` |
| Engineer Profile | `/{locale}/about` | `/en/about` |
| Engineering Protocols | `/{locale}/principles` | `/en/principles` |
| Knowledge Base | `/{locale}/writing` | `/en/writing` |
| Engineering Note | `/{locale}/writing/{slug}` | `/en/writing/erp-data-architecture` |
| Communication Module | `/{locale}/contact` | `/en/contact` |

### 4.3 Slug Rules

```
Pattern:  lowercase-kebab-case
Charset:  a-z, 0-9, hyphen only
Max:      80 characters
Locale:   same slug across all locales (content keyed by slug, not translated slug)
```

**Examples:**
```
erp-platform          ✅
ERP-Platform          ❌
erp_platform          ❌
why-erp-needs-arch    ✅
```

### 4.4 Root and Locale Redirects

```
/           → 302 or 301 to /en (or locale-detected default)
/en         → 200 (canonical dashboard)
/en/        → 301 to /en (trailing slash normalized — pick one, enforce consistently)
```

**Canonical rule:** No trailing slash on all routes (recommended).

### 4.5 Query Parameters

| Param | Usage | Canonical |
|-------|-------|-----------|
| `?status=production` | Product Registry filter | Self-canonical if indexable filtered view desired; default: canonical to `/projects` |
| `?tag=architecture` | Knowledge Base filter | Same rule |
| `?q=search` | Search results | `noindex, follow` |
| `utm_*` | Analytics | Ignored in canonical (strip UTM from canonical URL) |

**Default policy:** Filter states with thin duplicate content → canonical to unfiltered base URL.

---

## 5. Metadata Strategy

### 5.1 Required Meta Tags (Every Indexable Page)

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{computed title}</title>
<meta name="description" content="{computed description}">
<link rel="canonical" href="{canonical URL}">
<meta name="robots" content="{robots directive}">
<link rel="alternate" hreflang="en" href="{en URL}">
<link rel="alternate" hreflang="ru" href="{ru URL}">
<link rel="alternate" hreflang="uz" href="{uz URL}">
<link rel="alternate" hreflang="x-default" href="{en URL}">
```

### 5.2 Optional Global Meta

```html
<meta name="author" content="Timur">
<meta name="creator" content="Timur">
<meta name="publisher" content="Codev_Tim">
<meta name="theme-color" content="#07090F">
```

### 5.3 Robots Directives by Page Type

| Page | robots |
|------|--------|
| All primary modules | `index, follow` |
| 404 | `noindex, follow` |
| Search results | `noindex, follow` |
| Paginated page 2+ | `index, follow` with rel next/prev |

### 5.4 Title Length

- Target: **50–60 characters**
- Max: **70 characters** (truncate gracefully)
- Min: **30 characters**

### 5.5 Description Length

- Target: **140–160 characters**
- Max: **170 characters**
- Min: **70 characters**
- No exclamation marks (ELS)
- Factual, specific, no superlatives

---

## 6. Title Templates

### 6.1 Global Template

```
{Page Title} — Codev_Tim
```

For long page titles:
```
{Short Title} — {Module} — Codev_Tim
```

### 6.2 Module Title Templates

| Module | EN Title Template |
|--------|-------------------|
| **Dashboard** | `Operations Center — Codev_Tim` |
| **Product Registry** | `Product Registry — Codev_Tim` |
| **Engineering Record** | `{Product Name} — Engineering Record — Codev_Tim` |
| **Engineer Profile** | `Engineer Profile — Timur — Codev_Tim` |
| **Engineering Protocols** | `Engineering Protocols — Codev_Tim` |
| **Knowledge Base** | `Knowledge Base — Codev_Tim` |
| **Engineering Note** | `{Note Title} — Codev_Tim` |
| **Communication Module** | `Communication Module — Codev_Tim` |
| **Missing Module** | `Missing Module — Codev_Tim` |

### 6.3 Localized Title Templates

| Module | RU | UZ |
|--------|----|----|
| Dashboard | `Операционный центр — Codev_Tim` | `Operatsion markaz — Codev_Tim` |
| Product Registry | `Реестр продуктов — Codev_Tim` | `Mahsulotlar reestri — Codev_Tim` |
| Engineer Profile | `Профиль инженера — Timur — Codev_Tim` | `Muhandis profili — Timur — Codev_Tim` |
| Knowledge Base | `База знаний — Codev_Tim` | `Bilimlar bazasi — Codev_Tim` |
| Communication Module | `Модуль связи — Codev_Tim` | `Aloqa moduli — Codev_Tim` |

> Engineering Record and Engineering Note titles use translated content titles where available; brand suffix remains `Codev_Tim`.

---

## 7. Meta Description Templates

### 7.1 Module Description Templates (EN)

| Module | Template |
|--------|----------|
| **Dashboard** | `Codev_Tim operations center. Current mission: {mission}. Software engineer building ERP platforms and business automation systems.` |
| **Product Registry** | `Registered production systems by Timur — ERP platforms, business automation, and software architecture. Engineering records with system blueprints.` |
| **Engineering Record** | `{Product Name}: {one-sentence outcome}. Built with {top 3 stack items}. System blueprint, trade-offs, and engineering documentation.` |
| **Engineer Profile** | `Timur — software engineer, system architect, and ERP developer based in Tashkent. Builds production systems for business automation.` |
| **Engineering Protocols** | `Engineering protocols and principles behind Codev_Tim systems. How production software is designed, built, and maintained.` |
| **Knowledge Base** | `Engineering notes on system architecture, ERP development, business automation, and product engineering by Timur.` |
| **Engineering Note** | `{First 155 chars of note thesis or summary.}` |
| **Communication Module** | `Open communication channel with Timur for product builds, technical advisory, and system architecture engagements.` |

### 7.2 Description Rules

- Include primary keyword naturally (ERP, software engineer, system architecture — where relevant)
- Never use forbidden ELS words (passionate, expert, amazing, etc.)
- Unique per page — no duplicate descriptions
- Engineering Note: auto-generate from frontmatter `summary` field; fallback to first paragraph truncated

---

## 8. Canonical Rules

### 8.1 Self-Referencing Canonical

Every indexable page canonicalizes to itself at the correct locale URL:

```
<link rel="canonical" href="{SITE_URL}/en/projects/erp-platform">
```

### 8.2 Cross-Locale Canonical

**Never** cross-locale canonical. Each locale is self-canonical. Locale alternates via hreflang only.

### 8.3 Duplicate Content Prevention

| Scenario | Canonical |
|----------|-----------|
| `/en/projects` vs `/en/projects/` | Single preferred (no trailing slash) |
| Filtered registry view | `/en/projects` (base) unless filter page has unique SEO content |
| HTTP vs HTTPS | HTTPS |
| www vs non-www | Pick one — recommend non-www |
| UTM parameters | Strip from canonical |
| Paginated lists | Page 1 = `/writing`; page 2 = self-canonical with rel next/prev |

### 8.4 Default Locale

`x-default` hreflang points to English (`/en/...`).

---

## 9. robots.txt Specification

```
# Codev_Tim robots.txt
# {SITE_URL}/robots.txt

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*?q=
Disallow: /*?utm_

# AI crawlers — allow indexable content
User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Yandex
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
```

**Policy:** AI crawlers are allowed on public content. API and build paths blocked.

**Review:** Update when new non-public routes are added.

---

## 10. Sitemap Strategy

### 10.1 Sitemap Index

```
{SITE_URL}/sitemap.xml          → sitemap index
{SITE_URL}/sitemap-pages.xml      → static modules × locales
{SITE_URL}/sitemap-projects.xml   → engineering records × locales
{SITE_URL}/sitemap-writing.xml    → engineering notes × locales
```

### 10.2 sitemap.xml (Index)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>{SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>{ISO8601}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{SITE_URL}/sitemap-projects.xml</loc>
    <lastmod>{ISO8601}</lastmod>
  </sitemap>
  <sitemap>
    <loc>{SITE_URL}/sitemap-writing.xml</loc>
    <lastmod>{ISO8601}</lastmod>
  </sitemap>
</sitemapindex>
```

### 10.3 URL Entry Requirements

Each `<url>` entry includes:

```xml
<url>
  <loc>{absolute URL}</loc>
  <lastmod>{content updated ISO8601}</lastmod>
  <changefreq>{see table}</changefreq>
  <priority>{see table}</priority>
  <xhtml:link rel="alternate" hreflang="en" href="..."/>
  <xhtml:link rel="alternate" hreflang="ru" href="..."/>
  <xhtml:link rel="alternate" hreflang="uz" href="..."/>
  <xhtml:link rel="alternate" hreflang="x-default" href="..."/>
</url>
```

### 10.4 Priority and Changefreq

| Page Type | priority | changefreq |
|-----------|----------|------------|
| Dashboard | 1.0 | weekly |
| Product Registry | 0.9 | weekly |
| Engineering Record | 0.8 | monthly |
| Engineer Profile | 0.8 | monthly |
| Engineering Protocols | 0.7 | monthly |
| Knowledge Base index | 0.8 | weekly |
| Engineering Note | 0.7 | monthly |
| Communication Module | 0.6 | yearly |

### 10.5 Generation Rules

- Regenerate on every build/deploy
- Include only `200 OK` indexable URLs
- Exclude `noindex` pages
- Max 50,000 URLs per sitemap file
- Submit to Google Search Console, Bing Webmaster, Yandex Webmaster

---

## 11. Structured Data (Schema.org / JSON-LD)

### 11.1 Global — WebSite + SearchAction

On Dashboard (all locales):

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Codev_Tim",
  "alternateName": "Codev Tim",
  "url": "{SITE_URL}",
  "description": "Engineering operating system of Timur — software engineer, system architect, and ERP developer.",
  "inLanguage": ["en", "ru", "uz"],
  "author": {
    "@type": "Person",
    "@id": "{SITE_URL}/en/about#person"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{SITE_URL}/en/writing?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 11.2 Global — Person (Engineer Profile)

On `/about` and referenced globally:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "{SITE_URL}/en/about#person",
  "name": "Timur",
  "url": "{SITE_URL}/en/about",
  "jobTitle": ["Software Engineer", "System Architect", "ERP Developer"],
  "worksFor": {
    "@type": "Organization",
    "name": "Codev_Tim"
  },
  "knowsAbout": [
    "ERP Systems",
    "Business Automation",
    "System Architecture",
    "ASP.NET Core",
    "React",
    "PostgreSQL"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tashkent",
    "addressCountry": "UZ"
  },
  "sameAs": [
    "https://github.com/WinstonSalemm"
  ],
}
```

> Populate `sameAs` when GitHub/LinkedIn URLs are confirmed in `03_ABOUT_TIMUR.md`.

### 11.3 BreadcrumbList (All Modules Except Dashboard)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Operations Center",
      "item": "{SITE_URL}/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Product Registry",
      "item": "{SITE_URL}/en/projects"
    }
  ]
}
```

### 11.4 Module-Specific Schema

See §21 Per-Module SEO Requirements.

### 11.5 JSON-LD Rules

- One `@graph` array per page combining all relevant types — avoid duplicate conflicting entities
- Use `@id` for cross-referencing Person, WebSite, Organization
- Validate with Google Rich Results Test before deploy
- Keep JSON-LD in `<script type="application/ld+json">` in `<head>`
- Content must match visible page content — no schema spam

---

## 12. Open Graph Specification

### 12.1 Required OG Tags

```html
<meta property="og:type" content="{type}">
<meta property="og:site_name" content="Codev_Tim">
<meta property="og:title" content="{title — same as or shorter than page title}">
<meta property="og:description" content="{description — same as meta description}">
<meta property="og:url" content="{canonical URL}">
<meta property="og:locale" content="{locale OG code}">
<meta property="og:locale:alternate" content="{other locales}">
<meta property="og:image" content="{OG image URL}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{descriptive alt}">
```

### 12.2 OG Locale Codes

| Locale | og:locale |
|--------|-----------|
| en | `en_US` |
| ru | `ru_RU` |
| uz | `uz_UZ` |

### 12.3 OG Type by Module

| Module | og:type |
|--------|---------|
| Dashboard | `website` |
| Product Registry | `website` |
| Engineering Record | `article` |
| Engineer Profile | `profile` |
| Knowledge Base | `website` |
| Engineering Note | `article` |
| Communication Module | `website` |

### 12.4 Default OG Image

```
{SITE_URL}/og/default.png     → 1200×630, dark #07090F background
                               Codev_Tim wordmark + version badge
                               Signal amber accent line
                               No photo, no gradients
```

### 12.5 Per-Content OG Images

| Content | OG Image |
|---------|----------|
| Engineering Record | `{SITE_URL}/og/projects/{slug}.png` or default |
| Engineering Note | `{SITE_URL}/og/writing/{slug}.png` or default |
| Fallback | Auto-generate via OG image API at build time |

---

## 13. Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{OG image URL}">
<meta name="twitter:image:alt" content="{alt text}">
```

**Optional** (when Twitter/X handle confirmed):

```html
<meta name="twitter:creator" content="@handle">
<meta name="twitter:site" content="@handle">
```

**Policy:** Use `summary_large_image` for all pages. No `summary` card with small image.

---

## 14. hreflang Strategy

### 14.1 Implementation

Every indexable page includes in `<head>`:

```html
<link rel="alternate" hreflang="en" href="{SITE_URL}/en/{path}">
<link rel="alternate" hreflang="ru" href="{SITE_URL}/ru/{path}">
<link rel="alternate" hreflang="uz" href="{SITE_URL}/uz/{path}">
<link rel="alternate" hreflang="x-default" href="{SITE_URL}/en/{path}">
```

Also include in XML sitemap `xhtml:link` entries.

### 14.2 Rules

- **Reciprocal:** if EN links to RU, RU must link to EN
- **Same slug** across locales — only locale prefix differs
- **Missing translation:** if content not translated, page still exists with fallback content OR omit locale from hreflang until translated — never hreflang to redirect-only stub
- **404 pages:** no hreflang
- **Dashboard:** all three locales required

### 14.3 Content Translation Policy for SEO

| State | hreflang | Behavior |
|-------|----------|----------|
| Fully translated | Include all 3 | Unique content per locale |
| UI translated, body EN only | Include all 3 with `lang` attribute accurate | Mark body language correctly |
| Not yet translated | Exclude locale from hreflang until ready | Do not publish empty locale URLs |

---

## 15. Internal Linking Rules

### 15.1 Principles

- Every Engineering Record linked from Product Registry
- Every Engineering Note linked from Knowledge Base
- Dashboard cards link to primary modules
- Engineering Records link to related Notes (max 2)
- Engineering Notes link to related Records (max 2)
- Engineer Profile links to Product Registry and Knowledge Base
- Prev/Next navigation on Engineering Records (same registry)
- No orphan content

### 15.2 Anchor Text Rules

| ✅ ELS-aligned anchor | ❌ Avoid |
|----------------------|---------|
| `ERP Platform` | `click here` |
| `System Blueprint` | `read more` |
| `Product Registry` | `my projects` |
| `Engineering Note: {title}` | `this article` |

### 15.3 Link Density

- Engineering Record: 3–8 internal links minimum
- Engineering Note: 2–5 internal links minimum
- Dashboard: links to all primary modules
- Footer/Status Bar: links to Communication Module, Engineer Profile

### 15.4 Link Graph Targets

```
Dashboard ──→ all modules
Product Registry ──→ each Engineering Record
Engineering Record ──→ related Notes, Product Registry, prev/next record
Knowledge Base ──→ each Engineering Note
Engineering Note ──→ related Records, Knowledge Base
Engineer Profile ──→ Product Registry, Knowledge Base, Communication Module
```

---

## 16. Breadcrumb Strategy

### 16.1 Visible Breadcrumbs

All modules except Dashboard:

```
Operations Center / Product Registry / ERP Platform
```

Use ELS module identity names — not route segments.

| Route Segment | Breadcrumb Label |
|---------------|------------------|
| `(root)` | Operations Center |
| `projects` | Product Registry |
| `projects/{slug}` | {Product Name} |
| `about` | Engineer Profile |
| `principles` | Engineering Protocols |
| `writing` | Knowledge Base |
| `writing/{slug}` | {Note Title truncated 40 chars} |
| `contact` | Communication Module |

### 16.2 Implementation

- Visible breadcrumb in System Header center zone
- `<nav aria-label="Module Path">` with ordered list
- Matching BreadcrumbList JSON-LD (§11.3)
- Current page not linked — plain text
- Mobile: collapse to `← {Parent Module}`

---

## 17. Heading Hierarchy

### 17.1 Rules

- **One `<h1>` per page** — in `<main>` only
- No skipped levels
- `<h1>` = module title or content title
- Micro-label `MODULE` is **not** a heading — use `<p class="label">` or `<span>`

### 17.2 Per-Module Hierarchy

**Dashboard:**
```
h1: Operations Center
h2: System Overview | {Panel Name} (each dashboard card section)
h3: (card internal titles if needed)
```

**Product Registry:**
```
h1: Product Registry
h2: {Product Name} (each card — or h2 on detail only; cards use h2 in list)
```

**Engineering Record:**
```
h1: {Product Name}
h2: Overview | Problem Statement | Business Context | System Blueprint | ...
h3: Subsections within Trade-offs, Lessons Recorded
h4: Rare — deep subsections only
```

**Engineering Note:**
```
h1: {Note Title}
h2: Major sections
h3: Subsections
```

**Engineer Profile:**
```
h1: Engineer Profile
h2: Identity | Deployment History | Technology Stack | Availability
h3: Timeline entries, stack layers
```

---

## 18. Image Optimization

### 18.1 Formats

| Use | Format | Fallback |
|-----|--------|----------|
| Photos/screenshots | AVIF | WebP → PNG |
| OG images | PNG or WebP | — |
| Diagrams | SVG inline | PNG fallback for OG |
| Icons | SVG | — |

### 18.2 Responsive Images

```html
<img
  src="{fallback}"
  srcset="{avif/webp srcset}"
  sizes="(max-width: 768px) 100vw, 720px"
  width="{intrinsic width}"
  height="{intrinsic height}"
  alt="{descriptive alt}"
  loading="lazy"
  decoding="async"
>
```

### 18.3 Size Limits

| Type | Max file size |
|------|---------------|
| Interface Record screenshot | 200 KB (compressed) |
| OG image | 300 KB |
| Inline diagram SVG | 50 KB |

### 18.4 Interface Record Screenshots

- Dark device frame (consistent with brand)
- Capture at 2x, serve responsive
- Caption in `<figcaption>` — duplicates alt text purpose, alt stays concise

---

## 19. ALT Text Rules

### 19.1 Principles

- Describe **function and content**, not «image of»
- ELS tone: factual, concise
- Empty `alt=""` only for purely decorative elements (noise texture, window dots)
- Never keyword stuff

### 19.2 Templates

| Image Type | ALT Template |
|------------|--------------|
| Interface Record | `{Product Name} — {screen/module name} interface` |
| System Blueprint (if raster) | `{Product Name} system blueprint — {layer summary}` |
| OG image | `Codev_Tim — {page title}` |
| Engineer photo (if added) | `Timur — software engineer` |
| Diagram decorative grid | `""` (empty) |

### 19.3 Examples

```
✅ ERP Platform — inventory management dashboard
✅ ERP Platform system blueprint — Client, API, Services, Database
❌ screenshot
❌ amazing ERP dashboard image
❌ image of my project
```

---

## 20. Core Web Vitals Requirements

### 20.1 Targets (Canonical — from Project Vision)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | **>95** |
| LCP | **< 1.5s** |
| INP | **< 100ms** |
| CLS | **< 0.05** |
| FCP | **< 1.0s** |
| TTFB | **< 200ms** (edge cached) |

### 20.2 LCP Optimization

- Preload hero font (Geist Sans, Geist Mono — single weight each for initial)
- System Header and h1 text = LCP candidate — never block on JS
- OG/default images not on critical path for Dashboard LCP
- CDN edge caching for static assets

### 20.3 CLS Prevention

- Explicit `width`/`height` on all images
- Reserve space for dashboard cards (min-height)
- No font swap layout shift — use `font-display: swap` with metric-matched fallback
- Terminal panel: reserve collapsed height or animate without reflow

### 20.4 INP Optimization

- Debounce non-critical handlers
- Passive scroll listeners only
- Code-split terminal and command palette
- Main thread free during module transition

---

## 21. Lazy Loading Policy

| Asset | Policy |
|-------|--------|
| Interface Record images below fold | `loading="lazy"` |
| First visible screenshot in record | `loading="eager"` or no lazy |
| OG images | Not on page — no lazy needed |
| SVG diagrams inline | No lazy — part of document |
| Fonts | Preload critical; rest async |
| Command palette | Dynamic import on first ⌘K |
| Terminal | Dynamic import on first toggle |
| Analytics | Deferred, async |
| Dashboard cards below fold | Native lazy or intersection observer |

**Rule:** Nothing critical for LCP or first meaningful paint is lazy-loaded.

---

## 22. PageSpeed Optimization

### 22.1 JavaScript Budget

| Bundle | Max (gzipped) |
|--------|---------------|
| Initial route | 80 KB |
| Terminal (lazy) | 30 KB |
| Command palette (lazy) | 25 KB |
| Per-module chunk | 40 KB |

### 22.2 CSS

- Tailwind purge — no unused utilities in production
- Critical CSS inline for shell
- No `@import` chains

### 22.3 Caching Headers

| Asset | Cache-Control |
|-------|---------------|
| Static assets (hashed) | `public, max-age=31536000, immutable` |
| HTML pages | `public, max-age=0, s-maxage=3600, stale-while-revalidate` |
| OG images | `public, max-age=86400` |
| sitemap.xml | `public, max-age=3600` |

### 22.4 Compression

- Brotli preferred, gzip fallback
- All text assets compressed

### 22.5 Third Parties

- Minimize third-party scripts
- Analytics: Plausible or Vercel Analytics (lightweight, deferred)
- No embed widgets (Twitter feed, etc.)

---

## 23. Crawl Optimization

### 23.1 Internal Link Discovery

- HTML `<a href>` links — primary discovery method
- XML sitemap — secondary confirmation
- No JavaScript-only navigation for indexable content
- `rel="nofollow"` not used on internal links

### 23.2 Crawl Budget

- Flat URL structure — max 3 levels deep
- No duplicate paths
- Consolidate filter URLs via canonical
- Block low-value URLs in robots.txt (`?q=`, `utm_`)

### 23.3 LLM / AI Crawl Optimization

- Clear `<article>` structure with headings
- Factual opening paragraph on every Engineering Record and Note (answer-first for AI extraction)
- Person schema on Engineer Profile
- `llms.txt` at `{SITE_URL}/llms.txt` (see §23.4)

### 23.4 llms.txt Specification

```
# Codev_Tim
# {SITE_URL}/llms.txt

> Codev_Tim is the engineering operating system of Timur,
> a software engineer and ERP developer based in Tashkent.
> This site documents production systems, architecture, and engineering notes.

## Primary Content
- Operations Center: {SITE_URL}/en
- Product Registry: {SITE_URL}/en/projects
- Engineer Profile: {SITE_URL}/en/about
- Knowledge Base: {SITE_URL}/en/writing

## Author
- Name: Timur
- Role: Software Engineer, System Architect, ERP Developer
- Location: Tashkent, UTC+5

## Optional
- Full sitemap: {SITE_URL}/sitemap.xml
```

Update when content and contacts are confirmed.

---

## 24. Redirect Policy

### 24.1 301 vs 302 Rules

| Scenario | Code |
|----------|------|
| Permanent URL change (slug rename) | **301** |
| Trailing slash normalization | **301** |
| www → non-www (or reverse) | **301** |
| HTTP → HTTPS | **301** |
| Locale detection at root `/` | **302** or **307** (temporary redirect to preferred locale) |
| A/B tests (future) | **302** |

### 24.2 Slug Change Protocol

When Engineering Record or Note slug changes:

1. Create 301 from old URL to new URL — all locales
2. Update sitemap
3. Update internal links
4. Retain old slug in content frontmatter as `previousSlugs: []` for reference

---

## 25. 404 Strategy

### 25.1 HTTP Status

- Always return **HTTP 404** — not 200 with soft 404
- `noindex, follow` robots meta

### 25.2 Content

```
Module: Missing Module
Code: 404
Message: Module not found.
Requested: {path}
Action: Return to Operations Center
```

### 25.3 SEO Rules

- 404 pages excluded from sitemap
- BreadcrumbList not rendered on 404
- Monitor 404s in Search Console — fix broken inbound links

---

## 26. RSS Strategy

### 26.1 Feeds

```
{SITE_URL}/feed.xml              → all Engineering Notes (EN)
{SITE_URL}/ru/feed.xml           → RU notes
{SITE_URL}/uz/feed.xml           → UZ notes
{SITE_URL}/projects/feed.xml     → new/updated Engineering Records (optional)
```

### 26.2 RSS Item Format

```xml
<item>
  <title>{Note Title}</title>
  <link>{canonical URL}</link>
  <guid isPermaLink="true">{canonical URL}</guid>
  <pubDate>{RFC 822 date}</pubDate>
  <description>{summary}</description>
  <category>{tag}</category>
  <author>Timur</author>
</item>
```

### 26.3 Discovery

```html
<link rel="alternate" type="application/rss+xml" title="Codev_Tim Knowledge Base" href="{SITE_URL}/feed.xml">
```

On Knowledge Base and Dashboard.

---

## 27. Rich Snippets Opportunities

| Page Type | Schema | Rich Result Potential |
|-----------|--------|----------------------|
| Dashboard | WebSite, SearchAction | Sitelinks search box |
| Engineer Profile | Person | Knowledge panel (limited) |
| Engineering Record | TechArticle, SoftwareApplication | Article rich results |
| Engineering Note | TechArticle, BlogPosting | Article rich results |
| Knowledge Base | CollectionPage, ItemList | Carousel (limited) |
| Breadcrumbs (all) | BreadcrumbList | Breadcrumb display |
| FAQ (if added to records) | FAQPage | FAQ rich results — only if genuine FAQ content exists |

### 27.1 TechArticle Template (Engineering Record / Note)

```json
{
  "@type": "TechArticle",
  "headline": "{title}",
  "description": "{summary}",
  "author": { "@id": "{SITE_URL}/en/about#person" },
  "datePublished": "{ISO8601}",
  "dateModified": "{ISO8601}",
  "inLanguage": "{locale}",
  "proficiencyLevel": "Expert",
  "dependencies": "{stack items}",
  "image": "{OG image}"
}
```

> Use `proficiencyLevel: "Expert"` sparingly — only on advanced architecture content. Prefer omitting if uncertain.

---

## 28. Per-Module SEO Requirements

---

### 28.1 Dashboard (Operations Center)

| Requirement | Specification |
|-------------|---------------|
| **Title** | `Operations Center — Codev_Tim` |
| **Description** | Mission + engineer positioning (§7.1) |
| **Structured Data** | WebSite, SearchAction, Organization |
| **Canonical** | `{SITE_URL}/{locale}` |
| **OG** | type: website, default OG image |
| **Twitter** | summary_large_image |
| **Indexing** | index, follow |
| **hreflang** | en, ru, uz, x-default |
| **Priority** | 1.0 |
| **h1** | Operations Center |
| **Internal links** | All module entry points |
| **LLM** | llms.txt points here as primary entry |

---

### 28.2 Product Registry

| Requirement | Specification |
|-------------|---------------|
| **Title** | `Product Registry — Codev_Tim` |
| **Description** | §7.1 template |
| **Structured Data** | CollectionPage, ItemList of Products, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/projects` |
| **OG** | type: website |
| **Indexing** | index, follow |
| **h1** | Product Registry |
| **Internal links** | Each Engineering Record, Dashboard |
| **Filter URLs** | canonical to base unless unique SEO value |

**ItemList schema:**

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "{SITE_URL}/en/projects/erp-platform",
      "name": "ERP Platform"
    }
  ]
}
```

---

### 28.3 Engineering Record (Project Details)

| Requirement | Specification |
|-------------|---------------|
| **Title** | `{Product Name} — Engineering Record — Codev_Tim` |
| **Description** | Outcome + stack + documentation hint (§7.1) |
| **Structured Data** | TechArticle, SoftwareApplication, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/projects/{slug}` |
| **OG** | type: article, project-specific OG image |
| **Indexing** | index, follow |
| **h1** | {Product Name} |
| **h2** | Each documentation section |
| **Internal links** | Registry, related Notes, prev/next record |
| **Rich snippets** | TechArticle, breadcrumb |

**SoftwareApplication schema (when product is deployed system):**

```json
{
  "@type": "SoftwareApplication",
  "name": "ERP Platform",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "softwareVersion": "{version if known}",
  "author": { "@id": "{SITE_URL}/en/about#person" },
  "description": "{overview first sentence}"
}
```

---

### 28.4 Knowledge Base

| Requirement | Specification |
|-------------|---------------|
| **Title** | `Knowledge Base — Codev_Tim` |
| **Description** | §7.1 template |
| **Structured Data** | CollectionPage, ItemList, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/writing` |
| **OG** | type: website |
| **Indexing** | index, follow |
| **h1** | Knowledge Base |
| **RSS** | feed.xml linked in head |
| **Internal links** | Each Engineering Note, Engineer Profile |

---

### 28.5 Engineering Note (Article)

| Requirement | Specification |
|-------------|---------------|
| **Title** | `{Note Title} — Codev_Tim` |
| **Description** | Frontmatter `summary` or first paragraph |
| **Structured Data** | TechArticle, BlogPosting, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/writing/{slug}` |
| **OG** | type: article, note-specific OG image |
| **Indexing** | index, follow |
| **h1** | {Note Title} |
| **datePublished / dateModified** | Required in frontmatter and schema |
| **author** | Timur — Person @id |
| **Internal links** | Related records, Knowledge Base, 2 related notes |
| **Rich snippets** | Article, breadcrumb |

---

### 28.6 Engineer Profile

| Requirement | Specification |
|-------------|---------------|
| **Title** | `Engineer Profile — Timur — Codev_Tim` |
| **Description** | §7.1 template |
| **Structured Data** | Person (primary), ProfilePage, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/about` |
| **OG** | type: profile |
| **Indexing** | index, follow |
| **h1** | Engineer Profile |
| **Internal links** | Product Registry, Knowledge Base, Communication Module |
| **sameAs** | GitHub, LinkedIn when confirmed |

---

### 28.7 Communication Module

| Requirement | Specification |
|-------------|---------------|
| **Title** | `Communication Module — Codev_Tim` |
| **Description** | §7.1 template |
| **Structured Data** | ContactPage, BreadcrumbList |
| **Canonical** | `{SITE_URL}/{locale}/contact` |
| **OG** | type: website |
| **Indexing** | index, follow |
| **h1** | Communication Module |
| **Internal links** | Engineer Profile, Product Registry |

**ContactPage schema:**

```json
{
  "@type": "ContactPage",
  "name": "Communication Module",
  "url": "{SITE_URL}/en/contact",
  "description": "{description}",
  "mainEntity": { "@id": "{SITE_URL}/en/about#person" }
}
```

---

## 29. Search Console Setup Checklist

### 29.1 Google Search Console

- [ ] Verify domain property
- [ ] Submit sitemap.xml
- [ ] Monitor Core Web Vitals
- [ ] Monitor indexing coverage
- [ ] Review structured data enhancements
- [ ] Set geographic target: Uzbekistan (optional)
- [ ] Enable email alerts for crawl errors

### 29.2 Bing Webmaster Tools

- [ ] Verify site
- [ ] Submit sitemap
- [ ] Import settings from GSC (if available)
- [ ] Monitor IndexNow integration (optional — ping on publish)

### 29.3 Yandex Webmaster

- [ ] Verify site
- [ ] Submit sitemap
- [ ] Set region: Uzbekistan
- [ ] Monitor Turbo pages: **disabled** (SSG preferred)
- [ ] hreflang validation for ru locale

---

## 30. Pre-Launch SEO Checklist

- [ ] All indexable pages have unique title and description
- [ ] All indexable pages have canonical URL
- [ ] hreflang reciprocal on all locale variants
- [ ] sitemap.xml submitted to GSC, Bing, Yandex
- [ ] robots.txt accessible and correct
- [ ] llms.txt published
- [ ] RSS feed valid and linked
- [ ] JSON-LD validates on all page types
- [ ] OG images generated for all content
- [ ] Lighthouse >95 on Dashboard, Registry, one Record, one Note
- [ ] 404 returns correct status
- [ ] No duplicate titles or descriptions
- [ ] Internal link graph complete — no orphans
- [ ] Core Web Vitals pass in field data
- [ ] Mobile-friendly test pass
- [ ] Structured data spot-check in Rich Results Test

---

## 31. Document Relationships

```
00_PROJECT_VISION.md       → Performance targets, module registry
02_ENGINEERING_LANGUAGE.md → Copy rules for meta content
03_ABOUT_TIMUR.md          → Person schema data, sameAs URLs
05_CONTENT_ARCHITECTURE.md → URL hierarchy, slugs, frontmatter, content graph
06_SEO_CHECKLIST.md        → Pre-release verification (this spec → checklist)
07_AI_INDEXING.md          → AI/LLM indexing strategy
08_TECH_STACK.md           → Site implementation stack
```

---

*End of canonical specification. Amendments require version increment and consistency check across all `/docs` files.*
