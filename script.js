/* ============================================================
   SCRIPT.JS — Product Manager Portfolio
   Scroll reveal · active nav · mobile drawer · back to top
   ============================================================ */

// ── 1. Scroll reveal ──
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('revealed'));
}

// ── 2. Active navigation link ──
const navLinks = document.querySelectorAll('.nav-links a, .nav-contact');
const navSections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function highlightNav() {
  const probe = window.scrollY + window.innerHeight * 0.35;
  let currentId = null;

  navSections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (probe >= top) currentId = sec.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// ── 3. Mobile navigation drawer ──
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const mobileNavClose = document.getElementById('mobileNavClose');

function setMobileNav(open) {
  if (!mobileNavDrawer || !hamburgerBtn) return;
  mobileNavDrawer.classList.toggle('open', open);
  hamburgerBtn.classList.toggle('active', open);
  hamburgerBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    setMobileNav(!mobileNavDrawer.classList.contains('open'));
  });
}
if (mobileNavClose) mobileNavClose.addEventListener('click', () => setMobileNav(false));
document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => setMobileNav(false));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMobileNav(false);
});

// ── 4. Back to top ──
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
