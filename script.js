/* ============================================================
   SCRIPT.JS — Technical PM Portfolio
   Clock + Typing + Active Nav + Scroll Reveal + Hero Sweep + FAB
   ============================================================ */

// ── 1. Live Clock (IST) ──
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }) + ' IST';
}
updateClock();
setInterval(updateClock, 1000);

// ── 2. PM-Focused Typing Animation ──
const phrases = [
  'Technical Project Manager',
  'Program Leader & Builder',
  'Computer Science & AI/ML',
  'Product Strategist',
  'TEDx Lead Organizer',
  'Rotaract Tech & Community Lead'
];
let pi = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-text');

function type() {
  if (!typed) return;
  const cur = phrases[pi];
  if (deleting) {
    typed.textContent = cur.substring(0, ci - 1);
    ci--;
  } else {
    typed.textContent = cur.substring(0, ci + 1);
    ci++;
  }
  let delay = deleting ? 35 : 65;
  if (!deleting && ci === cur.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
setTimeout(type, 800);

// ── 3. Scroll Reveal Observer ──
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');

      const cards = entry.target.querySelectorAll('[data-card]');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('revealed');
        }, i * 70);
      });

      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  sectionObserver.observe(el);
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('[data-card]').forEach(el => {
  cardObserver.observe(el);
});

// ── 4. Active Navigation Link Highlighting ──
const navLinks = document.querySelectorAll('.top-nav .nav-links a');
const sections = document.querySelectorAll('section[id], footer[id]');

function highlightNavOnScroll() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNavOnScroll);

// ── Mobile Navigation Drawer ──
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-nav-footer a');

function openMobileNav() {
  if (!mobileNavDrawer || !hamburgerBtn) return;
  mobileNavDrawer.classList.add('open');
  hamburgerBtn.classList.add('active');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  if (!mobileNavDrawer || !hamburgerBtn) return;
  mobileNavDrawer.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
}

if (mobileNavClose) {
  mobileNavClose.addEventListener('click', closeMobileNav);
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileNav();
  });
});

// ── 5. FAB Panel ──
const fabTrigger = document.getElementById('fabTrigger');
const fabItems = document.getElementById('fabItems');
const fabContainer = document.getElementById('fabContainer');

if (fabTrigger && fabItems) {
  fabTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    fabItems.classList.toggle('open');
    fabTrigger.classList.toggle('active');
  });

  fabItems.querySelectorAll('.fab-item').forEach(item => {
    item.addEventListener('click', () => {
      fabItems.classList.remove('open');
      fabTrigger.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (fabContainer && !fabContainer.contains(e.target)) {
      fabItems.classList.remove('open');
      fabTrigger.classList.remove('active');
    }
  });
}

// ── 6. Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90; // account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ── 7. Dynamic Hero Name Sweep ──
const heroName = document.querySelector('.hero-name');
const animatedRules = document.querySelectorAll('.rule-red, .div-line-red');
let fillPercent = 0;
let targetPercent = 0;
let maskX = 50, maskY = 50;

if (heroName) {
  heroName.addEventListener('mousemove', (e) => {
    const rect = heroName.getBoundingClientRect();
    maskX = ((e.clientX - rect.left) / rect.width) * 100;
    maskY = ((e.clientY - rect.top) / rect.height) * 100;
    heroName.style.setProperty('--x', `${maskX}%`);
    heroName.style.setProperty('--y', `${maskY}%`);
  });

  heroName.addEventListener('mouseenter', () => { targetPercent = 150; });
  heroName.addEventListener('mouseleave', () => { targetPercent = 0; });

  function animateSweep() {
    fillPercent += (targetPercent - fillPercent) * 0.12;
    heroName.style.setProperty('--p', `${fillPercent}%`);
    
    const scrollPos = window.scrollY;
    
    animatedRules.forEach(rule => {
      const parent = rule.parentElement;
      const rect = parent.getBoundingClientRect();
      const absoluteTop = rect.top + scrollPos;
      const startScrollY = Math.max(0, absoluteTop - window.innerHeight + 50);
      
      if (scrollPos > startScrollY) {
        const speed = (rect.width + 100) / window.innerHeight;
        const move = (scrollPos - startScrollY) * Math.max(0.5, speed);
        rule.style.transform = `translateX(-${move}px)`;
      } else {
        rule.style.transform = `translateX(0)`;
      }
    });

    requestAnimationFrame(animateSweep);
  }
  animateSweep();
}

// ── 8. Back to Top Button ──
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
