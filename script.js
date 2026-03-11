/* ============================================
   SCRIPT.JS — Aarcha Portfolio
   Menu Toggle + Project Filter
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hamburger Menu ---- */
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const navOverlay = document.getElementById('navOverlay');

  if (menuBtn && navOverlay && closeBtn) {
    menuBtn.addEventListener('click', () => {
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Project Filter ---- */
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card-new');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const categories = card.dataset.category || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = 'cardFadeIn 0.4s ease forwards';
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ---- Scroll-reveal for cards ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card-new, .exp-card, .cert-card, .contact-info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
    observer.observe(el);
  });

});
