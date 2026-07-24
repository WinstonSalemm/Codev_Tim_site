# Codev Tim → FinancialERP Design Bible

**Назначение:** самодостаточная спецификация визуального языка сайта Codev Tim (Obsidian Console) для адаптации в desktop FinancialERP (.NET MAUI).  
**Режим источника:** только факты из CSS/компонентов сайта + скриншоты из `design-reference/screenshots`.  
**Тема ERP:** только тёмная (dark). Светлая тема сайта документируется как «существует на сайте», но **не переносится** в FinancialERP.  
**Статус:** read-only анализ исходников сайта; исходники сайта не изменялись.

**Легенда Origin:**

- `FACT` — значение найдено в CSS/компонентах сайта
- `MAUI` — рекомендация адаптации под плотный desktop ERP (не копировать marketing/web layout буквально)

**Единый нейминг MAUI resources:** `Color*`, `Brush*`, `Font*`, `Size*`, `Space*`, `Radius*`, `Border*`, `Shadow*`, `Duration*`, `Ease*`, `Style.*`

---

## 1. Design identity

| Параметр                                   | Значение                                         | Origin          | Источник                                                         |
| ------------------------------------------ | ------------------------------------------------ | --------------- | ---------------------------------------------------------------- |
| Brand                                      | Codev_Tim                                        | FACT            | `docs/01_BRAND_BIBLE.md`                                         |
| Visual system                              | Obsidian Console                                 | FACT            | Brand Bible §7, `tokens.css`                                     |
| Accent                                     | Signal Amber `#F0B429`                           | FACT            | `--color-accent`                                                 |
| Base surface (runtime CSS)                 | `#000000`                                        | FACT            | `--color-bg-base` в `src/styles/tokens.css`                      |
| Brand-doc base (устарело относительно CSS) | `#07090F`                                        | FACT (doc only) | Brand Bible / `docs/11_DESIGN_TOKENS.md` — **для ERP брать CSS** |
| Метафора UI                                | Admin dashboard / Command center / Control panel | FACT            | Brand Bible §1.4                                                 |
| Целевой продукт адаптации                  | FinancialERP (.NET MAUI desktop)                 | MAUI            | задача                                                           |

**Характер:** тёмный, спокойный, инженерный, премиальный за счёт restraint (границы + типографика), не за счёт glow/glass/градиентов. Золото — сигнал (CTA, selection, KPI), не заливка.

---

## 2. Основные визуальные принципы

| #   | Принцип                    | Факт на сайте                            | Правило для FinancialERP                       |
| --- | -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| 1   | Dark-first                 | Слой surfaces 0–4 на чёрной шкале        | Сохранить                                      |
| 2   | Signal, not flood          | Accent ≤4% площади (Brand Bible)         | Золото только primary / selection / важные KPI |
| 3   | Depth via layers + borders | Карточки без shadow в dark               | Панели разделять фоном + 1px border            |
| 4   | Typography-led hierarchy   | Размер/цвет/mono, не «жирность везде»    | Tables + mono values                           |
| 5   | 4px grid                   | `--space-*`                              | Сохранить сетку, сжать marketing gaps          |
| 6   | No card spam               | Карточка = интерактивный/логический блок | Не оборачивать каждое значение в карточку      |
| 7   | Motion purposeful          | 120–400ms, hover border/bg               | Микро-переходы; без декоративной анимации      |

---

## 3. Цвета и surfaces

### 3.1 Color token table (dark = ERP canonical)

| Semantic token             | Value                                        | Role                                | MAUI resource            | Origin | Source file             |
| -------------------------- | -------------------------------------------- | ----------------------------------- | ------------------------ | ------ | ----------------------- |
| `color-bg-base`            | `#000000`                                    | App/window background L0            | `ColorBgBase`            | FACT   | `src/styles/tokens.css` |
| `color-bg-recessed`        | `#050505`                                    | Sidebar, status bar, recessed wells | `ColorBgRecessed`        | FACT   | `tokens.css`            |
| `color-bg-surface`         | `#0A0A0A`                                    | Cards / panels L2                   | `ColorBgSurface`         | FACT   | `tokens.css`            |
| `color-bg-elevated`        | `#111111`                                    | Hover/active/selected rows L3       | `ColorBgElevated`        | FACT   | `tokens.css`            |
| `color-bg-overlay`         | `#161616`                                    | Modal / command palette L4          | `ColorBgOverlay`         | FACT   | `tokens.css`            |
| `color-bg-panel`           | `var(--color-bg-surface)` (= `#0A0A0A` dark) | Panel fill alias                    | `ColorBgPanel`           | FACT   | `tokens.css`            |
| `color-accent`             | `#F0B429`                                    | Signal Amber primary                | `ColorAccent`            | FACT   | `tokens.css`            |
| `color-accent-hover`       | `#F5C84D`                                    | Primary hover                       | `ColorAccentHover`       | FACT   | `tokens.css`            |
| `color-accent-active`      | `#D4A017`                                    | Primary pressed                     | `ColorAccentActive`      | FACT   | `tokens.css`            |
| `color-accent-muted`       | `rgba(240,180,41,0.08)`                      | Soft accent fill / badge tint       | `ColorAccentMuted`       | FACT   | `tokens.css`            |
| `color-accent-subtle`      | `rgba(240,180,41,0.06)`                      | Rare highlight                      | `ColorAccentSubtle`      | FACT   | `tokens.css`            |
| `color-accent-border`      | `rgba(240,180,41,0.25)`                      | Accent container border             | `ColorAccentBorder`      | FACT   | `tokens.css`            |
| `color-accent-focus`       | `rgba(240,180,41,0.50)`                      | Focus ring                          | `ColorAccentFocus`       | FACT   | `tokens.css`            |
| `color-brand-warm`         | `#F0B429`                                    | Alias accent                        | `ColorBrandWarm`         | FACT   | `tokens.css`            |
| `color-brand-warm-soft`    | `rgba(240,180,41,0.10)`                      | Soft warm tint                      | `ColorBrandWarmSoft`     | FACT   | `tokens.css`            |
| `color-text-primary`       | `#EDEFF2`                                    | Primary text                        | `ColorTextPrimary`       | FACT   | `tokens.css`            |
| `color-text-secondary`     | `#A0A6B0`                                    | Secondary / descriptions            | `ColorTextSecondary`     | FACT   | `tokens.css`            |
| `color-text-tertiary`      | `#6B7280`                                    | Labels muted / placeholders         | `ColorTextTertiary`      | FACT   | `tokens.css`            |
| `color-text-disabled`      | `#3A3F47`                                    | Disabled text                       | `ColorTextDisabled`      | FACT   | `tokens.css`            |
| `color-text-inverse`       | `#000000`                                    | Text on accent fill                 | `ColorTextInverse`       | FACT   | `tokens.css`            |
| `color-text-code`          | `#C9D1D9`                                    | Mono data values                    | `ColorTextCode`          | FACT   | `tokens.css`            |
| `color-status-operational` | `#34D399`                                    | Success / healthy                   | `ColorStatusOperational` | FACT   | `tokens.css`            |
| `color-status-warning`     | `#FBBF24`                                    | Warning                             | `ColorStatusWarning`     | FACT   | `tokens.css`            |
| `color-status-critical`    | `#F87171`                                    | Error / critical                    | `ColorStatusCritical`    | FACT   | `tokens.css`            |
| `color-status-info`        | `#60A5FA`                                    | Info                                | `ColorStatusInfo`        | FACT   | `tokens.css`            |
| `color-status-in-progress` | `#F0B429`                                    | In progress (= accent)              | `ColorStatusInProgress`  | FACT   | `tokens.css`            |
| `color-status-archived`    | `#565C66`                                    | Archived                            | `ColorStatusArchived`    | FACT   | `tokens.css`            |
| `color-success`            | `#34D399`                                    | Semantic success                    | `ColorSuccess`           | FACT   | `tokens.css`            |
| `color-error`              | `#F87171`                                    | Semantic error                      | `ColorError`             | FACT   | `tokens.css`            |
| `color-link`               | `#8B919A`                                    | Link rest                           | `ColorLink`              | FACT   | `tokens.css`            |
| `color-link-hover`         | `#EDEFF2`                                    | Link hover                          | `ColorLinkHover`         | FACT   | `tokens.css`            |
| `selection-bg`             | `rgba(240,180,41,0.25)`                      | Text selection                      | `ColorSelectionBg`       | FACT   | `tokens.css`            |
| `selection-color`          | `#EDEFF2`                                    | Selection text                      | `ColorSelectionFg`       | FACT   | `tokens.css`            |

**Brush aliases (MAUI):** `BrushBgBase`, `BrushBgRecessed`, `BrushBgSurface`, `BrushBgElevated`, `BrushBgOverlay`, `BrushAccent`, `BrushAccentMuted`, `BrushTextPrimary`, `BrushTextSecondary`, `BrushTextTertiary`, `BrushTextCode`, `BrushBorderRest`, `BrushBorderHover`, `BrushBorderAccent`.

### 3.2 Border color tokens

| Token           | Value                    | Role               | MAUI                | Origin | Source       |
| --------------- | ------------------------ | ------------------ | ------------------- | ------ | ------------ |
| `border-rest`   | `rgba(255,255,255,0.10)` | Default 1px        | `ColorBorderRest`   | FACT   | `tokens.css` |
| `border-hover`  | `rgba(255,255,255,0.12)` | Hover              | `ColorBorderHover`  | FACT   | `tokens.css` |
| `border-active` | `rgba(255,255,255,0.18)` | Active/stronger    | `ColorBorderActive` | FACT   | `tokens.css` |
| `border-subtle` | `rgba(255,255,255,0.06)` | Hairline subtle    | `ColorBorderSubtle` | FACT   | `tokens.css` |
| `border-accent` | `rgba(240,180,41,0.25)`  | Accent outline     | `ColorBorderAccent` | FACT   | `tokens.css` |
| `border-focus`  | `rgba(240,180,41,0.50)`  | Focus border       | `ColorBorderFocus`  | FACT   | `tokens.css` |
| `border-panel`  | = `border-rest` (dark)   | Panel border alias | `ColorBorderPanel`  | FACT   | `tokens.css` |

### 3.3 Light theme (сайт only — НЕ для ERP)

На сайте `[data-theme="light"]` переопределяет accent на `#2563EB`, surfaces на cool daylight, включает glass/shadows (`tokens.css` L302+).  
**FinancialERP:** игнорировать light-токены. Не создавать `ColorAccentLight` / blue primary.

### 3.4 Doc vs CSS conflict (self-review)

| Item           | Doc (`11_DESIGN_TOKENS.md`) | CSS (`tokens.css`) | ERP берёт |
| -------------- | --------------------------- | ------------------ | --------- |
| bg-base        | `#07090F`                   | `#000000`          | CSS       |
| bg-recessed    | `#0A0D14`                   | `#050505`          | CSS       |
| bg-surface     | `#0E1119`                   | `#0A0A0A`          | CSS       |
| bg-elevated    | `#131720`                   | `#111111`          | CSS       |
| bg-overlay     | `#181D28`                   | `#161616`          | CSS       |
| text-secondary | `#8B919A`                   | `#A0A6B0`          | CSS       |
| text-tertiary  | `#565C66`                   | `#6B7280`          | CSS       |

---

## 4. Typography

### 4.1 Families

| Token       | Value                                                                | Usage                           | MAUI                                                                                                       | Origin | Source                           |
| ----------- | -------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ | -------------------------------- |
| `font-sans` | Geist Sans → `--font-geist-sans`, fallback `system-ui, sans-serif`   | UI, headings, buttons           | `FontFamilySans` = embed Geist Sans **или** Segoe UI Variable / Inter-equivalent; prefer Geist if licensed | FACT   | `src/lib/fonts.ts`, `tokens.css` |
| `font-mono` | Geist Mono → `--font-geist-mono`, fallback `ui-monospace, monospace` | Data, KPI, forms values, status | `FontFamilyMono` = Geist Mono **или** Cascadia Mono / Consolas                                             | FACT   | same                             |

Loaded weights on site: Sans `400`, `500`; Mono `400` (`fonts.ts`).

### 4.2 Typography style → MAUI Style

| Style          | Size                                   | Weight | Line-height     | Tracking | Color          | Transform    | MAUI Style            | Origin | Source                             |
| -------------- | -------------------------------------- | ------ | --------------- | -------- | -------------- | ------------ | --------------------- | ------ | ---------------------------------- |
| Display        | `3rem` / 48px (mobile token `2.25rem`) | 500    | 1.08            | -0.03em  | primary        | —            | `Style.TextDisplay`   | FACT   | `utilities.css` `.ds-text-display` |
| HeadingLg      | `2rem` / 32px                          | 500    | 1.2             | -0.015em | primary        | —            | `Style.TextHeadingLg` | FACT   | `.ds-text-heading-lg`              |
| HeadingMd      | `1.5rem` / 24px                        | 500    | 1.2             | -0.015em | primary        | —            | `Style.TextHeadingMd` | FACT   | `.ds-text-heading-md`              |
| HeadingSm      | `1.125rem` / 18px                      | 500    | 1.2             | 0        | primary        | —            | `Style.TextHeadingSm` | FACT   | `.ds-text-heading-sm`              |
| BodyLg         | `1.125rem` / 18px                      | 400    | 1.65            | 0        | primary        | —            | `Style.TextBodyLg`    | FACT   | `.ds-text-body-lg`                 |
| Body           | `1rem` / 16px                          | 400    | 1.65            | 0        | primary        | —            | `Style.TextBody`      | FACT   | `.ds-text-body`                    |
| BodySm         | `0.875rem` / 14px                      | 400    | 1.65            | 0        | secondary      | —            | `Style.TextBodySm`    | FACT   | `.ds-text-body-sm`                 |
| Label          | `0.75rem` / 12px                       | 500    | 1.4 (`compact`) | 0.06em   | secondary      | uppercase    | `Style.TextLabel`     | FACT   | `.ds-text-label`                   |
| Mono           | `0.875rem` / 14px                      | 400    | 1.5             | 0        | code           | —            | `Style.TextMono`      | FACT   | `.ds-text-mono`                    |
| MonoSm         | `0.8125rem` / 13px                     | 400    | 1.5             | 0        | code           | —            | `Style.TextMonoSm`    | FACT   | `.ds-text-mono-sm`                 |
| Metric         | `2.5rem` / 40px                        | 500    | 1.08            | 0        | primary        | tabular-nums | `Style.TextMetric`    | FACT   | `.ds-text-metric`                  |
| ERP Body Dense | 13px                                   | 400    | 1.35            | 0        | primary        | —            | `Style.TextBodyDense` | MAUI   | densify tables                     |
| ERP Cell       | 12–13px mono                           | 400    | 1.35            | 0        | code           | tabular-nums | `Style.TextCell`      | MAUI   | DataGrid                           |
| ERP KPI        | 22–28px mono                           | 500    | 1.1             | -0.015em | primary/accent | tabular-nums | `Style.TextKpi`       | MAUI   | summary strip (не 40px)            |
| ERP PageTitle  | 18–20px                                | 500    | 1.2             | -0.015em | primary        | —            | `Style.TextPageTitle` | MAUI   | no 48px heroes                     |

### 4.3 Undefined CSS vars used on site (do not invent in ERP)

Используются в CSS, **не объявлены** в `tokens.css`:

| Referenced var                                  | Files                                                            | MAUI action                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `--font-weight-semibold`                        | `sidebar.css`, `dashboard.css`, `registry.css`, `onboarding.css` | Use `500` (`FontWeightMedium`) — do not add 600 unless needed |
| `--font-weight-bold`                            | `module.css` brand title                                         | ERP: avoid; brand wordmark max Medium                         |
| `--line-height-label`                           | profile/dashboard/registry/writing                               | Use `1.4` (= compact)                                         |
| `--line-height-heading-sm`                      | dashboard/registry                                               | Use `1.2` (= heading)                                         |
| `--line-height-tight` / `--line-height-relaxed` | onboarding                                                       | Ignore for ERP                                                |

---

## 5. Spacing scale

| Token      | rem  | px  | Role                        | MAUI      | Origin | Source       |
| ---------- | ---- | --- | --------------------------- | --------- | ------ | ------------ |
| `space-0`  | 0    | 0   | Reset                       | `Space0`  | FACT   | `tokens.css` |
| `space-1`  | 0.25 | 4   | Icon gap                    | `Space1`  | FACT   | `tokens.css` |
| `space-2`  | 0.5  | 8   | Compact                     | `Space2`  | FACT   | `tokens.css` |
| `space-3`  | 0.75 | 12  | Dense pad                   | `Space3`  | FACT   | `tokens.css` |
| `space-4`  | 1    | 16  | Default                     | `Space4`  | FACT   | `tokens.css` |
| `space-5`  | 1.25 | 20  | Card pad                    | `Space5`  | FACT   | `tokens.css` |
| `space-6`  | 1.5  | 24  | Gutter / lg pad             | `Space6`  | FACT   | `tokens.css` |
| `space-8`  | 2    | 32  | Block gap                   | `Space8`  | FACT   | `tokens.css` |
| `space-10` | 2.5  | 40  | Module header gap           | `Space10` | FACT   | `tokens.css` |
| `space-12` | 3    | 48  | Subsection                  | `Space12` | FACT   | `tokens.css` |
| `space-16` | 4    | 64  | Section                     | `Space16` | FACT   | `tokens.css` |
| `space-20` | 5    | 80  | Large page pad              | `Space20` | FACT   | `tokens.css` |
| `space-24` | 6    | 96  | Desktop section (dashboard) | `Space24` | FACT   | `tokens.css` |
| `space-32` | 8    | 128 | Hero vertical               | `Space32` | FACT   | `tokens.css` |

### Web spacing → desktop ERP spacing

| Web usage                            | Web token            | ERP mapping               | Rule                     |
| ------------------------------------ | -------------------- | ------------------------- | ------------------------ |
| Page padding X mobile/tablet/desktop | 24 / 32 / 48         | `Space4`–`Space6` (16–24) | Сжать chrome             |
| Dashboard page padding-block desktop | `space-24` (96)      | `Space6`–`Space8` (24–32) | Marketing void → density |
| Card padding                         | `space-5` (20)       | `Space3`–`Space4` (12–16) | Dense panels             |
| Form field gap                       | `space-5`            | `Space3`–`Space4`         | Forms                    |
| Nav item min-height                  | `size-tap-target` 48 | `SizeRow` 32–36           | Desktop rows             |
| Grid gutter                          | `space-6`            | `Space3`–`Space4`         | Tables/grids             |
| Between major regions                | `space-8`–`space-16` | `Space4`–`Space6`         | Keep rhythm, lose void   |

Layout constants (FACT):

| Token                    | Value          | MAUI                        | Origin            |
| ------------------------ | -------------- | --------------------------- | ----------------- |
| `page-padding-x-mobile`  | 1.5rem / 24px  | ignore mobile               | FACT              |
| `page-padding-x-tablet`  | 2rem / 32px    | `SpacePageX` ≈ 20–24        | FACT              |
| `page-padding-x-desktop` | 3rem / 48px    | `SpacePageX` ≈ 20–24        | FACT→MAUI densify |
| `grid-gutter`            | `space-6`      | `SpaceGutter` = 12–16       | FACT→MAUI         |
| `card-min-height`        | 7.5rem / 120px | optional; tables don't need | FACT              |

---

## 6. Размеры и плотность

| Token                    | Value         | Role           | MAUI                                          | Origin    | Source       |
| ------------------------ | ------------- | -------------- | --------------------------------------------- | --------- | ------------ |
| `size-header-height`     | 3.5rem / 56px | Top chrome     | `SizeHeader` = 40–48                          | FACT→MAUI | `tokens.css` |
| `size-status-bar-height` | 2rem / 32px   | Bottom status  | `SizeStatusBar` = 24–28                       | FACT→MAUI | `tokens.css` |
| `size-sidebar-width`     | 15rem / 240px | Nav sidebar    | `SizeSidebar` = 200–220                       | FACT→MAUI | `tokens.css` |
| `size-sidebar-collapsed` | 4rem / 64px   | Collapsed rail | `SizeSidebarCollapsed` = 48–56                | FACT→MAUI | `tokens.css` |
| `size-tap-target`        | 3rem / 48px   | Touch min      | `SizeControl` = 32; `SizeControlComfort` = 36 | FACT→MAUI | `tokens.css` |
| `size-mobile-nav-height` | 4rem          | Mobile only    | **Forbidden in ERP**                          | FACT      | `tokens.css` |
| `icon-size-sm`           | 0.875rem / 14 | Icon           | `SizeIconSm`                                  | FACT      | `tokens.css` |
| `icon-size-md`           | 1rem / 16     | Icon           | `SizeIconMd`                                  | FACT      | `tokens.css` |
| `icon-size-lg`           | 1.25rem / 20  | Icon           | `SizeIconLg`                                  | FACT      | `tokens.css` |
| `icon-size-xl`           | 1.5rem / 24   | Icon           | `SizeIconXl`                                  | FACT      | `tokens.css` |
| `stroke-icon`            | 1.5px         | Icon stroke    | `StrokeIcon`                                  | FACT      | `tokens.css` |
| `container-content`      | 70rem         | Content max    | Full window; no marketing max-width           | FACT→MAUI | `tokens.css` |
| `container-narrow`       | 33.75rem      | Palette width  | Dialog ~480–540                               | FACT      | `tokens.css` |

**Плотность ERP (MAUI):** DataGrid row ~28–32px; form row ~32–36px; toolbar ~36–40px; KPI strip height ~56–72px.

---

## 7. Radii

| Token         | rem    | px   | Usage on site              | MAUI         | Origin | Note                                   |
| ------------- | ------ | ---- | -------------------------- | ------------ | ------ | -------------------------------------- |
| `radius-none` | 0      | 0    | —                          | `RadiusNone` | FACT   |                                        |
| `radius-sm`   | 0.25   | 4    | Badges, kbd                | `RadiusSm`   | FACT   | Preferred small chrome                 |
| `radius-md`   | 0.375  | 6    | Buttons, inputs, nav items | `RadiusMd`   | FACT   | **Default control**                    |
| `radius-lg`   | 0.5    | 8    | Cards, panels, modals      | `RadiusLg`   | FACT   | **Default panel**                      |
| `radius-xl`   | 0.75   | 12   | Overlay surface utility    | —            | FACT   | **>10px → ERP forbid**; use `RadiusLg` |
| `radius-full` | 9999px | pill | Status badges, dots        | `RadiusFull` | FACT   | Only dots/pills, not large panels      |

ERP max corner: **8px** (`RadiusLg`). Не использовать >10px.

---

## 8. Borders

| Token                      | Value | Role                        | MAUI                        | Origin |
| -------------------------- | ----- | --------------------------- | --------------------------- | ------ |
| `border-width-default`     | 1px   | Default                     | `BorderWidthDefault` = 1    | FACT   |
| `border-width-focus`       | 2px   | Focus outline width         | `BorderWidthFocus` = 2      | FACT   |
| `border-width-accent-rail` | 2px   | Left accent rail (selected) | `BorderWidthAccentRail` = 2 | FACT   |

**Patterns (FACT):**

- Default separation: `1px solid border-rest`
- Hover: border → `border-hover`, bg → elevated
- Selected/active nav: inset accent rail 2px (`sidebar.css`, language options, form choices)
- Primary highlight panels: `border-accent` + inset rail (`quick-actions`, contact pitch, product own card)

**ERP:** prefer borders over shadows for all grids, splitters, toolbars.

---

## 9. Shadows

| Token                 | Dark value                   | Usage         | MAUI          | Origin | Transfer                                            |
| --------------------- | ---------------------------- | ------------- | ------------- | ------ | --------------------------------------------------- |
| `shadow-none`         | `none`                       | Default       | `ShadowNone`  | FACT   | Переносить                                          |
| `shadow-panel`        | `none` (dark)                | Cards         | —             | FACT   | Не добавлять                                        |
| `shadow-card` / hover | `none` (dark)                | Cards         | —             | FACT   | Не добавлять                                        |
| `shadow-cta` / hover  | `none` (dark)                | CTA           | —             | FACT   | Не добавлять                                        |
| `shadow-modal`        | `0 8px 32px rgba(0,0,0,0.4)` | Modal/palette | `ShadowModal` | FACT   | Упростить: лёгкий drop shadow только у Window/Popup |
| `shadow-status-pulse` | pulse green                  | Status anim   | —             | FACT   | Запретить pulse glow в ERP                          |

Light-theme shadows (`tokens.css` light block) — **не переносить**.

---

## 10. Backgrounds и gradients

| Element                                                  | Value / behavior             | Origin                      | ERP                                                  |
| -------------------------------------------------------- | ---------------------------- | --------------------------- | ---------------------------------------------------- |
| App root / mesh base                                     | solid `color-bg-base`        | FACT `mesh-background.css`  | Solid `ColorBgBase`                                  |
| Mesh canvas + amber nodes                                | animated network             | FACT                        | **Запретить** (marketing atmosphere)                 |
| Mesh mouse glow                                          | radial amber glow 600px      | FACT                        | **Запретить**                                        |
| Mesh vignette                                            | radial dark vignette         | FACT                        | **Запретить**                                        |
| Engineering grid utility                                 | 24px grid lines @ 4% opacity | FACT `.ds-engineering-grid` | Optional micro-texture only if readable; default off |
| Noise overlay                                            | opacity 0.02                 | FACT                        | Optional; default off                                |
| Accent linear accents (mobile sidebar scan, sticker pin) | decorative gradients         | FACT                        | **Запретить**                                        |
| Light theme radial wash                                  | blue wash                    | FACT light                  | **Запретить**                                        |

ERP backgrounds: **solid surfaces only** (`Base` / `Recessed` / `Surface` / `Elevated`).

---

## 11. Buttons

### 11.1 Variants found on site

| Variant                    | Rest                                                              | Hover                                  | Active                     | MAUI Style               | Origin | Source                                                             |
| -------------------------- | ----------------------------------------------------------------- | -------------------------------------- | -------------------------- | ------------------------ | ------ | ------------------------------------------------------------------ |
| Primary solid              | bg/border `accent`, text `inverse`, radius md, min-h 48, pad-x 20 | `accent-hover`                         | (`accent-active` in light) | `Style.ButtonPrimary`    | FACT   | `.ds-contact-form-submit`, `.onboarding-overlay-button--primary`   |
| Primary soft / CTA outline | bg `accent-muted`, border `accent-border`, text `accent`, mono 13 | fill accent + text inverse             | translateY(1px)            | `Style.ButtonAccentSoft` | FACT   | `.ds-services-cta`, `.ds-engagements-cta`                          |
| Secondary                  | transparent/elevated, border rest, text primary                   | border hover + elevated                | —                          | `Style.ButtonSecondary`  | FACT   | `.ds-services-cta--secondary`, onboarding secondary                |
| Ghost / chrome control     | transparent, border rest, text secondary, radius md               | text primary + elevated + border hover | —                          | `Style.ButtonGhost`      | FACT   | header command, status toggle, filter clear, missing-module action |
| Quick action               | recessed bg, border rest                                          | elevated                               | —                          | `Style.ButtonRow`        | FACT   | `.ds-quick-action`                                                 |
| Quick action primary       | border accent; value text accent                                  | border solid accent                    | —                          | `Style.ButtonRowPrimary` | FACT   | `.ds-quick-action--primary`                                        |

### 11.2 Shared metrics

| Property   | Value                                       | Origin | ERP                      |
| ---------- | ------------------------------------------- | ------ | ------------------------ |
| Min height | `size-tap-target` 48px                      | FACT   | 32–36px                  |
| Pad X      | `space-4`–`space-5`                         | FACT   | 12–16                    |
| Radius     | `radius-md` 6px                             | FACT   | 6px                      |
| Transition | 120ms ease-default                          | FACT   | 120ms opacity/color      |
| Focus      | 2px outline `accent-focus`, offset 2px      | FACT   | MAUI VisualState Focused |
| Disabled   | opacity 0.4 global; submit wait opacity 0.7 | FACT   | `OpacityDisabled` 0.4    |

**Gold rule:** solid gold fill — только primary action на экране (Save / Post / Confirm). Soft accent — secondary emphasis. Не заливать toolbar целиком.

---

## 12. Inputs и forms

Эталон: Communication form (`contact.css`) + Registry filters (`registry.css`).

| Element                   | Spec                                                                           | MAUI                                          | Origin | Source                        |
| ------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- | ------ | ----------------------------- |
| Field stack               | column, gap `space-2`                                                          | `Style.FormField`                             | FACT   | `.ds-contact-form-field`      |
| Label                     | label style: 12px, medium, wide tracking, uppercase, tertiary                  | `Style.FormLabel`                             | FACT   | `.ds-contact-form-label`      |
| Required mark             | accent color                                                                   | `ColorAccent`                                 | FACT   | `.ds-contact-form-required`   |
| Hint                      | body-sm tertiary                                                               | `Style.FormHint`                              | FACT   | `.ds-contact-form-hint`       |
| Input / Select / TextArea | bg `base`, border rest 1px, radius md, mono-sm, text primary, min-h 48, pad 12 | `Style.Entry`, `Style.Editor`, `Style.Picker` | FACT   | `.ds-contact-form-input` etc. |
| Placeholder               | tertiary                                                                       | —                                             | FACT   |                               |
| Focus                     | border `border-focus` + focus ring                                             | VisualState Focused                           | FACT   |                               |
| Invalid                   | border `status-critical`                                                       | VisualState Invalid                           | FACT   | `[aria-invalid=true]`         |
| Error text                | mono-sm + critical                                                             | `Style.FormError`                             | FACT   | `.ds-contact-form-error`      |
| Choice (radio/chip)       | recessed, border rest; checked: border accent + inset rail + elevated          | `Style.ChoiceChip`                            | FACT   | `.ds-contact-form-choice`     |
| Filter bar                | elevated surface, pad 16–20                                                    | `Style.FilterBar`                             | FACT   | `.ds-registry-filters`        |
| Search/select filters     | same as inputs on base bg                                                      | —                                             | FACT   | `.ds-registry-filter-input`   |

Form section emphasis: accent border + inset rail (`.ds-contact-form-section`) — в ERP использовать для **финансового summary / critical form**, не для каждой группы полей.

---

## 13. Navigation

### 13.1 App shell (FACT)

Grid (`shell.css`):

- Rows: header 56 / content flex / status 32
- Columns: sidebar 240 / content flex
- Areas: header full width; sidebar+content; status full width

| Part       | Background            | Border      | MAUI                   | Origin               |
| ---------- | --------------------- | ----------- | ---------------------- | -------------------- |
| Header     | recessed              | bottom rest | `Style.ShellHeader`    | FACT `header.css`    |
| Sidebar    | recessed              | right rest  | `Style.ShellSidebar`   | FACT `sidebar.css`   |
| Content    | transparent over base | —           | `Style.ShellContent`   | FACT                 |
| Status bar | recessed              | top rest    | `Style.ShellStatusBar` | FACT `statusbar.css` |

### 13.2 Sidebar nav item

| State         | Text      | Background  | Border      | Extra                | Origin |
| ------------- | --------- | ----------- | ----------- | -------------------- | ------ |
| Rest          | secondary | transparent | transparent | —                    | FACT   |
| Hover         | primary   | elevated    | hover       | —                    | FACT   |
| Active        | primary   | elevated    | hover       | 2px accent rail left | FACT   |
| Focus-visible | primary   | elevated    | focus       | outline accent-focus | FACT   |
| Brand active  | accent    | elevated    | —           | mono label           | FACT   |

MAUI: `Style.NavItem`, `Style.NavItemSelected` with `BorderWidthAccentRail` left.

### 13.3 Header chrome controls

Wordmark body-sm medium; version badge accent-muted + mono accent value; breadcrumb secondary; clock/status/command = ghost bordered chips (`header.css`).

### 13.4 Mobile patterns

Overlay sidebar, burger, blur header — **Forbidden in desktop ERP**.

---

## 14. Cards и panels

| Pattern                      | Spec                                                                                                          | When to use in ERP                       | Origin | Source                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------ | --------------------------------------- |
| Surface card                 | bg surface, border rest, radius lg, **no shadow**                                                             | Grouped interactive block                | FACT   | `.ds-surface-card`                      |
| Elevated                     | bg elevated, border hover                                                                                     | Hover elevation                          | FACT   | `.ds-surface-elevated`                  |
| Dashboard card               | pad 20, gap 12, min-h ≥120, hover: elevated + border-hover + translateY(-1px); top accent signal line expands | Module tile / clickable summary          | FACT   | `.ds-dashboard-card`                    |
| OC header / Registry summary | surface + border + pad; label/value grid                                                                      | **Financial summary strip**              | FACT   | `.ds-oc-header`, `.ds-registry-summary` |
| Activity log                 | recessed + border                                                                                             | Audit feed panel                         | FACT   | `.ds-activity-log`                      |
| Quick actions                | surface + accent border + inset rail                                                                          | Primary shortcuts panel (1 per view max) | FACT   | `.ds-dashboard-quick-actions`           |
| Profile section              | surface + pad 24                                                                                              | Settings group                           | FACT   | `.ds-profile-section`                   |
| Data row                     | label tertiary uppercase + mono value                                                                         | Key/value inside panels — **not a card** | FACT   | `.ds-data-row`                          |
| Product card own             | accent-tinted mix ~6% + stronger border                                                                       | Selected entity highlight                | FACT   | `.ds-product-card--own`                 |

**ERP rule:** table/grid = flat on `BgBase`/`BgRecessed` with row separators `BorderSubtle`. Card only for: summary, filters, dialog, empty state, related action group.

---

## 15. Statuses и badges

### 15.1 Status colors → meaning

| Status                             | Color     | Dot usage                            | MAUI                     |
| ---------------------------------- | --------- | ------------------------------------ | ------------------------ |
| Operational / Production / Success | `#34D399` | header/status dots; production badge | `ColorStatusOperational` |
| Warning                            | `#FBBF24` | warnings                             | `ColorStatusWarning`     |
| Critical / Error                   | `#F87171` | errors, invalid                      | `ColorStatusCritical`    |
| Info / Experimental                | `#60A5FA` | info badge                           | `ColorStatusInfo`        |
| In progress / In Development       | `#F0B429` | progress                             | `ColorStatusInProgress`  |
| Archived                           | `#565C66` | archived                             | `ColorStatusArchived`    |

### 15.2 Registry status badge (FACT)

`.ds-registry-status`: inline-flex, gap 8, pad-x 12 pad-y 4, border rest, **radius-full**, bg base, mono-sm label secondary, 8px colored dot.

MAUI: `Style.StatusBadge` + `Style.StatusDot`.

Version badge (header): radius-sm, accent-muted bg, mono, accent value — `Style.VersionBadge`.

---

## 16. Modals, dropdowns и toasts

| Component                | Spec                                                        | MAUI                                                                                       | Origin                                     | Source                       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------------------------- |
| Command palette backdrop | glass-backdrop + blur 8                                     | solid `rgba(0,0,0,0.55)` **без blur**                                                      | FACT→MAUI simplify                         | `palette.css`                |
| Palette panel            | overlay bg, border rest, radius lg, max width narrow        | `Style.Dialog` / Flyout                                                                    | FACT                                       | `.ds-palette`                |
| Palette input            | mono-sm, bottom border only                                 | —                                                                                          | FACT                                       |                              |
| Palette item             | min-h 48, radius md; hover/active = elevated + primary text | `Style.MenuItem`                                                                           | FACT                                       |                              |
| Onboarding modal         | elevated translucent + blur + shadow-modal                  | solid `ColorBgOverlay` + `ShadowModal` light; **no blur**                                  | FACT→MAUI                                  | `onboarding.css`             |
| Lightbox                 | overlay + blur backdrop + shadow-modal                      | Popup; no blur                                                                             | FACT→MAUI                                  | `mdx-engineering-record.css` |
| Language picker dropdown | expand panel, options like nav                              | `Style.Dropdown`                                                                           | FACT                                       | `onboarding.css`             |
| Toast                    | only `--z-toast: 80` token; **no toast UI styles found**    | `Style.Toast` MAUI: surface elevated, 1px border, left status rail, mono message, no glass | MAUI (invented structure from tokens only) | `tokens.css` z-index         |

---

## 17. Loading, empty и error states

| State             | Site behavior                                             | ERP                                                                | Origin                          |
| ----------------- | --------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------- |
| Loading naming    | Brand: «Initializing» / «Module Ready»                    | «Initializing…» soft tertiary mono                                 | FACT (Brand Bible vocabulary)   |
| DashboardSkeleton | Renders real sections (not shimmer CSS)                   | Use subtle skeleton: elevated bars on recessed, no shimmer rainbow | FACT component                  |
| Empty registry    | dashed border rest, surface bg, mono-sm secondary message | `Style.EmptyState` dashed 1px                                      | FACT `.ds-registry-empty`       |
| Empty KB          | solid border surface + mono message                       | same                                                               | FACT `.ds-kb-empty`             |
| Empty activity    | tertiary mono                                             | inline empty row                                                   | FACT                            |
| Missing module    | mono tertiary + ghost action button                       | `Style.ErrorState` / empty page                                    | FACT `.ds-missing-module`       |
| Form error        | critical mono text + invalid border                       | bind to Validation                                                 | FACT                            |
| Form success      | operational border + inset rail                           | success banner                                                     | FACT `.ds-contact-form-success` |
| Disabled          | opacity 0.4, cursor not-allowed                           | `OpacityDisabled`                                                  | FACT `globals.css`              |

---

## 18. Hover, focus, selected и disabled states

| State                       | Pattern                                                               | Origin                        |
| --------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| Hover (interactive surface) | text → primary; bg → elevated; border → hover; duration 120ms         | FACT many components          |
| Hover (card)                | + translateY(-1px); optional accent signal line width 100%            | FACT dashboard                |
| Focus-visible               | outline 2px solid `accent-focus`, offset 2px; often also border-focus | FACT `globals.css`, utilities |
| Selected / active nav       | elevated + accent rail 2px                                            | FACT sidebar                  |
| Selected choice             | accent border + inset rail                                            | FACT form choice / language   |
| Pressed primary             | accent-active (defined); soft CTA translateY(1px)                     | FACT                          |
| Disabled                    | opacity 0.4                                                           | FACT                          |
| Aria-disabled chrome        | opacity muted 0.6, no hover change                                    | FACT header command           |
| Text selection              | amber 25% bg                                                          | FACT                          |

MAUI VisualStates: `Normal`, `PointerOver`, `Pressed`, `Focused`, `Selected`, `Disabled`, `Invalid`.

---

## 19. Motion и transitions

| Token                            | Value                              | Role            | MAUI              | Origin | Transfer           |
| -------------------------------- | ---------------------------------- | --------------- | ----------------- | ------ | ------------------ |
| `motion-duration-instant`        | 0ms                                | reduced motion  | `DurationInstant` | FACT   | Переносить         |
| `motion-duration-fast`           | 120ms                              | hover/micro     | `DurationFast`    | FACT   | Переносить         |
| `motion-duration-base`           | 200ms                              | standard        | `DurationBase`    | FACT   | Переносить         |
| `motion-duration-slow`           | 400ms                              | panel enter     | `DurationSlow`    | FACT   | Упростить / редко  |
| `motion-duration-reveal`         | 600ms                              | reveal          | —                 | FACT   | Запретить в ERP UI |
| `motion-duration-counter`        | 800ms                              | metric count    | optional KPI      | FACT   | Упростить          |
| `motion-duration-pulse`          | 600ms                              | pulse           | —                 | FACT   | Запретить          |
| `motion-duration-pulse-interval` | 4000ms                             | status pulse    | —                 | FACT   | Запретить          |
| `motion-ease-default`            | `cubic-bezier(0.25, 0.1, 0.25, 1)` | default         | `EaseDefault`     | FACT   | Переносить         |
| `motion-ease-enter`              | `cubic-bezier(0.16, 1, 0.3, 1)`    | enter           | `EaseEnter`       | FACT   | Редко              |
| `motion-card-lift`               | -1px                               | card hover      | optional          | FACT   | Упростить          |
| `motion-translate-y-max`         | 0.5rem                             | enter translate | —                 | FACT   | Упростить          |

`prefers-reduced-motion: reduce` → durations → 0 (`globals.css`) — respect in MAUI if available.

**ERP allowed motion:** color/border/opacity 120–200ms; dialog fade 200ms.  
**Forbidden:** sticker float, mesh, boot pulse, parallax, bounce, continuous glow ping.

---

## 20. Использование декоративных элементов

| Element                      | Site                                  | ERP                                      |
| ---------------------------- | ------------------------------------- | ---------------------------------------- |
| Accent rail 2px              | Selected / primary panels             | **Разрешено** — selection & KPI emphasis |
| Status dots 8px              | Health indicators                     | **Разрешено**                            |
| Signal line on card hover    | Dashboard cards                       | Optional on clickable tiles only         |
| Mesh / vignette / glow       | Atmosphere                            | **Запрещено**                            |
| Glass + backdrop-filter      | Header mobile, overlays, light panels | **Запрещено**                            |
| Header contact stickers      | Marketing playful                     | **Запрещено**                            |
| Engineering grid / noise     | Barely visible texture                | Default off                              |
| Brand title text-shadow glow | `.ds-module-header--brand`            | **Запрещено**                            |
| Gold large fills             | Constrained on site                   | **Запрещено** area fills                 |

---

## 21. Адаптация под плотный desktop ERP

Обязательные поверхности FinancialERP:

| ERP region           | Surface                                          | Chrome                                                 | Notes                             |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------ | --------------------------------- |
| Window               | `ColorBgBase`                                    | —                                                      |                                   |
| Sidebar              | `ColorBgRecessed` + right border                 | NavItem + accent rail                                  | Width ~200–220                    |
| Top toolbar          | `ColorBgRecessed` + bottom border                | Ghost buttons; one Primary max                         | Height 40–48                      |
| Content              | `ColorBgBase`                                    | —                                                      | Full bleed, no 70rem cap          |
| Filter/toolbar strip | `ColorBgElevated` + border                       | Compact inputs 32h                                     |                                   |
| DataGrid             | base/recessed alternating optional               | row border subtle; selected row elevated + accent rail | Cell = mono 12–13                 |
| Financial summary    | `ColorBgSurface` + border; key KPI values accent | Not a stack of mini-cards                              | Like OC header / registry summary |
| Forms                | surface panel OR flat sections with separators   | Labels uppercase micro; values mono                    |                                   |
| Dialog               | `ColorBgOverlay` + border + light shadow         | No blur                                                |                                   |
| Status bar           | recessed 24–28h, mono-sm                         | Optional                                               |                                   |

Density targets: padding 12–16 in panels; gaps 8–12; avoid `space-16+` voids.

---

## 22. Mapping Web → .NET MAUI

### 22.1 Web component → MAUI component/style

| Web                                      | MAUI                                                       |
| ---------------------------------------- | ---------------------------------------------------------- |
| `.ds-shell`                              | `Shell` / custom `Grid` layout                             |
| `.ds-sidebar-nav-item`                   | `Border`+`Label` or `RadioButton` styled → `Style.NavItem` |
| `.ds-header-*`                           | Toolbar `Grid` → `Style.ShellHeader`                       |
| `.ds-statusbar-*`                        | Bottom `Border` → `Style.ShellStatusBar`                   |
| `.ds-dashboard-card`                     | `Border` Button/Frame → `Style.CardInteractive`            |
| `.ds-oc-header` / `.ds-registry-summary` | Summary `Border` + `Grid` → `Style.SummaryPanel`           |
| `.ds-data-row`                           | 2-row stack → `Style.DataRow`                              |
| `.ds-contact-form-input`                 | `Entry` / `Editor` / `Picker`                              |
| `.ds-contact-form-submit`                | `Button` `Style.ButtonPrimary`                             |
| `.ds-services-cta`                       | `Button` `Style.ButtonAccentSoft`                          |
| `.ds-registry-status`                    | `Border`+dot → `Style.StatusBadge`                         |
| `.ds-palette`                            | `Popup` / dialog                                           |
| `.ds-registry-empty`                     | Empty view → `Style.EmptyState`                            |
| Data tables (not on marketing site)      | `CollectionView` / DataGrid → `Style.DataGrid` **MAUI**    |
| Toast (token only)                       | custom toast → `Style.Toast` **MAUI**                      |

### 22.2 Web effect → переносить / упростить / запретить

| Effect                          | Decision                     |
| ------------------------------- | ---------------------------- |
| Surface layers + 1px borders    | **Переносить**               |
| Signal Amber accent             | **Переносить** (ограниченно) |
| Accent inset rail               | **Переносить**               |
| Focus amber ring                | **Переносить**               |
| 120ms color transitions         | **Переносить**               |
| Mono data typography            | **Переносить**               |
| Uppercase micro labels          | **Переносить**               |
| Modal drop shadow               | **Упростить**                |
| Card translateY hover           | **Упростить** / optional     |
| Metric 40px                     | **Упростить** → 22–28px KPI  |
| Page padding 48–96              | **Упростить** → 16–24        |
| Tap target 48                   | **Упростить** → 32–36        |
| radius-xl 12                    | **Упростить** → 8            |
| backdrop-filter / glass         | **Запретить**                |
| Mesh / glow / vignette          | **Запретить**                |
| Light theme blue accent         | **Запретить**                |
| Marketing stickers / float anim | **Запретить**                |
| Continuous status pulse glow    | **Запретить**                |
| Shadow on every panel           | **Запретить**                |
| Gold section fills              | **Запретить**                |
| Hero display 48px in app chrome | **Запретить**                |

---

## 23. Forbidden patterns

Для FinancialERP **запрещено**:

1. Glassmorphism и любой `backdrop-filter` / blur
2. Бесконтрольные gradients и mesh atmosphere
3. Радиусы > 10px без отдельного обоснования (site `radius-xl` = 12 → не брать)
4. Огромные padding (`space-16`–`space-32` как page chrome)
5. Мобильные паттерны: burger overlay, 48px touch everywhere, bottom-sheet onboarding
6. Слабый контраст (не опускать body ниже `ColorTextSecondary` на `ColorBgBase`)
7. Тени вокруг каждой панели
8. Золотые заливки больших областей / toolbar fills
9. Самовольные цвета вне таблицы §3
10. Oversized hero typography (Display 48 / brand glow title)
11. Карточка для каждого отдельного значения KPI
12. Декоративность в ущерб читаемости (stickers, scan lines, glow text-shadow)
13. Light-theme Signal Sky blue as ERP primary
14. Перенос marketing layout (centered 70rem, huge vertical whitespace) буквально

---

## 24. Индекс скриншотов

**Статус на момент анализа:** каталог `design-reference/screenshots/` создан пустым.  
Файлов скриншотов в рабочей копии сайта **не обнаружено** (поиск по репозиторию: нет `design-reference/**` изображений; OG-изображения в `public/og/` — marketing share cards, **не** UI-эталоны для ERP).

| Screenshot file | Эталон | Разрешено переносить | Не переносить буквально |
| --------------- | ------ | -------------------- | ----------------------- |
| _(нет файлов)_  | —      | —                    | —                       |

**Инструкция для следующего агента:** когда появятся PNG/WebP в `design-reference/screenshots/`, дополнить эту таблицу по шаблону:

```
| screenshots/<name>.png | что эталонно на кадре | элементы OK для ERP | marketing-only / не копировать |
```

Ожидаемые эталонные кадры (если будут добавлены): Operations Center, Sidebar+Header chrome, Product Registry list, Communication form, Command palette, Status badges.

---

## 25. Реестр исходных файлов

### Tokens & theme

| File                       | Role                                                       |
| -------------------------- | ---------------------------------------------------------- |
| `src/styles/tokens.css`    | **Source of truth** CSS variables                          |
| `src/styles/theme.css`     | Tailwind v4 `@theme inline` aliases                        |
| `src/styles/globals.css`   | Base html/body, focus, selection, disabled, reduced motion |
| `src/styles/utilities.css` | Typography/surface/border/motion utilities                 |
| `src/styles/reset.css`     | Reset                                                      |
| `src/styles/layout.css`    | Containers/grid                                            |
| `postcss.config.mjs`       | `@tailwindcss/postcss` only (no `tailwind.config.*`)       |
| `src/lib/fonts.ts`         | Geist Sans/Mono load                                       |

### Shell & chrome

| File                              | Role                                               |
| --------------------------------- | -------------------------------------------------- |
| `src/styles/shell.css`            | App shell grid                                     |
| `src/styles/sidebar.css`          | Sidebar nav states                                 |
| `src/styles/header.css`           | Header chrome (+ mobile/stickers — mostly non-ERP) |
| `src/styles/statusbar.css`        | Status bar                                         |
| `src/styles/boot.css`             | Boot pulse animations (non-ERP)                    |
| `src/styles/mesh-background.css`  | Mesh atmosphere (non-ERP)                          |
| `src/styles/palette.css`          | Command palette                                    |
| `src/styles/onboarding.css`       | Modal + language picker + button variants          |
| `src/styles/terminal.css`         | Terminal (optional inspiration for mono console)   |
| `src/styles/idle-screensaver.css` | Screensaver (non-ERP)                              |

### Modules / components styles

| File                                    | Role                                                  |
| --------------------------------------- | ----------------------------------------------------- |
| `src/styles/dashboard.css`              | Cards, OC header, activity, quick actions             |
| `src/styles/module.css`                 | Module header / missing module                        |
| `src/styles/registry.css`               | Summary, filters, status badges, empty, product cards |
| `src/styles/contact.css`                | Forms, channels, primary submit                       |
| `src/styles/profile.css`                | Sections, data rows, tags                             |
| `src/styles/services.css`               | CTA button variants                                   |
| `src/styles/engagements.css`            | CTA variants                                          |
| `src/styles/writing.css`                | KB cards/empty                                        |
| `src/styles/mdx-engineering-record.css` | Lightbox modal pattern                                |

### Key components (structure, not business logic)

| File                                                      | Role                    |
| --------------------------------------------------------- | ----------------------- |
| `src/components/shell/*`                                  | Shell composition       |
| `src/components/ui/DataRow.tsx`                           | Data row                |
| `src/components/ui/ModuleHeader.tsx`                      | Module header           |
| `src/components/modules/product-registry/StatusBadge.tsx` | Status badge tones      |
| `src/components/modules/communication/ContactForm.tsx`    | Form structure          |
| `src/components/modules/dashboard/*`                      | Dashboard cards/metrics |

### Brand / token docs (intent; CSS wins on conflicts)

| File                       | Role                                    |
| -------------------------- | --------------------------------------- |
| `docs/01_BRAND_BIBLE.md`   | Identity, accent ≤4%, motion philosophy |
| `docs/11_DESIGN_TOKENS.md` | Spec (частично устарел vs `tokens.css`) |

---

## Appendix A — MAUI ResourceDictionary skeleton (names only)

```xml
<!-- Colors: ColorBgBase, ColorBgRecessed, ColorBgSurface, ColorBgElevated, ColorBgOverlay,
     ColorAccent, ColorAccentHover, ColorAccentActive, ColorAccentMuted, ColorAccentBorder, ColorAccentFocus,
     ColorTextPrimary, ColorTextSecondary, ColorTextTertiary, ColorTextDisabled, ColorTextInverse, ColorTextCode,
     ColorStatusOperational, ColorStatusWarning, ColorStatusCritical, ColorStatusInfo, ColorStatusInProgress, ColorStatusArchived,
     ColorSuccess, ColorError, ColorLink, ColorLinkHover,
     ColorBorderRest, ColorBorderHover, ColorBorderActive, ColorBorderSubtle, ColorBorderAccent, ColorBorderFocus,
     ColorSelectionBg -->
<!-- Sizes: Space1..Space8, SpacePageX, SpaceGutter, SizeHeader, SizeSidebar, SizeStatusBar, SizeControl, SizeRow,
     SizeIconSm|Md|Lg, RadiusSm|Md|Lg|Full, BorderWidthDefault|Focus|AccentRail, OpacityDisabled=0.4,
     DurationFast=120, DurationBase=200 -->
<!-- Styles: Text*, Button*, Form*, NavItem*, Shell*, CardInteractive, SummaryPanel, DataRow, DataGrid, StatusBadge, EmptyState, Dialog, Toast -->
```

---

## Appendix B — Self-review checklist

1. **Дубли / конфликты:** doc `#07090F` vs CSS `#000000` — ERP = CSS; light blue accent не смешивать с dark amber.
2. **FACT vs MAUI:** все hex/rem из `tokens.css`/`*.css` помечены FACT; densify sizes/spacings и Toast layout — MAUI.
3. **Пути:** все пути относительно корня сайта `my own site/`; проверены на существование стилевых файлов.
4. **Вода удалена:** только операционные правила.
5. **Нейминг MAUI:** единый `Color*` / `Style.*` / `Space*` / `Size*` / `Radius*`.
6. **Самодостаточность:** агент может собрать ResourceDictionary без чтения сайта; скриншоты отсутствуют — зафиксировано в §24.
7. **Исходники сайта:** не изменялись (добавлен только `design-reference/CODEV_TIM_DESIGN_BIBLE.md` и пустая `design-reference/screenshots/`).

---

_Конец Design Bible. Реализацию MAUI не начинать на основании этого документа без отдельной задачи._
