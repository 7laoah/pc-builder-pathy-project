/* ===================================================
   build.js — PC Builder: component data, compatibility engine,
               price calculator, build summary
   =================================================== */

/* ---------------------------------------------------
   Component Data
   Each option carries metadata used by the compatibility engine:
     cpu:   { socket, tdp, tier, ramType }
     gpu:   { powerDraw, tier }
     ram:   { type, speedMhz }
     psu:   { watts }
     cooler:{ type ('air'|'liquid'), tdpLimit }
     motherboard: { socket, ramType }
   --------------------------------------------------- */
const COMPONENTS = [
  /* ── CPU ─────────────────────────────────────────── */
  {
    id: 'cpu',
    label: 'CPU (Processor)',
    icon: '🧠',
    options: [
      // Intel LGA1700 — DDR4/DDR5 mixed boards
      { name: 'Intel Core i3-12100F',          price: 109, socket: 'LGA1700', tdp: 65,  tier: 1, ramType: 'DDR4' },
      { name: 'Intel Core i5-12400F',          price: 149, socket: 'LGA1700', tdp: 65,  tier: 2, ramType: 'DDR4' },
      { name: 'Intel Core i5-13400F',          price: 189, socket: 'LGA1700', tdp: 65,  tier: 2, ramType: 'DDR4' },
      { name: 'Intel Core i7-12700K',          price: 269, socket: 'LGA1700', tdp: 125, tier: 3, ramType: 'DDR4' },
      { name: 'Intel Core i7-13700K',          price: 329, socket: 'LGA1700', tdp: 125, tier: 3, ramType: 'DDR5' },
      { name: 'Intel Core i9-13900K',          price: 549, socket: 'LGA1700', tdp: 125, tier: 4, ramType: 'DDR5' },
      { name: 'Intel Core i9-13900KS',         price: 649, socket: 'LGA1700', tdp: 150, tier: 4, ramType: 'DDR5' },
      // AMD AM5 — DDR5 only
      { name: 'AMD Ryzen 5 7600',              price: 199, socket: 'AM5',     tdp: 65,  tier: 2, ramType: 'DDR5' },
      { name: 'AMD Ryzen 5 7600X',             price: 229, socket: 'AM5',     tdp: 105, tier: 2, ramType: 'DDR5' },
      { name: 'AMD Ryzen 7 7700',              price: 279, socket: 'AM5',     tdp: 65,  tier: 3, ramType: 'DDR5' },
      { name: 'AMD Ryzen 7 7700X',             price: 299, socket: 'AM5',     tdp: 105, tier: 3, ramType: 'DDR5' },
      { name: 'AMD Ryzen 9 7900X',             price: 399, socket: 'AM5',     tdp: 170, tier: 4, ramType: 'DDR5' },
      { name: 'AMD Ryzen 9 7950X',             price: 549, socket: 'AM5',     tdp: 170, tier: 4, ramType: 'DDR5' },
      // AMD AM4 — DDR4 only
      { name: 'AMD Ryzen 5 5600X',             price: 149, socket: 'AM4',     tdp: 65,  tier: 2, ramType: 'DDR4' },
      { name: 'AMD Ryzen 7 5800X3D',           price: 249, socket: 'AM4',     tdp: 105, tier: 3, ramType: 'DDR4' },
      { name: 'AMD Ryzen 9 5900X',             price: 299, socket: 'AM4',     tdp: 105, tier: 4, ramType: 'DDR4' },
    ]
  },

  /* ── CPU Cooler ──────────────────────────────────── */
  {
    id: 'cooler',
    label: 'CPU Cooler',
    icon: '❄️',
    options: [
      { name: 'Be Quiet! Pure Rock 2 (Air)',        price: 39,  coolerType: 'air',    tdpLimit: 120 },
      { name: 'Noctua NH-U12S (Air)',               price: 59,  coolerType: 'air',    tdpLimit: 150 },
      { name: 'DeepCool AK620 (Air)',               price: 65,  coolerType: 'air',    tdpLimit: 260 },
      { name: 'Noctua NH-D15 (Air)',                price: 89,  coolerType: 'air',    tdpLimit: 250 },
      { name: 'Corsair H60 120mm AIO (Liquid)',     price: 69,  coolerType: 'liquid', tdpLimit: 150 },
      { name: 'NZXT Kraken X53 240mm AIO (Liquid)', price: 109, coolerType: 'liquid', tdpLimit: 200 },
      { name: 'Corsair H150i 360mm AIO (Liquid)',   price: 149, coolerType: 'liquid', tdpLimit: 300 },
      { name: 'EKWB EK-AIO 360 D-RGB (Liquid)',     price: 179, coolerType: 'liquid', tdpLimit: 350 },
    ]
  },

  /* ── GPU ─────────────────────────────────────────── */
  {
    id: 'gpu',
    label: 'GPU (Graphics Card)',
    icon: '🎮',
    options: [
      // NVIDIA
      { name: 'NVIDIA GTX 1660 Super 6GB',     price: 229,  powerDraw: 125, tier: 1 },
      { name: 'NVIDIA RTX 3060 12GB',          price: 299,  powerDraw: 170, tier: 2 },
      { name: 'NVIDIA RTX 3060 Ti 8GB',        price: 349,  powerDraw: 200, tier: 2 },
      { name: 'NVIDIA RTX 3070 8GB',           price: 449,  powerDraw: 220, tier: 3 },
      { name: 'NVIDIA RTX 3080 10GB',          price: 599,  powerDraw: 320, tier: 3 },
      { name: 'NVIDIA RTX 4060 8GB',           price: 299,  powerDraw: 115, tier: 2 },
      { name: 'NVIDIA RTX 4060 Ti 8GB',        price: 399,  powerDraw: 165, tier: 2 },
      { name: 'NVIDIA RTX 4070 12GB',          price: 599,  powerDraw: 200, tier: 3 },
      { name: 'NVIDIA RTX 4070 Ti 12GB',       price: 799,  powerDraw: 285, tier: 3 },
      { name: 'NVIDIA RTX 4080 16GB',          price: 1099, powerDraw: 320, tier: 4 },
      { name: 'NVIDIA RTX 4090 24GB',          price: 1599, powerDraw: 450, tier: 4 },
      // AMD
      { name: 'AMD RX 6600 XT 8GB',            price: 239,  powerDraw: 160, tier: 1 },
      { name: 'AMD RX 6700 XT 12GB',           price: 329,  powerDraw: 230, tier: 2 },
      { name: 'AMD RX 6800 XT 16GB',           price: 499,  powerDraw: 300, tier: 3 },
      { name: 'AMD RX 7800 XT 16GB',           price: 499,  powerDraw: 263, tier: 3 },
      { name: 'AMD RX 7900 XTX 24GB',          price: 899,  powerDraw: 355, tier: 4 },
    ]
  },

  /* ── RAM ─────────────────────────────────────────── */
  {
    id: 'ram',
    label: 'RAM (Memory)',
    icon: '💾',
    options: [
      // DDR4
      { name: 'Corsair Vengeance 16GB DDR4 3200MHz',   price: 49,  ramType: 'DDR4', speedMhz: 3200 },
      { name: 'Kingston Fury Beast 16GB DDR4 3600MHz', price: 59,  ramType: 'DDR4', speedMhz: 3600 },
      { name: 'G.Skill Trident Z 32GB DDR4 3600MHz',   price: 89,  ramType: 'DDR4', speedMhz: 3600 },
      { name: 'Corsair Vengeance 32GB DDR4 3200MHz',   price: 79,  ramType: 'DDR4', speedMhz: 3200 },
      { name: 'G.Skill Ripjaws V 64GB DDR4 3200MHz',   price: 139, ramType: 'DDR4', speedMhz: 3200 },
      // DDR5
      { name: 'Corsair Dominator 16GB DDR5 5200MHz',   price: 79,  ramType: 'DDR5', speedMhz: 5200 },
      { name: 'Kingston Fury Beast 32GB DDR5 5200MHz', price: 119, ramType: 'DDR5', speedMhz: 5200 },
      { name: 'G.Skill Trident Z5 32GB DDR5 6000MHz',  price: 139, ramType: 'DDR5', speedMhz: 6000 },
      { name: 'Corsair Dominator 64GB DDR5 5600MHz',   price: 229, ramType: 'DDR5', speedMhz: 5600 },
      { name: 'G.Skill Trident Z5 64GB DDR5 7200MHz',  price: 289, ramType: 'DDR5', speedMhz: 7200 },
    ]
  },

  /* ── Storage ─────────────────────────────────────── */
  {
    id: 'storage',
    label: 'Storage',
    icon: '💿',
    options: [
      { name: 'Samsung 870 EVO 1TB SATA SSD',   price: 79  },
      { name: 'WD Blue SN570 1TB NVMe Gen3',    price: 69  },
      { name: 'Samsung 980 Pro 1TB NVMe Gen4',  price: 99  },
      { name: 'Seagate Barracuda 2TB HDD',      price: 55  },
      { name: 'WD Black SN850X 2TB NVMe Gen4',  price: 139 },
      { name: 'Samsung 990 Pro 2TB NVMe Gen4',  price: 149 },
      { name: 'Corsair MP700 4TB NVMe Gen5',    price: 259 },
    ]
  },

  /* ── Motherboard ─────────────────────────────────── */
  {
    id: 'motherboard',
    label: 'Motherboard',
    icon: '🔌',
    options: [
      // AMD AM4 + DDR4
      { name: 'MSI B550 Tomahawk (AM4, DDR4)',          price: 129, socket: 'AM4', ramType: 'DDR4' },
      { name: 'ASUS ROG Strix B550-F (AM4, DDR4)',      price: 169, socket: 'AM4', ramType: 'DDR4' },
      { name: 'Gigabyte X570 Aorus Elite (AM4, DDR4)',  price: 199, socket: 'AM4', ramType: 'DDR4' },
      // AMD AM5 + DDR5
      { name: 'MSI B650 Tomahawk (AM5, DDR5)',          price: 189, socket: 'AM5', ramType: 'DDR5' },
      { name: 'ASUS ROG Strix X670E-F (AM5, DDR5)',     price: 349, socket: 'AM5', ramType: 'DDR5' },
      { name: 'Gigabyte X670E Aorus Master (AM5, DDR5)',price: 399, socket: 'AM5', ramType: 'DDR5' },
      // Intel LGA1700 + DDR4
      { name: 'MSI B660M PRO-A (LGA1700, DDR4)',        price: 129, socket: 'LGA1700', ramType: 'DDR4' },
      { name: 'ASUS Prime B660-A (LGA1700, DDR4)',      price: 149, socket: 'LGA1700', ramType: 'DDR4' },
      // Intel LGA1700 + DDR5
      { name: 'MSI Z790 Tomahawk (LGA1700, DDR5)',      price: 229, socket: 'LGA1700', ramType: 'DDR5' },
      { name: 'ASUS ROG Strix Z790-F (LGA1700, DDR5)', price: 349, socket: 'LGA1700', ramType: 'DDR5' },
      { name: 'ASUS ROG Maximus Z790 (LGA1700, DDR5)', price: 499, socket: 'LGA1700', ramType: 'DDR5' },
    ]
  },

  /* ── PSU ─────────────────────────────────────────── */
  {
    id: 'psu',
    label: 'PSU (Power Supply)',
    icon: '⚡',
    options: [
      { name: 'EVGA 550W 80+ Bronze',               price: 59,  watts: 550 },
      { name: 'Corsair CV650 650W 80+ Bronze',       price: 69,  watts: 650 },
      { name: 'Seasonic Focus 750W 80+ Gold',        price: 99,  watts: 750 },
      { name: 'Corsair RM850x 850W 80+ Gold',        price: 129, watts: 850 },
      { name: 'be quiet! Straight Power 1000W Gold', price: 159, watts: 1000 },
      { name: 'Seasonic Prime TX-1000 1000W Titanium',price: 219, watts: 1000 },
      { name: 'Corsair HX1200 1200W 80+ Platinum',   price: 249, watts: 1200 },
    ]
  },

  /* ── Case ────────────────────────────────────────── */
  {
    id: 'case',
    label: 'Case',
    icon: '🖥️',
    options: [
      { name: 'Fractal Design Pop Air (Mid Tower)',     price: 79  },
      { name: 'NZXT H510 (Mid Tower)',                  price: 69  },
      { name: 'Corsair 4000D Airflow (Mid Tower)',      price: 99  },
      { name: 'Lian Li Lancool 215 (Mid Tower)',        price: 89  },
      { name: 'Fractal Design Torrent (Full Tower)',    price: 149 },
      { name: 'Lian Li O11 Dynamic EVO XL (Full Tower)',price: 179 },
      { name: 'Corsair 7000D Airflow (Full Tower)',     price: 199 },
      { name: 'HYTE Y60 RGB (Full Tower)',              price: 169 },
    ]
  }
];

/* ---------------------------------------------------
   State
   --------------------------------------------------- */
const selections = {};

/* ---------------------------------------------------
   Compatibility Engine
   Returns array of { type: 'error'|'warning', message }
   --------------------------------------------------- */
function runCompatibilityChecks() {
  const issues = [];
  const cpu  = selections['cpu'];
  const gpu  = selections['gpu'];
  const ram  = selections['ram'];
  const psu  = selections['psu'];
  const mb   = selections['motherboard'];
  const cool = selections['cooler'];

  /* 1 — CPU ↔ Motherboard socket */
  if (cpu && mb) {
    if (cpu.socket !== mb.socket) {
      issues.push({
        type: 'error',
        message: `Socket mismatch: ${cpu.name} uses <strong>${cpu.socket}</strong> but ${mb.name} supports <strong>${mb.socket}</strong>. These will not physically fit together.`
      });
    }
  }

  /* 2 — CPU ↔ Motherboard RAM type */
  if (cpu && mb) {
    if (cpu.ramType !== mb.ramType) {
      issues.push({
        type: 'error',
        message: `RAM type conflict: ${cpu.name} requires <strong>${cpu.ramType}</strong> but ${mb.name} uses <strong>${mb.ramType}</strong> slots.`
      });
    }
  }

  /* 3 — RAM ↔ Motherboard RAM type */
  if (ram && mb) {
    if (ram.ramType !== mb.ramType) {
      issues.push({
        type: 'error',
        message: `RAM incompatibility: Selected RAM is <strong>${ram.ramType}</strong> but your motherboard supports only <strong>${mb.ramType}</strong>.`
      });
    }
  }

  /* 4 — RAM ↔ CPU RAM type (direct) */
  if (ram && cpu) {
    if (ram.ramType !== cpu.ramType) {
      issues.push({
        type: 'error',
        message: `RAM incompatibility: ${cpu.name} requires <strong>${cpu.ramType}</strong> but selected RAM is <strong>${ram.ramType}</strong>.`
      });
    }
  }

  /* 5 — PSU wattage: CPU TDP + GPU power draw + 150W system overhead */
  if (psu && (cpu || gpu)) {
    const cpuTdp  = cpu ? cpu.tdp  : 0;
    const gpuDraw = gpu ? gpu.powerDraw : 0;
    const needed  = cpuTdp + gpuDraw + 150; // overhead for mobo, storage, fans, ram
    if (psu.watts < needed) {
      issues.push({
        type: 'error',
        message: `Insufficient PSU: Your build needs at least <strong>${needed}W</strong> (CPU ${cpuTdp}W + GPU ${gpuDraw}W + 150W system overhead) but selected PSU is only <strong>${psu.watts}W</strong>.`
      });
    } else if (psu.watts < needed + 100) {
      issues.push({
        type: 'warning',
        message: `PSU headroom is tight: Build requires ~<strong>${needed}W</strong> and your PSU provides <strong>${psu.watts}W</strong>. Consider stepping up for stability and longevity.`
      });
    }
  }

  /* 6 — CPU cooler TDP limit */
  if (cool && cpu) {
    if (cool.tdpLimit < cpu.tdp) {
      issues.push({
        type: 'error',
        message: `Cooler underspec: ${cool.name} is rated for up to <strong>${cool.tdpLimit}W TDP</strong> but ${cpu.name} has a <strong>${cpu.tdp}W TDP</strong>. Your CPU will thermal-throttle.`
      });
    } else if (cool.tdpLimit < cpu.tdp + 20) {
      issues.push({
        type: 'warning',
        message: `Cooler is close to its limit: ${cool.name} (${cool.tdpLimit}W rated) barely covers ${cpu.name} (${cpu.tdp}W TDP). Under sustained load temperatures may spike.`
      });
    }
  }

  /* 7 — High-TDP CPU (≥125W) without liquid cooler warning */
  if (cpu && cpu.tdp >= 125 && cool && cool.coolerType === 'air' && cool.tdpLimit < 230) {
    issues.push({
      type: 'warning',
      message: `High-TDP CPU alert: ${cpu.name} (${cpu.tdp}W TDP) runs very hot under load. Consider a 240mm+ AIO liquid cooler for best thermals and sustained boost clocks.`
    });
  }

  /* 8 — Bottleneck detection (tier-based) */
  if (cpu && gpu) {
    const diff = gpu.tier - cpu.tier;
    if (diff >= 2) {
      issues.push({
        type: 'warning',
        message: `⚠️ Potential CPU bottleneck: Your GPU (Tier ${gpu.tier}) is significantly more powerful than your CPU (Tier ${cpu.tier}). The CPU may limit gaming performance. Consider upgrading the CPU.`
      });
    } else if (diff <= -2) {
      issues.push({
        type: 'warning',
        message: `⚠️ Potential GPU bottleneck: Your CPU (Tier ${cpu.tier}) is significantly more powerful than your GPU (Tier ${gpu.tier}). The GPU will limit your frame rates. Consider a stronger GPU.`
      });
    }
  }

  return issues;
}

/* ---------------------------------------------------
   Render compatibility panel
   --------------------------------------------------- */
function updateCompatibility() {
  const panel = document.getElementById('compat-panel');
  if (!panel) return;

  const issues = runCompatibilityChecks();

  if (issues.length === 0) {
    const hasSelections = Object.keys(selections).length > 0;
    panel.innerHTML = hasSelections
      ? `<div class="compat-ok">✅ <strong>All components are compatible</strong></div>`
      : '';
    panel.className = 'compat-panel';
    return;
  }

  panel.className = 'compat-panel compat-panel--visible';
  panel.innerHTML = `
    <div class="compat-title">🔍 Compatibility Check</div>
    <ul class="compat-list">
      ${issues.map(i => `
        <li class="compat-item compat-item--${i.type}">
          <span class="compat-icon">${i.type === 'error' ? '🚫' : '⚠️'}</span>
          <span>${i.message}</span>
        </li>`).join('')}
    </ul>`;
}

/* ---------------------------------------------------
   Render all pickers
   --------------------------------------------------- */
function renderPickers() {
  const container = document.getElementById('component-pickers');
  if (!container) return;

  container.innerHTML = COMPONENTS.map(cat => `
    <div class="picker-group" id="picker-group-${cat.id}">
      <div class="picker-header">
        <span class="picker-icon">${cat.icon}</span>
        <label class="picker-label" for="pick-${cat.id}">${cat.label}</label>
      </div>
      <select class="form-control picker-select" id="pick-${cat.id}" data-cat="${cat.id}">
        <option value="">— Select ${cat.label} —</option>
        ${cat.options.map((opt, i) => `
          <option value="${i}">${opt.name} — $${opt.price.toLocaleString()}</option>
        `).join('')}
      </select>
    </div>
  `).join('');

  container.querySelectorAll('.picker-select').forEach(select => {
    select.addEventListener('change', () => {
      const catId = select.dataset.cat;
      const cat   = COMPONENTS.find(c => c.id === catId);
      const idx   = select.value;

      if (idx === '') {
        delete selections[catId];
      } else {
        selections[catId] = { ...cat.options[parseInt(idx, 10)] };
        // Remove missing highlight as soon as this picker is filled
        const group = document.getElementById('picker-group-' + catId);
        if (group) group.classList.remove('picker-group--missing');
        // If all are now filled, hide the missing panel
        if (COMPONENTS.every(c => selections[c.id])) {
          const mp = document.getElementById('missing-panel');
          if (mp) mp.classList.add('hidden');
        }
      }

      updatePrice();
      updateSummary();
      updateCompatibility();
    });
  });
}

/* ---------------------------------------------------
   Restore selections from sessionStorage (edit mode)
   --------------------------------------------------- */
function restoreSelections() {
  const raw = sessionStorage.getItem('buildSelections');
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    COMPONENTS.forEach(cat => {
      const savedSel = saved[cat.id];
      if (!savedSel) return;
      const idx = cat.options.findIndex(o => o.name === savedSel.name);
      if (idx === -1) return;
      const selectEl = document.getElementById('pick-' + cat.id);
      if (selectEl) {
        selectEl.value = String(idx);
        selections[cat.id] = { ...cat.options[idx] };
      }
    });
    updatePrice();
    updateSummary();
    updateCompatibility();
  } catch (e) { /* ignore */ }
}

/* ---------------------------------------------------
   Update price total
   --------------------------------------------------- */
function updatePrice() {
  const total = Object.values(selections).reduce((sum, s) => sum + s.price, 0);
  const el = document.getElementById('total-price');
  if (el) {
    el.textContent = '$' + total.toLocaleString();
    el.classList.toggle('price--nonzero', total > 0);
  }
}

/* ---------------------------------------------------
   Update build summary list
   --------------------------------------------------- */
function updateSummary() {
  const list = document.getElementById('summary-list');
  if (!list) return;

  const keys = Object.keys(selections);
  if (keys.length === 0) {
    const emptyText = (typeof TRANSLATIONS !== 'undefined')
      ? (TRANSLATIONS[localStorage.getItem('gh-lang') || 'en']['build.empty'] || 'No components selected yet.')
      : 'No components selected yet.';
    list.innerHTML = `<li class="summary-empty">${emptyText}</li>`;
    return;
  }

  list.innerHTML = COMPONENTS
    .filter(cat => selections[cat.id])
    .map(cat => {
      const sel = selections[cat.id];
      return `
        <li class="summary-item">
          <span class="summary-item__label">${cat.icon} ${cat.label}</span>
          <span class="summary-item__value">
            <span class="summary-item__name">${sel.name}</span>
            <span class="summary-item__price">$${sel.price.toLocaleString()}</span>
          </span>
        </li>`;
    }).join('');
}

/* ---------------------------------------------------
   Checkout button
   --------------------------------------------------- */
function setupCheckoutBtn() {
  const btn          = document.getElementById('checkout-btn');
  const missingPanel = document.getElementById('missing-panel');
  if (!btn) return;

  btn.addEventListener('click', () => {

    // ── 1. Find every category with no selection ──
    const missing = COMPONENTS.filter(cat => !selections[cat.id]);

    if (missing.length > 0) {
      // Highlight missing pickers
      COMPONENTS.forEach(cat => {
        const group = document.getElementById('picker-group-' + cat.id);
        if (!group) return;
        if (!selections[cat.id]) {
          group.classList.add('picker-group--missing');
        } else {
          group.classList.remove('picker-group--missing');
        }
      });

      // Build message list
      const lang = localStorage.getItem('gh-lang') || 'en';
      const isAr  = lang === 'ar';
      const heading = isAr
        ? 'يرجى اختيار المكونات التالية قبل المتابعة:'
        : 'Please select the following components before continuing:';

      const items = missing.map(cat =>
        `<li>${cat.icon} ${cat.label}</li>`
      ).join('');

      if (missingPanel) {
        missingPanel.classList.remove('hidden');
        missingPanel.innerHTML = `
          <p class="missing-heading">${heading}</p>
          <ul class="missing-list">${items}</ul>`;
      }

      // Scroll to first missing picker
      const firstMissing = document.getElementById('picker-group-' + missing[0].id);
      if (firstMissing) {
        firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Pulse attention animation
        firstMissing.classList.add('picker-group--shake');
        setTimeout(() => firstMissing.classList.remove('picker-group--shake'), 600);
      }
      return;
    }

    // ── 2. All selected — clear any previous missing state ──
    if (missingPanel) missingPanel.classList.add('hidden');
    COMPONENTS.forEach(cat => {
      const group = document.getElementById('picker-group-' + cat.id);
      if (group) group.classList.remove('picker-group--missing');
    });

    // ── 3. Compatibility hard errors ──
    const errors = runCompatibilityChecks().filter(i => i.type === 'error');
    if (errors.length > 0) {
      const compatPanel = document.getElementById('compat-panel');
      if (compatPanel) compatPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ── 4. All good — proceed to checkout ──
    const total = Object.values(selections).reduce((sum, s) => sum + s.price, 0);
    const orderItems = COMPONENTS
      .filter(cat => selections[cat.id])
      .map(cat => ({ label: cat.label, value: selections[cat.id].name }));

    sessionStorage.setItem('buildSelections', JSON.stringify(selections));
    sessionStorage.setItem('order', JSON.stringify({
      type: 'custom',
      name: 'Custom Gaming PC Build',
      price: total,
      items: orderItems
    }));

    window.location.href = 'checkout.html';
  });
}

/* ---------------------------------------------------
   Init
   --------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderPickers();
  restoreSelections();
  setupCheckoutBtn();
});
