// ============================================================
//  MARK'S PLUMBING v2 — script.js
// ============================================================

// ── FLOATING CALL BUTTON: show after scrolling past hero ──
const floatCall = document.getElementById('floatCall');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    floatCall.classList.add('visible');
  } else {
    floatCall.classList.remove('visible');
  }
});

// ── MOBILE NAV TOGGLE ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.scard, .rcard, .cd-item, .why-list li, .feature-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
  revealObserver.observe(el);
});

// ── CONTACT FORM ──
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fname   = document.getElementById('fname');
  const phone   = document.getElementById('phone');
  const service = document.getElementById('service');

  let valid = true;
  [fname, phone, service].forEach(el => el.classList.remove('error'));

  if (!fname.value.trim())  { fname.classList.add('error');   valid = false; }
  if (!phone.value.trim())  { phone.classList.add('error');   valid = false; }
  if (!service.value)       { service.classList.add('error'); valid = false; }

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Request →';
    btn.disabled = false;
    formSuccess.classList.add('visible');
    setTimeout(() => formSuccess.classList.remove('visible'), 5000);
  }, 1000);
});
