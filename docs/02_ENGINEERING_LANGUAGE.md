# Codev_Tim — Engineering Language System (ELS)

**Document ID:** `CT-DOC-02`  
**Version:** 1.0.0  
**Status:** Canonical Specification — Immutable  
**Last Updated:** 2026-07-04

---

## Preface

The **Engineering Language System (ELS)** is the official language standard for the entire Codev_Tim ecosystem. This is not copywriting guidance. It is an **operational specification**: every word in the product must sound as if it belongs inside a premium software product.

**Applicability test:**

> Could this sentence exist inside Linear, Stripe, or Vercel?  
> If not — rewrite.

**Governance:** All pages, components, interactions, terminal responses, notifications, and future AI-generated content must conform to this document. When terminology is missing — interview Timur. Never invent.

---

## 1. Design Principles for Language

### 1.1 The Five Laws

| Law | Rule | Example |
|-----|------|---------|
| **Precision** | One word — one meaning. No synonyms for the same concept. | Always `Product Registry`, never `Projects / Work / Portfolio` |
| **Minimalism** | Remove everything without which the system loses meaning. | `Building Codev ERP` — not `Currently focused on building an innovative ERP platform` |
| **Technicality** | Software engineering terms, not marketing terms. | `Deployment History` — not `My Journey` |
| **Calm** | Neutral register. No exclamation. No urgency. | `Message queued.` — not `Thanks! We'll get back to you soon!` |
| **System-first** | UI speaks as the system, not as a person seeking attention. | `Engineer Profile` — not `About Me` |

### 1.2 Sentence Architecture

```
[Subject] + [State/Action] + [Object/Context]
```

| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `Current Mission: Building Codev ERP` | `I'm passionate about building ERP systems!` |
| `3 products in production` | `I've successfully delivered 3 amazing projects!` |
| `Module not found` | `Oops! This page doesn't exist` |
| `Message queued` | `Thank you so much for reaching out!` |

### 1.3 Person and Perspective

| Context | Voice |
|---------|-------|
| UI labels, status, errors, notifications | **System voice** — impersonal, third person |
| Engineering records, knowledge base | **Engineer voice** — first person allowed, factual only |
| System Console (terminal) | **Shell voice** — command/response protocol |
| Engineer Profile | **Record voice** — third person or neutral, data-oriented |

**Default:** system speaks. Human voice only in long-form documentation where engineering judgment is required.

### 1.4 Length Rules

| Element | Max Length |
|---------|------------|
| Module title | 3 words |
| Module description | 1 sentence, ≤12 words |
| Button label | 2 words (3 max) |
| Toast message | 1 sentence |
| Error message | 1 sentence + action |
| Empty state | 1 sentence + action |
| Card preview | 1 line, ≤60 characters |
| Status bar segment | ≤20 characters |

### 1.5 Punctuation Rules

- **No exclamation marks** in UI
- **Periods** at end of complete sentences in body text; omitted in labels, buttons, status segments
- **Colons** for key-value pairs: `Status: Operational`
- **Em dash** prohibited in UI; use colon or period
- **Quotes** only for article titles and literal command input
- **Ellipsis** only for in-progress states: `Initializing…`, `Queuing…`

### 1.6 Capitalization

| Type | Rule | Example |
|------|------|---------|
| Module names | Title Case | `Product Registry` |
| UI labels | Title Case | `Current Mission` |
| System labels | UPPERCASE (micro) | `MODULE`, `STATUS`, `STACK` |
| Status values | Title Case | `In Development` |
| Commands | lowercase | `open projects` |
| Technologies | Official casing | `PostgreSQL`, `ASP.NET Core` |
| Buttons | Title Case | `Open Project` |

---

## 2. Voice and Tone

### 2.1 Voice (Constant)

Codev_Tim speaks as a **well-maintained engineering platform**:

- Confident, not arrogant
- Technical, not jargon-heavy
- Direct, not blunt
- Professional, not corporate
- Calm, not cold

### 2.2 Tone by Context

| Context | Tone | Register |
|---------|------|----------|
| Operations Center | Monitoring | Operational briefing |
| Product Registry | Catalog | Inventory report |
| Engineering Record | Technical | Internal engineering documentation |
| Knowledge Base | Analytical | Engineering note |
| Engineer Profile | Factual | System record |
| Communication Module | Open, bounded | Service endpoint |
| System Exception | Diagnostic | Exception report |
| System Console | Protocol | Shell session |
| Notifications | Confirmatory | Operation log entry |

### 2.3 Emotional Boundaries

| Allowed | Forbidden |
|---------|-----------|
| Factual confidence | Enthusiasm |
| Neutral availability | Desperation |
| Technical precision | Self-promotion |
| Measured impact | Superlatives |
| Stated constraints | False humility |
| Clear boundaries | «Let's connect!» energy |

---

## 3. Vocabulary

### 3.1 Core Lexicon (Immutable)

| Concept | ELS Term |
|---------|----------|
| The website/product | `Codev_Tim` or `the system` |
| Home page | `Operations Center` / `Dashboard` |
| Projects listing | `Product Registry` |
| Single project | `Product` or `System` |
| Project page | `Engineering Record` |
| Blog | `Knowledge Base` |
| Single article | `Engineering Note` |
| About page | `Engineer Profile` |
| Contact page | `Communication Module` |
| Skills | `Technology Stack` |
| Resume/CV | `System Profile` |
| Work history | `Deployment History` |
| Current work | `Current Mission` |
| Architecture section | `System Blueprint` |
| Principles page | `Engineering Protocols` |
| 404 page | `Missing Module` |
| Navigation | `Module Navigation` |
| Page | `Module` |
| Section | `Panel` or `Zone` |
| Loading | `Initializing` |
| Loaded | `Module Ready` |
| Error | `System Exception` |
| Settings | `Configuration` |
| Search | `Query` |
| Filter | `Filter` |
| Visitor (internal) | `Operator` — never shown in UI |

### 3.2 Verb Registry

| Action | ELS Verb | Avoid |
|--------|----------|-------|
| Navigate to | `Open` | View, See, Check out |
| Read content | `Read` | Learn more, Discover |
| Submit form | `Send` / `Queue` | Submit, Contact us |
| Copy | `Copy` / `Synchronize` | — |
| Retry | `Retry Operation` | Try again |
| Return | `Return to` | Go back |
| Dismiss | `Dismiss` | Close, OK, Got it |
| Filter | `Apply Filter` | Filter by |
| Clear | `Clear Filter` / `Reset` | Clear all |
| Search | `Query` | Search (allowed in palette placeholder) |

### 3.3 Adjective Registry

**Allowed:** Production, Operational, Active, Current, Registered, Deployed, Maintained, Structured, Documented

**Forbidden:** Amazing, Awesome, Best, World-class, Cutting-edge, Innovative, Creative, Passionate, Unique, Incredible

### 3.4 Metric Language Pattern

```
[count] [noun] [state]

3 products in production
1 system in development
```

Never: `Over 6 years of experience!` unless confirmed and stated as fact without exclamation.

---

## 4. Naming Conventions

### 4.1 Module Naming

```
Pattern:  [Function] [Type]
Examples: Product Registry, Knowledge Base, Communication Module
```

Internal route keys remain lowercase technical: `projects`, `writing`, `contact`

### 4.2 Product Naming

```
Pattern:  [Product Name]
Subtitle: [Domain / Function]
Example:  Codev ERP — Business Automation
```

### 4.3 Section Naming (Engineering Records)

| Generic | ELS |
|---------|-----|
| Overview | `Overview` |
| Problem | `Problem Statement` |
| Solution | `Approach` |
| Results | `Outcome` |
| What I did | `Implementation` |
| Tech used | `Technology Stack` |
| What I learned | `Lessons Recorded` |
| Next steps | `Roadmap` |
| Screenshots | `Interface Record` |

### 4.4 Label Prefix System

Micro-labels use **UPPERCASE 12px** category prefixes:

```
MODULE          → page category
STATUS          → state indicator
STACK           → technology group
DOMAIN          → business domain
VERSION         → semver
FOCUS           → current mission
AVAILABILITY    → contact status
```

### 4.5 Version Format

```
v[major].[minor].[patch]

v0.9.4    → Codev_Tim system version
v2.1.0    → product version
```

Always lowercase `v`, always semver.

### 4.6 Timestamp Format

```
UI display:     Mar 2026 · 8 min read
Activity log:   14:32:08
Full record:    2026-03-15T14:32:08+05:00
Relative:       3 months ago (hover tooltip only)
```

---

## 5. UI Terminology

### 5.1 Shell Elements

| Element | ELS Name |
|---------|----------|
| Top bar | `System Header` |
| Side navigation | `Module Navigation` |
| Bottom bar | `Status Bar` |
| Search overlay | `Command Palette` |
| Terminal panel | `System Console` |
| Breadcrumb | `Module Path` |
| Page title area | `Module Header` |
| Main content | `Content Viewport` |
| Card | `Panel` or `[Type] Card` |
| Modal | `System Window` |
| Dropdown | `Selector` |
| Tooltip | `Context Note` |
| Badge | `Status Badge` / `Version Badge` |
| Tag | `Label` |
| Tab | `View` |
| Toggle | `Switch` |

### 5.2 Dashboard Panels

| Panel | Label |
|-------|-------|
| System status block | `System Overview` |
| Mission block | `Current Mission` |
| Module shortcuts | `[Name] Panel` |
| Recent events | `Activity Log` |
| Architecture preview | `System Blueprint Preview` |

### 5.3 Product Card Fields

```
[Product Name]                    [Status Badge]
[Domain Description]

Status       [value]
Stack        [technologies]
Blueprint    [Client → API → Services → Database → Infrastructure]

Open Project →
```

### 5.4 Engineering Record TOC Labels

```
Overview
Problem Statement
Business Context
System Blueprint
Technology Stack
Trade-offs
Roadmap
Interface Record
Lessons Recorded
```

---

## 6. Status Language

### 6.1 System Status (Codev_Tim site-level)

| State | Label | Dot Color |
|-------|-------|-----------|
| Normal operation | `Operational` | Green |
| Starting up | `Initializing` | Amber |
| Maintenance | `Maintenance` | Amber |
| Paused | `Paused` | Gray |
| Unavailable | `Offline` | Red |

**Status bar format:**

```
● Operational  │  Focus: Building Codev ERP  │  Availability: Open  │  UTC+5  │  v0.9.4
```

### 6.2 Product Status

| State | Label |
|-------|-------|
| Live system | `Production` |
| Active build | `In Development` |
| Early stage | `Experimental` |
| No longer active | `Archived` |
| Being phased out | `Deprecated` |
| Planned | `Scheduled` |

### 6.3 Health Status

| State | Label |
|-------|-------|
| Normal | `Healthy` |
| Attention needed | `Warning` |
| Failure | `Critical` |
| Running | `Online` |
| Not running | `Offline` |

### 6.4 Availability Status (Communication Module)

| State | Label |
|-------|-------|
| Accepting contact | `Open for interesting opportunities` |
| Accepting contact (long form) | `Open for meaningful product work` |
| Limited capacity | `Limited availability` |
| Not accepting | `Not accepting new engagements` |
| Response expectation | `Response within 6 hours` |

> **Canonical (confirmed by Timur):** Status Bar and site config use `Open for interesting opportunities`. Communication Module long-form may use `Open for meaningful product work` where space allows.

### 6.5 Process Status

| State | Label |
|-------|-------|
| Not started | `Pending` |
| Running | `In Progress` |
| Finished | `Completed` |
| Failed | `Failed` |
| Waiting | `Queued` |

---

## 7. Error Language

### 7.1 Error Message Structure

```
[Error Type]: [Description].
[Action instruction].
```

### 7.2 Error Catalog

| Code | Message | Action |
|------|---------|--------|
| 404 | `Module not found.` | `Return to Operations Center` |
| 404 detail | `Requested module does not exist: /path` | — |
| 500 | `System exception occurred.` | `Retry operation` |
| Network | `Connection interrupted.` | `Retry operation` |
| Timeout | `Operation timed out.` | `Retry operation` |
| Form: required | `Required field: [field name]` | — |
| Form: invalid email | `Invalid format: email address` | — |
| Form: send fail | `Communication module unavailable.` | `Retry operation` |
| Terminal: unknown cmd | `Command not found. Type 'help' for available commands.` | — |
| Terminal: invalid arg | `Invalid argument: [arg]. Usage: [usage]` | — |
| Palette: no results | `No matching modules or records.` | — |
| Copy fail | `Clipboard synchronization failed.` | `Retry operation` |
| Asset load | `Asset failed to load.` | `Retry operation` |
| Permission | `Operation not permitted.` | — |
| Session | `Session expired. Reload module.` | `Reload` |

### 7.3 Error Tone Rules

- State what happened
- State what to do
- No apology unless data loss occurred
- No humor, no emoji
- Never: `Oops`, `Uh oh`, `Something went wrong`

---

## 8. Empty State Language

### 8.1 Structure

```
[Context]: [State description].
[Action label]
```

### 8.2 Empty State Catalog

| Context | Message | Action |
|---------|---------|--------|
| No products (filtered) | `No registered products match current filter.` | `Clear Filter` |
| No products (total) | `Product registry contains no entries.` | — |
| No notes (filtered) | `No engineering notes match current query.` | `Clear Filter` |
| No notes (total) | `Knowledge base contains no published notes.` | — |
| No search results | `No matching modules or records.` | `Clear Query` |
| No activity | `No recent activity recorded.` | — |
| No timeline entries | `Deployment history not recorded.` | — |
| Console cleared | `Console cleared.` | — |
| Palette empty query | `Enter a query to search modules and records.` | — |
| No related notes | `No related engineering notes.` | — |
| Filter + query empty | `No entries match current filter and query.` | `Reset Filters` |

### 8.3 Forbidden Empty States

Never use: `Nothing here yet.`, `Oops.`, `No data.`, `It's empty.`

---

## 9. Documentation Language

### 9.1 Engineering Record — Section Templates

**Overview:**
```
[Product Name] is a [domain] system built for [context].
It handles [primary function] for [user type / scale].
Currently in [status].
```

**Problem Statement:**
```
[Organization / domain] required [capability].
Existing approach [constraint or failure mode].
System needed to [specific requirement].
```

**System Blueprint:** Describe data flow using canonical layer names: Client, Gateway, API, Services, Database, Infrastructure.

**Technology Stack:** Group by layer. State rationale where non-obvious.

**Trade-offs:** Format — Decision / Alternative / Rationale / Outcome.

**Lessons Recorded:** Numbered. What worked. What did not. What would change.

### 9.2 Knowledge Base (Engineering Notes)

- **Title:** Descriptive, not clickbait
- ✅ `Why ERP Requires Proper Data Architecture`
- ❌ `You Won't Believe This ERP Trick`
- **Opening:** Thesis statement — not greeting
- **Closing:** `Related notes:` with 1–2 links max

### 9.3 Engineer Profile Language

Not biography. System record format:

```
Identity          [roles]
Location          Tashkent, Uzbekistan
Timezone          UTC+5
Focus             [domains]
Deployment History [timeline]
Technology Stack   [grouped layers]
Availability       [status]
```

---

## 10. Terminal Language (System Console)

### 10.1 Shell Identity

```
Codev_Tim shell v0.9.4
Type 'help' to see available commands.
```

### 10.2 Command Registry

| Command | Args | Description |
|---------|------|-------------|
| `help` | — | List available commands |
| `projects` | — | List registered products |
| `open` | `[module]` | Navigate to module |
| `about` | — | Display engineer profile summary |
| `stack` | — | Display technology stack |
| `contact` | — | Display communication endpoints |
| `status` | — | Display system status |
| `mission` | — | Display current mission |
| `version` | — | Display system version |
| `whoami` | — | Display operator context |
| `search` | `[query]` | Search modules and records |
| `clear` | — | Clear console output |
| `lang` | `[en\|ru\|uz]` | Set system language |

### 10.3 Response Templates

**help:**
```
Available commands:

  help        List available commands
  projects    List registered products
  open        Navigate to module (e.g. open projects)
  about       Engineer profile summary
  stack       Technology stack
  contact     Communication endpoints
  status      System status
  mission     Current mission
  version     System version
  whoami      Operator context
  search      Search modules and records
  clear       Clear console
  lang        Set language (en, ru, uz)
```

**projects:**
```
Registered products:

  Codev ERP             In Development    Business Automation

[N] products registered. Type 'open projects' to navigate.
```

**status:**
```
System Status:     Operational
Current Mission:   Building Codev ERP
Version:           v0.9.4
Location:          Tashkent
Timezone:          UTC+5
Availability:      Open for interesting opportunities
```

**whoami:**
```
Operator context:
  Session active
  Language: [locale]
  Module: [current module]

You are viewing Codev_Tim — engineering operating system.
```

**version:**
```
Codev_Tim v0.9.4
Build: [date]
```

**unknown command:**
```
Command not found: [input]
Type 'help' for available commands.
```

**clear:**
```
Console cleared.
```

### 10.4 Terminal Tone Rules

- No ASCII art (v1.0)
- No hacker slang: «access granted», «mainframe», «firewall breached»
- No movie quotes
- Responses are structured data presented as text
- Prompt always: `> `

---

## 11. Command Palette Language

### 11.1 Identity

```
Placeholder:  Query modules, products, notes...
Header:       Command Palette
Shortcut:     ⌘K
```

### 11.2 Result Categories

```
Modules           → dashboard, projects, about, principles, writing, contact
Products          → [product names]
Engineering Notes → [article titles]
Commands          → open [module], stack, status, mission
Recent            → [last 5 actions]
```

### 11.3 Result Format

```
[Category label]
  [Icon]  [Title]                    [Meta]
```

### 11.4 Empty States

```
Enter a query to search modules and records.
No matching modules or records.
```

### 11.5 Command Syntax

```
open [module]         → open projects, open dashboard, open contact
open [product slug]   → open codev-erp
stack                 → navigate to stack section
status                → show status panel
mission               → show current mission
lang [code]           → switch language
```

---

## 12. Form Language

### 12.1 Communication Module Form

| Field | Label | Placeholder |
|-------|-------|-------------|
| Name | `Name` | `Your name` |
| Email | `Email Address` | `name@company.com` |
| Intent | `Engagement Type` | — |
| Message | `Message` | `Describe the system you are building.` |

**Engagement Type options:**
```
Product Build
Technical Advisory
Collaboration
Other
```

**Submit button states:**
```
Default:     Send Message
Processing:  Queuing…
Success:     Message Queued
```

**Validation:**
```
Required field: [field name]
Invalid format: email address
```

**Success toast:**
```
Message queued. Response within 6 hours.
```

**Failure toast:**
```
Communication module unavailable. Retry operation.
```

### 12.2 Form Tone Rules

- Labels are nouns, not sentences
- Placeholders suggest content, not tone
- Submit never: `Submit`, `Contact Us`, `Get in Touch`, `Let's Talk`

---

## 13. Notification Language

### 13.1 Toast Structure

```
[Operation result]. [Optional context].
```

### 13.2 Toast Catalog

| Event | Message |
|-------|---------|
| Message sent | `Message queued. Response within 6 hours.` |
| Copy success | `Copied to clipboard.` |
| Copy fail | `Clipboard synchronization failed. Retry operation.` |
| Filter applied | `Filter applied.` |
| Filter cleared | `Filter cleared.` |
| Language changed | `Language set to English.` |
| Module error | `Module failed to load. Retry operation.` |
| Configuration saved | `Configuration updated.` |
| Session restored | `Session restored.` |

### 13.3 Notification Rules

- Auto-dismiss: 3s (success), 5s (error)
- Errors persist until dismissed or retried
- No `Success!` or `Error!` prefixes
- No undo unless operation is reversible

---

## 14. System Messages

### 14.1 Boot and Load

```
Initializing…
Loading module…
Module ready.          (terminal only, optional)
Synchronizing…         (locale switch)
```

### 14.2 Session and Activity Log

```
Session restored.
Last session: [date]
Module accessed: [name]
Query executed: [term]
```

### 14.3 Module Path (Breadcrumb)

```
Operations Center
Operations Center / Product Registry
Operations Center / Product Registry / Codev ERP
Operations Center / Knowledge Base / [Note Title]
Operations Center / Engineer Profile
Operations Center / Communication Module
```

### 14.4 Back Button Labels

```
← Product Registry        (from engineering record, via registry)
← Operations Center       (from module via dashboard card)
← Knowledge Base          (from engineering note)
```

---

## 15. Accessibility Language

| Context | Language |
|---------|----------|
| Skip link | `Skip to content` |
| Menu button | `Open module navigation` |
| Close button | `Dismiss` |
| Command palette | `Command palette` |
| Terminal toggle | `Toggle system console` |
| Language switcher | `Select language` |
| Loading state | `Initializing module` — not «Loading…» alone |
| Focus announcement | `Navigated to [Module Identity Name]` |
| Copy button | `Copy to clipboard` |
| Copied state | `Copied` |
| Expand section | `Expand [section name]` |
| Collapse section | `Collapse [section name]` |
| Diagram node | `[Component name], [role]` |
| Status dot | `[Status label], system status` |
| Reduced motion | All motion instant; pulse disabled; counters show final value |

---

## 16. Button Language

| Generic (Forbidden) | ELS Alternative |
|---------------------|-----------------|
| Read More | `Read Note` / `Open Record` |
| View | `Open Project` / `Open Module` |
| Learn More | `Read Documentation` |
| Contact | `Send Message` |
| Get in Touch | `Open Communication Module` |
| See All | `View Registry` / `View All Notes` |
| Download CV | `Download System Profile` |
| Subscribe | Not used |
| Click Here | Specific action label |
| Go | `Open` / `Return to` |
| OK | `Dismiss` |
| Yes / No | Specific action: `Clear Filter` / `Dismiss` |

---

## 17. Success Messages

| Event | Message |
|-------|---------|
| Generic completion | `Operation completed.` |
| Message sent | `Message queued.` |
| Config saved | `Configuration updated.` |
| Copy success | `Clipboard synchronized.` |
| Build/deploy metaphor | `Build completed.` |

Never: `Success!`, `Done!`, `Thank you!`

---

## 18. Comprehensive Term Dictionary

| # | Generic Website Term | Engineering Language Equivalent |
|---|---------------------|-----------------------------------|
| 1 | Portfolio | Product Registry |
| 2 | My portfolio | Registered products |
| 3 | Projects | Product Registry / Products |
| 4 | Project | Product / System |
| 5 | Case study | Engineering Record |
| 6 | Case studies | Engineering Records |
| 7 | Work | Product Registry |
| 8 | My work | Registered products |
| 9 | Blog | Knowledge Base |
| 10 | Post | Engineering Note |
| 11 | Article | Engineering Note |
| 12 | About | Engineer Profile |
| 13 | About Me | Engineer Profile |
| 14 | Contact | Communication Module |
| 15 | Contact Me | Open Communication Module |
| 16 | Get in Touch | Send Message |
| 17 | Hire Me | Not used |
| 18 | Skills | Technology Stack |
| 19 | My skills | Technology Stack |
| 20 | Tech stack | Technology Stack |
| 21 | Resume | System Profile |
| 22 | CV | System Profile |
| 23 | Experience | Deployment History |
| 24 | Work history | Deployment History |
| 25 | Career | Deployment History |
| 26 | Timeline | Deployment History |
| 27 | Journey | Deployment History |
| 28 | My story | Not used |
| 29 | Bio | Engineer Profile |
| 30 | Biography | Engineer Profile |
| 31 | Homepage | Operations Center |
| 32 | Landing page | Operations Center |
| 33 | Hero section | System Overview |
| 34 | Current work | Current Mission |
| 35 | What I'm working on | Current Mission |
| 36 | Now | Current Mission |
| 37 | Loading | Initializing |
| 38 | Loading… | Initializing… |
| 39 | Please wait | Initializing… |
| 40 | Loaded | Module Ready |
| 41 | Error | System Exception |
| 42 | Oops | Not used |
| 43 | Something went wrong | System exception occurred. |
| 44 | Page not found | Module not found. |
| 45 | 404 page | Missing Module |
| 46 | Settings | Configuration |
| 47 | Preferences | Configuration |
| 48 | Documentation | Engineering Record |
| 49 | Docs | Engineering Record |
| 50 | Architecture | System Blueprint |
| 51 | Arch diagram | System Blueprint |
| 52 | System design | System Blueprint |
| 53 | Principles | Engineering Protocols |
| 54 | Values | Engineering Protocols |
| 55 | Philosophy | Engineering Protocols |
| 56 | Testimonials | Not used |
| 57 | Reviews | Not used |
| 58 | Clients | Not used (use Business Context) |
| 59 | Services | Not used |
| 60 | Pricing | Not used |
| 61 | FAQ | Not used (use structured docs) |
| 62 | Gallery | Interface Record |
| 63 | Screenshots | Interface Record |
| 64 | Demo | Interface Record |
| 65 | Preview | System Blueprint Preview |
| 66 | Featured work | Registered products |
| 67 | Latest work | Registered products |
| 68 | Navigation | Module Navigation |
| 69 | Menu | Module Navigation |
| 70 | Sidebar | Module Navigation |
| 71 | Header | System Header |
| 72 | Footer | Status Bar |
| 73 | Search | Query |
| 74 | Search… | Query modules, products, notes… |
| 75 | Filter | Filter |
| 76 | Sort | Sort |
| 77 | Tag | Label |
| 78 | Category | Domain |
| 79 | Status | Status |
| 80 | Online | Online |
| 81 | Offline | Offline |
| 82 | Active | Operational |
| 83 | Live | Production |
| 84 | In progress | In Development |
| 85 | Done | Completed |
| 86 | Coming soon | Scheduled |
| 87 | Deprecated | Deprecated |
| 88 | Archived | Archived |
| 89 | Experimental | Experimental |
| 90 | Beta | Experimental |
| 91 | Available | Open for meaningful product work |
| 92 | Available for work | Open for meaningful product work |
| 93 | Open to work | Open for meaningful product work |
| 94 | Freelancer | Not used |
| 95 | Consultant | Technical Advisory |
| 96 | Read More | Read Note / Open Record |
| 97 | View Project | Open Project |
| 98 | View Details | Open Record |
| 99 | Learn More | Read Documentation |
| 100 | Click Here | [Specific action] |
| 101 | See All | View Registry |
| 102 | Submit | Send Message |
| 103 | Send | Send Message |
| 104 | Thank you | Message queued. |
| 105 | Success | Operation completed. |
| 106 | Failed | Operation failed. |
| 107 | Try again | Retry operation |
| 108 | Retry | Retry operation |
| 109 | Copy | Copy / Synchronize clipboard |
| 110 | Copied | Clipboard synchronized. |
| 111 | Share | Not used (v1.0) |
| 112 | Follow | Not used |
| 113 | Subscribe | Not used |
| 114 | Newsletter | Not used |
| 115 | Modal | System Window |
| 116 | Popup | System Window |
| 117 | Dialog | System Window |
| 118 | Tooltip | Context Note |
| 119 | Dropdown | Selector |
| 120 | Button | [Action label] |
| 121 | Card | Panel |
| 122 | Widget | Panel |
| 123 | Component | Module / Panel |
| 124 | Section | Panel / Zone |
| 125 | Terminal | System Console |
| 126 | Console | System Console |
| 127 | Command line | System Console |
| 128 | CLI | System Console |
| 129 | Command palette | Command Palette |
| 130 | Quick search | Command Palette |
| 131 | Keyboard shortcut | ⌘K |
| 132 | Breadcrumb | Module Path |
| 133 | Page title | Module Header |
| 134 | Subtitle | Module description |
| 135 | User | Operator (internal only) |
| 136 | Visitor | Operator (internal only) |
| 137 | Welcome | Not used |
| 138 | Hello | Not used |
| 139 | Hi, I'm… | Not used |
| 140 | Passionate | Not used |
| 141 | Expert | Not used |
| 142 | Guru | Not used |
| 143 | Ninja | Not used |
| 144 | Rockstar | Not used |
| 145 | Best | Not used |
| 146 | Amazing | Not used |
| 147 | Awesome | Not used |
| 148 | Innovative | Not used |
| 149 | Creative | Not used |
| 150 | World-class | Not used |
| 151 | Cutting-edge | Not used |
| 152 | State-of-the-art | Not used |
| 153 | Passion | Not used |
| 154 | Dream | Not used |
| 155 | Love | Not used |
| 156 | Excited | Not used |
| 157 | Fun fact | Not used |
| 158 | Hobbies | Not used (v1.0) |
| 159 | Interests | Technical Interests (profile only) |
| 160 | Location | Location (data row) |
| 161 | Based in | Location: [city] |
| 162 | Timezone | Timezone: UTC+5 |
| 163 | Version | Version: v[X.Y.Z] |
| 164 | Changelog | Version history |
| 165 | Release notes | Version history |
| 166 | Activity | Activity Log |
| 167 | Recent activity | Activity Log |
| 168 | Notifications | Operation log |
| 169 | Toast | Operation log entry |
| 170 | Empty state | [System-oriented message] |
| 171 | No results | No matching modules or records. |
| 172 | No data | [Context-specific empty message] |
| 173 | Maintenance | Maintenance |
| 174 | Downtime | Offline |
| 175 | Uptime | Operational |
| 176 | Health check | System status |
| 177 | Dashboard | Operations Center |
| 178 | Admin panel | Operations Center |
| 179 | Control panel | Operations Center |
| 180 | Workspace | Engineering workspace |
| 181 | Profile page | Engineer Profile |
| 182 | Writing | Knowledge Base |
| 183 | Notes | Engineering Notes |
| 184 | Insights | Engineering Notes |
| 185 | Thoughts | Engineering Notes |
| 186 | Lessons learned | Lessons Recorded |
| 187 | Takeaways | Lessons Recorded |
| 188 | Results | Outcome |
| 189 | Impact | Outcome |
| 190 | Problem | Problem Statement |
| 191 | Challenge | Problem Statement |
| 192 | Solution | Approach |
| 193 | Approach | Approach |
| 194 | Trade-off | Trade-offs |
| 195 | Decision | Trade-offs |
| 196 | Roadmap | Roadmap |
| 197 | Future plans | Roadmap |
| 198 | Next steps | Roadmap |
| 199 | Stack overflow | Not used |
| 200 | Logo soup | Not used — use Technology Stack groups |

---

## 19. Copywriting Rules — Final Checklist

Before publishing any text:

- [ ] Passes Linear / Stripe / Vercel test
- [ ] Uses registered ELS term (not generic synonym)
- [ ] No forbidden words
- [ ] No exclamation marks
- [ ] System voice for UI
- [ ] Within length limits
- [ ] Fact confirmed in canonical docs or by Timur
- [ ] No marketing tone
- [ ] No emotional tone
- [ ] No sales tone

---

*End of canonical specification. This document is immutable. Amendments require Timur's confirmation and version increment.*
