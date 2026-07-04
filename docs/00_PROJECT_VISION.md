# Codev_Tim — Project Vision

**Document ID:** `CT-DOC-00`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-04

---

## Canonical Project Summary

**Codev_Tim** is a premium digital product that represents a software engineer as an engineering operating system — not a personal portfolio, not a freelancer website, not a marketing landing page.

The visitor enters an engineering workspace and navigates modules inside a real product. The experience should communicate precision, engineering thinking, reliability, and product maturity.

**Project name:** Codev_Tim  
**Current version:** v0.9.4  
**Current mission:** Building Codev ERP  
**Location:** Tashkent  
**Timezone:** UTC+5  
**System status:** Operational

---

## 1. Why Codev_Tim Exists

### 1.1 Problem Statement

Traditional developer portfolios fail to represent engineers who design and build complete software systems. They optimize for hiring funnels, visual showcase, and personal branding — not for demonstrating product thinking, architectural depth, or operational reliability.

Codev_Tim exists to solve this positioning gap.

### 1.2 Purpose

Codev_Tim is a **software product about its creator**. It communicates that the engineer behind it:

- Does not merely write code
- Designs and builds complete software systems
- Thinks in products, architecture, and long-term reliability
- Builds systems that companies can depend on

### 1.3 Reference Metaphor

> Imagine Stripe built a dashboard that tells the story of the engineer behind it.

The visitor should finish browsing with exactly this feeling:

> *"This is not someone looking for work. This is someone who builds products that companies depend on."*

And upon leaving:

> *"I've just explored someone's engineering operating system."*

They should remember the **feeling**, not the colors.

---

## 2. Product Philosophy

### 2.1 Core Belief

Everything should look intentional. Nothing decorative. Nothing exists without purpose.

Every spacing decision should feel engineered. Every animation should communicate hierarchy. Every component should belong to the same design language.

### 2.2 The Product-Not-Portfolio Principle

Codev_Tim is **not**:

- A freelancer website
- A Dribbble portfolio
- A gaming website
- A cyberpunk landing page
- A template portfolio
- A neon showcase
- A logo gallery
- A social media profile

Codev_Tim **is**:

- A software product about its creator
- An operating system metaphor
- An admin dashboard / command center / product control panel
- A module-based engineering workspace

### 2.3 Module Philosophy

Instead of traditional website sections, Codev_Tim is organized as **modules**. Every page feels like another module inside the engineer's own software.

Each module answers exactly one question:

| Module | Question |
|--------|----------|
| Dashboard (Operations Center) | What is happening now? |
| Product Registry | What has been built? |
| Project Details (Engineering Record) | How was it engineered? |
| Engineer Profile | Who is behind these systems? |
| Knowledge Base | How does this engineer think? |
| Communication Module | How do we start building together? |
| Missing Module (404) | Where did navigation fail? |

### 2.4 Soul Through Behavior

The website has a soul — not through illustrations, gradients, or decorative animations — but through **behavior**:

- Every click feels intentional
- Every transition communicates context
- Every hover explains hierarchy
- Every loading state feels like software initializing
- The system remembers, reacts, and persists state

---

## 3. Long-Term Vision

### 3.1 Product Evolution

Codev_Tim is versioned (currently v0.9.4) and treated as a living product — not a static portfolio. It evolves as the engineer's systems, mission, and knowledge base grow.

### 3.2 Scalability Dimensions

| Dimension | Vision |
|-----------|--------|
| **Content** | Product registry, engineering records, and knowledge base expand over time |
| **Locales** | Full trilingual support: English, Russian, Uzbek |
| **Modules** | New modules may be added following the same OS metaphor and ELS |
| **Integrations** | Terminal, command palette, activity log as extensible system interfaces |
| **Documentation** | This `/docs` knowledge base remains the single source of truth for all future work |

### 3.3 Future Module Candidates (Not Yet Confirmed for Implementation)

The following were discussed as layout concepts and may be implemented when content exists:

- Colophon (design and build notes)

> **Implementation roadmap:** see `10_IMPLEMENTATION_PLAN.md` — six phases from Foundation to Polish.

---

## 4. Audience

### 4.1 Who Codev_Tim Is For

| Audience | Primary Need | Primary Modules |
|----------|--------------|-----------------|
| **CTO** | Architectural depth, trade-offs, reliability | Engineering Records, System Blueprint |
| **Startup founders / business owners** | Product thinking, business context, ERP/automation capability | Operations Center, Product Registry |
| **HR** | Professional clarity, structured profile | Engineer Profile, Deployment History |
| **Developers** | Technical credibility, principles, terminal | System Console, Knowledge Base, Technology Stack |

### 4.2 Who Codev_Tim Is NOT For

- Recruiters seeking a generic CV/portfolio format
- Clients looking for cheap freelance labor
- Visitors expecting visual showcase or Dribbble-style presentation
- Users seeking entertainment, gaming aesthetics, or cyberpunk visuals

### 4.3 Positioning Statement

> Software engineer who designs, architects, and ships production systems — ERP platforms, business automation, and AI-augmented tooling.

---

## 5. Design Goals

### 5.1 Visual Identity

| Property | Value |
|----------|-------|
| Background | `#07090F` |
| Accent (Signal Amber) | `#F0B429` |
| Style | Very dark UI, soft borders, almost no shadows, large whitespace, excellent typography |

### 5.2 Visual Language Name

**Obsidian Console** — internal design language name. Original language inspired by Vercel, Linear, Stripe, Raycast, and Apple. None of them are copied.

### 5.3 Design Characteristics

- Premium, professional, modern, high-end
- Minimalistic, precise, engineering atmosphere
- No cyberpunk, no excessive glow, no flashy gradients
- Feels like opening the admin panel of a premium SaaS product

### 5.4 Signature Elements

- **Signal Amber** — accent lines, dots, badges, focus states (≤4% screen area)
- **Console Frame** — hairline borders, subtle padding
- **Module Header** — label + title + meta row
- **Status Dot** — operational indicator with subtle pulse
- **Data Row** — key-value pairs, monospace values
- **Flow Diagram** — vertical architecture stack with connectors
- **Version Tag** — semver badge (e.g., v0.9.4)

### 5.5 Surface System

```
Layer 0  #07090F   Base — page background
Layer 1  #0A0D14   Recessed — sidebar, terminal bg
Layer 2  #0E1119   Surface — cards, panels
Layer 3  #131720   Elevated — hover, active, dropdown
Layer 4  #181D28   Overlay — modals, mobile nav
```

Depth is achieved through layers and border brightening — not shadows.

### 5.6 Layout Model

**Application Shell** (persistent):

- System Header (56px)
- Module Navigation sidebar (240px desktop, collapsible)
- Content Viewport (module area)
- Status Bar (32px, always visible)
- System Console (terminal, toggleable)
- Command Palette (⌘K)

The shell never disappears during navigation. Only the content viewport changes — reinforcing the OS metaphor.

---

## 6. Engineering Goals

### 6.1 Architecture Goals

- Desktop-first, perfect tablet, excellent mobile — no behavioral compromises
- Semantic HTML, keyboard navigation, WCAG AA contrast
- Lighthouse Performance score >95
- Fast, minimal unnecessary libraries
- Static generation where possible
- SVG inline for architecture diagrams

### 6.2 Interaction Goals

- Navigation feels instant (module switch ≤240ms to interactive)
- Opening a page feels like opening a module
- Closing a modal feels like dismissing a system window
- Loading feels like software initializing — not website loading
- Scroll never feels heavy — no parallax, no scroll-jacking
- Everything reacts with subtle confidence

### 6.3 Functional Systems

| System | Purpose |
|--------|---------|
| **System Console (Terminal)** | Real, interactive — not decorative. Commands: help, projects, about, stack, contact, clear, version, whoami, open, status, mission, lang |
| **Command Palette** | ⌘K search across modules, products, notes, commands. Remembers recent actions |
| **Status Bar** | Always visible: status, focus, availability, timezone, version |
| **Activity Log** | Timestamped system events on dashboard |
| **i18n** | English, Russian, Uzbek — native language switching |

### 6.4 Implementation Stack (Codev_Tim Site — Confirmed)

See `08_TECH_STACK.md` for full specification.

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + CSS Variables |
| Animation | Framer Motion |
| i18n | next-intl (EN, RU, UZ) |
| Content | MDX + JSON |
| Deployment | Vercel |
| Fonts | Geist Sans, Geist Mono |

### 6.5 Technology Stack (Featured Product — Codev ERP)

Codev ERP — confirmed stack:

- React
- ASP.NET Core
- PostgreSQL
- Docker

Technology Stack on the site is grouped by layer (not logo soup):

- Frontend
- Backend
- Infrastructure
- Cloud
- AI
- Tools

> Full stack specification: `08_TECH_STACK.md`

---

## 7. Emotional Goals

| Goal | How Achieved |
|------|--------------|
| **Trust** | Status indicators, version badges, architecture diagrams, trade-offs documentation |
| **Precision** | Engineered spacing, ELS language, data-row UI patterns |
| **Confidence** | Calm tone, no desperation, no sales language, no superlatives |
| **Depth** | Engineering records with System Blueprint, not thumbnail galleries |
| **Aliveness** | Status pulse, activity log, terminal, command history, state persistence — never distracting |
| **Immersion** | Persistent shell, module transitions, boot sequence, system language throughout |

---

## 8. Success Criteria

### 8.1 Visitor Outcome Test

After browsing, the visitor should think:

> *"This person doesn't just write code. He designs and builds complete software systems."*

### 8.2 Experience Quality Checklist

- [ ] Feels like a module switch, not a page load
- [ ] Hover explains hierarchy
- [ ] Transitions communicate direction (peer vs drill-down)
- [ ] Loading feels like initialization
- [ ] Each module answers exactly one question
- [ ] Delight moments are functional, not decorative
- [ ] System remembers state (terminal, layout, recent actions)
- [ ] CTO finds it credible
- [ ] Developer wants to open the terminal
- [ ] Visitor remembers the feeling, not the colors

### 8.3 Language Test

Every sentence must pass:

> Could this exist inside Linear, Stripe, or Vercel?

If not — rewrite per `02_ENGINEERING_LANGUAGE.md`.

### 8.4 Anti-Success Signals

If a visitor says "nice portfolio" — the project has failed its positioning.

If a visitor says "what is this product?" and then understands it is an engineer represented as product — the project succeeds.

---

## 9. Non-Goals

Codev_Tim explicitly does **not** aim to:

- Maximize freelance client acquisition
- Display logo grids or skill progress bars
- Use emotional marketing copy or superlatives
- Include personal photo hero sections
- Embed social media feeds
- Use decorative animations (parallax, particles, glow, bounce)
- Compromise accessibility for aesthetics
- Add features without content confirmation
- Invent biographical or career data not confirmed by Timur

---

## 10. Decision Framework

When any future decision is required (design, copy, feature, architecture), apply this framework in order:

### 10.1 The Admin Panel Test

> Could this element exist in Linear settings, Vercel dashboard, or Stripe API docs?

If no — remove or redesign.

### 10.2 The ELS Test

> Does this text follow `02_ENGINEERING_LANGUAGE.md`?

If no — rewrite.

### 10.3 The Module Test

> Does this page answer exactly one question?

If no — split or restructure.

### 10.4 The Behavior Test

> Does this interaction communicate context and hierarchy?

If no — redesign the interaction, not add decoration.

### 10.5 The Confirmation Test

> Is this fact confirmed in canonical documentation or by Timur directly?

If no — do not publish. Ask first.

### 10.6 Priority Order

1. Canonical documentation (`/docs`)
2. Engineering Language System
3. Experience specification principles
4. Brand Bible
5. Timur's direct confirmation
6. Never: assumption, invention, placeholder

---

## 11. Canonical Module Registry

| Route | Internal Name | Module Identity | One Question |
|-------|---------------|-----------------|--------------|
| `/` | `dashboard` | Operations Center | What is happening now? |
| `/projects` | `projects` | Product Registry | What has been built? |
| `/projects/[slug]` | `project-doc` | Engineering Record | How was it engineered? |
| `/about` | `about` | Engineer Profile | Who is behind these systems? |
| `/principles` | `principles` | Engineering Protocols | How does this engineer build? |
| `/writing` | `writing` | Knowledge Base | How does this engineer think? |
| `/writing/[slug]` | `article` | Engineering Note | — |
| `/contact` | `contact` | Communication Module | How do we start building together? |
| `/404` | `error` | Missing Module | — |

---

## 12. Document Governance

This document and all `/docs` specifications are **immutable canonical references**. All future:

- Implementation (Cursor, Claude Code, GPT, Copilot)
- Copywriting
- UI/UX design
- Branding
- Content authoring

Must reference these documents. When information is missing — interview Timur. Never invent.

**Related documents:**

- `01_BRAND_BIBLE.md` — Brand DNA, values, principles, checklist
- `02_ENGINEERING_LANGUAGE.md` — Official language specification
- `03_ABOUT_TIMUR.md` — Engineer profile (confirmed facts only)
- `04_SEO_STRATEGY.md` — Technical SEO, metadata, structured data, hreflang
- `05_CONTENT_ARCHITECTURE.md` — Content hierarchy, schemas, publishing workflow
- `06_SEO_CHECKLIST.md` — Pre-release SEO verification checklist
- `07_AI_INDEXING.md` — AI/LLM indexing and citation strategy
- `08_TECH_STACK.md` — Technology stack and selection rules
- `10_IMPLEMENTATION_PLAN.md` — Build roadmap (6 phases)
- `11_DESIGN_TOKENS.md` — Design token specification
- `12_CONTENT_SCHEMA.md` — Content models and Zod validation
- `13_ARCHITECTURE_DECISIONS.md` — Architecture Decision Records
- `.cursor/rules.md` — AI agent engineering rules

---

*End of canonical specification.*
