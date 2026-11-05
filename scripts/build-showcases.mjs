import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";
import {
  ART,
  COPY,
  PRODUCTS,
  illustration,
} from "../showcases/fire-safety-store/content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "showcases/fire-safety-store");
const output = resolve(root, "public/showcases/fire-safety-store");
const formatOptions = await resolveConfig(resolve(root, ".prettierrc"));
async function writeGenerated(name, content) {
  const destination = resolve(output, name);
  await writeFile(
    destination,
    await format(content, {
      ...formatOptions,
      filepath: destination,
      ...(name.endsWith(".svg") ? { parser: "html" } : {}),
    }),
    "utf8"
  );
}
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]
  );
const csp =
  "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; font-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'";

function page(language) {
  const copy = COPY[language];
  const price = (value) =>
    `${new Intl.NumberFormat(language).format(value)} ${copy.currency}`;
  const cards = PRODUCTS.map(
    (product) =>
      `<article class="product"><button class="product-visual" type="button" data-detail="${product.id}" aria-label="${escapeHtml(copy.detail)}: ${escapeHtml(product.names[language])}">${illustration(product.art, escapeHtml(product.names[language]))}</button><div class="product-body"><span class="product-code">${product.id}</span><h3><button type="button" data-detail="${product.id}">${escapeHtml(product.names[language])}</button></h3><p class="product-price">${price(product.price)}</p><span class="price-note">${copy.priceNote}</span><button class="add-button" type="button" data-add="${product.id}" aria-pressed="false">${copy.add}</button></div></article>`
  ).join("\n");
  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <meta name="robots" content="noindex,nofollow">
  <meta name="referrer" content="no-referrer">
  <title>${copy.title}</title>
  <meta name="description" content="${escapeHtml(copy.intro)}">
  <link rel="stylesheet" href="../styles.css">
  <script src="../app.js" defer></script>
</head>
<body id="top">
  <div class="disclosure"><div class="wrap"><strong>${copy.disclosure}</strong><span>${copy.isolation}</span></div></div>
  <header class="header wrap">
    <a class="brand" href="#top">FireSafe<span aria-hidden="true">.</span><small>${copy.brand}</small></a>
    <button class="menu-button" id="menu-button" type="button" aria-controls="main-nav" aria-expanded="false" aria-label="${copy.menu}">☰</button>
    <nav id="main-nav" aria-label="${copy.menu}"><a href="#catalog">${copy.catalog}</a><a href="#guide">${copy.guide}</a></nav>
    <div class="languages" aria-label="${copy.language}">${["ru", "uz", "en"].map((locale) => `<a href="../${locale}/index.html" lang="${locale}" aria-label="${{ ru: "Русский", uz: "O‘zbekcha", en: "English" }[locale]}"${locale === language ? ' aria-current="page"' : ""}>${locale.toUpperCase()}</a>`).join("")}</div>
    <button class="quote-trigger" id="basket-open" type="button" aria-haspopup="dialog">${copy.basket}<b id="basket-count">0</b></button>
  </header>
  <main class="wrap">
    <section class="hero" aria-labelledby="hero-title">
      <div><p class="eyebrow">${copy.eyebrow}</p><h1 id="hero-title">${copy.headline}</h1><p>${copy.intro}</p><a href="#catalog">${copy.explore}<span aria-hidden="true">↗</span></a><div class="hero-note">${copy.points.map((point) => `<span>✓ ${point}</span>`).join("")}</div></div>
      <img class="hero-art" src="../equipment.svg" width="600" height="500" alt="${copy.mockSpec}">
    </section>
    <section id="catalog" aria-labelledby="catalog-title">
      <div class="catalog-heading"><h2 id="catalog-title">${copy.catalogTitle}</h2><span>${copy.catalogNote}</span></div>
      <div class="catalog-layout">
        <aside class="categories" aria-label="${copy.category}"><h3>${copy.category}</h3>${copy.categories.map((name, index) => `<button class="category-button" type="button" data-category="${index}" aria-pressed="${index === 0}">${name}</button>`).join("")}<p class="category-note">${copy.categoryNote}</p></aside>
        <div class="catalog-main">
          <div class="catalog-controls"><label class="search-label" for="search">${copy.search}<input id="search" type="search" placeholder="${copy.searchPlaceholder}" maxlength="100" autocomplete="off"></label><label class="sort-label" for="sort">${copy.sort}<select id="sort">${copy.sortOptions.map((name, index) => `<option value="${["default", "ascending", "descending"][index]}">${name}</option>`).join("")}</select></label></div>
          <p id="results-count" class="sr-only" aria-live="polite">${copy.found}: ${PRODUCTS.length}</p>
          <div id="products" class="products">${cards}</div>
          <div id="empty" class="empty" hidden><p>${copy.empty}</p><button id="reset" type="button">${copy.reset}</button></div>
        </div>
      </div>
    </section>
    <section class="guide" id="guide" aria-labelledby="guide-title"><div><h2 id="guide-title">${copy.guideTitle}</h2><p>${copy.guideLead}</p></div><ol>${copy.steps.map((step) => `<li>${step}</li>`).join("")}</ol></section>
  </main>
  <footer class="footer wrap"><p>${copy.footer}</p><a href="#top">${copy.backTop}</a></footer>
  <div id="selection-status" class="sr-only" role="status"></div>
  <dialog id="product-dialog" aria-labelledby="product-title"><div class="dialog-heading"><h2 id="product-title">${copy.detailsTitle}</h2><button class="close-button" type="button" data-close aria-label="${copy.close}">×</button></div><div id="product-content" class="detail-layout"></div><p class="demo-note">${copy.detailNote}</p></dialog>
  <dialog id="basket-dialog" aria-labelledby="basket-title"><div class="dialog-heading"><h2 id="basket-title">${copy.basketTitle}</h2><button class="close-button" type="button" data-close aria-label="${copy.close}">×</button></div><div id="basket-items"><p>${copy.basketEmpty}</p></div><div class="basket-total"><span>${copy.total}</span><span id="basket-total">${price(0)}</span></div><form id="quote-form" class="quote-form"><label for="brief">${copy.message}<textarea id="brief" maxlength="600" placeholder="${copy.messagePlaceholder}" autocomplete="off"></textarea></label><p class="demo-note">${copy.privacy}</p><button id="request-button" class="primary" type="button" disabled>${copy.request}</button><p id="request-status" class="status" role="status"></p></form></dialog>
</body>
</html>\n`;
}

await mkdir(output, { recursive: true });
const runtime = await readFile(resolve(source, "app.js"), "utf8");
await writeGenerated(
  "app.js",
  `const DEMO = ${JSON.stringify({ copy: COPY, products: PRODUCTS, art: ART })};\n${runtime}`
);
await writeGenerated(
  "styles.css",
  await readFile(resolve(source, "styles.css"), "utf8")
);
await writeGenerated(
  "equipment.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500"><ellipse cx="300" cy="438" rx="245" ry="30" fill="#380000" opacity=".25"/><circle cx="320" cy="222" r="184" fill="#fff" opacity=".04"/><g transform="translate(200 76) scale(1.5)">${ART.cabinet}</g><g transform="translate(14 77) scale(1.55)">${ART.extinguisher}</g><g transform="translate(210 270) scale(.75)">${ART.hose}</g></svg>\n`
);
for (const language of Object.keys(COPY)) {
  await mkdir(resolve(output, language), { recursive: true });
  await writeGenerated(`${language}/index.html`, page(language));
}
console.log("Built isolated FireSafe demo: ru, uz, en.");
