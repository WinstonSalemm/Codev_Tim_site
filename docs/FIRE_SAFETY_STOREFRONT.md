# Mounted FireSafe storefront

`apps/fire-safety-store` contains a copied version of the original storefront frontend. Its page bodies, header, footer, navigation, product cards, catalog filters and cart originate from the source application. It is built independently from the portfolio because the storefront uses Tailwind 3 while the portfolio uses Tailwind 4.

The source checkout is read-only. The copy replaces the company name, telephone numbers, email, address and map identity with demonstration values. Customer accounts, orders, credentials, environment files, database connections and source analytics are not part of the deployed copy.

## Routing

The application's Next.js `basePath` is `/fire-safety-store`. The portfolio's rewrite proxies that entire prefix to the second Next process on loopback port 3101. HTML, React navigation requests, assets and local API endpoints share the same public prefix.

Examples:

```text
/fire-safety-store
/fire-safety-store/catalog
/fire-safety-store/catalog/<category>
/fire-safety-store/catalog/<category>/<product>
/fire-safety-store/cart
/fire-safety-store/guide
/fire-safety-store/about
/fire-safety-store/contacts
/fire-safety-store/documents
/fire-safety-store/documents/certificates
/fire-safety-store/promotions
/fire-safety-store/login
/fire-safety-store/register
```

`?lang=ru`, `?lang=uz` and `?lang=en` select the initial demo language. The copied language switcher changes language inside the application. Next links and raw asset/API paths must retain the mount prefix; do not route them through the portfolio's locale prefix.

The portfolio case and its iframe now load this application. Previous `/showcases/fire-safety-store/<locale>/index.html` entry URLs redirect to it.

## Data and interactions

Catalog records and media are local to this app. Local API adapters preserve the response shapes expected by the original components, allowing catalog search, categories, products and promotions to run without the source database. The copied cart persists locally between reloads. Account and checkout screens use demonstration behavior and do not create real accounts or send real orders.

The app is marked `noindex, nofollow`. Its CSP permits local scripts, styles, media and API calls while keeping frames on the same origin. The copied application is trusted first-party code and its iframe is not the opaque-origin sandbox used for the static workflow demos.

## Build and operation

Use the repository root commands `npm run build` and `npm start`. The storefront has a separate package lock and dependency installation. `scripts/start-apps.mjs` starts the storefront on loopback 3101 and the portfolio on `PORT` (3000 by default), forwarding process termination and failures. Reserve 3101 for the storefront.

The copied app can be built separately with `npm run build --prefix apps/fire-safety-store` after installing its dependencies. That does not rebuild the portfolio proxy or verify public deployment.

## Acceptance

Run `scripts/test-mounted-storefront.cjs` against the combined server. It checks direct URLs and desktop/mobile output, product-to-cart behavior, reload persistence, internal URL scope, removed original identity and navigation inside the portfolio iframe. Reports contain actual pass/fail results; this document itself is not a claim that a deployment has passed.

Public release verification requires the exact pushed SHA's Railway success status plus a public smoke of `/fire-safety-store`, a category, product, cart and portfolio viewer. The original source checkout must remain unchanged.
