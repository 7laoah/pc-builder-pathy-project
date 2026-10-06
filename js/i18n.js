/* ===================================================
   i18n.js — English / Arabic translation engine
   Applies on load and on language toggle.
   =================================================== */

const TRANSLATIONS = {
  en: {
    /* ── Navbar ── */
    'nav.home':      'Home',
    'nav.products':  'Products',
    'nav.build':     'Build Your PC',
    'nav.support':   'Support',
    'nav.checkout':  'Checkout',

    /* ── Footer ── */
    'footer.tagline':   'Your one-stop shop for high-performance gaming PCs. Ready-made rigs or fully custom builds — we\'ve got you covered.',
    'footer.shop':      'Shop',
    'footer.ready':     'Ready-Made PCs',
    'footer.build':     'Build Your Own',
    'footer.checkout':  'Checkout',
    'footer.support':   'Support',
    'footer.contact':   'Contact Us',
    'footer.track':     'Track Order',
    'footer.returns':   'Returns',
    'footer.company':   'Company',
    'footer.about':     'About Us',
    'footer.privacy':   'Privacy Policy',
    'footer.terms':     'Terms of Service',
    'footer.rights':    'GamingHub. All rights reserved.',

    /* ── Home ── */
    'home.label':       'The Ultimate Gaming Store',
    'home.title':       'Build or Buy Your<br><span class="hero__accent">Dream Gaming PC</span>',
    'home.sub':         'Handpicked parts, live price estimates, and expert support — everything you need to game at the highest level.',
    'home.cta.shop':    'Shop Ready PCs',
    'home.cta.build':   'Build Your Own',
    'home.f1.title':    'Handpicked Parts',
    'home.f1.text':     'Every component is selected for performance, reliability, and value. No filler — only the best.',
    'home.f2.title':    'Live Price Estimator',
    'home.f2.text':     'Mix and match components and watch your total update instantly. No surprises at checkout.',
    'home.f3.title':    'Expert Support',
    'home.f3.text':     'Our team of PC builders is available 6 days a week to answer questions and solve problems fast.',
    'home.featured.title':    'Featured Builds',
    'home.featured.subtitle': 'Our most popular ready-made gaming rigs — ready to ship today.',
    'home.featured.all':      'View All Products →',
    'home.cta.custom':        'Want something truly custom?',
    'home.cta.custom.sub':    'Use our PC builder to choose every part and get an instant price estimate.',
    'home.cta.start':         'Start Building →',

    /* ── Products ── */
    'products.h1':       'Ready-Made Gaming PCs',
    'products.sub':      'Pre-built, tested, and ready to ship. Find the perfect rig for your budget.',
    'filter.all':        'All',
    'filter.budget':     'Budget',
    'filter.mid':        'Mid-Range',
    'filter.flagship':   'Flagship',
    'card.view':         'View Details',
    'card.view.arrow':   'View Details →',
    'card.tag.budget':   'Budget',
    'card.tag.mid':      'Mid-Range',
    'card.tag.flagship': 'Flagship',
    'order.custom.label':'🔧 Custom Build',
    'order.ready.label': '📦 Ready-Made PC',
    'order.total.label': 'Total',
    'order.edit':        '✏️ Edit Components',

    /* ── Build ── */
    'build.h1':         'Build Your Own PC',
    'build.sub':        'Choose each component and get an instant price estimate.',
    'build.choose':     'Choose Your Components',
    'build.your':       'Your Build',
    'build.empty':      'No components selected yet.',
    'build.total':      'Estimated Total',
    'build.checkout':   'Proceed to Checkout →',
    'build.reset':      'Reset Build',

    /* ── Checkout ── */
    'checkout.h1':      'Checkout',
    'checkout.sub':     'You\'re one step away from your dream PC.',
    'checkout.order':   'Order Summary',
    'checkout.payment': 'Payment Method',
    'checkout.apple':   'Apple Pay',
    'checkout.card':    'Credit Card',
    'checkout.place':   'Place Order',
    'checkout.success.h': 'Order Placed!',
    'checkout.success.p': 'Thank you for your order. We\'ll be in touch shortly with shipping details.',
    'checkout.back':    'Back to Home',
    'checkout.demo':    '⚠️ This is a visual demo only — no real payment is processed.',
    'card.name':        'Name on Card',
    'card.number':      'Card Number',
    'card.expiry':      'Expiry Date',
    'card.cvv':         'CVV',
    'detail.notfound.h':  'Product Not Found',
    'detail.notfound.p':  "We couldn't find that product.",
    'detail.notfound.btn':'← Back to Products',
    'detail.specs':     'Full Specifications',
    'detail.buy':       'Buy Now',
    'detail.back':      '← All Products',

    /* ── Contact ── */
    'contact.h1':       'Contact Support',
    'contact.sub':      'Having a problem? We\'re here to help — 6 days a week.',
    'contact.form.h':   'Send Us a Message',
    'contact.name':     'Full Name',
    'contact.email':    'Email Address',
    'contact.order':    'Order Number',
    'contact.order.ph': 'e.g. GH-10042',
    'contact.issue':    'Issue Type',
    'contact.issue.default': '— Select an issue type —',
    'contact.issue.order':   'Order Issue',
    'contact.issue.tech':    'Technical Problem',
    'contact.issue.billing': 'Billing',
    'contact.issue.other':   'Other',
    'contact.msg':      'Message',
    'contact.msg.ph':   'Please describe your issue in detail (minimum 20 characters)...',
    'contact.send':     'Send Message',
    'contact.success.h': 'Message Sent!',
    'contact.success.p': 'Your message has been received. We\'ll respond within 24 hours.',
    'contact.info.h':   'Get in Touch',
    'contact.email.label':   'Email',
    'contact.phone.label':   'Phone',
    'contact.hours.label':   'Support Hours',
    'contact.hours.val':     'Sunday – Thursday<br>9:00 AM – 6:00 PM AST',
    'contact.hq.label':      'Headquarters',
    'contact.hq.val':        'King Fahd Road, Al Olaya<br>Riyadh, Saudi Arabia',
    'contact.links.h':       'Quick Links',
    'contact.links.browse':  'Browse Products',
    'contact.links.builder': 'PC Builder',
    'contact.links.track':   'Track My Order',
    'optional':         '(optional)',
  },

  ar: {
    /* ── Navbar ── */
    'nav.home':      'الرئيسية',
    'nav.products':  'المنتجات',
    'nav.build':     'ابنِ جهازك',
    'nav.support':   'الدعم',
    'nav.checkout':  'الدفع',

    /* ── Footer ── */
    'footer.tagline':   'وجهتك الأولى لأجهزة الألعاب عالية الأداء. أجهزة جاهزة أو مخصصة بالكامل — نحن نوفر كل ما تحتاج.',
    'footer.shop':      'التسوق',
    'footer.ready':     'أجهزة جاهزة',
    'footer.build':     'ابنِ جهازك',
    'footer.checkout':  'الدفع',
    'footer.support':   'الدعم',
    'footer.contact':   'تواصل معنا',
    'footer.track':     'تتبع الطلب',
    'footer.returns':   'الإرجاع',
    'footer.company':   'الشركة',
    'footer.about':     'من نحن',
    'footer.privacy':   'سياسة الخصوصية',
    'footer.terms':     'شروط الخدمة',
    'footer.rights':    'GamingHub. جميع الحقوق محفوظة.',

    /* ── Home ── */
    'home.label':       'المتجر الأمثل للألعاب',
    'home.title':       'ابنِ أو اشترِ<br><span class="hero__accent">جهاز الألعاب المثالي</span>',
    'home.sub':         'قطع مختارة بعناية، تقدير فوري للأسعار، ودعم متخصص — كل ما تحتاجه للعب على أعلى مستوى.',
    'home.cta.shop':    'تسوق الأجهزة الجاهزة',
    'home.cta.build':   'ابنِ جهازك',
    'home.f1.title':    'قطع مختارة',
    'home.f1.text':     'كل مكون يُختار بعناية للأداء والموثوقية والقيمة. لا حشو — الأفضل فقط.',
    'home.f2.title':    'تقدير السعر اللحظي',
    'home.f2.text':     'اختر القطع وشاهد الإجمالي يتحدث فوراً. لا مفاجآت عند الدفع.',
    'home.f3.title':    'دعم متخصص',
    'home.f3.text':     'فريقنا من بناة الأجهزة متاح 6 أيام في الأسبوع للإجابة على أسئلتك.',
    'home.featured.title':    'الأجهزة المميزة',
    'home.featured.subtitle': 'أكثر أجهزتنا الجاهزة مبيعاً — جاهزة للشحن اليوم.',
    'home.featured.all':      'عرض كل المنتجات ←',
    'home.cta.custom':        'تريد شيئاً مخصصاً بالكامل؟',
    'home.cta.custom.sub':    'استخدم أداة البناء لاختيار كل قطعة والحصول على تقدير فوري.',
    'home.cta.start':         'ابدأ البناء ←',

    /* ── Products ── */
    'products.h1':       'أجهزة الألعاب الجاهزة',
    'products.sub':      'أجهزة جاهزة، مختبرة، وجاهزة للشحن. اعثر على الجهاز المناسب لميزانيتك.',
    'filter.all':        'الكل',
    'filter.budget':     'اقتصادي',
    'filter.mid':        'متوسط',
    'filter.flagship':   'متميز',
    'card.view':         'عرض التفاصيل',
    'card.view.arrow':   'عرض التفاصيل ←',
    'card.tag.budget':   'اقتصادي',
    'card.tag.mid':      'متوسط',
    'card.tag.flagship': 'متميز',
    'order.custom.label':'🔧 بناء مخصص',
    'order.ready.label': '📦 جهاز جاهز',
    'order.total.label': 'الإجمالي',
    'order.edit':        '✏️ تعديل المكونات',

    /* ── Build ── */
    'build.h1':         'ابنِ جهازك الخاص',
    'build.sub':        'اختر كل مكون واحصل على تقدير فوري للسعر.',
    'build.choose':     'اختر المكونات',
    'build.your':       'جهازك',
    'build.empty':      'لم يتم اختيار أي مكونات بعد.',
    'build.total':      'الإجمالي المقدّر',
    'build.checkout':   'المتابعة للدفع ←',
    'build.reset':      'إعادة التعيين',

    /* ── Checkout ── */
    'checkout.h1':      'الدفع',
    'checkout.sub':     'خطوة واحدة تفصلك عن جهاز أحلامك.',
    'checkout.order':   'ملخص الطلب',
    'checkout.payment': 'طريقة الدفع',
    'checkout.apple':   'Apple Pay',
    'checkout.card':    'بطاقة ائتمانية',
    'checkout.place':   'تأكيد الطلب',
    'checkout.success.h': 'تم الطلب!',
    'checkout.success.p': 'شكراً لطلبك. سنتواصل معك قريباً بتفاصيل الشحن.',
    'checkout.back':    'العودة للرئيسية',
    'checkout.demo':    '⚠️ هذه نسخة تجريبية فقط — لا تتم معالجة مدفوعات حقيقية.',
    'card.name':        'الاسم على البطاقة',
    'card.number':      'رقم البطاقة',
    'card.expiry':      'تاريخ الانتهاء',
    'card.cvv':         'CVV',
    'detail.notfound.h':  'المنتج غير موجود',
    'detail.notfound.p':  'لم نتمكن من العثور على هذا المنتج.',
    'detail.notfound.btn':'→ العودة إلى المنتجات',
    'detail.specs':     'المواصفات الكاملة',
    'detail.buy':       'اشترِ الآن',
    'detail.back':      '→ جميع المنتجات',

    /* ── Contact ── */
    'contact.h1':       'تواصل مع الدعم',
    'contact.sub':      'هل واجهت مشكلة؟ نحن هنا للمساعدة — 6 أيام في الأسبوع.',
    'contact.form.h':   'أرسل لنا رسالة',
    'contact.name':     'الاسم الكامل',
    'contact.email':    'البريد الإلكتروني',
    'contact.order':    'رقم الطلب',
    'contact.order.ph': 'مثال: GH-10042',
    'contact.issue':    'نوع المشكلة',
    'contact.issue.default': '— اختر نوع المشكلة —',
    'contact.issue.order':   'مشكلة في الطلب',
    'contact.issue.tech':    'مشكلة تقنية',
    'contact.issue.billing': 'فوترة',
    'contact.issue.other':   'أخرى',
    'contact.msg':      'الرسالة',
    'contact.msg.ph':   'يرجى وصف مشكلتك بالتفصيل (20 حرف كحد أدنى)...',
    'contact.send':     'إرسال الرسالة',
    'contact.success.h': 'تم الإرسال!',
    'contact.success.p': 'تم استلام رسالتك. سنرد خلال 24 ساعة.',
    'contact.info.h':   'تواصل معنا',
    'contact.email.label':   'البريد الإلكتروني',
    'contact.phone.label':   'الهاتف',
    'contact.hours.label':   'ساعات الدعم',
    'contact.hours.val':     'الأحد – الخميس<br>9:00 ص – 6:00 م بتوقيت الرياض',
    'contact.hq.label':      'المقر الرئيسي',
    'contact.hq.val':        'طريق الملك فهد، العليا<br>الرياض، المملكة العربية السعودية',
    'contact.links.h':       'روابط سريعة',
    'contact.links.browse':  'تصفح المنتجات',
    'contact.links.builder': 'أداة البناء',
    'contact.links.track':   'تتبع طلبي',
    'optional':         '(اختياري)',
  }
};

/* ---------------------------------------------------
   Apply translations to the current page
   --------------------------------------------------- */
function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Text nodes via data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Placeholders via data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Select options via data-i18n-opt (option value → key map)
  document.querySelectorAll('select[data-i18n-select]').forEach(sel => {
    const map = JSON.parse(sel.getAttribute('data-i18n-select'));
    sel.querySelectorAll('option').forEach(opt => {
      const key = map[opt.value];
      if (key && t[key] !== undefined) opt.textContent = t[key];
    });
  });

  // RTL / LTR
  const isRTL = lang === 'ar';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  document.body.classList.toggle('rtl', isRTL);
}

/* ---------------------------------------------------
   onLangChange registry — pages register re-render callbacks here
   --------------------------------------------------- */
const _langCallbacks = [];
window.onLangChange = function (fn) {
  _langCallbacks.push(fn);
};

/* Wrap applyLang to also fire registered callbacks */
const _applyLangBase = applyLang;
function applyLangFull(lang) {
  _applyLangBase(lang);
  _langCallbacks.forEach(fn => {
    try { fn(lang); } catch(e) { /* ignore */ }
  });
}

/* ---------------------------------------------------
   Expose globally so nav.js and pages can call it
   --------------------------------------------------- */
window.applyLang = applyLangFull;

/* ---------------------------------------------------
   Init: run after full DOM is ready (after nav.js injects navbar)
   --------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const saved = localStorage.getItem('gh-lang') || 'en';
  applyLangFull(saved);
});
