// Shared layout, cart storage and helpers used by every page.

const CART_KEY = "olive-cart";
const SETTINGS_KEY = "olive-payment-settings";
const SHIPPING_FLAT = 4.90;
const FREE_SHIPPING_FROM = 50;
const TAX_RATE = 0.09;

// ---------- Formatting ----------
function money(value) {
  const settings = Settings.get();
  return new Intl.NumberFormat("en-US", { style: "currency", currency: settings.currency }).format(value);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ---------- Storage helpers (localStorage can throw in private mode) ----------
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ---------- Cart ----------
const Cart = {
  items() {
    // { [productId]: quantity }, dropping anything no longer in the catalog
    const raw = load(CART_KEY, {});
    return Object.fromEntries(Object.entries(raw).filter(([id, qty]) => findProduct(id) && qty > 0));
  },
  add(id, qty = 1) {
    const items = this.items();
    items[id] = (items[id] || 0) + qty;
    this.write(items);
  },
  setQty(id, qty) {
    const items = this.items();
    if (qty <= 0) delete items[id];
    else items[id] = Math.min(qty, 99);
    this.write(items);
  },
  remove(id) { this.setQty(id, 0); },
  clear() { this.write({}); },
  write(items) {
    save(CART_KEY, items);
    updateCartBadge();
  },
  count() {
    return Object.values(this.items()).reduce((a, b) => a + b, 0);
  },
  lines() {
    return Object.entries(this.items()).map(([id, qty]) => {
      const product = findProduct(id);
      return { product, qty, total: product.price * qty };
    });
  },
  totals() {
    const subtotal = this.lines().reduce((sum, l) => sum + l.total, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
    const tax = subtotal * TAX_RATE;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  },
};

// ---------- Payment settings (no card data is ever stored) ----------
const Settings = {
  defaults: { method: "card", currency: "USD", saveInfo: false, name: "", email: "", phone: "", address: "", city: "", zip: "", country: "" },
  get() { return { ...this.defaults, ...load(SETTINGS_KEY, {}) }; },
  set(values) { save(SETTINGS_KEY, { ...this.get(), ...values }); },
  reset() { try { localStorage.removeItem(SETTINGS_KEY); } catch { /* ignore */ } },
};

// ---------- Layout ----------
function renderLayout(activePage) {
  const links = [
    ["index.html", "Home", "home"],
    ["shop.html", "Shop", "shop"],
    ["settings.html", "Payment Settings", "settings"],
  ];
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">🫒 Olive<span>Grove</span></a>
      <nav class="nav">
        ${links.map(([href, label, key]) => `<a href="${href}" class="${key === activePage ? "active" : ""}">${label}</a>`).join("")}
        <a href="cart.html" class="cart-link ${activePage === "cart" ? "active" : ""}">🛒 Cart<span class="cart-count" id="cart-count">0</span></a>
      </nav>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="container">© ${new Date().getFullYear()} OliveGrove — From our groves to your table. This is a demo store; no real payments are processed.</div>`;
  document.body.append(footer);

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.id = "toast";
  document.body.append(toast);

  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = Cart.count();
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- Product card (used on home + shop) ----------
function productCard(p) {
  return `
    <article class="product">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <span class="product-cat">${CATEGORIES[p.category]}</span>
        <h3>${escapeHtml(p.name)}</h3>
        <small>${p.unit}</small>
        <p class="product-desc">${escapeHtml(p.desc)}</p>
        <div class="product-footer">
          <span class="price">${money(p.price)}</span>
          <button class="btn btn-olive" data-add="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>`;
}

// One delegated listener handles every "Add to cart" button on the page.
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const product = findProduct(btn.dataset.add);
  Cart.add(product.id);
  showToast(`${product.name} (${product.unit}) added to cart`);
});
