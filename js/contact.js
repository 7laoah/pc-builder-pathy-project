/* ===================================================
   contact.js — Contact form validation & success state
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('contact-form');
  const successEl = document.getElementById('contact-success');
  if (!form) return;

  /* ---------------------------------------------------
     Helpers
     --------------------------------------------------- */
  function setError(fieldId, errId, msg) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(errId);
    if (field) field.classList.add('error');
    if (err)   err.textContent = msg;
    return false;
  }

  function clearError(fieldId, errId) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(errId);
    if (field) field.classList.remove('error');
    if (err)   err.textContent = '';
    return true;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---------------------------------------------------
     Live char counter on message field
     --------------------------------------------------- */
  const msgField   = document.getElementById('c-message');
  const msgCounter = document.getElementById('msg-counter');
  const MIN_CHARS  = 20;

  function updateCounter() {
    if (!msgField || !msgCounter) return;
    const len = msgField.value.trim().length;
    msgCounter.textContent = `${len} / ${MIN_CHARS} min`;
    msgCounter.classList.toggle('counter--ok',   len >= MIN_CHARS);
    msgCounter.classList.toggle('counter--warn',  len > 0 && len < MIN_CHARS);
  }

  if (msgField) {
    msgField.addEventListener('input', updateCounter);
    updateCounter(); // set initial state
  }

  /* ---------------------------------------------------
     Live clear errors on input
     --------------------------------------------------- */
  [
    ['c-name',    'err-name'],
    ['c-email',   'err-email'],
    ['c-issue',   'err-issue'],
    ['c-message', 'err-message']
  ].forEach(([fieldId, errId]) => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input',  () => clearError(fieldId, errId));
      el.addEventListener('change', () => clearError(fieldId, errId));
    }
  });

  /* ---------------------------------------------------
     Submit
     --------------------------------------------------- */
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('c-name').value.trim();
    const email   = document.getElementById('c-email').value.trim();
    const issue   = document.getElementById('c-issue').value;
    const message = msgField ? msgField.value.trim() : '';

    let valid      = true;
    let firstError = null;

    function check(fieldId, errId, condition, msg) {
      if (!condition) {
        setError(fieldId, errId, msg);
        if (!firstError) firstError = document.getElementById(fieldId);
        valid = false;
      } else {
        clearError(fieldId, errId);
      }
    }

    check('c-name',    'err-name',    name.length >= 2,   'Please enter your full name.');
    check('c-email',   'err-email',   !!email && validateEmail(email),
      !email ? 'Email address is required.' : 'Please enter a valid email address.');
    check('c-issue',   'err-issue',   !!issue,             'Please select an issue type.');
    check('c-message', 'err-message', message.length >= MIN_CHARS,
      message.length === 0
        ? 'Message is required.'
        : `Message is too short (${message.length}/${MIN_CHARS} characters minimum).`
    );

    if (!valid) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show success
    form.classList.add('hidden');
    if (successEl) {
      successEl.classList.remove('hidden');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
