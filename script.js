/* ── Prime PEDS Fitness — script.js ── */

// ══════════════════════════════════════════
// PRODUCT DATA
// ══════════════════════════════════════════
const PRODUCTS = [
  { id: 1,  name: 'BPC-157 5mg',      sub: 'Body Protection Compound',           price: 20,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=600&fit=crop&q=80',
    desc: 'Supports tissue repair, gut lining integrity, and joint healing. Recommended: 250–500mcg daily, subcutaneous injection, 4–6 week cycle.' },
  { id: 2,  name: 'TB500 5mg',        sub: 'Thymosin Beta-4',                    price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80',
    desc: 'Promotes systemic healing, reduces inflammation, and supports flexibility and recovery. Recommended: 2–2.5mg twice weekly (4–6 week loading), then 2mg monthly.' },
  { id: 3,  name: 'GHK-Cu 50mg',      sub: 'Copper Peptide',                     price: 35,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'Stimulates collagen synthesis, skin regeneration, and wound repair. Recommended: 1–2mg daily, subcutaneous injection or topical, 4–8 week cycle.' },
  { id: 4,  name: 'Glow70',           sub: 'Glow Peptide Blend 70mg',            price: 50,   badge: 'Popular', category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&q=80',
    desc: 'Proprietary peptide blend targeting skin health, collagen production, and radiance enhancement. Recommended: 1–2mg daily, subcutaneous injection, 6–8 week cycle.' },
  { id: 5,  name: 'IGF-1-LR3 1mg',    sub: 'Insulin-like Growth Factor',         price: 50,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80',
    desc: 'Long-acting IGF-1 analogue supporting lean muscle growth and cellular repair. Recommended: 20–50mcg daily post-workout, subcutaneous injection, 4 weeks on / 4 weeks off.' },
  { id: 6,  name: 'GHRP-6 5mg',       sub: 'Growth Hormone Releasing Peptide 6', price: 20,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=600&fit=crop&q=80',
    desc: 'Stimulates GH secretion and increases appetite, commonly stacked with a GHRH peptide. Recommended: 100–300mcg per dose, 2–3 times daily fasted, subcutaneous injection.' },
  { id: 7,  name: 'HGH Fragment 5mg', sub: 'HGH Fragment 176-191',               price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80',
    desc: 'Modified GH fragment 176–191 targeting fat metabolism without affecting blood sugar or growth. Recommended: 250–500mcg in 2 daily doses fasted, subcutaneous injection, 8–12 week cycle.' },
  { id: 8,  name: 'CJC No DAC 5mg',   sub: 'CJC-1295 Without DAC',               price: 35,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'Short-acting GHRH analogue producing pulsatile GH release with minimal desensitisation. Recommended: 100–200mcg per dose, 2–3 times daily, subcutaneous injection.' },
  { id: 9,  name: 'CJC With DAC 5mg', sub: 'CJC-1295 With DAC',                  price: 45,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&q=80',
    desc: 'Long-acting GHRH analogue providing sustained GH elevation with once-weekly dosing. Recommended: 1–2mg once weekly, subcutaneous injection, 8–12 week cycle.' },
  { id: 10, name: 'Ipamorelin 10mg',  sub: 'GH Secretagogue Peptide',            price: 30,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80',
    desc: 'Selective GH secretagogue with minimal cortisol or prolactin side effects. Recommended: 200–300mcg per dose, 2–3 times daily, subcutaneous injection.' },
  { id: 11, name: 'Tesamorelin 10mg', sub: 'GHRH Analogue Peptide',              price: 60,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=600&fit=crop&q=80',
    desc: 'GHRH analogue studied for GH stimulation and visceral fat reduction. Recommended: 1–2mg once daily, subcutaneous injection, 12–26 week cycle.' },
  { id: 12, name: 'Epithalon 10mg',   sub: 'Telomere Peptide',                   price: 30,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80',
    desc: 'Telomere-regulating tetrapeptide studied for longevity and anti-ageing support. Recommended: 5–10mg daily, subcutaneous injection, 10–20 day cycle, 2–3 times per year.' },
  { id: 13, name: 'MOTS-C10 10mg',    sub: 'Mitochondrial Peptide 10mg',         price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'Mitochondrial-derived peptide improving metabolic function and insulin sensitivity. Recommended: 5–10mg per dose, 2–3 times weekly, subcutaneous injection.' },
  { id: 14, name: 'MOTS-C40 40mg',    sub: 'Mitochondrial Peptide 40mg',         price: 65,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&q=80',
    desc: 'High-dose MOTS-C for enhanced metabolic support, endurance, and energy regulation. Recommended: 10–15mg per dose, 2–3 times weekly, subcutaneous injection.' },
  { id: 15, name: 'DSIP 5mg',         sub: 'Delta Sleep-Inducing Peptide',       price: 30,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80',
    desc: 'Modulates sleep architecture and reduces cortisol and stress hormone levels. Recommended: 200–400mcg before sleep, subcutaneous injection, 5–7 day cycles.' },
  { id: 16, name: 'Selank 5mg',       sub: 'Anxiolytic Nootropic Peptide',       price: 20,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=600&fit=crop&q=80',
    desc: 'Reduces anxiety and enhances cognitive clarity without sedative effects. Recommended: 250–500mcg per dose, 1–2 times daily, intranasal or subcutaneous, 1–3 week cycle.' },
  { id: 17, name: 'Semax 5mg',        sub: 'Cognitive Nootropic Peptide',        price: 20,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80',
    desc: 'Supports focus, memory, and neuroprotection via BDNF and dopamine pathway modulation. Recommended: 200–600mcg per dose, 1–2 times daily, intranasal or subcutaneous, 2–4 week cycle.' },
  { id: 18, name: 'SLU-PP-332 5mg',   sub: 'ERR Agonist Research Compound',      price: 75,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'ERRα/γ agonist studied for metabolic enhancement, endurance improvement, and fat oxidation. Recommended: 3–5mg per dose, once daily, per research protocol.' },
  { id: 19, name: 'L-Carnitine 10mg', sub: 'Amino Acid Metabolic Support',       price: 75,   badge: 'Popular', category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&q=80',
    desc: 'Injectable amino acid supporting fat oxidation, mitochondrial energy production, and post-exercise recovery. Recommended: 500–1000mg per session, intramuscular or slow IV, 3 times weekly.' },
  { id: 20, name: 'AOD 5mg',          sub: 'AOD-9604 HGH Fragment',              price: 30,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80',
    desc: 'Modified GH fragment targeting fat metabolism without growth or blood sugar effects. Recommended: 300–500mcg daily fasted, subcutaneous injection, 12+ week cycle.' },
  { id: 21, name: 'PT-141 10mg',      sub: 'Bremelanotide Peptide',              price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=600&fit=crop&q=80',
    desc: 'Acts on melanocortin receptors to support libido and sexual function in research settings. Recommended: 0.5–2mg per dose, subcutaneous injection, 1–3 times weekly as needed.' },
  { id: 22, name: 'SS-31 10mg',       sub: 'Mitochondria-Targeted Peptide',      price: 35,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&h=600&fit=crop&q=80',
    desc: 'Mitochondria-targeted antioxidant reducing oxidative stress and supporting cellular energy production. Recommended: 1–5mg per dose, subcutaneous injection, daily or every other day.' },
  { id: 23, name: 'Thymalin 10mg',    sub: 'Thymic Peptide',                     price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'Thymic peptide supporting immune system regulation and thymus gland function. Recommended: 5–10mg daily, subcutaneous injection, 5–10 day cycles, 2–3 times yearly.' },
  { id: 24, name: 'KPV 10mg',         sub: 'Anti-Inflammatory Tripeptide',       price: 25,   badge: null,      category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop&q=80',
    desc: 'Alpha-MSH-derived tripeptide studied for gut and skin inflammation reduction. Recommended: 300mcg–1mg daily, subcutaneous injection or oral, 4–6 week cycle.' },
  { id: 25, name: 'NAD500',           sub: 'NAD+ 500mg',                         price: 50,   badge: 'Popular', category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop&q=80',
    desc: 'NAD+ precursor supporting cellular energy, DNA repair, and longevity pathways. Recommended: 500mg via slow IV push or subcutaneous, 1–3 times weekly.' },
  { id: 26, name: 'Bac Water 3ml',    sub: 'Bacteriostatic Water for Reconstitution', price: 2.50, badge: null,  category: 'peptides', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80',
    desc: 'Sterile bacteriostatic water for reconstituting lyophilised peptide vials. Add 1–2ml per vial, refrigerate after mixing, and use within 28 days.' },
  { id: 27, name: 'Vitamin S10',      sub: 'Vitamin Blend',                      price: 45,   badge: null,      category: 'weight-loss', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 28, name: 'Vitamin T30',      sub: 'Vitamin B1 30mg',                    price: 90,   badge: null,      category: 'weight-loss', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 29, name: 'Vitamin T60',      sub: 'Vitamin B1 60mg',                    price: 110,  badge: null,      category: 'weight-loss', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 30, name: 'Vitamin T100',     sub: 'Vitamin B1 100mg',                   price: 150,  badge: null,      category: 'weight-loss', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 31, name: 'Vitamin R30',      sub: '',                                   price: 110,  badge: null,      category: 'weight-loss', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 32, name: 'Vitamin Z10',      sub: '',                                   price: 45,   badge: null,      category: 'other', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
  { id: 33, name: 'X1mg',             sub: '',                            price: 35,   badge: null,      category: 'other', variants: ['1 Vial'], img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop&q=80' },
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
  const descHTML  = p.desc  ? `<div class="product-desc">${p.desc}</div>`   : '';
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
        ${p.sub ? `<div class="product-sub">${p.sub}</div>` : ''}
        ${descHTML}
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

  // Returns selected delivery object or null
  function getShipOption() {
    const checked = document.querySelector('input[name="delivery"]:checked');
    if (!checked) return null;
    return checked.value === 'special'
      ? { label: 'Special Delivery', price: 15.00, days: 1 }
      : { label: 'Tracked 24',       price: 5.00,  days: 2 };
  }

  // Re-renders just the order summary totals
  function renderTotals() {
    const cart    = getCart();
    const totalsEl = document.getElementById('cart-totals');
    if (!totalsEl || cart.length === 0) return;
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const ship     = getShipOption();
    const shipRow  = ship
      ? `<div class="cart-total-row"><span>${ship.label}</span><span>£${ship.price.toFixed(2)}</span></div>`
      : `<div class="cart-total-row"><span>Delivery</span><span style="color:var(--muted);font-size:0.8rem">— select option —</span></div>`;
    const total    = subtotal + (ship ? ship.price : 0);
    totalsEl.innerHTML = `
      <div class="cart-totals">
        <div class="cart-total-row"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
        ${shipRow}
        <div class="cart-total-row grand"><span>Total</span><span>£${total.toFixed(2)}</span></div>
      </div>`;
  }

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
    renderTotals();
  }

  // Live-update totals when delivery option changes
  document.querySelectorAll('input[name="delivery"]').forEach(r => {
    r.addEventListener('change', renderTotals);
  });

  window.removeItem = function (key) {
    removeFromCart(key);
    renderCart();
  };

  renderCart();

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const cart = getCart();
      if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
      }

      // Must select a delivery method
      const ship = getShipOption();
      if (!ship) {
        showToast('Please select a delivery method.', 'error');
        return;
      }

      // Grab form values
      const firstName = document.getElementById('first-name').value.trim();
      const lastName  = document.getElementById('last-name').value.trim();
      const email     = document.getElementById('email').value.trim();
      const cardRaw   = document.getElementById('card-number').value.replace(/\s/g, '');
      const cardLast4 = cardRaw.slice(-4) || '****';

      // Generate order number & calculate estimated delivery date
      const orderNum  = 'PP-' + Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
      const orderDate = new Date();
      const delivDate = new Date(orderDate);
      let added = 0;
      while (added < ship.days) {
        delivDate.setDate(delivDate.getDate() + 1);
        const d = delivDate.getDay();
        if (d !== 0 && d !== 6) added++;
      }
      const shortFmt = { day: 'numeric', month: 'short', year: 'numeric' };
      const longFmt  = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

      // Totals
      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const total    = subtotal + ship.price;

      // Populate confirmation screen
      document.getElementById('confirm-name').textContent      = firstName + ' ' + lastName;
      document.getElementById('confirm-order-num').textContent = orderNum;
      document.getElementById('confirm-email').textContent     = email;
      document.getElementById('confirm-card').textContent      = cardLast4;
      document.getElementById('confirm-date').textContent      = orderDate.toLocaleDateString('en-GB', shortFmt);
      document.getElementById('confirm-delivery').textContent  = delivDate.toLocaleDateString('en-GB', longFmt);

      document.getElementById('confirm-items').innerHTML = cart.map(item => `
        <div class="confirm-item">
          <img class="confirm-item-img" src="${item.img}" alt="${item.name}" onerror="this.style.background='#1a2040'">
          <div class="confirm-item-info">
            <div class="confirm-item-name">${item.name}</div>
            <div class="confirm-item-sub">${item.variant} &nbsp;·&nbsp; Qty: ${item.qty}</div>
          </div>
          <div class="confirm-item-price">£${(item.price * item.qty).toFixed(2)}</div>
        </div>`).join('');

      document.getElementById('confirm-totals').innerHTML = `
        <div class="cart-total-row"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
        <div class="cart-total-row"><span>${ship.label}</span><span>£${ship.price.toFixed(2)}</span></div>
        <div class="cart-total-row grand"><span>Total Paid</span><span>£${total.toFixed(2)}</span></div>`;

      // Clear cart and switch views
      saveCart([]);
      document.getElementById('checkout-page').style.display = 'none';
      document.getElementById('order-success').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ══════════════════════════════════════════
// AGE GATE
// ══════════════════════════════════════════
function initAgeGate() {
  // Already verified this session
  if (sessionStorage.getItem('pp_age_ok') === '1') return;

  const loadTime = Date.now();

  // Build overlay
  const gate = document.createElement('div');
  gate.id = 'age-gate';
  gate.innerHTML = `
    <div class="age-gate-box">
      <div class="age-gate-logo">Prime<em>PEDS</em></div>
      <div class="age-gate-icon">🔞</div>
      <h2>Age Verification Required</h2>
      <p>This website contains research products intended for adults only. You must be 18 years of age or older to enter.</p>

      <!-- Honeypot: hidden from humans, bots fill this automatically -->
      <input class="age-gate-honeypot" id="age-hp" type="text" name="website" autocomplete="off" tabindex="-1">

      <label class="age-gate-label" for="age-cb">
        <input type="checkbox" id="age-cb">
        <span>I confirm that I am 18 years of age or older</span>
      </label>

      <button class="btn btn-primary age-gate-enter" id="age-enter" disabled>Enter Site →</button>
      <a href="https://www.google.com" class="age-gate-exit">I am under 18 — Exit</a>
      <p class="age-gate-note">By entering this site you confirm you are of legal age and accept our terms of use. This site is intended for research purposes only.</p>
    </div>`;

  document.body.prepend(gate);
  document.body.style.overflow = 'hidden';

  const cb       = document.getElementById('age-cb');
  const enterBtn = document.getElementById('age-enter');
  const honeypot = document.getElementById('age-hp');

  cb.addEventListener('change', () => {
    enterBtn.disabled = !cb.checked;
  });

  enterBtn.addEventListener('click', () => {
    // Bot checks: honeypot filled OR submitted too fast (under 1.2s)
    if (honeypot.value !== '') return;
    if (Date.now() - loadTime < 1200) return;
    if (!cb.checked) return;

    sessionStorage.setItem('pp_age_ok', '1');
    gate.style.animation = 'ageGateOut 0.35s ease forwards';
    setTimeout(() => {
      gate.remove();
      document.body.style.overflow = '';
    }, 350);
  });
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
  initAgeGate();
  initNav();
  updateBadge();
  initFeatured();
  initProductsPage();
  initCheckout();
});
