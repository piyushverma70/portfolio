// =============================================
// MAIN JS — navigation, scroll, cursor, 3D tilt
// =============================================

document.addEventListener('DOMContentLoaded', () => {



  // ---- Sticky Navbar ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- Active Nav Link ----
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  if (toggle && navLinksList) {
    toggle.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      toggle.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (toggle.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    navLinksList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // Theme toggle removed (user requested no theme switching)

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // ---- Skill Bar Animation ----
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const target = fill.dataset.width || '0%';
          setTimeout(() => { fill.style.width = target; }, 200);
          skillObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => skillObserver.observe(fill));
  }

  // ---- Unified 3D tilt + thumbnail parallax (CSS-vars driven) ----
  (function() {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.hero-3d-card, .tech-card, .proj-item');

    if (!supportsHover || reduceMotion) {
      // Skip heavy interaction on touch or reduced-motion devices
      elements.forEach(el => {
        el.style.transform = '';
        el.style.transition = '';
      });
      return;
    }

    elements.forEach(el => {
      // initialize CSS vars
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--scale', '1');
      el.style.setProperty('--ty', '0px');
      const thumb = el.querySelector('.proj-thumb-bg');

      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) - 0.5;
        const py = (y / rect.height) - 0.5;
        const ry = px * 12;
        const rx = -py * 10;

        el.style.setProperty('--rx', `${rx}deg`);
        el.style.setProperty('--ry', `${ry}deg`);
        el.style.setProperty('--scale', '1.02');
        el.style.setProperty('--ty', '-6px');

        if (thumb) {
          thumb.style.setProperty('--bg-x', `${-px * 10}px`);
          thumb.style.setProperty('--bg-y', `${-py * 10}px`);
          thumb.style.setProperty('--bg-scale', '1.04');
        }
      };

      const handleLeave = () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--scale', '1');
        el.style.setProperty('--ty', '0px');
        if (thumb) {
          thumb.style.setProperty('--bg-x', '0px');
          thumb.style.setProperty('--bg-y', '0px');
          thumb.style.setProperty('--bg-scale', '1');
        }
      };

      el.addEventListener('mousemove', handleMove);
      el.addEventListener('mouseleave', handleLeave);
      el.addEventListener('mouseenter', () => el.style.setProperty('--scale', '1.02'));

      // keyboard accessibility: make cards focusable and open on Enter/Space
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          el.click();
        }
      });
    });
  })();

  // ---- Page Transition ----
  const transEl = document.querySelector('.page-transition');
  if (transEl) {
    // Intercept nav clicks
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !href.includes('://') && link.target !== '_blank') {
        link.addEventListener('click', e => {
          e.preventDefault();
          transEl.classList.add('in');
          setTimeout(() => { window.location.href = href; }, 450);
        });
      }
    });
  }

  // ---- Counter Animation ----
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const steps = 40;
          const step = target / steps;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = (target % 1 === 0 ? Math.floor(current) : current.toFixed(1)) + suffix;
          }, 40);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  // ---- Contact Form ----
  const form = document.getElementById('contact-form');
  if (form) {
    const errorEl = document.getElementById('form-error');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalBtnHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending... ✨';

      const endpoint = (form.dataset && form.dataset.endpoint) ? form.dataset.endpoint.trim() : '';
      if (!endpoint || endpoint.includes('yourFormId')) {
        console.warn('Form endpoint not configured. Set data-endpoint on #contact-form to your Formspree endpoint.');
        if (errorEl) {
          errorEl.style.display = 'block';
          errorEl.textContent = 'Form endpoint not configured. Configure Formspree and replace the form data-endpoint.';
        }
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
        return;
      }

      const formData = new FormData(form);
      let res;
      const isInternal = endpoint.startsWith('/') || endpoint.startsWith(window.location.origin);
      try {
        if (isInternal) {
          // send JSON to our Vercel function
          const payload = {};
          formData.forEach((value, key) => { payload[key] = value; });
          res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          // external form endpoint (Formspree / formsubmit) expects FormData
          if (formData.get('email')) formData.set('_replyto', formData.get('email'));
          res = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });
        }

        if (res && res.ok) {
          form.style.display = 'none';
          const success = document.querySelector('.form-success');
          if (success) success.classList.add('show');
        } else {
          const data = (res && res.json) ? await res.json().catch(() => ({})) : {};
          const msg = data && data.error ? data.error : 'Submission failed — please try again.';
          if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = msg; }
          btn.disabled = false;
          btn.innerHTML = originalBtnHtml;
        }
      } catch (err) {
        if (errorEl) { errorEl.style.display = 'block'; errorEl.textContent = 'Network error — please try again.'; }
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
      }
    });
  }


  // ---- Project Modal Logic ----
  const projectItems = document.querySelectorAll('.proj-item');
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');

  // Ensure project cards are keyboard-focusable for accessibility
  projectItems.forEach(it => {
    if (!it.hasAttribute('tabindex')) it.setAttribute('tabindex', '0');
    if (!it.hasAttribute('role')) it.setAttribute('role', 'button');
  });

  if (projectItems.length > 0 && modalOverlay) {
    const mIcon = document.getElementById('modal-icon');
    const mType = document.getElementById('modal-type');
    const mRating = document.getElementById('modal-rating');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mTechStack = document.getElementById('modal-tech-stack');
    const mLink = document.getElementById('modal-link');
    const mHeader = document.getElementById('modal-header');

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    projectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Prevent if clicking an actual anchor inside the card
        if (e.target.closest('a')) return;

        // Extract data
        const bG = item.querySelector('.proj-thumb-bg');
        const icon = bG ? bG.textContent.trim() : '🚀';
        const bgStyle = bG ? bG.getAttribute('style') : '';

        const typeEl = item.querySelector('.proj-type');
        const ratingEl = item.querySelector('.proj-rating');
        const titleEl = item.querySelector('h3');
        const descEl = item.querySelector('p');
        const linkEl = item.querySelector('.proj-thumb-cta a');

        const tags = Array.from(item.querySelectorAll('.tech-tag')).map(t => t.textContent);

        // Populate
        if (mIcon) mIcon.textContent = icon;
        if (mHeader) {
          if (bgStyle) mHeader.setAttribute('style', bgStyle);
          else mHeader.removeAttribute('style');
        }
        if (mType && typeEl) mType.textContent = typeEl.textContent;
        if (mRating && ratingEl) mRating.textContent = ratingEl.textContent;
        if (mTitle && titleEl) mTitle.textContent = titleEl.textContent;
        if (mDesc && descEl) mDesc.textContent = descEl.textContent;

        if (mTechStack) {
          mTechStack.innerHTML = '';
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tag;
            mTechStack.appendChild(span);
          });
        }

        if (mLink) {
          if (linkEl) {
            const url = linkEl.getAttribute('href');
            if (url === '#' || url === '#case-study') {
              mLink.textContent = 'Close Details';
              mLink.href = '#';
              mLink.onclick = (ev) => { ev.preventDefault(); closeModal(); };
            } else {
              mLink.textContent = 'Live View ↗';
              mLink.href = url;
              mLink.onclick = null;
            }
          } else {
            mLink.textContent = 'Close Details';
            mLink.href = '#';
            mLink.onclick = (ev) => { ev.preventDefault(); closeModal(); };
          }
        }

        // Populate rich content (case studies) if any
        const rcElement = document.getElementById('modal-rich-content');
        if (rcElement) {
          rcElement.innerHTML = '';
          const caseStudyData = item.querySelector('.proj-case-study');
          if (caseStudyData) {
            rcElement.innerHTML = caseStudyData.innerHTML;
          }
        }

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
  }

  // ---- Parallax on hero ----
  window.addEventListener('scroll', () => {
    const heroGrid = document.querySelector('.hero-grid-overlay');
    const heroBg = document.querySelector('.hero-bg');
    if (heroGrid) {
      heroGrid.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    }
    if (heroBg) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
  });

  // (Removed duplicate tilt handler — unified above)

  // ---- Interactive About Card with Golden Spotlight ----
  const aboutCard = document.querySelector('.about-img-box');
  if (aboutCard) {
    // Create spotlight overlay
    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 5;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: radial-gradient(circle 200px at var(--mx) var(--my), 
        rgba(244, 162, 37, 0.15) 0%, 
        transparent 100%);
    `;
    aboutCard.appendChild(spotlight);

    // Create shine sweep
    const shine = document.createElement('div');
    shine.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 6;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(255, 255, 255, 0.03) 45%,
        rgba(255, 255, 255, 0.06) 50%,
        rgba(255, 255, 255, 0.03) 55%,
        transparent 60%
      );
      background-size: 200% 100%;
      animation: shineSweep 3s ease-in-out infinite;
    `;
    aboutCard.appendChild(shine);

    // Add keyframe for shine
    if (!document.getElementById('shine-keyframe')) {
      const style = document.createElement('style');
      style.id = 'shine-keyframe';
      style.textContent = `
        @keyframes shineSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      document.head.appendChild(style);
    }

    aboutCard.addEventListener('mousemove', e => {
      const rect = aboutCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 16;
      const yPercent = (y / rect.height - 0.5) * -16;

      // Smooth 3D tilt
      aboutCard.style.transform = `perspective(800px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) scale3d(1.03, 1.03, 1.03)`;
      aboutCard.style.transition = 'none';

      // Golden spotlight follows cursor
      aboutCard.style.setProperty('--mx', x + 'px');
      aboutCard.style.setProperty('--my', y + 'px');
      spotlight.style.opacity = '1';
      spotlight.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(244, 162, 37, 0.18) 0%, transparent 100%)`;
      shine.style.opacity = '1';

      // Dynamic golden border glow
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      aboutCard.style.borderColor = 'rgba(244, 162, 37, 0.45)';
      aboutCard.style.boxShadow = `
        0 30px 80px rgba(244, 162, 37, 0.15),
        0 10px 30px rgba(17, 24, 39, 0.3),
        0 0 0 3px rgba(244, 162, 37, 0.2),
        inset 0 0 80px rgba(244, 162, 37, 0.04)
      `;
    });

    aboutCard.addEventListener('mouseleave', () => {
      aboutCard.style.transform = '';
      aboutCard.style.borderColor = '';
      aboutCard.style.boxShadow = '';
      aboutCard.style.transition = 'transform 260ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 260ms ease, border-color 240ms ease';
      spotlight.style.opacity = '0';
      shine.style.opacity = '0';
    });
  }

});
