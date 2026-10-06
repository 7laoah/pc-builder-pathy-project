/* ===================================================
   checkout.js — Order summary, tab switching, form validation
   =================================================== */

/* ---------------------------------------------------
   Translation helper (mirrors products.js t())
   --------------------------------------------------- */
function tco(key) {
  const lang = localStorage.getItem('gh-lang') || 'en';
  if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
    return TRANSLATIONS[lang][key];
  }
  const fallback = {
    'order.custom.label': '🔧 Custom Build',
    'order.ready.label':  '📦 Ready-Made PC',
    'order.total.label':  'Total',
    'order.edit':         '✏️ Edit Components',
  };
  return fallback[key] || key;
}

/* ---------------------------------------------------
   Load order from sessionStorage
   --------------------------------------------------- */
function loadOrderSummary() {
  const summaryEl = document.getElementById('order-summary');
  if (!summaryEl) return;

  const raw = sessionStorage.getItem('order');
  if (!raw) {
    summaryEl.innerHTML = `
      <div style="text-align:center;padding:32px 0">
        <p style="color:var(--text-muted);margin-bottom:20px">No order found. Please select a product or build a PC first.</p>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
        <br><br>
        <a href="build.html" class="btn btn-secondary">Build Your Own PC</a>
      </div>`;
    return;
  }

  const order = JSON.parse(raw);

  const itemsHTML = order.items && order.items.length > 0
    ? order.items.map(item => `
        <tr>
          <td class="order-spec-key">${item.label}</td>
          <td class="order-spec-val">${item.value}</td>
        </tr>`).join('')
    : '';

  const editBtn = order.type === 'custom'
    ? `<div class="edit-build-wrap">
         <a href="build.html" class="btn btn-outline-accent btn-sm edit-build-btn">
           ${tco('order.edit')}
         </a>
       </div>`
    : '';

  summaryEl.innerHTML = `
    <div class="order-badge ${order.type === 'custom' ? 'order-badge--custom' : 'order-badge--ready'}">
      ${tco(order.type === 'custom' ? 'order.custom.label' : 'order.ready.label')}
    </div>
    <h3 class="order-name">${order.name}</h3>
    ${itemsHTML ? `
    <table class="order-specs-table">
      <tbody>${itemsHTML}</tbody>
    </table>` : ''}
    <div class="order-total">
      <span>${tco('order.total.label')}</span>
      <strong>$${order.price.toLocaleString()}</strong>
    </div>
    ${editBtn}`;
}

/* ---------------------------------------------------
   Payment tabs
   --------------------------------------------------- */
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById('tab-' + btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

/* ---------------------------------------------------
   Card number formatting
   --------------------------------------------------- */
function setupCardFormatting() {
  const cardName = document.getElementById('card-name');
  const cardNum = document.getElementById('card-number');
  const cardExpiry = document.getElementById('card-expiry');

  // Card holder name — letters and spaces only
  if (cardName) {
    cardName.addEventListener('input', () => {
      const pos = cardName.selectionStart;
      const cleaned = cardName.value.replace(/[^a-zA-Z\s'-]/g, '');
      if (cardName.value !== cleaned) {
        cardName.value = cleaned;
        cardName.setSelectionRange(pos - 1, pos - 1);
      }
    });
  }

  if (cardNum) {
    cardNum.addEventListener('input', () => {
      let val = cardNum.value.replace(/\D/g, '').slice(0, 16);
      cardNum.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener('input', () => {
      let val = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
      if (val.length >= 3) val = val.slice(0, 2) + ' / ' + val.slice(2);
      cardExpiry.value = val;
    });
  }
}

/* ---------------------------------------------------
   Shared: show success state
   --------------------------------------------------- */
function placeOrder() {
  // Hide both payment forms
  const cardForm = document.getElementById('card-form');
  const appleWrap = document.getElementById('tab-apple');
  const paymentPanel = document.querySelector('.payment-panel');
  if (cardForm) cardForm.classList.add('hidden');
  if (appleWrap) appleWrap.querySelector('.apple-pay-wrap').style.display = 'none';
  if (paymentPanel) paymentPanel.querySelector('.payment-tabs').classList.add('hidden');

  const success = document.getElementById('success-message');
  if (success) {
    success.classList.remove('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Clear all order data
  sessionStorage.removeItem('order');
  sessionStorage.removeItem('buildSelections');
}

/* ---------------------------------------------------
   Apple Pay — Place Order button
   --------------------------------------------------- */
function setupApplePayBtn() {
  const btn = document.getElementById('apple-pay-order-btn');
  if (!btn) return;
  btn.addEventListener('click', placeOrder);
}

/* ---------------------------------------------------
   Form validation & submission
   --------------------------------------------------- */
function setupCardForm() {
  const form = document.getElementById('card-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    let firstError = null;

    function validateField(fieldId, errId, testFn, msg) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(errId);
      if (!field || !err) return;
      if (!testFn(field.value.trim())) {
        field.classList.add('error');
        err.textContent = msg;
        if (!firstError) firstError = field;
        valid = false;
      } else {
        field.classList.remove('error');
        err.textContent = '';
      }
    }

    validateField('card-name', 'err-card-name',
      v => v.length >= 2, 'Please enter the name on your card.');

    validateField('card-number', 'err-card-number',
      v => v.replace(/\s/g, '').length === 16, 'Please enter a valid 16-digit card number.');

    validateField('card-expiry', 'err-card-expiry',
      v => /^\d{2}\s*\/\s*\d{2}$/.test(v), 'Enter expiry as MM / YY.');

    validateField('card-cvv', 'err-card-cvv',
      v => /^\d{3,4}$/.test(v), 'Enter a valid 3 or 4 digit CVV.');

    if (!valid) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    placeOrder();
  });
}

/* ---------------------------------------------------
   Init
   --------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  loadOrderSummary();
  setupTabs();
  setupCardFormatting();
  setupCardForm();
  setupApplePayBtn();
});
