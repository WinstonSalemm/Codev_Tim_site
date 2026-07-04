# Codev_Tim — Design Token Specification

**Document ID:** `CT-DOC-11`  
**Version:** 1.0.0  
**Status:** Canonical Specification  
**Last Updated:** 2026-07-05

---

## Preface

This document is the **official Design Token Specification** for the Codev_Tim visual system — **Obsidian Console**.

Every visual value in the codebase must reference a token defined here. **Arbitrary values are forbidden** unless explicitly approved and added to this document.

**Related documents:**
- `00_PROJECT_VISION.md` §5 — Visual identity, surface system, shell layout
- `01_BRAND_BIBLE.md` §7, §14 — Visual philosophy, motion principles
- `08_TECH_STACK.md` §2.2 — CSS Variables + Tailwind v4 implementation
- `10_IMPLEMENTATION_PLAN.md` Phase 1 §1.2 — Token file location

**Implementation:**
```
src/styles/tokens.css     → CSS custom properties (source of truth)
tailwind.config.ts        → Maps tokens to Tailwind utilities
```

**Rule:** In components, use Tailwind utilities that map to tokens — never raw hex, px, or ms values inline.

---

## 1. Token Naming Convention

```
--{category}-{property}-{variant?}

Examples:
  --color-bg-base
  --space-4
  --motion-duration-fast
  --radius-md
```

| Prefix | Category |
|--------|----------|
| `--color-` | Colors |
| `--font-` | Typography |
| `--space-` | Spacing |
| `--radius-` | Border radius |
| `--border-` | Border width and colors |
| `--shadow-` | Shadows |
| `--blur-` | Blur |
| `--opacity-` | Opacity |
| `--motion-` | Animation |
| `--size-` | Fixed dimensions |
| `--z-` | Layer stack |
| `--grid-` | Grid and layout |
| `--a11y-` | Accessibility |

---

## 2. Brand Colors

### 2.1 `--color-bg-base`

| Property | Value |
|----------|-------|
| **Token** | `--color-bg-base` |
| **Value** | `#07090F` |
| **Purpose** | Page background — Layer 0 |
| **Usage** | `<body>`, full-viewport base, OG image background |
| **Example** | `bg-[var(--color-bg-base)]` or Tailwind `bg-base` |

### 2.2 `--color-accent`

| Property | Value |
|----------|-------|
| **Token** | `--color-accent` |
| **Value** | `#F0B429` |
| **Purpose** | Signal Amber — primary accent |
| **Usage** | Status indicators, focus rings, Signal Line, primary CTA fill, active nav rail |
| **Constraint** | ≤4% of viewport area — see `01_BRAND_BIBLE.md` |
| **Example** | Focus ring, `> ` terminal prompt, version badge dot |

### 2.3 `--color-accent-hover`

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--color-accent-hover` | `#F5C84D` | Accent hover state | Primary button hover |
| `--color-accent-muted` | `rgba(240, 180, 41, 0.08)` | Accent background tint | Badge backgrounds |
| `--color-accent-subtle` | `rgba(240, 180, 41, 0.06)` | Section highlight tint | Rare highlight panels |
| `--color-accent-border` | `rgba(240, 180, 41, 0.25)` | Accent container border | Active card, diagram node hover |
| `--color-accent-focus` | `rgba(240, 180, 41, 0.50)` | Focus ring color | Keyboard focus |

### 2.4 Brand Color Rules

- Never fill entire sections with accent color
- One solid accent fill per viewport (primary CTA only)
- Accent as line, dot, badge, focus — not decoration
- No gradients on brand colors

---

## 3. Semantic Colors

### 3.1 Text

| Token | Value | Purpose | Usage | WCAG on `#07090F` |
|-------|-------|---------|-------|-------------------|
| `--color-text-primary` | `#EDEFF2` | Headlines, body | Default readable text | AA ✅ |
| `--color-text-secondary` | `#8B919A` | Descriptions, meta | Labels, captions | AA ✅ |
| `--color-text-tertiary` | `#565C66` | Placeholders, disabled | Muted data | Large text AA |
| `--color-text-disabled` | `#3A3F47` | Disabled controls | Inactive UI | Decorative only |
| `--color-text-inverse` | `#07090F` | Text on accent fill | Primary button label | — |
| `--color-text-code` | `#C9D1D9` | Code and mono values | Terminal output, data rows | AA ✅ |

### 3.2 Status (System and Product)

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--color-status-operational` | `#34D399` | System healthy | Status dot, Operational badge |
| `--color-status-warning` | `#FBBF24` | Attention needed | Warning callouts |
| `--color-status-critical` | `#F87171` | Failure / error | Error states, Critical badge |
| `--color-status-info` | `#60A5FA` | Informational | Info links, neutral highlight |
| `--color-status-in-progress` | `#F0B429` | Building / active | In Development badge (uses accent) |
| `--color-status-archived` | `#565C66` | Retired systems | Archived, Deprecated |

Reference status labels: `02_ENGINEERING_LANGUAGE.md` §6.

### 3.3 Semantic UI

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--color-success` | `#34D399` | Operation completed | Toast success border |
| `--color-error` | `#F87171` | Validation / system error | Form errors, toast error |
| `--color-link` | `#8B919A` | Default link | Rest state |
| `--color-link-hover` | `#EDEFF2` | Link hover | + Signal underline |

---

## 4. Surface Levels

Depth via **layers and borders** — not shadows. Reference: `00_PROJECT_VISION.md` §5.5.

| Token | Value | Layer | Purpose | Usage |
|-------|-------|-------|---------|-------|
| `--color-bg-base` | `#07090F` | 0 | Page background | Body, content viewport bg |
| `--color-bg-recessed` | `#0A0D14` | 1 | Recessed areas | Sidebar, terminal bg, code blocks |
| `--color-bg-surface` | `#0E1119` | 2 | Cards, panels | Dashboard cards, project cards |
| `--color-bg-elevated` | `#131720` | 3 | Hover, active, dropdown | Nav active, card hover, selectors |
| `--color-bg-overlay` | `#181D28` | 4 | Modals, mobile nav | System Window, command palette |

**Elevation rule:** Moving up one layer = `--color-bg-*` shift + `--border-hover`. Never use shadow for card elevation.

---

## 5. Typography

### 5.1 Font Families

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--font-sans` | `var(--font-geist-sans), system-ui, sans-serif` | UI and headings | All prose, labels, buttons |
| `--font-mono` | `var(--font-geist-mono), ui-monospace, monospace` | Data, terminal, code | Stack lists, version, terminal, metrics |

Load via `next/font` — see `08_TECH_STACK.md` §2.3. Never load from Google Fonts CDN.

### 5.2 Font Scale

| Token | Size | Rem | Purpose | Usage |
|-------|------|-----|---------|-------|
| `--font-size-display` | 48px | 3rem | Module titles (desktop) | h1 in ModuleHeader |
| `--font-size-heading-lg` | 32px | 2rem | Page section titles | h2 |
| `--font-size-heading-md` | 24px | 1.5rem | Card titles | h3, project name |
| `--font-size-heading-sm` | 18px | 1.125rem | Subsections | h4 |
| `--font-size-body-lg` | 18px | 1.125rem | Lead paragraphs | Overview opening |
| `--font-size-body` | 16px | 1rem | Default body | Prose |
| `--font-size-body-sm` | 14px | 0.875rem | Meta, descriptions | Card preview |
| `--font-size-label` | 12px | 0.75rem | MODULE micro-labels | Uppercase category |
| `--font-size-mono` | 14px | 0.875rem | Terminal, data values | Status bar values |
| `--font-size-mono-sm` | 13px | 0.8125rem | Inline code | Code blocks |
| `--font-size-metric` | 40px | 2.5rem | Dashboard metrics | Count-up numbers |

**Mobile overrides:**

| Token | Mobile Value |
|-------|--------------|
| `--font-size-display-mobile` | 36px / 2.25rem |

### 5.3 Font Weights

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--font-weight-regular` | 400 | Body text | Paragraphs, descriptions |
| `--font-weight-medium` | 500 | Headings, emphasis | h1–h4, buttons, labels |

**Rule:** No weight 600/700 in UI — hierarchy via size and color, not bold spam.

### 5.4 Line Heights

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--line-height-display` | 1.08 | Large headings | display, heading-lg |
| `--line-height-heading` | 1.20 | Section headings | heading-md, heading-sm |
| `--line-height-body` | 1.65 | Body prose | body, body-lg |
| `--line-height-compact` | 1.40 | Labels | label, uppercase micro |
| `--line-height-mono` | 1.50 | Monospace | terminal, code |

### 5.5 Letter Spacing

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--letter-spacing-tight` | -0.03em | Display headings | display |
| `--letter-spacing-snug` | -0.015em | Headings | heading-md |
| `--letter-spacing-normal` | 0 | Body | body |
| `--letter-spacing-wide` | 0.06em | Micro labels | MODULE, STATUS labels |

### 5.6 Typography Rules

| Rule | Token / Value |
|------|---------------|
| Max body width | `--prose-width: 65ch` |
| Max content width | `--content-width: 720px` |
| Max heading width | `--heading-max-width: 20ch` |
| Tabular numbers | `font-variant-numeric: tabular-nums` on metrics |
| Label transform | `text-transform: uppercase` on `--font-size-label` only |

---

## 6. Spacing Scale

Base unit: **4px**. Reference: `01_BRAND_BIBLE.md` spacing system.

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--space-0` | 0 | Reset | — |
| `--space-1` | 4px | Tight | Icon gap, inline |
| `--space-2` | 8px | Compact inline | Icon + text |
| `--space-3` | 12px | Compact padding | Dense rows |
| `--space-4` | 16px | Default inner | Component padding |
| `--space-5` | 20px | Card padding | Standard card |
| `--space-6` | 24px | Card padding lg | Large card, grid gutter |
| `--space-8` | 32px | Component gap | Between blocks |
| `--space-10` | 40px | Section inner | Module header → content |
| `--space-12` | 48px | — | Subsection gap |
| `--space-16` | 64px | Section gap | Between page sections |
| `--space-20` | 80px | Page padding mobile | Top padding |
| `--space-24` | 96px | Section padding desktop | Vertical section |
| `--space-32` | 128px | Hero vertical | Dashboard top (desktop) |

### 6.1 Layout Spacing Constants

| Token | Value | Purpose |
|-------|-------|---------|
| `--page-padding-x-mobile` | 24px | Mobile horizontal |
| `--page-padding-x-tablet` | 32px | Tablet horizontal |
| `--page-padding-x-desktop` | 48px | Desktop horizontal |
| `--card-min-height` | 120px | Dashboard card minimum |
| `--terminal-height-default` | 280px | Terminal panel |
| `--terminal-height-expanded` | 480px | Terminal expanded |

---

## 7. Border Radius

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--radius-none` | 0 | Sharp corners | — |
| `--radius-sm` | 4px | Small elements | Tags, badges |
| `--radius-md` | 6px | Buttons, inputs | Default interactive |
| `--radius-lg` | 8px | Cards | Dashboard cards, project cards |
| `--radius-xl` | 12px | Large panels | Modals, command palette |
| `--radius-full` | 9999px | Pills, dots | Status dot only |

**Rule:** No universal pill radius. Cards use `--radius-lg`, not full.

---

## 8. Borders

### 8.1 Border Width (Stroke)

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--border-width-default` | 1px | All UI borders | Cards, inputs, dividers |
| `--border-width-focus` | 2px | Focus ring width | Keyboard focus |
| `--border-width-accent-rail` | 2px | Nav active indicator | Sidebar active item |
| `--stroke-icon` | 1.5px | Lucide icons | All icons |

### 8.2 Border Colors

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--border-rest` | `rgba(255, 255, 255, 0.06)` | Default border | Card at rest |
| `--border-hover` | `rgba(255, 255, 255, 0.12)` | Hover state | Card hover |
| `--border-active` | `rgba(255, 255, 255, 0.18)` | Active / selected | Active tab, selected row |
| `--border-accent` | `rgba(240, 180, 41, 0.25)` | Accent container | Diagram node hover |
| `--border-focus` | `rgba(240, 180, 41, 0.50)` | Focus ring | `:focus-visible` |

**Rule:** 1px solid only. No dashed borders except diagram connectors (use `--border-rest` + arrow).

---

## 9. Container Widths

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--container-shell` | 100% | Full shell width | AppShell |
| `--container-content` | 1120px | Main content max | Content viewport |
| `--container-prose` | 720px | Long-form content | MDX body, Engineering Record |
| `--container-narrow` | 540px | Lead text | Module descriptions |
| `--container-toc` | 240px | TOC sidebar | Sticky doc nav |

---

## 10. Grid System

| Token | Value | Purpose |
|-------|-------|---------|
| `--grid-columns-desktop` | 12 | Desktop grid |
| `--grid-columns-tablet` | 8 | Tablet grid |
| `--grid-columns-mobile` | 4 | Mobile grid |
| `--grid-gutter` | 24px | Column gap (`--space-6`) |
| `--grid-margin` | var(`--page-padding-x-*`) | Side margins |

**Dashboard card grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

Reference: `04_SEO_STRATEGY.md` §17 for heading hierarchy per module.

---

## 11. Breakpoints

| Token | Value | Purpose |
|-------|-------|---------|
| `--breakpoint-sm` | 640px | Mobile landscape |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Small desktop |
| `--breakpoint-xl` | 1280px | Desktop |
| `--breakpoint-2xl` | 1440px | Large desktop |

**Tailwind mapping:** `sm` · `md` · `lg` · `xl` · `2xl`

**Shell behavior:**

| Breakpoint | Sidebar | Status Bar |
|------------|---------|------------|
| ≥1280px | 240px expanded | Full |
| 768–1279px | 64px collapsed | Compact |
| <768px | Overlay + bottom tabs | Minimal |

---

## 12. Elevation and Shadow System

### 12.1 Elevation Philosophy

**Default: no shadows.** Depth = surface layer + border brighten.

| Level | Mechanism | Token |
|-------|-----------|-------|
| 0 | Base bg | `--color-bg-base` |
| 1 | Surface + `--border-rest` | `--color-bg-surface` |
| 2 | Elevated bg + `--border-hover` | `--color-bg-elevated` |
| 3 | Overlay + modal shadow | `--color-bg-overlay` + `--shadow-modal` |

### 12.2 Shadow Tokens (Exceptions Only)

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--shadow-none` | none | Default | All cards, panels |
| `--shadow-modal` | `0 8px 32px rgba(0, 0, 0, 0.40)` | Modal depth | System Window, mobile nav overlay |
| `--shadow-status-pulse` | `0 0 0 0 rgba(52, 211, 153, 0.4)` | Status dot pulse | Animated ring — operational only |

**Forbidden:** drop-shadow on cards, glow shadows, colored shadows.

---

## 13. Blur Tokens

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--blur-none` | 0 | Default | — |
| `--blur-header` | 8px | Sticky header | AppHeader on scroll |
| `--blur-overlay` | 8px | Backdrop | Command palette, modal backdrop |
| `--blur-image-placeholder` | 20px | Image load | next/image blur placeholder |

---

## 14. Opacity Tokens

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--opacity-disabled` | 0.40 | Disabled controls | Buttons, inputs |
| `--opacity-muted` | 0.60 | Secondary emphasis | Dimmed diagram paths |
| `--opacity-hover` | 0.80 | Hover overlay | — |
| `--opacity-noise` | 0.02 | Noise texture | Base layer overlay |
| `--opacity-grid` | 0.04 | Engineering grid | Dashboard background |
| `--opacity-signal-line` | 0.60 | Signal Line | Accent underline |
| `--opacity-backdrop` | 0.85 | Header scroll bg | `rgba(7, 9, 15, 0.85)` |

---

## 15. Motion System

Reference: `00_PROJECT_VISION.md` §6.2, Experience Design specification.

### 15.1 Durations

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--motion-duration-instant` | 0ms | Reduced motion fallback | `prefers-reduced-motion` |
| `--motion-duration-fast` | 120ms | Micro interactions | Hover, focus, border |
| `--motion-duration-base` | 200ms | Standard transitions | Nav, tabs, palette |
| `--motion-duration-slow` | 400ms | Module mount | Page enter, panel open |
| `--motion-duration-reveal` | 600ms | Scroll reveal | Section fade-in (once) |
| `--motion-duration-counter` | 800ms | Number count-up | Dashboard metrics |
| `--motion-duration-pulse` | 600ms | Status pulse ring | One pulse cycle |
| `--motion-duration-pulse-interval` | 4000ms | Pulse frequency | Status dot |

### 15.2 Easing Curves

| Token | Value | Purpose |
|-------|-------|---------|
| `--motion-ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | All standard motion |
| `--motion-ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | Module enter, content reveal |

### 15.3 Animation Rules

| Allowed | Token / Spec |
|---------|--------------|
| Fade | opacity 0 → 1 |
| Translate Y | 8px max |
| Border brighten | `--border-rest` → `--border-hover` |
| Signal line expand | width 0 → 100%, `--motion-duration-base` |
| Card lift | translateY(-1px), `--motion-duration-fast` |
| Blur in | `--blur-overlay` on palette open |
| Number counter | once per session, IntersectionObserver |

| Forbidden | — |
|-----------|---|
| Parallax, bounce, elastic, spring overshoot | — |
| Floating, particles, rotation, glow pulse | — |
| Scroll-jacking | — |
| Duration > `--motion-duration-reveal` for UI | — |

### 15.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: var(--motion-duration-instant) !important;
    transition-duration: var(--motion-duration-instant) !important;
  }
}
```

Pulse disabled. Counters show final value immediately.

---

## 16. Icon Sizes

| Token | Value | Purpose | Usage |
|-------|-------|---------|-------|
| `--icon-size-sm` | 14px | Inline micro | TOC, meta |
| `--icon-size-md` | 16px | Default nav | Sidebar, buttons — **canonical** |
| `--icon-size-lg` | 20px | Emphasis | Module headers |
| `--icon-size-xl` | 24px | Empty states | Rare |

**Stroke:** `--stroke-icon` (1.5px). Monochrome — `--color-text-secondary`, hover `--color-text-primary`.  
**Library:** Lucide React — `08_TECH_STACK.md` §2.6.

---

## 17. Image Rules

| Rule | Token / Value |
|------|---------------|
| Format priority | AVIF → WebP → PNG fallback |
| Interface Record max size | 200 KB compressed |
| OG image max size | 300 KB |
| OG dimensions | 1200 × 630px |
| Diagram format | SVG inline — no raster for System Blueprint |
| Border radius on screenshots | `--radius-lg` inside device frame |
| Lazy load | Below-fold only — see `04_SEO_STRATEGY.md` §21 |
| Dimensions required | width + height on all `<img>` / next/image |

---

## 18. Shell Dimension Tokens

Reference: `00_PROJECT_VISION.md` §5.6.

| Token | Value | Purpose |
|-------|-------|---------|
| `--size-header-height` | 56px | AppHeader |
| `--size-status-bar-height` | 32px | StatusBar |
| `--size-sidebar-width` | 240px | Sidebar expanded |
| `--size-sidebar-collapsed` | 64px | Sidebar icons only |
| `--size-terminal-default` | 280px | Terminal height |
| `--size-terminal-expanded` | 480px | Terminal expanded |
| `--size-tap-target` | 48px | Minimum touch target (mobile) |

---

## 19. Focus Ring

| Token | Value | Purpose |
|-------|-------|---------|
| `--focus-ring-width` | 2px | `--border-width-focus` |
| `--focus-ring-color` | `--color-accent-focus` |
| `--focus-ring-offset` | 2px | Outline offset |
| `--focus-ring-style` | solid | Never `outline: none` without replacement |

**Usage:** `:focus-visible` only — not on mouse click.

**Example:**
```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

---

## 20. Selection

| Token | Value | Purpose |
|-------|-------|---------|
| `--selection-bg` | `rgba(240, 180, 41, 0.25)` | Text selection background |
| `--selection-color` | `--color-text-primary` | Selected text color |

---

## 21. Scrollbars

| Token / Rule | Value | Purpose |
|--------------|-------|---------|
| Width | 6px | Thin scrollbar |
| Track | transparent | — |
| Thumb | `rgba(255, 255, 255, 0.12)` | `--border-hover` equivalent |
| Thumb hover | `rgba(255, 255, 255, 0.18)` | `--border-active` |
| Terminal / code blocks | Same spec | Monospace areas |

**Rule:** Native scroll behavior — no scroll-jacking. `scroll-behavior: smooth` for anchor links only.

---

## 22. Z-Index Layer System

| Token | Value | Purpose | Elements |
|-------|-------|---------|----------|
| `--z-base` | 0 | Default content | Main viewport |
| `--z-recessed` | 10 | Sidebar | Module Navigation |
| `--z-header` | 20 | Sticky header | AppHeader |
| `--z-status-bar` | 30 | Fixed bottom | StatusBar |
| `--z-dropdown` | 40 | Selectors | Language switcher |
| `--z-terminal` | 50 | Terminal panel | System Console |
| `--z-overlay` | 60 | Backdrop | Modal, palette backdrop |
| `--z-modal` | 70 | System Window | Modal, command palette |
| `--z-toast` | 80 | Notifications | Operation log toasts |
| `--z-skip-link` | 90 | Accessibility | Skip to content |

**Rule:** Never use arbitrary z-index. Always reference `--z-*` tokens.

---

## 23. Glass Rules

Codev_Tim uses **minimal glass** — not glassmorphism aesthetic.

| Element | Background | Blur | Usage |
|---------|------------|------|-------|
| Header on scroll | `rgba(7, 9, 15, 0.85)` | `--blur-header` | Sticky AppHeader |
| Modal backdrop | `rgba(7, 9, 15, 0.60)` | `--blur-overlay` | Behind System Window |
| Command palette backdrop | Same | `--blur-overlay` | ⌘K overlay |

**Forbidden:** Frosted glass cards, glass sidebar, accent-tinted glass.

---

## 24. Noise and Grid Rules

### 24.1 Noise Overlay

| Property | Value |
|----------|-------|
| **Purpose** | Tactile depth on base layer — not gritty texture |
| **Opacity** | `--opacity-noise` (2%) |
| **Usage** | `body::before` or fixed overlay on Layer 0 |
| **Asset** | SVG noise or CSS — max 200×200 tile |
| **Forbidden** | Visible grain, animated noise |

### 24.2 Engineering Grid

| Property | Value |
|----------|-------|
| **Purpose** | Subtle engineering atmosphere on Dashboard |
| **Opacity** | `--opacity-grid` (4%) |
| **Line** | 1px, white |
| **Size** | 24px or 32px grid |
| **Usage** | Dashboard background only — not all pages |

---

## 25. Accessibility Tokens

| Token / Rule | Value | Purpose |
|--------------|-------|---------|
| `--a11y-min-contrast-body` | 4.5:1 | WCAG AA body text |
| `--a11y-min-contrast-large` | 3:1 | WCAG AA large text / UI |
| `--a11y-focus-visible` | Always on | Keyboard navigation |
| `--a11y-skip-link-height` | 40px | Skip to content |
| `--a11y-min-tap-target` | 48px | Mobile touch — `--size-tap-target` |
| Motion | `prefers-reduced-motion` | See §15.4 |

Validate pairs: text-primary on bg-base, text-secondary on bg-surface, accent on bg-base.

---

## 26. Dark Theme (Default and Only — v1.0)

| Rule | Value |
|------|-------|
| **Default theme** | Dark — Obsidian Console |
| **Implementation** | `:root` tokens — no theme toggle in v1.0 |
| **color-scheme** | `dark` on `<html>` |
| **theme-color meta** | `#07090F` |

All tokens in this document assume dark theme.

---

## 27. Light Theme (Future — Not v1.0)

Light theme is **deferred**. When implemented:

1. Add `[data-theme="light"]` selector block
2. Invert surface scale — do not invert accent
3. Re-validate all WCAG pairs
4. Version increment this document
5. Add theme toggle to Configuration (not v1.0)

**Do not implement light theme tokens until explicitly scheduled.**

---

## 28. Tailwind Integration Map

Map tokens in `tailwind.config.ts`:

```typescript
// Example mapping — implement in Phase 1
colors: {
  base: 'var(--color-bg-base)',
  surface: 'var(--color-bg-surface)',
  accent: 'var(--color-accent)',
  // ...
},
spacing: {
  // map --space-* tokens
},
borderRadius: {
  lg: 'var(--radius-lg)',
},
transitionDuration: {
  fast: 'var(--motion-duration-fast)',
  base: 'var(--motion-duration-base)',
},
```

**Rule:** Tailwind utilities reference CSS variables — single source in `tokens.css`.

---

## 29. Token Usage Checklist

Before merging UI code:

- [ ] No raw hex colors in components
- [ ] No arbitrary spacing (`p-[13px]`, `mt-[22px]`)
- [ ] No arbitrary motion durations
- [ ] No shadow on cards
- [ ] Accent ≤4% viewport area
- [ ] Focus ring on all interactive elements
- [ ] Icons use `--icon-size-md` and `--stroke-icon`
- [ ] Surfaces use Layer 0–4 tokens only
- [ ] z-index uses `--z-*` scale

---

## 30. Document Relationships

```
00_PROJECT_VISION.md   → Visual goals, shell layout
01_BRAND_BIBLE.md      → Visual philosophy, motion principles
11_DESIGN_TOKENS.md    → This document — all token values
10_IMPLEMENTATION_PLAN.md → Phase 1 §1.2 implementation
```

---

*End of canonical specification. Token changes require version increment and design review.*
