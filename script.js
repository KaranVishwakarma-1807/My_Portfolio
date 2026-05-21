// === SCROLL PROGRESS BAR ===
function computeScrollPercent(scrollY, maxScroll) {
  return (Math.min(scrollY, maxScroll) / maxScroll) * 100;
}

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (maxScroll > 0) {
    const percent = computeScrollPercent(window.scrollY, maxScroll);
    document.getElementById('scroll-progress').style.width = percent + '%';
  }
});

// === BACK TO TOP ===
function computeBackToTopVisibility(scrollY) {
  return scrollY > 400;
}

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (computeBackToTopVisibility(window.scrollY)) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === TYPING ANIMATION ===

/**
 * simulateTypingCycle(roles) — pure helper
 * Returns the ordered array of roles shown in one full cycle.
 * One cycle = every role displayed exactly once, in order.
 * Used by property-based tests (Property 3).
 *
 * @param {string[]} roles
 * @returns {string[]}
 */
function simulateTypingCycle(roles) {
  return roles.slice();
}

/**
 * initTypingAnimator(roles, typeSpeed, deleteSpeed, pauseMs)
 * Cycles through `roles` indefinitely, typing and deleting each one.
 * Respects prefers-reduced-motion: if set, renders roles[0] statically.
 *
 * @param {string[]} roles       - Array of role strings to cycle through
 * @param {number}   typeSpeed   - Milliseconds between each typed character
 * @param {number}   deleteSpeed - Milliseconds between each deleted character
 * @param {number}   pauseMs     - Milliseconds to pause after fully typing a role
 */
function initTypingAnimator(roles, typeSpeed, deleteSpeed, pauseMs) {
  const el = document.getElementById('typing-text');
  if (!el || !roles || roles.length === 0) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
      // Typing phase: add one character
      currentCharIndex++;
      el.textContent = currentRole.slice(0, currentCharIndex);

      if (currentCharIndex === currentRole.length) {
        // Fully typed — pause before deleting
        isDeleting = true;
        setTimeout(tick, pauseMs);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      // Deleting phase: remove one character
      currentCharIndex--;
      el.textContent = currentRole.slice(0, currentCharIndex);

      if (currentCharIndex === 0) {
        // Fully deleted — move to next role
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  // Kick off the animation
  setTimeout(tick, pauseMs);
}

// Initialise with the three hero roles
initTypingAnimator(
  ['Android Developer', 'Cloud Engineer', 'AI/CV Builder', 'Python Developer'],
  100,  // typeSpeed ms
  60,   // deleteSpeed ms
  1800  // pauseMs
);

// === END TYPING ANIMATION ===

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Dark mode toggle
const toggle = document.getElementById('themeToggle');
const sun = document.getElementById('icon-sun');
const moon = document.getElementById('icon-moon');
const html = document.documentElement;

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  sun.style.display = dark ? 'block' : 'none';
  moon.style.display = dark ? 'none' : 'block';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved ? saved === 'dark' : prefersDark);

toggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') !== 'dark');
});

// === HERO CANVAS ===
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const hero = document.getElementById('hero');

  // Helper: apply static gradient fallback and remove canvas
  function applyStaticFallback() {
    canvas.remove();
    if (hero) {
      hero.style.background =
        'linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 60%)';
    }
  }

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyStaticFallback();
    return;
  }

  // Check canvas 2D context availability
  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    applyStaticFallback();
    return;
  }

  let canvasWidth = 0;
  let canvasHeight = 0;
  const particles = [];

  // Resize canvas to match its rendered size without stretching the drawing.
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const nextWidth = rect.width;
    const nextHeight = rect.height;
    const dpr = window.devicePixelRatio || 1;
    const scaleX = canvasWidth > 0 ? nextWidth / canvasWidth : 1;
    const scaleY = canvasHeight > 0 ? nextHeight / canvasHeight : 1;

    canvasWidth = nextWidth;
    canvasHeight = nextHeight;
    canvas.width = Math.round(nextWidth * dpr);
    canvas.height = Math.round(nextHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles.forEach((p) => {
      p.x *= scaleX;
      p.y *= scaleY;
    });
  }

  // Read theme-aware colors from CSS custom properties
  function getThemeColor(prop) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(prop)
      .trim();
  }

  // Create ~40 particles
  const PARTICLE_COUNT = 40;

  function createParticle() {
    return {
      x:       Math.random() * canvasWidth,
      y:       Math.random() * canvasHeight,
      vx:      (Math.random() - 0.5) * 0.6,
      vy:      (Math.random() - 0.5) * 0.6,
      radius:  Math.random() * 2 + 1,       // 1–3 px
      opacity: Math.random() * 0.35 + 0.1,  // 0.10–0.45
    };
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }

  let animFrameId = null;

  function draw() {
    const w = canvasWidth;
    const h = canvasHeight;

    ctx.clearRect(0, 0, w, h);

    const particleColor = getThemeColor('--particle-color');

    for (const p of particles) {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap at edges
      if (p.x < -p.radius)  p.x = w + p.radius;
      if (p.x > w + p.radius) p.x = -p.radius;
      if (p.y < -p.radius)  p.y = h + p.radius;
      if (p.y > h + p.radius) p.y = -p.radius;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animFrameId = requestAnimationFrame(draw);
  }

  draw();

  // Stop animation when hero is not visible (performance)
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animFrameId) draw();
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      });
    },
    { threshold: 0 }
  );
  if (hero) heroObserver.observe(hero);
}

initHeroCanvas();

// === FILTER CONTROLLER ===

/**
 * applyFilter(filter, cards) — pure function
 * Returns array of { tags, visible } objects.
 * @param {string} filter - 'all' | 'android' | 'cloud' | 'ai'
 * @param {Array<{tags: string[]}>} cards
 * @returns {Array<{tags: string[], visible: boolean}>}
 */
function applyFilter(filter, cards) {
  return cards.map(card => ({
    tags: card.tags,
    visible: filter === 'all' || card.tags.includes(filter),
  }));
}

function initFilterController() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function applyFilterToDOM(filter) {
    const cardData = Array.from(projectCards).map(el => ({
      el,
      tags: (el.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    }));
    const results = applyFilter(filter, cardData);
    results.forEach(({ el, visible }) => {
      el.classList.toggle('hidden', !visible);
    });
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilterToDOM(btn.dataset.filter));
  });

  // Default to 'all' on load
  applyFilterToDOM('all');
}

initFilterController();

// === CARD EXPANDER ===

/**
 * toggleCard(state) — pure function
 * Returns new { expanded, ariaExpanded } state.
 * @param {{ expanded: boolean, ariaExpanded: string }} state
 * @returns {{ expanded: boolean, ariaExpanded: string }}
 */
function toggleCard(state) {
  const expanded = !state.expanded;
  return { expanded, ariaExpanded: String(expanded) };
}

function initCardExpander() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.card-toggle');
    const card = e.target.closest('.project-card');
    if (!card) return;

    const currentExpanded = card.dataset.expanded === 'true';
    const newState = toggleCard({ expanded: currentExpanded, ariaExpanded: String(currentExpanded) });

    card.dataset.expanded = String(newState.expanded);
    const btn = card.querySelector('.card-toggle');
    if (btn) {
      btn.setAttribute('aria-expanded', newState.ariaExpanded);
      btn.textContent = newState.expanded ? 'Details ▴' : 'Details ▾';
    }

    if (newState.expanded) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

initCardExpander();

// === CERTIFICATION BADGES ===

const CERT_DATA = [
  { code: 'AZ-900', fullName: 'Azure Fundamentals',                    credlyUrl: 'https://drive.google.com/file/d/1p-zQ2P_9FkyZxWn2-xBy_Odbq_6VG0cv/view?usp=sharing' },
  { code: 'AI-900', fullName: 'Azure AI Fundamentals',                  credlyUrl: 'https://www.credly.com/badges/microsoft-certified-azure-ai-fundamentals' },
  { code: 'AI-102', fullName: 'Azure AI Engineer Associate',            credlyUrl: 'https://www.credly.com/badges/microsoft-certified-azure-ai-engineer-associate' },
  { code: 'PL-900', fullName: 'Power Platform Fundamentals',            credlyUrl: 'https://www.credly.com/badges/microsoft-certified-power-platform-fundamentals' },
  { code: 'DP-900', fullName: 'Azure Data Fundamentals',                credlyUrl: 'https://www.credly.com/badges/microsoft-certified-azure-data-fundamentals' },
  { code: 'SC-900', fullName: 'Security, Compliance &amp; Identity',    credlyUrl: 'https://www.credly.com/badges/microsoft-certified-security-compliance-and-identity-fundamentals' },
];

/**
 * renderBadge(badge) — pure function
 * Returns an HTML string for a cert badge card.
 * @param {{ code: string, fullName: string, credlyUrl: string }} badge
 * @returns {string}
 */
function renderBadge(badge) {
  return `<div class="cert-badge-card">
    <span class="cert-badge">${badge.code}</span>
    <span class="cert-name">${badge.fullName}</span>
    <a href="${badge.credlyUrl}" target="_blank" rel="noopener">Verify on Credly</a>
  </div>`;
}

// The cert-grid HTML is already in index.html; renderBadge is exposed for testing.
// Optionally regenerate from CERT_DATA:
(function syncCertGrid() {
  const grid = document.querySelector('.cert-grid');
  if (!grid) return;
  grid.innerHTML = CERT_DATA.map(renderBadge).join('');
})();

// === CLIPBOARD BUTTON ===

function initClipboardButton() {
  const btn = document.querySelector('.clipboard-btn');
  if (!btn) return;

  const EMAIL = 'karanallen625@outlook.com';

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    let success = false;

    // Try modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(EMAIL);
        success = true;
      } catch (_) { /* fall through */ }
    }

    // Fallback: execCommand
    if (!success) {
      try {
        const ta = document.createElement('textarea');
        ta.value = EMAIL;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        success = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (_) { /* fall through */ }
    }

    if (success) {
      // Swap to checkmark SVG for 2 seconds
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l4 4 6-7"/></svg>`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
      }, 2000);
    } else {
      // Total failure: show tooltip with email
      btn.setAttribute('title', EMAIL);
      btn.setAttribute('aria-label', `Copy failed — email: ${EMAIL}`);
    }
  });
}

initClipboardButton();

// === SOUND TOGGLE ===

/**
 * persistSoundState(enabled) — pure side-effect function
 * Writes sound state to localStorage.
 * @param {boolean} enabled
 */
function persistSoundState(enabled) {
  localStorage.setItem('soundEnabled', String(enabled));
}

/**
 * loadSoundState() — pure function
 * Reads sound state from localStorage; defaults to false.
 * @returns {boolean}
 */
function loadSoundState() {
  return localStorage.getItem('soundEnabled') === 'true';
}

function initSoundToggle() {
  try {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;

    const cozyTrack = document.getElementById('background-music');
    if (!cozyTrack) return;

    cozyTrack.loop = true;
    cozyTrack.preload = 'metadata';
    cozyTrack.volume = 0.32;
    cozyTrack.pause();

    let soundEnabled = false;
    persistSoundState(false);

    const iconOn  = document.getElementById('icon-sound-on');
    const iconOff = document.getElementById('icon-sound-off');

    function updateUI() {
      if (iconOn)  iconOn.style.display  = soundEnabled ? 'block' : 'none';
      if (iconOff) iconOff.style.display = soundEnabled ? 'none'  : 'block';
      btn.classList.toggle('sound-muted', !soundEnabled);
      btn.setAttribute('aria-label', soundEnabled ? 'Pause background music' : 'Play background music');
      btn.setAttribute('aria-pressed', String(soundEnabled));
    }

    updateUI();

    btn.addEventListener('click', async () => {
      if (soundEnabled) {
        cozyTrack.pause();
        cozyTrack.currentTime = 0;
        soundEnabled = false;
        persistSoundState(false);
        updateUI();
        return;
      }

      soundEnabled = true;
      persistSoundState(true);
      updateUI();

      try {
        cozyTrack.load();
        await cozyTrack.play();
      } catch (_) {
        cozyTrack.pause();
        soundEnabled = false;
        persistSoundState(false);
        updateUI();
      }
    });
  } catch (_) {
    // Silently suppress if anything fails
  }
}

initSoundToggle();

// === CUSTOM CURSOR ===

function initCustomCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let targetX = -100, targetY = -100;
  let currentX = -100, currentY = -100;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.18);
    currentY = lerp(currentY, targetY, 0.18);
    cursor.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;
    rafId = requestAnimationFrame(animate);
  }

  animate();

  // Scale up on interactive elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

initCustomCursor();


