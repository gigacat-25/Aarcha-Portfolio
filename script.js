/* ============================================================
   SCRIPT.JS — Editorial Portfolio
   Clock + Typing + Scroll Reveal + FAB
   ============================================================ */

// ── Live Clock (IST) ──
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }) + ' IST';
}
updateClock();
setInterval(updateClock, 1000);

// ── Typing Animation ──
const phrases = [
  'AI/ML Engineering Student',
  'Frontend Developer',
  'Open Source Contributor',
  'Hackathon Enthusiast',
  'TEDx Lead Organizer',
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
  let delay = deleting ? 40 : 70;
  if (!deleting && ci === cur.length) { delay = 2200; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
setTimeout(type, 900);

// ── Scroll Reveal ──
// Reveal [data-reveal] sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');

      // Stagger children with [data-card]
      const cards = entry.target.querySelectorAll('[data-card]');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('revealed');
        }, i * 80);
      });

      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  sectionObserver.observe(el);
});

// Also handle [data-card] elements outside [data-reveal] containers
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

// ── FAB Panel ──
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

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Dynamic Hero Name Sweep ──
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
    
    // ── Scroll-driven Rule Motion ──
    const scrollPos = window.scrollY;
    
    animatedRules.forEach(rule => {
      const parent = rule.parentElement;
      const rect = parent.getBoundingClientRect();
      
      // Find exactly where the element sits in the document
      const absoluteTop = rect.top + scrollPos;
      
      // Calculate the scroll position at which the element comes into view.
      // Math.max(0, ...) ensures elements already on screen at load (like Hero) start fully at the right edge (0 movement).
      const startScrollY = Math.max(0, absoluteTop - window.innerHeight + 50);
      
      if (scrollPos > startScrollY) {
        // Dynamically scale the speed so the red line crosses the entire width
        // exactly as you scroll past the element
        const speed = (rect.width + 100) / window.innerHeight;
        const move = (scrollPos - startScrollY) * Math.max(0.5, speed);
        rule.style.transform = `translateX(-${move}px)`;
      } else {
        // Keeps the red line resting perfectly at the right edge before scrolling
        rule.style.transform = `translateX(0)`;
      }
    });

    requestAnimationFrame(animateSweep);
  }
  animateSweep();
}
