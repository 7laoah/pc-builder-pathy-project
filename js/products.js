/* ===================================================
   products.js — Product data, card builder, grid renderer
   =================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: 'BudgetBlitz 3000',
    price: 649,
    tag: 'Budget',
    image: 'assets/images/placeholder.svg',
    description:   'The perfect entry-level gaming rig. Play the latest titles at 1080p with smooth, consistent frame rates — without breaking the bank.',
    descriptionAr: 'جهاز الألعاب المثالي للمبتدئين. العب أحدث الألقاب بدقة 1080p بمعدل إطارات سلس وثابت — دون أن تُثقل ميزانيتك.',
    specs: {
      CPU:         'Intel Core i3-12100F',
      GPU:         'NVIDIA GTX 1660 Super 6GB',
      RAM:         '16GB DDR4 3200MHz',
      Storage:     '500GB SATA SSD',
      Motherboard: 'MSI B660M PRO-A',
      PSU:         '550W 80+ Bronze',
      Case:        'NZXT H510 Mid Tower'
    }
  },
  {
    id: 2,
    name: 'StarterRig Pro',
    price: 799,
    tag: 'Budget',
    image: 'assets/images/placeholder.svg',
    description:   'A step up from entry-level — the StarterRig Pro handles 1080p gaming at high settings with ease and includes fast NVMe storage.',
    descriptionAr: 'خطوة للأمام عن مستوى المبتدئين — يتعامل StarterRig Pro مع الألعاب بدقة 1080p على إعدادات عالية بكل سلاسة، ويتضمن تخزيناً سريعاً من نوع NVMe.',
    specs: {
      CPU:         'Intel Core i5-12400F',
      GPU:         'NVIDIA RTX 3060 12GB',
      RAM:         '16GB DDR4 3600MHz',
      Storage:     '1TB NVMe SSD',
      Motherboard: 'ASRock B660 Steel Legend',
      PSU:         '650W 80+ Bronze',
      Case:        'Fractal Design Focus G'
    }
  },
  {
    id: 3,
    name: 'FrameRate X',
    price: 1199,
    tag: 'Mid-Range',
    image: 'assets/images/placeholder.svg',
    description:   'Dominate 1080p and push into 1440p gaming. The FrameRate X is built for players who demand high frame rates in competitive titles.',
    descriptionAr: 'تحكّم في دقة 1080p وادفع حدودك نحو 1440p. صُمِّم FrameRate X للاعبين الذين يطلبون معدلات إطارات عالية في الألقاب التنافسية.',
    specs: {
      CPU:         'AMD Ryzen 5 7600X',
      GPU:         'NVIDIA RTX 4060 Ti 8GB',
      RAM:         '32GB DDR5 5200MHz',
      Storage:     '1TB NVMe Gen4 SSD',
      Motherboard: 'MSI B650 Tomahawk',
      PSU:         '750W 80+ Gold',
      Case:        'Lian Li Lancool 215'
    }
  },
  {
    id: 4,
    name: 'VortexCore Elite',
    price: 1899,
    tag: 'Mid-Range',
    image: 'assets/images/placeholder.svg',
    description:   'True 1440p mastery. The VortexCore Elite handles every modern game at ultra settings and starts pushing 4K in less demanding titles.',
    descriptionAr: 'إتقان حقيقي لدقة 1440p. يتعامل VortexCore Elite مع كل الألعاب الحديثة على إعدادات فائقة ويبدأ في دفع حدود 4K في الألقاب الأقل تطلباً.',
    specs: {
      CPU:         'Intel Core i7-13700K',
      GPU:         'NVIDIA RTX 4070 12GB',
      RAM:         '32GB DDR5 6000MHz',
      Storage:     '2TB NVMe Gen4 SSD',
      Motherboard: 'ASUS ROG Strix Z790-F',
      PSU:         '850W 80+ Gold',
      Case:        'Corsair 4000D Airflow'
    }
  },
  {
    id: 5,
    name: 'TitanForge Ultra',
    price: 2499,
    tag: 'Flagship',
    image: 'assets/images/placeholder.svg',
    description:   'Uncompromising 4K performance. The TitanForge Ultra is a beast that handles ray-tracing, 4K textures, and streaming simultaneously.',
    descriptionAr: 'أداء 4K بلا تنازلات. TitanForge Ultra وحش حقيقي يتعامل مع تتبع الأشعة وملمسات 4K والبث المباشر في آنٍ واحد.',
    specs: {
      CPU:         'Intel Core i9-13900K',
      GPU:         'NVIDIA RTX 4080 16GB',
      RAM:         '64GB DDR5 6400MHz',
      Storage:     '2TB NVMe Gen4 + 2TB HDD',
      Motherboard: 'ASUS ROG Maximus Z790',
      PSU:         '1000W 80+ Platinum',
      Case:        'Fractal Design Torrent RGB'
    }
  },
  {
    id: 6,
    name: 'NeonBeast RTX',
    price: 3199,
    tag: 'Flagship',
    image: 'assets/images/placeholder.svg',
    description:   'The absolute pinnacle of gaming performance. The NeonBeast RTX crushes 4K at 144Hz+ and is future-proof for the next generation of titles.',
    descriptionAr: 'القمة المطلقة في أداء الألعاب. يسحق NeonBeast RTX دقة 4K بمعدل 144Hz وما فوق، ومستقبل الجيل القادم من الألقاب.',
    specs: {
      CPU:         'Intel Core i9-13900KS',
      GPU:         'NVIDIA RTX 4090 24GB',
      RAM:         '64GB DDR5 7200MHz',
      Storage:     '4TB NVMe Gen5 SSD',
      Motherboard: 'ASUS ROG Maximus Z790 Apex',
      PSU:         '1200W 80+ Titanium',
      Case:        'Lian Li O11 Dynamic EVO XL'
    }
  }
];

/* ---------------------------------------------------
   Helper: get a translation string for JS-rendered content
   --------------------------------------------------- */
function t(key) {
  const lang = localStorage.getItem('gh-lang') || 'en';
  if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
    return TRANSLATIONS[lang][key];
  }
  // Fallback map for when TRANSLATIONS isn't loaded yet
  const fallback = {
    'card.view':         'View Details',
    'card.view.arrow':   'View Details →',
    'card.tag.budget':   'Budget',
    'card.tag.mid':      'Mid-Range',
    'card.tag.flagship': 'Flagship',
  };
  return fallback[key] || key;
}

/* ---------------------------------------------------
   Helper: return description in current language
   --------------------------------------------------- */
function getDesc(product) {
  const lang = localStorage.getItem('gh-lang') || 'en';
  return (lang === 'ar' && product.descriptionAr) ? product.descriptionAr : product.description;
}

/* ---------------------------------------------------
   Build a single product card HTML string
   --------------------------------------------------- */
function buildProductCard(product) {
  const tagClass = 'badge--' + product.tag.toLowerCase().replace('-', '');
  const tagKey   = 'card.tag.' + product.tag.toLowerCase().replace('-', '');
  return `
    <div class="product-card card" data-tag="${product.tag}">
      <a href="product-detail.html?id=${product.id}" class="product-card__img-wrap">
        <img src="${product.image}"
             alt="${product.name}"
             class="product-card__img"
             onerror="this.src='assets/images/placeholder.svg'" />
      </a>
      <div class="product-card__body">
        <span class="badge ${tagClass}">${t(tagKey)}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__price">$${product.price.toLocaleString()}</p>
        <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-sm" style="margin-top:12px;width:100%">
          ${t('card.view')}
        </a>
      </div>
    </div>`;
}

/* ---------------------------------------------------
   Build a featured card (home page only) — horizontal layout
   with image on the left and a spec summary on the right
   --------------------------------------------------- */
function buildFeaturedCard(product) {
  const tagClass = 'badge--' + product.tag.toLowerCase().replace('-', '');
  const tagKey   = 'card.tag.' + product.tag.toLowerCase().replace('-', '');
  // Show the 4 most useful specs: CPU, GPU, RAM, Storage
  const keySpecs = ['CPU', 'GPU', 'RAM', 'Storage'];
  const specsHTML = keySpecs
    .filter(k => product.specs[k])
    .map(k => `
      <div class="featured-spec">
        <span class="featured-spec__key">${k}</span>
        <span class="featured-spec__val">${product.specs[k]}</span>
      </div>`)
    .join('');

  return `
    <div class="featured-card card" data-tag="${product.tag}">
      <a href="product-detail.html?id=${product.id}" class="featured-card__img-wrap">
        <img src="${product.image}"
             alt="${product.name}"
             class="featured-card__img"
             onerror="this.src='assets/images/placeholder.svg'" />
      </a>
      <div class="featured-card__body">
        <div class="featured-card__top">
          <span class="badge ${tagClass}">${t(tagKey)}</span>
          <h3 class="featured-card__name">${product.name}</h3>
          <p class="featured-card__price">$${product.price.toLocaleString()}</p>
        </div>
        <div class="featured-specs">
          ${specsHTML}
        </div>
        <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-sm featured-card__btn">
          ${t('card.view.arrow')}
        </a>
      </div>
    </div>`;
}

/* ---------------------------------------------------
   Render all products into a given container id
   --------------------------------------------------- */
function renderProductGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = PRODUCTS.map(buildProductCard).join('');
}
