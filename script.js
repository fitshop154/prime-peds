/* ── Prime Peds — script.js ── */

// ══════════════════════════════════════════
// PRODUCT DATA
// ══════════════════════════════════════════
const PRODUCTS = [
  {
    id: 1, name: 'Air Sprint Kids',       sub: 'Lightweight Running Shoe',   price: 34.99,
    badge: 'Best Seller', category: 'running',
    sizes: ['UK 1','UK 2','UK 3','UK 4','UK 5'],
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 2, name: 'Mini Runner Pro',       sub: 'Toddler Trainer',            price: 29.99,
    badge: null, category: 'running',
    sizes: ['UK 6C','UK 7C','UK 8C','UK 9C','UK 10C'],
    img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 3, name: 'Cloud Step Jr',         sub: 'Everyday Comfort Trainer',   price: 39.99,
    badge: 'New', category: 'casual',
    sizes: ['UK 1','UK 2','UK 3','UK 4','UK 5'],
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 4, name: 'Flex Stride Kids',      sub: 'School PE Trainer',          price: 32.99,
    badge: null, category: 'school',
    sizes: ['UK 1','UK 2','UK 3','UK 4'],
    img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 5, name: 'Turbo Lace Juniors',    sub: 'Sport Performance',          price: 44.99,
    badge: 'Popular', category: 'sport',
    sizes: ['UK 2','UK 3','UK 4','UK 5','UK 6'],
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 6, name: 'Velcro Flash Kids',     sub: 'Easy On / Easy Off',         price: 27.99,
    badge: 'Toddler', category: 'casual',
    sizes: ['UK 5C','UK 6C','UK 7C','UK 8C'],
    img: 'https://images.unsplash.com/photo-1584735175315-9d5df23be30b?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 7, name: 'Step Up Pro',           sub: 'Junior Basketball Shoe',     price: 49.99,
    badge: 'New', category: 'sport',
    sizes: ['UK 3','UK 4','UK 5','UK 6'],
    img: 'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 8, name: 'Little Legend Trainer', sub: 'Everyday Kids Trainer',      price: 36.99,
    badge: null, category: 'casual',
    sizes: ['UK 1','UK 2','UK 3','UK 4','UK 5'],
    img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 9, name: 'Bounce Back Kids',      sub: 'Impact-Absorbing Sole',      price: 31.99,
    badge: null, category: 'running',
    sizes: ['UK 1','UK 2','UK 3','UK 4'],
    img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 10, name: 'Speed Demon Jr',       sub: 'Track & Field Junior',       price: 42.99,
    badge: 'Top Pick', category: 'sport',
    sizes: ['UK 2','UK 3','UK 4','UK 5'],
    img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 11, name: 'Soft Sole Toddler',   sub: 'First Steps Shoe',           price: 24.99,
    badge: 'Toddler', category: 'casual',
    sizes: ['UK 1C','UK 2C','UK 3C','UK 4C'],
    img: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=600&fit=crop&q=80'
  },
  {
    id: 12, name: 'Athletic Pro Kids',   sub: 'All-Round Performance',      price: 38.99,
    badge: 'Best Seller', category: 'sport',
    sizes: ['UK 1','UK 2','UK 3','UK 4','UK 5','UK 6'],
    img: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&h=600&fit=crop&q=80'
  },
];

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
function addToCart(productId, size) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const key = `${productId}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, productId, size, qty: 1, name: product.name, price: product.price, img: product.img });
  }
  saveCart(cart);
  showToast(`👟 ${product.name} added to cart!`, 'success');
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
function buildProductCard(p, showSizes = true) {
  const badgeHTML = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  const sizesHTML = showSizes ? `
    <div class="size-row" id="sizes-${p.id}">
      ${p.sizes.map((s, i) => `<button class="size-btn${i === 0 ? ' selected' : ''}" data-size="${s}" onclick="selectSize(this,${p.id})">${s}</button>`).join('')}
    </div>` : '';

  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}">
      <div class="product-img-wrap">
        ${badgeHTML}
        <img src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none'" />
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.sub}</div>
        ${sizesHTML}
        <div class="product-price-row">
          <div class="product-price">£${p.price.toFixed(2)}</div>
          <button class="product-add-btn" onclick="handleAddToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

function selectSize(btn, productId) {
  document.querySelectorAll(`#sizes-${productId} .size-btn`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function handleAddToCart(productId) {
  const selectedSizeBtn = document.querySelector(`#sizes-${productId} .size-btn.selected`);
  const size = selectedSizeBtn ? selectedSizeBtn.dataset.size : 'Standard';
  addToCart(productId, size);

  // Flash button
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
  const featured = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[4], PRODUCTS[11]];
  grid.innerHTML = featured.map(p => buildProductCard(p, true)).join('');
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
    grid.innerHTML = filtered.map(p => buildProductCard(p, true)).join('');
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
          <div class="cart-item-sub">Size: ${item.size} &nbsp;·&nbsp; Qty: ${item.qty}</div>
        </div>
        <div class="cart-item-price">£${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-item-remove" onclick="removeItem('${item.key}')" aria-label="Remove">×</button>
      </div>`).join('');

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal >= 50 ? 0 : 3.99;
    const total    = subtotal + shipping;

    const totalsEl = document.getElementById('cart-totals');
    if (totalsEl) {
      totalsEl.innerHTML = `
        <div class="cart-totals">
          <div class="cart-total-row"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
          <div class="cart-total-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '£' + shipping.toFixed(2)}</span></div>
          <div class="cart-total-row grand"><span>Total</span><span>£${total.toFixed(2)}</span></div>
        </div>`;
    }
  }

  window.removeItem = function (key) {
    removeFromCart(key);
    renderCart();
  };

  renderCart();

  // Checkout form submit
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
