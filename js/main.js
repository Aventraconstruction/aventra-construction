/* ============================================================
   AVENTRA CONSTRUCTION — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // NAVIGATION
  // ============================================================
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('mobileNav');

  // Scroll effect
  function updateNav() {
    if (window.scrollY > 60) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }
    // Scroll to top button
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ============================================================
  // ANIMATED COUNTERS
  // ============================================================
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, step);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { counterObserver.observe(el); });
  }

  // ============================================================
  // PROGRESS BARS
  // ============================================================
  const progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length > 0 && 'IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width') || '0';
          entry.target.style.width = width + '%';
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    progressBars.forEach(function (bar) {
      bar.style.width = '0%';
      progressObserver.observe(bar);
    });
  }

  // ============================================================
  // HERO BG PARALLAX + LOAD ANIMATION
  // ============================================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(function () { heroBg.classList.add('loaded'); }, 100);
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      heroBg.style.transform = 'scale(1) translateY(' + scrolled * 0.3 + 'px)';
    }, { passive: true });
  }

  // ============================================================
  // PROJECT FILTER TABS
  // ============================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length > 0) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        document.querySelectorAll('.filterable').forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            setTimeout(function () { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(function () { item.style.display = 'none'; }, 350);
          }
        });
      });
    });
  }

  // ============================================================
  // ACCORDION
  // ============================================================
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ============================================================
  // DOWNLOAD MODAL
  // ============================================================
  const modal = document.getElementById('downloadModal');
  const modalClose = document.getElementById('modalClose');
  let currentDownload = '';

  document.querySelectorAll('.download-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentDownload = btn.getAttribute('data-file') || 'Resource';
      if (modal) {
        modal.classList.add('active');
        document.getElementById('downloadName') && (document.getElementById('downloadName').textContent = currentDownload);
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Download form submit
  const downloadForm = document.getElementById('downloadForm');
  if (downloadForm) {
    downloadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const successMsg = document.getElementById('downloadSuccess');
      if (successMsg) {
        successMsg.style.display = 'block';
        downloadForm.style.display = 'none';
        setTimeout(function () {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          downloadForm.style.display = '';
          successMsg.style.display = 'none';
          downloadForm.reset();
        }, 3000);
      }
    });
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #48BB78, #38A169)';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    });
  }

  // ============================================================
  // SCROLL TO TOP
  // ============================================================
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // TESTIMONIAL AUTO-CYCLE (subtle highlight)
  // ============================================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 1) {
    let current = 0;
    setInterval(function () {
      testimonialCards.forEach(function (c) { c.style.borderColor = ''; });
      testimonialCards[current].style.borderColor = 'var(--gold)';
      current = (current + 1) % testimonialCards.length;
    }, 3000);
  }

  // ============================================================
  // SMOOTH HOVER TILT on cards
  // ============================================================
  document.querySelectorAll('.card, .service-card, .project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -3;
      const rotY = ((x - midX) / midX) * 3;
      card.style.transform = 'translateY(-6px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'all 0.5s ease';
    });
  });

});
