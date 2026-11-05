(() => {
  "use strict";

  const language = document.documentElement.lang;
  const copy = DEMO.copy[language] || DEMO.copy.en;
  const selected = new Set();
  let category = 0;
  let activeProduct = null;
  const search = document.querySelector("#search");
  const sort = document.querySelector("#sort");
  const productGrid = document.querySelector("#products");
  const productDialog = document.querySelector("#product-dialog");
  const basketDialog = document.querySelector("#basket-dialog");
  const price = (value) =>
    `${new Intl.NumberFormat(language).format(value)} ${copy.currency}`;
  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character]
    );
  const art = (product) =>
    `<svg viewBox="0 0 300 270" aria-hidden="true" focusable="false">${DEMO.art[product.art]}</svg>`;
  const buttonLabel = (product) =>
    selected.has(product.id) ? copy.added : copy.add;

  function card(product) {
    const name = escapeHtml(product.names[language]);
    return `<article class="product"><button class="product-visual" type="button" data-detail="${product.id}" aria-label="${escapeHtml(copy.detail)}: ${name}">${art(product)}</button><div class="product-body"><span class="product-code">${product.id}</span><h3><button type="button" data-detail="${product.id}">${name}</button></h3><p class="product-price">${price(product.price)}</p><span class="price-note">${escapeHtml(copy.priceNote)}</span><button class="add-button" type="button" data-add="${product.id}" aria-pressed="${selected.has(product.id)}">${escapeHtml(buttonLabel(product))}</button></div></article>`;
  }

  function renderProducts() {
    const query = search.value.trim().toLocaleLowerCase(language);
    const products = DEMO.products.filter(
      (product) =>
        (!category || product.category === category) &&
        `${product.names[language]} ${product.id}`
          .toLocaleLowerCase(language)
          .includes(query)
    );
    if (sort.value === "ascending") products.sort((a, b) => a.price - b.price);
    if (sort.value === "descending") products.sort((a, b) => b.price - a.price);
    productGrid.innerHTML = products.map(card).join("");
    document.querySelector("#empty").hidden = products.length !== 0;
    document.querySelector("#results-count").textContent =
      `${copy.found}: ${products.length}`;
    document
      .querySelectorAll("[data-category]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(Number(button.dataset.category) === category)
        )
      );
  }

  function renderBasket() {
    const products = DEMO.products.filter((product) =>
      selected.has(product.id)
    );
    document.querySelector("#basket-count").textContent = String(
      products.length
    );
    document.querySelector("#basket-items").innerHTML = products.length
      ? products
          .map(
            (product) =>
              `<div class="basket-item"><div><strong>${escapeHtml(product.names[language])}</strong><br><span>${price(product.price)}</span></div><button type="button" data-remove="${product.id}" aria-label="${escapeHtml(copy.remove)}: ${escapeHtml(product.names[language])}">×</button></div>`
          )
          .join("")
      : `<p>${escapeHtml(copy.basketEmpty)}</p>`;
    document.querySelector("#basket-total").textContent = price(
      products.reduce((sum, product) => sum + product.price, 0)
    );
    document.querySelector("#request-button").disabled = products.length === 0;
    document.querySelector("#request-status").textContent = "";
  }

  function updateSelection(id) {
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    renderBasket();
    document.querySelectorAll("[data-add]").forEach((button) => {
      const product = DEMO.products.find(
        (item) => item.id === button.dataset.add
      );
      button.setAttribute("aria-pressed", String(selected.has(product.id)));
      button.textContent = buttonLabel(product);
    });
    document.querySelector("#selection-status").textContent =
      `${copy.basketNotice}: ${selected.size}`;
  }

  function showProduct(id) {
    const product = DEMO.products.find((item) => item.id === id);
    if (!product) return;
    activeProduct = id;
    document.querySelector("#product-title").textContent =
      product.names[language];
    document.querySelector("#product-content").innerHTML =
      `<div class="detail-art">${art(product)}</div><div class="detail-copy"><p class="product-code">${product.id}</p><p class="product-price">${price(product.price)}</p><span class="price-note">${escapeHtml(copy.priceNote)}</span><h3>${escapeHtml(copy.specs)}</h3><dl><dt>${escapeHtml(copy.model)}</dt><dd>${product.id}</dd><dt>${escapeHtml(copy.type)}</dt><dd>${escapeHtml(copy.categories[product.category])}</dd><dt>${escapeHtml(copy.use)}</dt><dd>${escapeHtml(copy.useNote)}</dd></dl><button class="add-button" type="button" data-add="${product.id}" aria-pressed="${selected.has(product.id)}">${escapeHtml(buttonLabel(product))}</button></div>`;
    productDialog.showModal();
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.hasAttribute("data-detail")) showProduct(button.dataset.detail);
    if (button.hasAttribute("data-add")) updateSelection(button.dataset.add);
    if (button.hasAttribute("data-remove")) {
      const id = button.dataset.remove;
      updateSelection(id);
      basketDialog.querySelector("[data-remove], .close-button").focus();
    }
    if (button.hasAttribute("data-category")) {
      category = Number(button.dataset.category);
      renderProducts();
    }
    if (button.hasAttribute("data-close")) button.closest("dialog").close();
  });
  search.addEventListener("input", renderProducts);
  sort.addEventListener("change", renderProducts);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    sort.value = "default";
    category = 0;
    renderProducts();
    search.focus();
  });
  document
    .querySelector("#basket-open")
    .addEventListener("click", () => basketDialog.showModal());
  const quoteForm = document.querySelector("#quote-form");
  quoteForm.addEventListener("submit", (event) => event.preventDefault());
  quoteForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.target.matches("textarea, button"))
      event.preventDefault();
  });
  document.querySelector("#request-button").addEventListener("click", () => {
    if (selected.size && quoteForm.reportValidity())
      document.querySelector("#request-status").textContent = copy.success;
  });
  document.querySelector("#menu-button").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    document.querySelector("#main-nav").classList.toggle("is-open", open);
  });
  document.querySelector("#main-nav").addEventListener("click", () => {
    document.querySelector("#main-nav").classList.remove("is-open");
    document
      .querySelector("#menu-button")
      .setAttribute("aria-expanded", "false");
  });
  productDialog.addEventListener("close", () => {
    if (document.activeElement === document.body)
      document.querySelector(`[data-detail="${activeProduct}"]`)?.focus();
  });
  renderProducts();
  renderBasket();
})();
