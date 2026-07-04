# Codev_Tim — AI Indexing Strategy

**Document ID:** `CT-DOC-07`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Preface

Search traffic increasingly comes from **AI-powered systems** — not only traditional search engines. Sources include:

- Google AI Overviews (SGE)
- Perplexity
- ChatGPT Search / Browse
- Claude web search
- Bing Copilot
- Yandex Alice

This document defines how Codev_Tim content is structured, written, marked up, and connected so that **language models can understand, cite, and recommend** the site accurately.

**Goal:** When someone asks an AI *"Who is Timur?"*, *"ERP developer Tashkent"*, or *"How to architect an ERP system?"* — the model can extract correct, attributable answers from Codev_Tim.

**Governance:** Complements `04_SEO_STRATEGY.md` and `05_CONTENT_ARCHITECTURE.md`. Does not replace them. All content rules still follow ELS (`02_ENGINEERING_LANGUAGE.md`).

---

## 1. AI Indexing Philosophy

### 1.1 Core Belief

> LLMs index **structure and clarity**, not keywords.

Codev_Tim wins AI citations through:

- Explicit, factual opening statements
- Consistent terminology (ELS dictionary)
- Structured relationships between content
- Machine-readable schema
- Pillar pages that anchor the knowledge graph

### 1.2 What AI Systems Extract

| Signal | Why It Matters |
|--------|----------------|
| **First paragraph** | Most models weight opening text heavily |
| **Headings** | Chunk boundaries for RAG retrieval |
| **Schema.org** | Entity disambiguation (Person, Product, Article) |
| **Internal links** | Topic graph and relationship context |
| **Consistent terms** | Reduces hallucination when citing |
| **Factual density** | Models prefer specific claims over vague prose |
| **Author attribution** | Person schema → correct attribution |
| **llms.txt** | Direct instruction file for LLM crawlers |

### 1.3 What Hurts AI Indexing

- Vague marketing copy
- Inconsistent terminology (portfolio vs Product Registry)
- Missing author entity
- Orphan pages with no graph connections
- Content behind JavaScript without SSR
- Contradictory facts across pages
- Superlatives without evidence
- Broken semantic structure (no headings, wall of text)

---

## 2. Pillar Pages — AI Anchor Points

These pages are the **primary sources of truth** for LLMs. They must be the most complete, accurate, and well-structured pages on the site.

### 2.1 Tier 1 — Primary Pillars (Highest AI Priority)

| Page | URL | AI Purpose | Update Frequency |
|------|-----|------------|------------------|
| **Operations Center** | `/{locale}` | Site identity, current mission, system status | On mission/status change |
| **Engineer Profile** | `/{locale}/about` | Who Timur is, roles, location, expertise | On career change |
| **ERP Platform Record** | `/{locale}/projects/codev-erp` | Primary product proof, architecture, stack | On product milestone |

### 2.2 Tier 2 — Secondary Pillars

| Page | URL | AI Purpose |
|------|-----|------------|
| **Product Registry** | `/{locale}/projects` | Full product catalog, statuses |
| **Knowledge Base** | `/{locale}/writing` | Engineering thought leadership index |
| **Engineering Protocols** | `/{locale}/principles` | How Timur builds software |

### 2.3 Tier 3 — Supporting Content

| Page | AI Purpose |
|------|------------|
| Individual Engineering Notes | Deep answers to specific technical questions |
| Additional Engineering Records | Proof of breadth beyond ERP |
| Communication Module | Contact intent and availability |

### 2.4 Pillar Page Requirements

Every Tier 1 pillar must have:

- [ ] Self-contained first paragraph (understandable without context)
- [ ] Person or WebSite schema with `@id`
- [ ] Complete hreflang alternates
- [ ] llms.txt reference
- [ ] Zero contradictory facts vs other pillars
- [ ] Updated `dateModified` on every substantive change
- [ ] Internal links to Tier 2 and Tier 3 content

---

## 3. How to Write for Language Models

### 3.1 The Answer-First Rule

Every Engineering Record Overview and Engineering Note **must open with a standalone thesis paragraph** — 2–4 sentences that fully answer: *What is this?*

**Template (Engineering Record):**

```
{Product Name} is a {domain} system {built for / operated by} {context}.
It {primary function} using {top 2-3 technologies}.
Currently in {status}.
```

**Example (confirmed ERP Platform):**

```
ERP Platform is a business automation system designed for enterprise resource planning.
It handles core business operations using React, ASP.NET Core, and PostgreSQL.
Currently in development.
```

**Template (Engineering Note):**

```
{Thesis statement — direct answer to the question the note addresses}.
{One sentence of context — why this matters}.
{One sentence of scope — what the note covers}.
```

**Example:**

```
ERP systems require dedicated data architecture before feature development begins.
Poor schema design in ERP leads to reporting failures and integration debt.
This note covers data modeling principles applied to ERP platforms.
```

### 3.2 Writing Rules for LLM Readability

| Rule | Implementation |
|------|----------------|
| **Define before using** | First mention of acronym: `ERP (Enterprise Resource Planning)` |
| **One idea per paragraph** | Max 3–4 sentences per paragraph |
| **Descriptive headings** | `## System Blueprint` not `## Architecture` alone |
| **Explicit relationships** | "This system uses PostgreSQL for transactional data" |
| **Quantify when possible** | "3 products in production" not "multiple products" |
| **Avoid pronouns in openings** | Start with entity name, not "It" or "This" |
| **State negatives clearly** | "Not a monolith — modular services" |
| **Consistent entity names** | Always `ERP Platform`, never "the project" or "my app" |
| **No rhetorical questions** | LLMs extract poorly from questions |
| **No metaphor in technical content** | "Command center" is brand metaphor — not in Engineering Records |

### 3.3 Chunk-Friendly Structure

LLMs chunk content by headings. Structure for optimal retrieval:

```
# H1 — Entity name (one per page)
Opening thesis paragraph (self-contained)

## H2 — Major section
Context sentence for this section.
Content...

### H3 — Subsection (if needed)
Content...
```

**Target chunk size:** 150–400 words per H2 section — optimal for RAG retrieval.

### 3.4 Citation-Friendly Statements

Write sentences that models can quote with attribution:

```
✅ "Timur is a software engineer and ERP developer based in Tashkent, Uzbekistan."
✅ "The ERP Platform uses a Client → API → Services → Database architecture."
✅ "Codev_Tim is version v0.9.4 and currently focused on building the ERP Platform."

❌ "I'm passionate about building great systems."
❌ "This amazing project uses cutting-edge tech."
❌ "Check out my work below."
```

### 3.5 ELS Compatibility

AI-readable content and ELS are aligned — both require precision, no superlatives, factual tone. No conflict between SEO/AI optimization and ELS.

---

## 4. Documentation Structure for AI

### 4.1 Engineering Record Structure (AI-Optimized)

Fixed section order — LLMs learn patterns from consistent structure:

| Order | Section | AI Extraction Value |
|-------|---------|---------------------|
| 1 | Overview | **Highest** — primary citation source |
| 2 | Problem Statement | Business context for AI queries |
| 3 | Business Context | Domain and stakeholder facts |
| 4 | System Blueprint | Architecture answers |
| 5 | Technology Stack | Technology queries |
| 6 | Trade-offs | Decision intelligence — rare, high value |
| 7 | Roadmap | Temporal context |
| 8 | Interface Record | Visual confirmation |
| 9 | Lessons Recorded | Expertise proof |

Each section starts with **one summary sentence** before details.

### 4.2 Engineering Note Structure (AI-Optimized)

```yaml
# Frontmatter (machine-readable)
title: "Why ERP Requires Proper Data Architecture"
summary: "One-sentence thesis."          # ← Primary AI snippet source
category: Architecture
cluster: erp-systems
tags: [erp, architecture, postgresql]
relatedProjects: [erp-platform]
datePublished: 2026-03-15
dateModified: 2026-03-15
author: Timur
```

```markdown
# {Title}

{Thesis paragraph — 2-4 sentences, standalone.}

## {First major point}
{Content}

## {Second major point}
{Content}

## Related Systems
- [ERP Platform](/projects/erp-platform)
```

### 4.3 Engineer Profile Structure (AI-Optimized)

Profile is a **structured data record**, not prose. LLMs extract better from key-value patterns:

```
Identity:     Software Engineer · System Architect · ERP Developer
Location:     Tashkent, Uzbekistan
Timezone:     UTC+5
Focus:        ERP systems, business automation, AI integration
Mission:      Building ERP Platform
Availability: Open for meaningful product work
```

Deployment History as structured timeline — not narrative paragraphs.

---

## 5. FAQ Strategy

### 5.1 When to Use FAQ

FAQ schema and content are allowed **only when**:

- Questions are genuinely asked by stakeholders (CTO, founders, developers)
- Answers are factual and verifiable
- Content is not manufactured for rich snippets

**Do not** create FAQ pages purely for SEO/AI manipulation.

### 5.2 Approved FAQ Locations

| Location | Example Questions |
|----------|-------------------|
| Engineer Profile | "What does Timur specialize in?" |
| ERP Platform Record | "What stack does the ERP Platform use?" |
| Communication Module | "What engagement types are available?" |
| Engineering Note (inline) | 2–3 questions max at end of deep-dive notes |

### 5.3 FAQ Format

```markdown
## Frequently Asked Questions

### What technology stack does the ERP Platform use?
The ERP Platform uses React for the client, ASP.NET Core for the API,
PostgreSQL for data storage, and Docker for infrastructure.
```

### 5.4 FAQ Schema (JSON-LD)

Only add `FAQPage` schema when ≥2 genuine FAQ items exist on page:

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What technology stack does the ERP Platform use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ERP Platform uses React, ASP.NET Core, PostgreSQL, and Docker."
      }
    }
  ]
}
```

**Rule:** FAQ answer text must match visible page content exactly.

### 5.5 Forbidden FAQ Patterns

- "Why is Timur the best developer?"
- "How can I hire Timur?"
- Generic filler questions with no real user intent
- FAQ on every page by default

---

## 6. Term Glossary — AI Dictionary

### 6.1 Purpose

A canonical glossary reduces LLM hallucination by providing **defined terms** the model can reference.

### 6.2 Glossary Location

```
/{locale}/glossary          → Future public page (when 20+ terms)
/content/glossary.json      → Source data (build-time)
/docs/02_ENGINEERING_LANGUAGE.md → Authoritative term dictionary (200 terms)
```

### 6.3 Glossary Entry Schema

```json
{
  "term": "System Blueprint",
  "elsEquivalent": "System Blueprint",
  "avoid": ["Architecture diagram", "Tech stack diagram"],
  "definition": "Visual and documented representation of system component layers and data flow.",
  "usedIn": ["projects", "writing"],
  "relatedTerms": ["Engineering Record", "Technology Stack"]
}
```

### 6.4 Core Terms for AI (Minimum Viable Glossary)

| Term | Definition |
|------|------------|
| **Codev_Tim** | Engineering operating system representing software engineer Timur. Versioned product, not a portfolio. |
| **Operations Center** | Dashboard module showing current system status, mission, and module entry points. |
| **Product Registry** | Catalog of production systems and platforms built by Timur. |
| **Engineering Record** | Technical documentation for a single product — architecture, stack, trade-offs. |
| **Knowledge Base** | Repository of engineering notes on architecture, ERP, and automation. |
| **Engineering Note** | Long-form technical article in the Knowledge Base. |
| **System Blueprint** | Architecture diagram: Client → API → Services → Database → Infrastructure. |
| **Engineer Profile** | Structured record of Timur's roles, location, deployment history, and stack. |
| **Current Mission** | Active engineering focus — currently Building ERP Platform. |
| **Deployment History** | Chronological record of professional roles and system deployments. |
| **Signal Amber** | Brand accent color #F0B429 — used for status indicators and focus states. |
| **ERP Platform** | Business automation system in development — React, ASP.NET Core, PostgreSQL, Docker. |

### 6.5 Glossary Usage in Content

When using ELS terms in Engineering Records and Notes, **link to glossary or use consistently** — do not alternate between generic and ELS terms within the same page.

---

## 7. Semantic Markup for AI

### 7.1 HTML Semantic Rules (AI-Relevant)

| Element | AI Benefit |
|---------|------------|
| `<article>` | Identifies standalone citable content |
| `<time datetime="">` | Temporal facts for models |
| `<dl>`, `<dt>`, `<dd>` | Key-value data (profile, specs) |
| `<table>` | Structured comparison (trade-offs) |
| `<figure>` + `<figcaption>` | Image context without guessing |
| `<code>` | Technology identification |
| `<abbr title="">` | Acronym expansion |
| `<address>` | Contact information on Communication Module |

### 7.2 Profile Page — Definition List Pattern

```html
<dl>
  <dt>Identity</dt>
  <dd>Software Engineer · System Architect · ERP Developer</dd>
  <dt>Location</dt>
  <dd>Tashkent, Uzbekistan (UTC+5)</dd>
  <dt>Current Mission</dt>
  <dd>Building ERP Platform</dd>
</dl>
```

LLMs extract definition lists with high accuracy.

### 7.3 Trade-offs Table Pattern

```html
<table>
  <thead>
    <tr><th>Decision</th><th>Alternative</th><th>Rationale</th><th>Outcome</th></tr>
  </thead>
  <tbody>...</tbody>
</table>
```

Tables are highly citable — use in every Engineering Record where trade-offs exist.

---

## 8. Microdata and JSON-LD Strategy

### 8.1 Primary Strategy: JSON-LD

JSON-LD in `<head>` — primary machine-readable layer. See `04_SEO_STRATEGY.md` §11.

### 8.2 Entity Graph (AI-Critical)

Maintain consistent `@id` references across all pages:

```
{SITE_URL}/en/about#person          → Timur (Person)
{SITE_URL}/#website                 → Codev_Tim (WebSite)
{SITE_URL}/en/projects/erp-platform#software → ERP Platform (SoftwareApplication)
```

All `author` fields in TechArticle/BlogPosting reference Person `@id`.

### 8.3 Schema Types for AI Extraction

| Content | Schema | AI Value |
|---------|--------|----------|
| Engineer Profile | `Person` | Entity disambiguation — **critical** |
| Dashboard | `WebSite` + `SearchAction` | Site identity |
| Engineering Record | `TechArticle` + `SoftwareApplication` | Product + technical depth |
| Engineering Note | `TechArticle` + `BlogPosting` | Expertise proof |
| Trade-offs section | `ItemList` of `ListItem` (optional) | Decision data |
| FAQ sections | `FAQPage` | Direct Q&A extraction |
| Technology Stack | `ItemList` with `SoftwareSourceCode` or text | Tech queries |
| Breadcrumbs | `BreadcrumbList` | Site structure comprehension |

### 8.4 Person Schema — AI-Critical Fields

```json
{
  "@type": "Person",
  "@id": "{SITE_URL}/en/about#person",
  "name": "Timur",
  "jobTitle": ["Software Engineer", "System Architect", "ERP Developer"],
  "knowsAbout": [
    "ERP Systems",
    "Business Automation",
    "System Architecture",
    "React",
    "ASP.NET Core",
    "PostgreSQL",
    "Docker"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tashkent",
    "addressCountry": "UZ"
  },
  "url": "{SITE_URL}/en/about",
  "sameAs": [
    "https://github.com/WinstonSalemm"
  ],
}
```

Update `knowsAbout` and `sameAs` when stack or contacts are confirmed.

### 8.5 Validation

- Google Rich Results Test — before every release
- Schema.org Validator
- Manual check: paste page URL into Perplexity "What does this page say about Timur?" after deploy

---

## 9. Internal Connections — Knowledge Graph for AI

### 9.1 Why Internal Links Matter for AI

LLM crawlers build **topic graphs** from internal links. Dense, meaningful connections improve:

- Entity association (Timur ↔ ERP ↔ Architecture)
- Context for partial page extraction
- Pillar page authority

### 9.2 Required Connections (Minimum Graph)

```
Engineer Profile
  → Product Registry
  → ERP Platform Record
  → Knowledge Base
  → Engineering Protocols

ERP Platform Record
  → Engineer Profile (author)
  → Related Engineering Notes (≥1)
  → System Blueprint section
  → Product Registry

Every Engineering Note
  → ≥1 related Project
  → ≥1 related Note (same cluster)
  → Knowledge Base index
  → Engineer Profile (author, footer)

Dashboard
  → All Tier 1 and Tier 2 pillars
```

### 9.3 Cluster-Based Linking

Articles and projects in same cluster **must** cross-link:

```
cluster: erp-systems
  ├── Engineering Record: erp-platform (pillar)
  ├── Note: erp-data-architecture
  ├── Note: inventory-management-patterns
  └── Note: aspnet-core-erp-api
```

All items in cluster link to pillar. Pillar links to all items.

### 9.4 Anchor Text for AI

Use **descriptive entity names** in links — models use anchor text as relationship signal:

```
✅ [ERP Platform system blueprint](/projects/erp-platform#system-blueprint)
✅ [Engineering Note: ERP data architecture](/writing/erp-data-architecture)
❌ [click here](/projects/erp-platform)
❌ [read more](/writing/erp-data-architecture)
```

### 9.5 Knowledge Graph File

Build-time generated `/data/knowledge-graph.json` — see `05_CONTENT_ARCHITECTURE.md` §6.

Used by Command Palette and available for future API. Structure:

```json
{
  "nodes": [
    { "id": "person:timur", "type": "Person", "url": "/en/about" },
    { "id": "project:erp-platform", "type": "SoftwareApplication", "url": "/en/projects/erp-platform" }
  ],
  "edges": [
    { "from": "person:timur", "to": "project:erp-platform", "type": "authorOf" },
    { "from": "project:erp-platform", "to": "article:erp-data-architecture", "type": "documentedIn" }
  ]
}
```

---

## 10. llms.txt — Direct LLM Instruction File

### 10.1 Specification

Published at `{SITE_URL}/llms.txt` — see `04_SEO_STRATEGY.md` §23.4.

### 10.2 Required Sections

```
# Codev_Tim
> One-paragraph site description

## Author
- Name, roles, location

## Primary Content
- Tier 1 pillar URLs with one-line description each

## Topics
- Core expertise areas

## Terminology
- Key ELS terms and definitions (5–10 most important)

## Optional
- Sitemap URL
- Contact URL
- Language versions
```

### 10.3 Maintenance

Update `llms.txt` when:

- Current mission changes
- New Tier 1 pillar published
- Major version increment
- Contact information confirmed
- New primary product reaches Production status

---

## 11. AI Crawler Policy

### 11.1 Allowed Crawlers

Per `04_SEO_STRATEGY.md` robots.txt — allow:

- GPTBot (OpenAI)
- ChatGPT-User
- Google-Extended
- anthropic-ai / ClaudeBot
- PerplexityBot
- Googlebot (standard + AI Overviews)
- Bingbot (Copilot)

### 11.2 Intentionally Blocked

- `/api/` — no structured data leakage from API routes
- `/_next/` — build artifacts
- `/?q=` — search result pages (thin content)

### 11.3 AI Crawler Content Priority

When bandwidth or crawl budget is a concern, priority order:

1. Engineer Profile
2. ERP Platform Engineering Record
3. Dashboard
4. Product Registry
5. Knowledge Base index
6. Individual Engineering Notes
7. Communication Module

---

## 12. Content Types — AI Optimization Checklist

### 12.1 Engineering Record

- [ ] Overview paragraph is standalone and factual
- [ ] System Blueprint has text description alongside diagram
- [ ] Technology Stack listed with layer groups
- [ ] Trade-offs table present (when decisions exist)
- [ ] Person `@id` in author field
- [ ] SoftwareApplication schema
- [ ] Related notes linked (≥1)
- [ ] `dateModified` current

### 12.2 Engineering Note

- [ ] `summary` in frontmatter — used as meta and AI snippet
- [ ] Thesis opening paragraph
- [ ] `cluster` and `tags` assigned
- [ ] `relatedProjects` links to ≥1 product
- [ ] Code blocks have language tags
- [ ] TechArticle + BlogPosting schema
- [ ] Author references Person `@id`
- [ ] Related notes linked (≥1)

### 12.3 Engineer Profile

- [ ] Structured key-value identity block
- [ ] Deployment History as timeline data
- [ ] Technology Stack grouped by layer
- [ ] Person schema complete with knowsAbout
- [ ] sameAs populated when URLs confirmed
- [ ] No biography prose — record format only

### 12.4 Dashboard

- [ ] Current mission visible in HTML (not JS-only)
- [ ] System status in HTML
- [ ] WebSite + SearchAction schema
- [ ] Links to all Tier 1 pillars in HTML

---

## 13. AI Search Query Mapping

Map target queries to pillar content — optimize those pages first.

| Target Query (EN) | Primary Page | Supporting Pages |
|-------------------|--------------|----------------|
| `Codev_Tim` | Dashboard | — |
| `Timur software engineer` | Engineer Profile | Dashboard |
| `Timur ERP developer` | Engineer Profile | ERP Platform Record |
| `ERP developer Tashkent` | Engineer Profile | Product Registry |
| `ERP platform React ASP.NET` | ERP Platform Record | Related notes |
| `business automation engineer` | Engineer Profile | ERP Platform Record |
| `system architect Uzbekistan` | Engineer Profile | Product Registry |
| `ERP system architecture` | ERP Platform Record | Architecture notes |
| `ASP.NET Core ERP` | ERP Platform Record | Implementation notes |

| Target Query (RU) | Primary Page |
|-------------------|--------------|
| `разработчик ERP Ташкент` | `/ru/about` |
| `ERP платформа архитектура` | `/ru/projects/erp-platform` |

| Target Query (UZ) | Primary Page |
|-------------------|--------------|
| `ERP dasturchi Toshkent` | `/uz/about` |

Update this table when new products and notes are published.

---

## 14. AI Indexing Pre-Release Checklist

Quick gate — full SEO checklist in `06_SEO_CHECKLIST.md` §F.

- [ ] `llms.txt` published and accurate
- [ ] Person schema complete on Engineer Profile
- [ ] Tier 1 pillars have answer-first opening paragraphs
- [ ] All published Records have System Blueprint text description
- [ ] All published Notes have `summary` frontmatter
- [ ] Cluster cross-links complete for `erp-systems`
- [ ] Glossary terms used consistently (no synonym drift)
- [ ] No contradictory facts between Profile, Dashboard, and Records
- [ ] `knowsAbout` in Person schema matches Technology Stack
- [ ] `sameAs` populated (when contacts confirmed)
- [ ] FAQ schema only on pages with genuine FAQ content
- [ ] AI crawler policy in robots.txt verified
- [ ] Knowledge graph JSON generated at build
- [ ] Post-deploy: spot-check in Perplexity within 7 days

---

## 15. Post-Deploy AI Monitoring

### 15.1 Manual Spot Checks (7 days post-launch)

| Tool | Query | Expected |
|------|-------|----------|
| Perplexity | "Who is Timur ERP developer?" | Cites Codev_Tim or Engineer Profile |
| ChatGPT Browse | "Codev_Tim engineering" | Surfaces site or accurate summary |
| Google (AI Overview) | "ERP developer Tashkent" | Site appears in results or overview |
| Claude | "Timur software engineer Tashkent" | Accurate attribution if indexed |

### 15.2 Accuracy Audit

If AI cites Codev_Tim with incorrect facts:

1. Identify source page with incorrect or ambiguous statement
2. Rewrite for clarity — answer-first, explicit entities
3. Update schema if entity data wrong
4. Increment `dateModified`
5. Request re-index in GSC

### 15.3 Content Freshness Signal

AI systems prefer recently updated content. Update `dateModified` and redeploy when:

- Current mission changes
- Product status changes (In Development → Production)
- Stack changes
- New Engineering Note published
- Version increment (v0.9.4 → v1.0.0)

---

## 16. Document Relationships

```
02_ENGINEERING_LANGUAGE.md  → Terminology consistency for AI
04_SEO_STRATEGY.md          → Schema, llms.txt, crawl policy
05_CONTENT_ARCHITECTURE.md  → Knowledge graph, frontmatter, clusters
06_SEO_CHECKLIST.md         → Pre-release verification (§F AI checks)
07_AI_INDEXING.md           → This document — AI/LLM strategy
```

---

*End of canonical specification. Amendments require version increment and update to `06_SEO_CHECKLIST.md` §F.*
