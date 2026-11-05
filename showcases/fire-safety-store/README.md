# FireSafe Demo

Independent, fictional reconstruction for the Codev_Tim project showcase.

Run `node scripts/build-showcases.mjs` from the repository root to reproduce the committed static output in `public/showcases/fire-safety-store/`. Open `/showcases/fire-safety-store/ru/index.html`, `/showcases/fire-safety-store/uz/index.html` or `/showcases/fire-safety-store/en/index.html` through a static server.

The source project was inspected read-only for visual and interaction patterns: burgundy `#660000` and white palette, rounded hero, equipment categories, searchable product cards, product details and a quote/cart flow. This implementation is newly written HTML, CSS and classic JavaScript. All six products, prices, specifications and SVG illustrations are fabricated for the demonstration. No source database, product media, contacts, credentials or backend files were copied.

The demo has no dependencies, remote assets, fetch calls, cookies, browser storage, analytics, authentication, payment flow or real request delivery. Selections live in JavaScript memory until navigation or reload. A mock enquiry produces only an on-screen confirmation. The CSP blocks network connections, form submissions, frames and plugins. The expected parent iframe sandbox is `allow-scripts` without `allow-same-origin`; the classic script requires no module fetch, storage access or parent DOM access.

The disclosure and interface are localized in Russian, Uzbek and English. Native dialogs provide keyboard focus containment and Escape dismissal; controls have accessible labels, visible focus, live result/selection announcements, and a reduced-motion rule. Mobile layout and navigation are supported.
