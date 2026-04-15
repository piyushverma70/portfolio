// =============================================
// INTRO SCREEN JS
// =============================================

(function () {
  const introScreen = document.getElementById('intro-screen');
  if (!introScreen) return;

  // Only show intro on first visit (or use sessionStorage)
  const visited = sessionStorage.getItem('pv_intro_seen');
  if (visited) {
    introScreen.style.display = 'none';
    return;
  }

  // Generate floating particles
  const particleContainer = introScreen.querySelector('.intro-particles');
  if (particleContainer) {
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: -10px;
        width: ${size}px;
        height: ${size}px;
        --drift: ${(Math.random() - 0.5) * 120}px;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.7 + 0.1};
      `;
      particleContainer.appendChild(p);
    }
  }

  // Timeline:
  // 0.5s → greeting appears
  // 0.9s → name appears
  // 1.4s → role appears
  // 1.8s → divider appears
  // 2.4s → scroll hint appears
  // 3.2s → start fade out
  // 4.4s → done, hide intro

  const FADE_DELAY = 3200;
  const FADE_DURATION = 1200;

  setTimeout(() => {
    introScreen.classList.add('fade-out');
    sessionStorage.setItem('pv_intro_seen', 'true');

    setTimeout(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, FADE_DURATION);
  }, FADE_DELAY);

  // Lock scroll during intro
  document.body.style.overflow = 'hidden';

  // Allow skip on click or keypress
  introScreen.addEventListener('click', () => skipIntro());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') skipIntro();
  });

  function skipIntro() {
    introScreen.classList.add('fade-out');
    sessionStorage.setItem('pv_intro_seen', 'true');
    setTimeout(() => {
      introScreen.style.display = 'none';
      document.body.style.overflow = '';
    }, 600);
  }

})();
