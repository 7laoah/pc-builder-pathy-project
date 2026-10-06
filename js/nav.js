/* ===================================================
   nav.js — Injects shared navbar and footer + theme + lang toggle
   =================================================== */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  // ── Theme: apply saved preference immediately (dark is default) ──
  const savedTheme = localStorage.getItem('gh-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // ── Lang: apply saved preference immediately (en is default) ──
  const savedLang = localStorage.getItem('gh-lang') || 'en';
  document.documentElement.setAttribute('lang', savedLang);
  document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

  function isActive(page) {
    return path === page ? 'active' : '';
  }

  // ── Navbar HTML ──────────────────────────────────
  const navbarHTML = `
    <nav class="navbar" id="main-navbar">
      <div class="navbar__inner">
        <a href="index.html" class="navbar__logo">Gaming<span>Hub</span></a>

        <div class="navbar__links">
          <a href="index.html" class="${isActive('index.html')}" data-i18n="nav.home">Home</a>
          <a href="products.html" class="${isActive('products.html')}" data-i18n="nav.products">Products</a>
          <a href="build.html" class="${isActive('build.html')}" data-i18n="nav.build">Build Your PC</a>
          <a href="contact.html" class="${isActive('contact.html')}" data-i18n="nav.support">Support</a>
          <a href="checkout.html" class="nav-cta ${isActive('checkout.html')}" data-i18n="nav.checkout">Checkout</a>
          <button class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle light/dark mode">
            <span class="theme-toggle__icon" id="theme-icon"></span>
          </button>
          <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
            <span id="lang-label">EN</span>
          </button>
        </div>

        <div class="navbar__right-mobile">
          <button class="lang-toggle" id="lang-toggle-btn-mobile" aria-label="Switch language">
            <span id="lang-label-mobile">EN</span>
          </button>
          <button class="theme-toggle theme-toggle--mobile" id="theme-toggle-btn-mobile" aria-label="Toggle light/dark mode">
            <span class="theme-toggle__icon" id="theme-icon-mobile"></span>
          </button>
          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div class="navbar__mobile" id="mobile-menu">
        <a href="index.html" class="${isActive('index.html')}" data-i18n="nav.home">Home</a>
        <a href="products.html" class="${isActive('products.html')}" data-i18n="nav.products">Products</a>
        <a href="build.html" class="${isActive('build.html')}" data-i18n="nav.build">Build Your PC</a>
        <a href="contact.html" class="${isActive('contact.html')}" data-i18n="nav.support">Support</a>
        <a href="checkout.html" class="${isActive('checkout.html')}" data-i18n="nav.checkout">Checkout</a>
      </div>
    </nav>`;

  // ── Footer HTML ───────────────────────────────────
  const year = new Date().getFullYear();
  const footerHTML = `
    <footer class="footer">
      <div class="footer__grid">
        <div class="footer__brand">
          <a href="index.html" class="footer__logo">Gaming<span>Hub</span></a>
          <p data-i18n="footer.tagline">Your one-stop shop for high-performance gaming PCs. Ready-made rigs or fully custom builds — we've got you covered.</p>
        </div>
        <div class="footer__col">
          <h4 data-i18n="footer.shop">Shop</h4>
          <ul>
            <li><a href="products.html" data-i18n="footer.ready">Ready-Made PCs</a></li>
            <li><a href="build.html" data-i18n="footer.build">Build Your Own</a></li>
            <li><a href="checkout.html" data-i18n="footer.checkout">Checkout</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 data-i18n="footer.support">Support</h4>
          <ul>
            <li><a href="contact.html" data-i18n="footer.contact">Contact Us</a></li>
            <li><a href="contact.html" data-i18n="footer.track">Track Order</a></li>
            <li><a href="contact.html" data-i18n="footer.returns">Returns</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4 data-i18n="footer.company">Company</h4>
          <ul>
            <li><a href="#" data-i18n="footer.about">About Us</a></li>
            <li><a href="#" data-i18n="footer.privacy">Privacy Policy</a></li>
            <li><a href="#" data-i18n="footer.terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>&copy; ${year} <span data-i18n="footer.rights">GamingHub. All rights reserved.</span></span>
        <span>
          <a href="contact.html">support@gaminghub.com</a> &nbsp;·&nbsp;
          <a href="contact.html">+966 11 234 5678</a>
        </span>
      </div>
    </footer>`;

  // ── Inject ────────────────────────────────────────
  const navPlaceholder    = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder)    navPlaceholder.outerHTML    = navbarHTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = footerHTML;

  // Re-apply translations to newly injected navbar/footer elements
  if (typeof window.applyLang === 'function') {
    window.applyLang(savedLang);
  }

  // ── Theme toggle logic ────────────────────────────
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setThemeIcon(theme) {
    const icon  = document.getElementById('theme-icon');
    const iconM = document.getElementById('theme-icon-mobile');
    const label = theme === 'dark' ? '☀️' : '🌙';
    if (icon)  icon.textContent  = label;
    if (iconM) iconM.textContent = label;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gh-theme', theme);
    setThemeIcon(theme);
  }

  setThemeIcon(getCurrentTheme());

  function handleThemeToggle() {
    applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
  }

  const themeBtn       = document.getElementById('theme-toggle-btn');
  const themeBtnMobile = document.getElementById('theme-toggle-btn-mobile');
  if (themeBtn)       themeBtn.addEventListener('click', handleThemeToggle);
  if (themeBtnMobile) themeBtnMobile.addEventListener('click', handleThemeToggle);

  // ── Language toggle logic ─────────────────────────
  function getCurrentLang() {
    return localStorage.getItem('gh-lang') || 'en';
  }

  function setLangLabel(lang) {
    const lbl  = document.getElementById('lang-label');
    const lblM = document.getElementById('lang-label-mobile');
    const text = lang === 'ar' ? 'EN' : 'AR';   // shows what you'll switch TO
    if (lbl)  lbl.textContent  = text;
    if (lblM) lblM.textContent = text;
  }

  function applyLang(lang) {
    localStorage.setItem('gh-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('rtl', lang === 'ar');
    setLangLabel(lang);
    // Call the i18n engine if available
    if (typeof window.applyLang === 'function') window.applyLang(lang);
  }

  // Set initial label
  setLangLabel(getCurrentLang());

  function handleLangToggle() {
    applyLang(getCurrentLang() === 'ar' ? 'en' : 'ar');
  }

  const langBtn       = document.getElementById('lang-toggle-btn');
  const langBtnMobile = document.getElementById('lang-toggle-btn-mobile');
  if (langBtn)       langBtn.addEventListener('click', handleLangToggle);
  if (langBtnMobile) langBtnMobile.addEventListener('click', handleLangToggle);

  // ── Hamburger toggle ──────────────────────────────
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
})();
