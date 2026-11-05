# Interactive project showcases

The portfolio supports two kinds of interactive project: a copied, sanitized storefront application and independently authored workflow simulations. Their runtime and validation requirements differ.

| Project       | Runtime                                                                                                                             | Entry point                                     |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| FireSafe      | Original storefront components and pages copied into an independent Next.js app, with local catalog data and demonstration identity | `/fire-safety-store`                            |
| Financial ERP | Static workflow simulation using fictional records                                                                                  | `/showcases/codev-erp/{ru,uz,en}/index.html`    |
| Call Tracker  | Static workflow simulation using fictional records                                                                                  | `/showcases/call-tracker/{ru,uz,en}/index.html` |

See [FIRE_SAFETY_STOREFRONT.md](./FIRE_SAFETY_STOREFRONT.md) for the copied application's route, data and deployment details. The earlier small FireSafe static catalog is superseded; its language entry URLs redirect to the mounted application. It is no longer produced by `npm run showcases:build`.

## Portfolio integration

`src/lib/showcases.ts` is the allowlist and resolves each project's current source URL. `ShowcaseViewer.tsx` renders the registered experience on a case page and on `/[locale]/projects/[slug]/demo`. A case page starts the viewer when requested; a dedicated demo page starts it immediately. Desktop, tablet and mobile controls constrain the iframe width. Fullscreen uses the browser API.

The copied storefront needs scripts, same-origin storage, navigation and local API requests to retain the original interactions. Its iframe permissions therefore differ from the opaque-origin workflow simulations. Those static simulations retain `sandbox="allow-scripts"`, no storage persistence and a CSP that forbids connections and form submission.

The viewer's load event only confirms that a document loaded. Verify actual in-frame interactions before treating a release as accepted. For FireSafe, reloading the frame preserves its locally stored cart, as on the original storefront.

## Build and run

From the repository root:

```powershell
npm ci
npm run build
npm start
```

The build installs and builds the separate storefront, generates the two static workflow demos, generates search data and builds the portfolio. `scripts/start-apps.mjs` runs both Next applications. The public portfolio port proxies `/fire-safety-store` to the storefront's loopback listener; only the portfolio port is exposed by the hosting service. `npm run dev` starts both development servers.

Workflow source is in `showcases/workflows/`; `scripts/build-workflow-showcases.mjs` generates the public documents. FireSafe source is in `apps/fire-safety-store/` and is edited and built as an application. Do not edit generated HTML or compiled Next output.

## Verification

- `scripts/test-mounted-storefront.cjs`: copied storefront direct pages, mounted navigation, desktop/mobile layout, cart persistence, identity replacement, local requests and iframe navigation.
- `scripts/test-showcases-browser.cjs`: Financial ERP and Call Tracker filters, workflow actions, language switching, reset and iframe isolation.
- `scripts/test-showcase-routes.mjs`: canonical case redirects, viewer metadata, legacy FireSafe redirects and runtime-specific response headers.
- `scripts/verify-showcase-sources.mjs`: read-only original checkout HEAD and worktree baselines.

Browser scripts accept `BASE_URL`, `CODEV_PLAYWRIGHT_MODULE` and optional `CODEV_CHROMIUM_EXECUTABLE`. Their reports and screenshots are written under ignored `data/`. Run them against an already started server. A Git push does not prove a release; separately check the Railway status attached to the exact commit and the public mounted routes.

## Other portfolio experiences

Financial ERP and Call Tracker remain illustrative simulations, not copied desktop applications or real accounting/call systems. They use fictional records and memory-only interaction state. Their script and page CSP blocks API requests and external submissions. The assistant project remains a case study, without a live AI session.

`StudioHero.tsx` and `EngineeringStory.tsx` use illustrative interface fragments and diagrams. Their animation respects reduced-motion, page visibility and offscreen state. These fragments are independent of the mounted storefront and must not be described as a full application screenshot.
