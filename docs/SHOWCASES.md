# Interactive project showcases

Codev_Tim keeps the portfolio, its commercial flows and the demonstrations in separate layers. The Next.js site owns navigation, case studies, localization and project requests. Each interactive showcase is a newly authored static document with fictional data and no application backend. The original project applications are not deployed inside the portfolio.

## Project inventory and provenance

| Canonical slug      | Public experience                                                                                              | Source relationship                                                                                                                                  | Boundary                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fire-safety-store` | FireSafe Demo: equipment catalogue, search, category filter, sorting, product dialog and local quote selection | Reconstructed from read-only observation of catalogue visual and interaction patterns                                                                | Six invented products, example prices/specifications and new SVG equipment artwork; no original product images, customer contacts, database or branding |
| `codev-erp`         | Financial ERP: choose a deal, advance review, reject or return it to draft                                     | Simplified browser model informed by the desktop project's `LeadStatus` concepts: `Draft`, `FinanceReview`, `DirectorReview`, `Approved`, `Rejected` | Newly written simulator; not the desktop runtime, its authorization model, accounting logic or database                                                 |
| `call-tracker`      | Call Tracker: filter fictional records, record a call outcome and choose a follow-up                           | Simplified browser model informed by source status concepts including `Callback`, `Discussion`, `Meeting` and `Deal`                                 | Newly written simulator; no real prospects, notes, calls, account or backend                                                                            |
| `assistant-agent`   | Existing static case study and reviewed images                                                                 | Documentation of the assistant project                                                                                                               | No interactive showcase, live AI session or API connection is advertised                                                                                |

Local read-only source baselines for the desktop ERP, assistant and call tracker are recorded in `showcases/source-baselines.json`. These identify the inspected checkout states; they do not establish that an original application has been built, executed, deployed or accepted. Source checkout verification is separate from showcase validation.

The neutral historical case slugs are `fire-safety-store`, `business-operations`, `document-workflow` and `staff-telegram-tools`. Their public labels describe completed work without claiming a current client association. Historical URL spellings remain solely as server redirect inputs in `next.config.ts`; locale-prefixed and non-prefixed case links redirect permanently to the neutral canonical routes. Do not restore historical branding in public text, filenames, images, metadata or search documents.

The neutral case diagrams and the Call Tracker diagram explicitly identify themselves as illustrative workflows, not application screenshots. FireSafe and Call Tracker also have `demo-preview.png` covers captured from the new local demonstrations; their localized captions identify them as fictional demo/simulation interfaces. A generated workflow diagram, a simulated interface, a reviewed screenshot and evidence of a working original application are different kinds of evidence. Keep their labels accurate when changing portfolio content.

## Runtime structure

```text
Next.js portfolio
  src/lib/showcases.ts                      Typed showcase registry and viewer copy
  src/components/commerce/Portfolio.tsx     Viewer on registered case studies
  src/components/commerce/ShowcaseViewer.tsx
  src/app/[locale]/projects/[slug]/demo/page.tsx
  src/styles/showcase.css
                |
                | sandboxed iframe
                v
Static public documents
  public/showcases/fire-safety-store/{ru,uz,en}/index.html
  public/showcases/fire-safety-store/{app.js,styles.css,equipment.svg}
  public/showcases/codev-erp/{ru,uz,en}/index.html
  public/showcases/call-tracker/{ru,uz,en}/index.html
  public/showcases/workflows/{app.js,styles.css}
```

`SHOWCASES` is the allowlist for interactive projects. `isShowcaseSlug` validates the route and prevents arbitrary slugs from becoming demo paths. `showcaseSource(slug, locale)` resolves the static document. Unknown demo slugs return the Next.js not-found response.

`PortfolioDetail` mounts a viewer only for registered projects. The case-study viewer starts with an explicit launch button, so opening a case does not immediately start its iframe. The dedicated demo route launches the same viewer immediately. Desktop uses available width; tablet and mobile controls constrain the iframe to at most 768 px and 390 px. They are viewport previews, not device or browser emulation. Reset remounts the iframe, and fullscreen uses the browser Fullscreen API.

The viewer includes loading and error copy plus a 20-second timeout. An iframe `load` event confirms a document load, not that all interactions work; browser smoke checks are still required. Fullscreen can be unavailable in some browsers or embedding environments.

## Build and edit locations

Edit source files rather than generated public output:

| Source                                                            | Generator                              | Output                                                       |
| ----------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| `showcases/fire-safety-store/content.mjs`, `app.js`, `styles.css` | `scripts/build-showcases.mjs`          | FireSafe documents and shared assets                         |
| `showcases/workflows/app.js`, `styles.css`                        | `scripts/build-workflow-showcases.mjs` | Financial ERP and Call Tracker documents plus shared runtime |

The FireSafe generator injects its localized content and product data into a classic script and formats generated assets with the repository's Prettier dependency. Its README describes the catalogue-specific implementation. The workflow generator copies the shared classic script and stylesheet, then writes one HTML document for each project and locale. Neither generator reads a source project's database or private application files.

From the repository root:

```powershell
npm run showcases:build
npm run search:build
npm run dev
```

`showcases:build` runs both generators. `search:build` is relevant when case text or canonical slugs change. `npm run build` runs both showcase generators, then search generation, then the Next.js production build. Static output must exist when serving these URLs; generators are not a request-time service. Review generated diffs together with their source changes.

The public demos require JavaScript for interaction. Their runtime uses browser APIs and local static assets, with no added framework or external runtime dependency. The workflow page includes a localized `noscript` message. FireSafe ships its initial catalogue as HTML, but its filters, dialogs and quote selection require JavaScript.

## Routes and localization

The website uses explicit `en`, `ru` and `uz` prefixes with Russian as the configured default. Examples:

```text
/ru/projects/fire-safety-store
/ru/projects/fire-safety-store/demo
/uz/projects/codev-erp/demo
/en/projects/call-tracker/demo
```

The iframe document is outside locale middleware routing:

```text
/showcases/fire-safety-store/ru/index.html
/showcases/codev-erp/uz/index.html
/showcases/call-tracker/en/index.html
```

Static documents set their own `lang` attribute and have internal language links. Changing language navigates to a new document and resets in-memory state. `SHOWCASE_COPY` localizes the outer viewer independently of the inner demo dictionary. Keep both layers complete when adding a locale or control.

Demo wrappers generate localized static parameters, canonical URLs and language alternates. They request `noindex, follow`; raw static documents request `noindex, nofollow`. Normal project case studies remain the discoverable portfolio content.

## Isolation and data handling

The iframe sandbox is exactly `allow-scripts`. It does not grant same-origin access, form submission, popups, downloads or top-level navigation. The iframe sets `referrerPolicy="no-referrer"`. Do not add `allow-same-origin` to simplify communication or storage access.

`next.config.ts` applies these headers to `/showcases/:path*`:

- A restrictive Content Security Policy: no default resource permission, scripts/styles/images limited to their stated local sources, `connect-src 'none'`, `form-action 'none'`, `base-uri 'none'`, and `frame-ancestors 'self'`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: no-referrer`.
- `X-Robots-Tag: noindex, nofollow`.

Each generated HTML document also includes a CSP meta element. The server header supplies `frame-ancestors`, which cannot be enforced by a CSP meta element. Self-hosted HTML, JavaScript, CSS and image requests still occur; the intended restriction is that demo actions have no API, third-party service or data-submission connection.

Demo state exists only in JavaScript memory. There is no cookie, browser-storage persistence, authentication, payment, telemetry, live AI, email delivery or request backend inside these demos. FireSafe's quote submission produces a local confirmation. Call Tracker's free-text note is displayed through `textContent`; it is not interpolated into HTML. Refresh, reset or language navigation discards demo state. The surrounding website retains its existing independent contact and commercial flows.

All public demo data is fictional and visibly disclosed in each language. Never copy source `.env` files, credentials, exports, customer records, contact details, real notes, original branded imagery or administrative screens into a showcase. Use new generic assets and invented records. If a source interaction requires a private service, reproduce the smallest useful local interaction and disclose the simulation instead of connecting that service.

## Homepage experience and motion

`StudioHero.tsx` provides the Living Engineering Canvas: monumental type, immediate project/contact actions and three selectable interface fragments. These are HTML/CSS illustrative models with fictional-data disclosure, not screenshots or a second instance of the full demo. Selection updates the project description and local case/demo links. Existing pricing, calculator and Express Start callbacks are retained.

`immersive.css` is loaded after the existing creative and commerce styles. It supplies 2.5D transforms, responsive layouts and token-based dark/light colors without a WebGL dependency. Pointer movement is used only for fine pointers. The hook queues at most one animation frame per input event; it does not run a perpetual render loop. Scroll position produces a small translation and scale change within the hero. Scrolling remains native.

Intersection observation stops the hero's scheduled work offscreen. Hidden-document and reduced-motion handling resets transforms, and unmount removes listeners and cancels pending frames. Reduced-motion CSS also disables fragment transitions and the short entrance sequence. Any future animation must preserve these stop conditions and keep the content available before animation runs.

`SceneNavigation.tsx` uses native anchor links and an IntersectionObserver to mark the current chapter. `EngineeringStory.tsx` switches among localized catalogue, business-system and bot process diagrams. Those diagrams explain possible implementation flows; their note makes clear that a specific project's scope depends on its task.

## Adding a showcase

1. Choose a neutral canonical project slug and define the public interaction to demonstrate. Identify whether the result is an independent simulator, an illustrative model or a sanitized application build, and use the matching disclosure.
2. Write self-contained source under `showcases/<slug>/`, or extend `showcases/workflows/` if the same simulator runtime genuinely fits. Use invented records and local assets. Keep user-entered text out of HTML interpolation.
3. Add generation for `public/showcases/<slug>/{ru,uz,en}/index.html` and any shared files. Include localized titles, `lang`, noindex metadata, CSP, disclosures and a meaningful no-JavaScript state. Connect the generator to `showcases:build`.
4. Register the slug and its title/kind in `src/lib/showcases.ts`. The existing route and `PortfolioDetail` then provide the standard viewer for a corresponding portfolio entry.
5. Add or update the project registry, localized case content and any image manifest entries. Use accurate status/evidence labels. Update search and generated social images if those public records change.
6. Rebuild, inspect the generated files, then validate in the actual sandboxed iframe as well as the dedicated route. Do not weaken sandbox or CSP permissions to make a source application's backend assumptions work.

## Verification boundary

The implementation was checked on 5 November 2026 against a local production build served by `next start`. This is not a public deployment report or proof that an original source application is running.

| Check                   | Observed result                                                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production build        | Passed; 84 generated pages; homepage first-load JS reported by Next.js: 173 kB                                                                                                                                 |
| TypeScript / lint       | `npm run typecheck` and `npm run lint` passed                                                                                                                                                                  |
| Commercial logic        | 34 commerce and 6 Express Start checks passed; external delivery mocked                                                                                                                                        |
| Public HTTP audit       | 54 sitemap pages; 243 internal links and 210 assets checked; zero failures/warnings                                                                                                                            |
| Routing / SEO           | 19 existing crawler/routing checks and 28 showcase/redirect/header checks passed                                                                                                                               |
| Demo browser flows      | 12 cases passed: 9 project/locale combinations on desktop/mobile and 3 sandboxed wrappers; filters, dialogs, mock actions, language, reset, viewport, fullscreen, direct open and return                       |
| Main site browser flows | 18 locale/viewport combinations (360, 390, 768, 1024, 1440, 1920 px); hero selection, engineering selector, theme, menu/Escape, lazy demo and calculator focus passed                                          |
| Motion / geometry       | Reduced-motion check passed; 108 focused card-bound checks across locales, widths and selections passed                                                                                                        |
| Privacy / isolation     | 593 source/public/generated text assets checked, including client chunks and prerendered HTML/RSC; opaque iframe origin and denied parent/storage access verified; no external demo requests or console errors |
| Source preservation     | Four source HEADs and porcelain-status hashes matched discovery; no writes or builds in original repositories                                                                                                  |
| Contrast                | 72 existing opaque token pairs passed; this is not a complete WCAG certification                                                                                                                               |

Desktop/mobile screenshots were captured and inspected. The browser scripts write reports and PNGs to ignored `data/showcase-qa/`; the HTTP audit writes `data/production-http-audit.json`. The two public demo covers were separately inspected after capture.

The local Chromium homepage sample recorded LCP between 68 and 508 ms and maximum CLS 0.000294 across the 18 viewport/locale loads. These are **unthrottled loopback measurements**, mixing a first load with cached resources, not field Core Web Vitals, a Lighthouse score or a real-phone performance claim. No animation dependency was added; demo frames on normal case pages load on demand.

Re-run browser scripts with an available Playwright installation (`CODEV_PLAYWRIGHT_MODULE` can point to its package directory), optional `CODEV_CHROMIUM_EXECUTABLE`, and `BASE_URL` pointing at the running server. `npm ci` must include build/dev dependencies; run `npm run build` and `npm start` as for the existing Next.js deployment. Source checkouts and Playwright are not runtime dependencies. `scripts/verify-showcase-sources.mjs` is a local provenance check, not a hosting build step.

Public Railway deployment, public-domain smoke checks, real-device Safari/Firefox behavior, field performance and real external enquiry delivery remain separate release checks. The assistant and other backend/desktop cases intentionally have no live runtime; only the three registered experiences are interactive.

Before calling a release verified, cover:

- All three demo projects and all three locales; case launch and dedicated demo entry; reset, viewport selection, fullscreen behavior and return-to-case links.
- FireSafe search/category/sort, product dialog keyboard behavior, local quote selection and its clearly simulated confirmation.
- ERP review/rejection/reset and Call Tracker status/follow-up/note behavior, including empty filters and feedback after action.
- Keyboard traversal, focus visibility, reduced motion, dark/light outer layout, and horizontal overflow at 360, 390, 768 and 1440 px.
- Browser console and network evidence that scripts execute inside the restrictive sandbox, public assets load, and demo actions issue no data/API requests.
- Public headers, locale metadata, canonical neutral URLs, redirects, search output and absence of private or historical branded public assets.
- Exact release commit and deployment status separately from local build and browser checks.

## Research references and limits

The [CSS Design Awards 2025 winners article](https://cssdesignawards.com/blog/2025-website-of-the-year-winners/430/) was published on 12 February 2026. It lists Dropbox Brand as Website of the Year and Bruno's Portfolio as Best Portfolio. Its text was used as a reference index; this is not a claim that the listed sites were visually inspected or reproduced.

The [Bruno Simon portfolio](https://bruno-simon.com/) exposes text describing discoverable interaction, keyboard/touch/gamepad controls, adjustable quality and recovery/reset controls. The reviewed text informed the principle that a playful experience should make controls and recovery clear. The Codev_Tim implementation uses its own HTML/CSS composition and does not copy Bruno's world, assets or source.

Awwwards and FWA pages were unavailable during this research pass. No visual inspection, award claim or design conclusion is attributed to those unavailable pages. These limited reference checks do not establish that the redesign has received any award or independent design review.
