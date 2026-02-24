/* ── Prime Peds Fitness — script.js ── */

// ══════════════════════════════════════════
// PRODUCT DATA
// ══════════════════════════════════════════
const PRODUCTS = [];

// ══════════════════════════════════════════
// CART (localStorage)
// ══════════════════════════════════════════
function getCart() {
  try { return JSON.parse(localStorage.getItem('pp_cart') || '[]'); }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('pp_cart', JSON.stringify(cart));
  updateBadge();
}
function addToCart(productId, variant) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const key = `${productId}-${variant}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, productId, variant, qty: 1, name: product.name, price: product.price, img: product.img });
  }
  saveCart(cart);
  showToast(`💪 ${product.name} added to cart!`, 'success');
}
function removeFromCart(key) {
  const cart = getCart().filter(i => i.key !== key);
  saveCart(cart);
}
function updateBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.basket-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'inline-block' : 'none';
  });
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
function showToast(msg, type = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ══════════════════════════════════════════
// PRODUCT CARD HTML
// ══════════════════════════════════════════
function buildProductCard(p) {
  const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  const variantsHTML = `
    <div class="size-row" id="variants-${p.id}">
      ${p.variants.map((v, i) => `<button class="size-btn${i === 0 ? ' selected' : ''}" data-variant="${v}" onclick="selectVariant(this,${p.id})">${v}</button>`).join('')}
    </div>`;

  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}">
      <div class="product-img-wrap">
        ${badgeHTML}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.parentElement.style.background='linear-gradient(135deg,#0d1a3a,#111122)'" />
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        ${variantsHTML}
        <div class="product-price-row">
          <div class="product-price">£${p.price.toFixed(2)}</div>
          <button class="product-add-btn" onclick="handleAddToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

function selectVariant(btn, productId) {
  document.querySelectorAll(`#variants-${productId} .size-btn`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function handleAddToCart(productId) {
  const selectedBtn = document.querySelector(`#variants-${productId} .size-btn.selected`);
  const variant = selectedBtn ? selectedBtn.dataset.variant : 'Standard';
  addToCart(productId, variant);

  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    const btn = card.querySelector('.product-add-btn');
    btn.textContent = '✓ Added!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1500);
  }
}

// ══════════════════════════════════════════
// FEATURED (homepage — 4 items)
// ══════════════════════════════════════════
function initFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4], PRODUCTS[9]];
  grid.innerHTML = featured.map(p => buildProductCard(p)).join('');
}

// ══════════════════════════════════════════
// PRODUCTS PAGE
// ══════════════════════════════════════════
function initProductsPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let currentFilter = 'all';

  function render() {
    const filtered = currentFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === currentFilter);
    grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
  }

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      render();
    });
  });

  render();
}

// ══════════════════════════════════════════
// CHECKOUT PAGE
// ══════════════════════════════════════════
function initCheckout() {
  const wrap = document.getElementById('cart-items-wrap');
  if (!wrap) return;

  function renderCart() {
    const cart = getCart();
    if (cart.length === 0) {
      wrap.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <a href="products.html" class="btn btn-primary" style="margin-top:1rem">Shop Now</a>
        </div>`;
      const totalsEl = document.getElementById('cart-totals');
      if (totalsEl) totalsEl.innerHTML = '';
      return;
    }

    wrap.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#1a2040'">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-sub">${item.variant} &nbsp;·&nbsp; Qty: ${item.qty}</div>
        </div>
        <div class="cart-item-price">£${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-item-remove" onclick="removeItem('${item.key}')" aria-label="Remove">×</button>
      </div>`).join('');

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = 5.00;
    const total    = subtotal + shipping;

    const totalsEl = document.getElementById('cart-totals');
    if (totalsEl) {
      totalsEl.innerHTML = `
        <div class="cart-totals">
          <div class="cart-total-row"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
          <div class="cart-total-row"><span>Tracked 24</span><span>£${shipping.toFixed(2)}</span></div>
          <div class="cart-total-row grand"><span>Total</span><span>£${total.toFixed(2)}</span></div>
        </div>`;
    }
  }

  window.removeItem = function (key) {
    removeFromCart(key);
    renderCart();
  };

  renderCart();

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (getCart().length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
      }
      saveCart([]);
      document.getElementById('checkout-page').style.display = 'none';
      document.getElementById('order-success').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ══════════════════════════════════════════
// HAMBURGER NAV
// ══════════════════════════════════════════
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks   = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', function () {
    this.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  updateBadge();
  initFeatured();
  initProductsPage();
  initCheckout();
});
