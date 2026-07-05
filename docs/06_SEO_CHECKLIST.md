# Codev_Tim — Pre-Release SEO Checklist

**Document ID:** `CT-DOC-06`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Preface

This document is the **mandatory pre-release checklist** for Codev_Tim. Every item must be verified before production deploy. No exceptions.

**Usage:**

1. Run checklist per page type (minimum: Dashboard, Product Registry, one Engineering Record, one Engineering Note, Engineer Profile, Communication Module)
2. Run global checklist once per release
3. Mark each item: ✅ Pass · ❌ Fail · ⏭ N/A (with reason)
4. Release blocked if any ❌ in **Critical** section

**Related documents:**

- `04_SEO_STRATEGY.md` — Full SEO specification
- `05_CONTENT_ARCHITECTURE.md` — Content structure, frontmatter
- `07_AI_INDEXING.md` — AI/LLM indexing requirements

**Release record template:**

```
Release: v_____
Date: __________
Verified by: Timur
Domain: {SITE_URL}
Environment: production
```

---

## How to Use This Checklist

### Scope Per Release

| Scope                | When                                                             |
| -------------------- | ---------------------------------------------------------------- |
| **Global**           | Once per deploy — site-wide assets, configs, webmaster tools     |
| **Per page type**    | Once per page template change                                    |
| **Per content item** | Each new Engineering Record or Engineering Note before publish   |
| **Regression**       | After any change to shell, routing, i18n, or metadata generation |

### Priority Levels

| Level              | Rule                                                   |
| ------------------ | ------------------------------------------------------ |
| 🔴 **Critical**    | Release blocked until fixed                            |
| 🟡 **Required**    | Must fix before public announcement / index submission |
| 🟢 **Recommended** | Fix in same release or track as immediate follow-up    |

---

## Section A — Global Pre-Release (Site-Wide)

### A1. Domain and HTTPS 🔴

- [ ] Production domain confirmed and documented in `03_ABOUT_TIMUR.md` or site config
- [ ] `{SITE_URL}` replaced everywhere — no placeholder URLs in production
- [ ] HTTPS enforced — HTTP redirects 301 to HTTPS
- [ ] www/non-www policy chosen and 301 enforced (recommend: non-www)
- [ ] No mixed content warnings in browser console
- [ ] HSTS header enabled

### A2. robots.txt 🔴

- [ ] `{SITE_URL}/robots.txt` accessible
- [ ] `Allow: /` for primary crawlers
- [ ] `Disallow: /api/`, `/_next/`, `/admin/`
- [ ] `Disallow: /*?q=` (search queries)
- [ ] AI crawlers configured per `04_SEO_STRATEGY.md` §9
- [ ] `Sitemap: {SITE_URL}/sitemap.xml` present
- [ ] Validated in Google Search Console robots tester
- [ ] Validated in Yandex Webmaster robots checker

### A3. Sitemap 🔴

- [ ] `{SITE_URL}/sitemap.xml` accessible (sitemap index)
- [ ] `sitemap-pages.xml` — all static modules × all locales
- [ ] `sitemap-projects.xml` — all published Engineering Records × locales
- [ ] `sitemap-writing.xml` — all published Engineering Notes × locales
- [ ] All URLs return 200 OK
- [ ] No `noindex` pages in sitemap
- [ ] No 404 URLs in sitemap
- [ ] `<lastmod>` reflects actual content modification dates
- [ ] hreflang `xhtml:link` entries in sitemap (if implemented)
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Sitemap submitted to Yandex Webmaster

### A4. Favicon and App Icons 🔴

- [ ] `/favicon.ico` — 32×32 (or multi-size ICO)
- [ ] `/favicon.svg` — SVG favicon (modern browsers)
- [ ] `/apple-touch-icon.png` — 180×180
- [ ] `/icon-192.png` — 192×192 (PWA)
- [ ] `/icon-512.png` — 512×512 (PWA)
- [ ] All icons use Codev_Tim brand — dark `#07090F` background, no photo
- [ ] `<link rel="icon">` tags in `<head>` for all variants

### A5. Web Manifest 🟡

- [ ] `/site.webmanifest` accessible
- [ ] `name`: `Codev_Tim`
- [ ] `short_name`: `Codev_Tim`
- [ ] `description`: ELS-aligned site description
- [ ] `start_url`: `/{default-locale}`
- [ ] `display`: `standalone` or `minimal-ui`
- [ ] `background_color`: `#07090F`
- [ ] `theme_color`: `#07090F`
- [ ] Icons array references 192 and 512 PNGs
- [ ] `<link rel="manifest">` in `<head>`

### A6. Theme and Meta Basics 🔴

- [ ] `<meta name="theme-color" content="#07090F">` on all pages
- [ ] `<meta charset="utf-8">` on all pages
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` on all pages
- [ ] `<html lang="{locale}">` correct per locale route
- [ ] `<meta name="author" content="Timur">` on indexable pages
- [ ] No duplicate `<title>` tags
- [ ] No duplicate meta descriptions

### A7. llms.txt and AI Discovery 🟡

- [ ] `{SITE_URL}/llms.txt` published per `04_SEO_STRATEGY.md` §23.4
- [ ] Points to primary modules and sitemap
- [ ] Author and role information accurate
- [ ] Updated when major content changes
- [ ] See also `07_AI_INDEXING.md` for full AI indexing checklist

### A8. RSS Feeds 🟡

- [ ] `{SITE_URL}/feed.xml` valid RSS 2.0
- [ ] `{SITE_URL}/ru/feed.xml` (when RU content exists)
- [ ] `{SITE_URL}/uz/feed.xml` (when UZ content exists)
- [ ] `<link rel="alternate" type="application/rss+xml">` on Knowledge Base and Dashboard
- [ ] Feed validates at w3.org/feed validator
- [ ] Only published content in feed

### A9. Performance Infrastructure 🔴

- [ ] Brotli compression enabled (gzip fallback)
- [ ] Cache headers configured per `04_SEO_STRATEGY.md` §22.3
  - [ ] Static hashed assets: `max-age=31536000, immutable`
  - [ ] HTML: `s-maxage=3600, stale-while-revalidate`
- [ ] CDN or edge caching active
- [ ] TTFB < 200ms on cached pages
- [ ] No render-blocking third-party scripts
- [ ] Analytics deferred (Plausible or Vercel Analytics)

### A10. Font Loading 🔴

- [ ] Geist Sans preloaded for initial render
- [ ] Geist Mono preloaded or loaded async (terminal not blocking LCP)
- [ ] `font-display: swap` configured
- [ ] Fallback font metrics matched — no layout shift on font load
- [ ] Only required weights loaded (not full font family)
- [ ] Fonts self-hosted via `next/font` or equivalent — no Google Fonts CDN dependency

### A11. Security Headers 🟡

- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`
- [ ] Content-Security-Policy configured (no unsafe-inline unless required)

---

## Section B — Per-Page Metadata (Every Indexable Page)

Run for: Dashboard · Product Registry · Engineering Record · Engineering Note · Engineer Profile · Engineering Protocols · Communication Module

### B1. Title 🔴

- [ ] Unique title — no duplicates across site
- [ ] Follows template from `04_SEO_STRATEGY.md` §6
- [ ] Length 30–70 characters (target 50–60)
- [ ] Ends with `— Codev_Tim` (or localized equivalent)
- [ ] No forbidden ELS words
- [ ] No exclamation marks
- [ ] `<title>` matches OG title (or OG is shorter variant)

### B2. Meta Description 🔴

- [ ] Unique description — no duplicates across site
- [ ] Length 70–170 characters (target 140–160)
- [ ] Factual, ELS-compliant — no superlatives
- [ ] Matches or summarizes visible page content
- [ ] `<meta name="description">` present

### B3. Canonical 🔴

- [ ] `<link rel="canonical">` present
- [ ] Points to correct locale URL
- [ ] HTTPS, no trailing slash (consistent policy)
- [ ] No UTM parameters in canonical
- [ ] Filter/query pages canonical to base unless intentionally indexable

### B4. Robots Meta 🔴

- [ ] `<meta name="robots" content="index, follow">` on indexable pages
- [ ] `noindex, follow` on 404 and search result pages
- [ ] No accidental `noindex` on primary modules

### B5. Open Graph 🔴

- [ ] `og:type` — correct per module (`04_SEO_STRATEGY.md` §12.3)
- [ ] `og:site_name`: `Codev_Tim`
- [ ] `og:title` — present, unique
- [ ] `og:description` — present
- [ ] `og:url` — matches canonical
- [ ] `og:locale` — correct (`en_US`, `ru_RU`, `uz_UZ`)
- [ ] `og:locale:alternate` — other locales listed
- [ ] `og:image` — present, absolute URL
- [ ] `og:image:width`: `1200`
- [ ] `og:image:height`: `630`
- [ ] `og:image:alt` — descriptive, ELS-compliant

### B6. Twitter Cards 🔴

- [ ] `twitter:card`: `summary_large_image`
- [ ] `twitter:title` — present
- [ ] `twitter:description` — present
- [ ] `twitter:image` — present, matches OG image
- [ ] `twitter:image:alt` — present
- [ ] `twitter:creator` — set when handle confirmed

### B7. Language Alternates (hreflang) 🔴

- [ ] `<link rel="alternate" hreflang="en">` — present
- [ ] `<link rel="alternate" hreflang="ru">` — present (when RU published)
- [ ] `<link rel="alternate" hreflang="uz">` — present (when UZ published)
- [ ] `<link rel="alternate" hreflang="x-default">` — points to EN
- [ ] Reciprocal — all locales link to each other
- [ ] Same slug across locales
- [ ] Locales without translated content excluded from hreflang

### B8. Structured Data (Schema.org / JSON-LD) 🔴

- [ ] JSON-LD present in `<head>`
- [ ] Validates in Google Rich Results Test — zero errors
- [ ] Validates in Schema.org validator
- [ ] Content matches visible page — no schema spam
- [ ] `@id` references consistent (Person, WebSite)
- [ ] Module-specific schema applied per `04_SEO_STRATEGY.md` §28

**Required schema by page:**

| Page                  | Required Schema                                  |
| --------------------- | ------------------------------------------------ |
| Dashboard             | WebSite, SearchAction, Organization              |
| Product Registry      | CollectionPage, ItemList, BreadcrumbList         |
| Engineering Record    | TechArticle, SoftwareApplication, BreadcrumbList |
| Engineering Note      | TechArticle, BlogPosting, BreadcrumbList         |
| Engineer Profile      | Person, ProfilePage, BreadcrumbList              |
| Communication Module  | ContactPage, BreadcrumbList                      |
| Engineering Protocols | WebPage, BreadcrumbList, ItemList                |

- [ ] structured data validated — zero critical errors
- [ ] rich snippets validated — eligible types confirmed in Rich Results Test

### B9. Breadcrumbs 🔴

- [ ] Visible breadcrumb in System Header (except Dashboard)
- [ ] Uses ELS module names — not URL segments
- [ ] `<nav aria-label="Module Path">` with ordered list
- [ ] Current page not linked
- [ ] Matching BreadcrumbList JSON-LD
- [ ] Mobile: `← Parent Module` back affordance present

---

## Section C — HTML, Accessibility, and Semantics

### C1. Valid HTML 🔴

- [ ] W3C HTML validator — zero errors on each page type
- [ ] No unclosed tags
- [ ] No duplicate IDs
- [ ] `<!DOCTYPE html>` present
- [ ] Character encoding declared

### C2. Heading Hierarchy 🔴

- [ ] Exactly one `<h1>` per page — inside `<main>` only
- [ ] No skipped heading levels (h1 → h2 → h3)
- [ ] `MODULE` micro-label is NOT an heading element
- [ ] no duplicate H1 across page
- [ ] Section headings match TOC anchor IDs

### C3. Semantic Landmarks 🔴

- [ ] `<header role="banner">` — System Header
- [ ] `<nav aria-label="Module Navigation">` — sidebar
- [ ] `<main id="main-content">` — single main landmark
- [ ] `<footer role="contentinfo">` — Status Bar
- [ ] `<article>` on Engineering Records and Notes
- [ ] `<time datetime="">` on all visible dates

### C4. ARIA and Keyboard 🔴

- [ ] Skip to content link present and functional
- [ ] ARIA labels on icon-only buttons
- [ ] Focus ring visible — amber, 2px offset
- [ ] Full keyboard navigation — no mouse-only traps
- [ ] Command Palette keyboard accessible
- [ ] Terminal keyboard accessible
- [ ] Modal focus trap and Esc dismiss
- [ ] `aria-label` on Status Dot: `{status label}, system status`
- [ ] Screen reader announces module on navigation
- [ ] `prefers-reduced-motion` respected — animations disabled

### C5. Image Optimization 🔴

- [ ] All images have `alt` attribute
- [ ] Decorative images: `alt=""`
- [ ] ALT text follows ELS rules (`04_SEO_STRATEGY.md` §19)
- [ ] image dimensions specified — `width` and `height` on all `<img>`
- [ ] lazy images — `loading="lazy"` on below-fold images
- [ ] First visible image NOT lazy-loaded
- [ ] AVIF/WebP with fallback format
- [ ] Interface Record screenshots < 200 KB compressed
- [ ] OG images < 300 KB
- [ ] No CLS from image loading

### C6. Core Web Vitals 🔴

- [ ] no CLS — CLS < 0.05 on all page types
- [ ] LCP < 1.5s
- [ ] INP < 100ms
- [ ] FCP < 1.0s
- [ ] Lighthouse Performance > 95 on:
  - [ ] Dashboard (`/{locale}`)
  - [ ] Product Registry
  - [ ] One Engineering Record
  - [ ] One Engineering Note
  - [ ] Engineer Profile
  - [ ] Communication Module
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 95
- [ ] Lighthouse SEO > 95

### C7. JavaScript and Console 🔴

- [ ] no console errors on any primary module
- [ ] no console warnings related to hydration mismatch
- [ ] No uncaught promise rejections on page load
- [ ] Terminal and Command Palette — no errors on open/close
- [ ] i18n locale switch — no errors

---

## Section D — Content and Link Integrity

### D1. Internal Links 🔴

- [ ] no broken links — build-time link checker passes
- [ ] no orphan pages — all published content reachable within 3 clicks
- [ ] Every Engineering Record linked from Product Registry
- [ ] Every Engineering Note linked from Knowledge Base
- [ ] Related content links populated in frontmatter
- [ ] Prev/Next project chain intact (where configured)
- [ ] Anchor hash links resolve to correct heading IDs

### D2. Content Quality 🔴

- [ ] All published content has required frontmatter (`05_CONTENT_ARCHITECTURE.md` §14)
- [ ] Unique slug — no duplicates
- [ ] EN locale present for all published content
- [ ] ELS lint pass — no forbidden words in title/summary
- [ ] Answer-first opening paragraph on Records and Notes
- [ ] No placeholder or lorem ipsum text in production

### D3. Duplicate Content 🔴

- [ ] No duplicate titles
- [ ] No duplicate meta descriptions
- [ ] No duplicate canonical URLs pointing to different content
- [ ] hreflang reciprocal — no one-way alternates
- [ ] Filter URLs canonical to base (unless intentionally unique)

---

## Section E — Webmaster Tools Readiness

### E1. Google Search Console 🔴

- [ ] GSC ready — domain or URL prefix property verified
- [ ] Sitemap submitted and status: Success
- [ ] No critical coverage errors
- [ ] Core Web Vitals report — all URLs green or no data yet
- [ ] Mobile usability — no errors
- [ ] Structured data enhancements — no critical errors
- [ ] Page indexing — spot-check key URLs: Request indexing
- [ ] page indexed successfully — verify Dashboard, Profile, one Record within 7 days post-launch

### E2. Bing Webmaster Tools 🟡

- [ ] Bing ready — site verified
- [ ] Sitemap submitted
- [ ] URL inspection — no errors on key pages
- [ ] IndexNow configured (optional — ping on publish)

### E3. Yandex Webmaster 🟡

- [ ] Yandex ready — site verified
- [ ] Sitemap submitted
- [ ] Region set: Uzbekistan
- [ ] hreflang validated for `ru` locale
- [ ] Turbo pages disabled
- [ ] Site quality — no critical warnings

---

## Section F — AI and LLM Indexing

> Full specification: `07_AI_INDEXING.md`. Summary checks here:

- [ ] `llms.txt` published and accurate
- [ ] Person schema with accurate `knowsAbout` and `sameAs`
- [ ] Pillar pages identified and optimized (Dashboard, Profile, ERP Record)
- [ ] Engineering Notes follow AI-readable structure
- [ ] FAQ schema only where genuine FAQ content exists
- [ ] Term glossary available for LLM context
- [ ] First paragraph of each Record/Note is self-contained

---

## Section G — i18n Release Checks

- [ ] All three locales render without broken layout
- [ ] UI strings translated in `/messages/{locale}.json`
- [ ] hreflang only includes locales with published body content
- [ ] `<html lang="">` matches actual content language
- [ ] Language switcher updates URL and persists preference
- [ ] RSS feeds separated by locale
- [ ] Sitemap includes all published locale variants
- [ ] language alternates — complete and reciprocal

---

## Section H — Post-Deploy Verification (Within 7 Days)

- [ ] Google: `site:{domain}` returns indexed pages
- [ ] Google Search Console — Coverage → Valid pages increasing
- [ ] Bing: site search returns indexed pages
- [ ] Yandex: site search returns indexed pages
- [ ] Rich Results Test — all page types pass
- [ ] PageSpeed Insights field data — no poor URLs
- [ ] No 404 spikes in server logs
- [ ] No crawl errors in GSC
- [ ] OG debugger (Facebook/LinkedIn) — images render correctly
- [ ] Twitter Card Validator — cards render correctly
- [ ] AI spot-check: query `Codev_Tim` / `Timur ERP developer` in Perplexity — site cited or surfaced

---

## Quick Reference — Minimum Release Gate

**Release is blocked unless ALL of the following pass:**

```
🔴 GLOBAL
□ HTTPS enforced
□ robots.txt valid
□ sitemap.xml submitted
□ favicon + manifest
□ theme-color #07090F
□ preload fonts
□ compression enabled
□ cache headers set
□ no console errors

🔴 EVERY INDEXABLE PAGE
□ unique title
□ unique description
□ canonical
□ og:image (1200×630)
□ twitter:image
□ schema.org JSON-LD
□ breadcrumbs (except Dashboard)
□ hreflang alternates
□ one H1 only
□ valid HTML
□ ARIA labels on icon buttons
□ image dimensions specified
□ lazy images (below fold)

🔴 PERFORMANCE
□ no CLS (< 0.05)
□ Lighthouse > 95 (Performance, SEO, Accessibility)
□ LCP < 1.5s

🔴 INTEGRITY
□ no broken links
□ no orphan pages
□ structured data validated
□ rich snippets validated

🔴 WEBMASTER
□ GSC ready + sitemap submitted
□ Bing ready + sitemap submitted
□ Yandex ready + sitemap submitted

🔴 POST-LAUNCH (7 days)
□ page indexed successfully — key URLs in GSC
```

---

## Release Sign-Off

```
Release version:   v___________
Production URL:    ___________
Date:              ___________
Checked by:        Timur

Global (A):        ___ / ___ pass
Metadata (B):      ___ / ___ pass
HTML/A11y (C):     ___ / ___ pass
Content (D):       ___ / ___ pass
Webmaster (E):     ___ / ___ pass
AI Indexing (F):   ___ / ___ pass
i18n (G):          ___ / ___ pass

Critical failures: ___________
Approved for release:  YES / NO
```

---

## Document Relationships

```
04_SEO_STRATEGY.md         → What to implement (specification)
06_SEO_CHECKLIST.md        → How to verify before release (this document)
07_AI_INDEXING.md          → AI/LLM indexing strategy
05_CONTENT_ARCHITECTURE.md → Content requirements for D2 checks
08_TECH_STACK.md           → Implementation stack reference
```

---

_End of canonical specification. Update checklist when `04_SEO_STRATEGY.md` or `07_AI_INDEXING.md` changes._
