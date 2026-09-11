// ============================================
// Ember & Olive — interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero load-in sequence (runs once, on page load) ---- */
  const heroBits = document.querySelectorAll(
    '.hero-eyebrow, .hero-title [data-word], .hero-sub, .hero-actions'
  );
  requestAnimationFrame(() => {
    heroBits.forEach(el => el.classList.add('in'));
  });

  /* ---- Scroll reveal for section copy (single fade-up, once) ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Menu tabs ---- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-list');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });

  /* ---- Mobile nav toggle ---- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.classList.toggle('open', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Reservation form: lightweight confirmation (no backend) ---- */
  const reserveForm = document.querySelector('.reserve-form');
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = reserveForm.querySelector('.reserve-submit span');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Request sent';
      setTimeout(() => { btn.textContent = original; }, 2400);
    });
  }

});
