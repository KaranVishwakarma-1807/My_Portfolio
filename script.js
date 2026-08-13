// Scroll progress bar
function computeScrollPercent(scrollY, maxScroll) {
  return (Math.min(scrollY, maxScroll) / maxScroll) * 100;
}

window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (maxScroll > 0) {
    bar.style.width = computeScrollPercent(window.scrollY, maxScroll) + '%';
  }
});

// Button for back to top action
function computeBackToTopVisibility(scrollY) {
  return scrollY > 400;
}

const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
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
}

// Typing animation
let typingSession = 0;

function simulateTypingCycle(roles) {
  return roles.slice();
}

function initTypingAnimator(roles, typeSpeed, deleteSpeed, pauseMs) {
  const el = document.getElementById('typing-text');
  if (!el || !roles || roles.length === 0) return;

  const session = ++typingSession;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function tick() {
    if (session !== typingSession) return;

    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
      currentCharIndex++;
      el.textContent = currentRole.slice(0, currentCharIndex);

      if (currentCharIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, pauseMs);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      currentCharIndex--;
      el.textContent = currentRole.slice(0, currentCharIndex);

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  setTimeout(tick, pauseMs);
}

// Fade-In transition effect on scroll
let fadeObserver = null;
let fadeMutationObserver = null;
let timelineFadeObserver = null;
let timelineFadeMutationObserver = null;

function hexToRgb(hex) {
  const clean = hex.replace(/^#/, '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function initFadeIn() {
  if (fadeObserver) fadeObserver.disconnect();
  if (fadeMutationObserver) fadeMutationObserver.disconnect();

  fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  const observePending = () => {
    document.querySelectorAll('.fade-in:not(.visible)').forEach((el) => {
      if (!el.closest('.github-timeline')) {
        fadeObserver.observe(el);
      }
    });
  };

  observePending();

  if (document.body) {
    fadeMutationObserver = new MutationObserver(() => {
      observePending();
    });
    fadeMutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

function initTimelineFadeIn() {
  const timeline = document.getElementById('repo-timeline');
  if (!timeline) return;
  const scrollContainer = timeline.closest('.github-timeline-scroll') || timeline;

  if (timelineFadeObserver) timelineFadeObserver.disconnect();
  if (timelineFadeMutationObserver) timelineFadeMutationObserver.disconnect();

  timelineFadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    root: scrollContainer,
    rootMargin: '0px 0px 24px 0px',
  });

  const observePending = () => {
    timeline.querySelectorAll('.repo-timeline-entry.fade-in:not(.visible)').forEach((el) => {
      timelineFadeObserver.observe(el);
    });
  };

  observePending();

  timelineFadeMutationObserver = new MutationObserver(() => {
    observePending();
  });
  timelineFadeMutationObserver.observe(timeline, { childList: true, subtree: true });
}

// Dark mode implementation
const html = document.documentElement;

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  localStorage.setItem('theme', dark ? 'dark' : 'light');

  const sun = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (sun) sun.style.display = dark ? 'block' : 'none';
  if (moon) moon.style.display = dark ? 'none' : 'block';
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

document.addEventListener('click', (e) => {
  if (e.target.closest('#themeToggle')) {
    setTheme(html.getAttribute('data-theme') !== 'dark');
  }
});

// Hero canvas related stuff
let heroCleanup = null;

function initHeroCanvas() {
  if (heroCleanup) heroCleanup();

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const hero = document.getElementById('hero');

  function applyStaticFallback() {
    canvas.remove();
    if (hero) {
      hero.style.background =
        'linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 60%)';
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyStaticFallback();
    return;
  }

  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    applyStaticFallback();
    return;
  }

  let canvasWidth = 0;
  let canvasHeight = 0;
  const particles = [];

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

  function getThemeColor(prop) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(prop)
    .trim();
}

// Convert hex color to rgb string for canvas rgba usage - i don't understand the maths completely because for this i have used references and documentations
// but basically what it does is that it converts this -> "#FF5733" (the hexadecimal form)  into  this -> "255, 87, 51" (the simple rgb string)
function hexToRgb(hex) {
  const clean = hex.replace(/^#/, '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

  // this is to create particles / particle effects
  const PARTICLE_COUNT = 40;

  function createParticle() {
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.35 + 0.1,
    };
  }

  // Shooting star configuration
  const SHOOTING_STAR_MIN_INTERVAL = 5000; // 1 seconds
  const SHOOTING_STAR_MAX_INTERVAL = 10000; // 2 seconds
  const SHOOTING_STAR_SPEED = 15; // pixels per frame
  const SHOOTING_STAR_TTL = 5000; // ms lifespan

  // Shooting star state
  const shootingStars = [];

  function spawnShootingStar() {
    const startX = canvasWidth; // start at right edge
    const startY = Math.random() * canvasHeight * 0.5; // upper half
    const angle = Math.PI * 0.25; // 45 degrees down-left
    shootingStars.push({
      x: startX,
      y: startY,
      vx: -SHOOTING_STAR_SPEED * Math.cos(angle),
      vy: SHOOTING_STAR_SPEED * Math.sin(angle),
      created: performance.now(),
    });
    const nextDelay = Math.random() * (SHOOTING_STAR_MAX_INTERVAL - SHOOTING_STAR_MIN_INTERVAL) + SHOOTING_STAR_MIN_INTERVAL;
    setTimeout(spawnShootingStar, nextDelay);
  }

  // Start first shooting star after initial delay

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
  // Initiate shooting star generation
  spawnShootingStar();

  let animFrameId = null;

  function draw() {
    const w = canvasWidth;
    const h = canvasHeight;

    ctx.clearRect(0, 0, w, h);

    const particleColor = getThemeColor('--particle-color');

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -p.radius) p.x = w + p.radius;
      if (p.x > w + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = h + p.radius;
      if (p.y > h + p.radius) p.y = -p.radius;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    // Draw shooting stars
    const now = performance.now();
    shootingStars.forEach((star, i) => {
      // Update position
      star.x += star.vx;
      star.y += star.vy;
      // Calculate life progress for fading
      const age = now - star.created;
      const progress = age / SHOOTING_STAR_TTL;
      if (progress >= 1) {
        shootingStars.splice(i, 1);
        return;
      }
      const alpha = 1 - progress; // fade out
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.vx * 4, star.y - star.vy * 4); // short tail
      ctx.strokeStyle = `rgba(${hexToRgb(getThemeColor('--accent'))}, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.globalAlpha = 1;

    animFrameId = requestAnimationFrame(draw);
  }

  draw();

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animFrameId) draw();
        } else if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      });
    },
    { threshold: 0 }
  );
  if (hero) heroObserver.observe(hero);

  heroCleanup = () => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', resizeCanvas);
    heroObserver.disconnect();
    heroCleanup = null;
  };
}

// === FILTER CONTROLLER ===
function applyFilter(filter, cards) {
  return cards.map(card => ({
    tags: card.tags,
    visible: filter === 'all' || card.tags.includes(filter),
  }));
}

function applyFilterToDOM(filter) {
  const projectCards = document.querySelectorAll('.project-card');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!projectCards.length) return;

  const cardData = Array.from(projectCards).map(el => ({
    el,
    tags: (el.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean),
  }));
  const results = applyFilter(filter, cardData);
  cardData.forEach((card, i) => {
    card.el.classList.toggle('hidden', !results[i].visible);
  });
  filterBtns.forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function initFilterController() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn || !document.contains(btn)) return;
    applyFilterToDOM(btn.dataset.filter);
  });
}

// project card expander function
function toggleCard(state) {
  const expanded = !state.expanded;
  return { expanded, ariaExpanded: String(expanded) };
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (!card || !document.querySelector('.projects-grid')?.contains(card)) return;

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

// sound toggle button which also keep it presistent across all pages (i only have main (home page) and a blog page)
const cozyTrack = document.getElementById('background-music');
let soundEnabled = false;
let audioReady = false;

function persistSoundState(enabled) {
  localStorage.setItem('soundEnabled', String(enabled));
}

function syncSoundUIFromTrack() {
  const btn = document.getElementById('sound-toggle');
  const iconOn = document.getElementById('icon-sound-on');
  const iconOff = document.getElementById('icon-sound-off');
  if (!btn || !cozyTrack) return;

  soundEnabled = !cozyTrack.paused && !cozyTrack.ended;

  if (iconOn) iconOn.style.display = soundEnabled ? 'block' : 'none';
  if (iconOff) iconOff.style.display = soundEnabled ? 'none' : 'block';
  btn.classList.toggle('sound-muted', !soundEnabled);
  btn.setAttribute('aria-label', soundEnabled ? 'Pause background music' : 'Play background music');
  btn.setAttribute('aria-pressed', String(soundEnabled));
}

function initSoundToggle() {
  if (!cozyTrack) return;

  cozyTrack.loop = true;
  cozyTrack.volume = 0.32;

  cozyTrack.addEventListener('canplaythrough', () => {
    audioReady = true;
    const btn = document.getElementById('sound-toggle');
    if (btn) btn.removeAttribute('title');
  });

  cozyTrack.addEventListener('error', () => {
    audioReady = false;
    const btn = document.getElementById('sound-toggle');
    if (btn) {
      btn.setAttribute('title', 'Could not load cozy-loop.mp3. Check assets/audio/cozy-loop.mp3.');
    }
  });

  cozyTrack.load();
  syncSoundUIFromTrack();

  document.addEventListener('click', async (e) => {
    if (!e.target.closest('#sound-toggle')) return;

    if (soundEnabled) {
      cozyTrack.pause();
      soundEnabled = false;
      persistSoundState(false);
      syncSoundUIFromTrack();
      return;
    }

    try {
      if (!audioReady) cozyTrack.load();
      await cozyTrack.play();
      soundEnabled = true;
      persistSoundState(true);
      syncSoundUIFromTrack();
      document.getElementById('sound-toggle')?.removeAttribute('title');
    } catch (_) {
      cozyTrack.pause();
      soundEnabled = false;
      persistSoundState(false);
      syncSoundUIFromTrack();
      const btn = document.getElementById('sound-toggle');
      if (btn) {
        btn.setAttribute('title', 'Playback blocked. Click again after interacting with the page, or use a local server (not file://).');
      }
    }
  });
}

initSoundToggle();

// code for the custom cursor taken from stackoverflow but didn't actually used it because idk what custom cursor should i use...
function initCustomCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  let targetX = -100, targetY = -100;
  let currentX = -100, currentY = -100;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.18);
    currentY = lerp(currentY, targetY, 0.18);
    cursor.style.transform = `translate(${currentX - 5}px, ${currentY - 5}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button')) {
      cursor.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button')) {
      cursor.classList.remove('cursor-hover');
    }
  });
}

initCustomCursor();

// page module function - to handle dynamic nav link highlighting for better UI/UX experience.
function getPageKey(pathname) {
  const file = pathname.split('/').pop() || '';
  if (file === 'blogs.html') return 'blogs';
  if (file === 'github-journey.html') return 'github-journey';
  return 'home';
}

function updateNavActive() {
  const page = getPageKey(location.pathname);
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.classList.remove('is-active');
    a.removeAttribute('aria-current');
  });
  if (page === 'blogs') {
    const blogsLink = document.querySelector('.nav-links a[href*="blogs"]');
    if (blogsLink) {
      blogsLink.classList.add('is-active');
      blogsLink.setAttribute('aria-current', 'page');
    }
  }
  if (page === 'github-journey') {
    const journeyLink = document.querySelector('.nav-links a[href*="github-journey"]');
    if (journeyLink) {
      journeyLink.classList.add('is-active');
      journeyLink.setAttribute('aria-current', 'page');
    }
  }
}

// === GITHUB JOURNEY TIMELINE ===
function formatRepoDate(iso) {
  if (!iso) return 'Date unknown';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getRepoYear(iso) {
  if (!iso) return 'Collaborations';
  return new Date(iso + 'T00:00:00').getFullYear().toString();
}

function renderRepoTimeline(container, repos) {
  let lastYear = null;
  const parts = [];

  repos.forEach((repo, i) => {
    const year = getRepoYear(repo.created);
    if (year !== lastYear) {
      parts.push(`<div class="timeline-year-divider" aria-hidden="true">${year}</div>`);
      lastYear = year;
    }
    parts.push(`
      <button class="timeline-entry repo-timeline-entry fade-in"
              style="transition-delay: ${Math.min(i * 0.03, 0.6)}s"
              data-repo-id="${repo.id}" role="option" aria-selected="false">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-date">${formatRepoDate(repo.created)}</div>
          <h3 class="timeline-institution">${repo.name}</h3>
          <span class="repo-type-badge ${repo.type}">${repo.type}</span>
        </div>
      </button>
    `);
  });

  container.innerHTML = parts.join('');
}

function renderRepoDetail(panel, repo) {
  const typeLabel = repo.type.charAt(0).toUpperCase() + repo.type.slice(1);
  panel.innerHTML = `
    <div class="blog-meta">${formatRepoDate(repo.created)} · ${typeLabel} · ${repo.category}</div>
    <h2>${repo.name}</h2>
    <p class="repo-short">${repo.shortDescription}</p>
    <div class="repo-about">
      ${repo.about.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <a href="${repo.url}" class="project-link" target="_blank" rel="noopener noreferrer">
      View on GitHub
      <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 11L11 2M5 2h6v6"/></svg>
    </a>
  `;
}

function selectRepo(repoId, { scrollDetail = false, updateHash = true } = {}) {
  if (typeof GITHUB_REPOS === 'undefined') return;
  const repo = GITHUB_REPOS.find((r) => r.id === repoId);
  if (!repo) return;

  document.querySelectorAll('.repo-timeline-entry').forEach((el) => {
    const active = el.dataset.repoId === repoId;
    el.classList.toggle('is-active', active);
    el.setAttribute('aria-selected', String(active));
  });

  const panel = document.getElementById('repo-detail');
  if (panel) renderRepoDetail(panel, repo);

  if (updateHash && getPageKey(location.pathname) === 'github-journey') {
    const newUrl = `${location.pathname}${location.search}#${repoId}`;
    history.replaceState({ spa: true }, '', newUrl);
  }

  if (scrollDetail && window.matchMedia('(max-width: 900px)').matches) {
    panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function loadReposData() {
  if (typeof GITHUB_REPOS !== 'undefined') return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'repos-data.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

let githubJourneyBound = false;

function initGithubJourney() {
  const timeline = document.getElementById('repo-timeline');
  if (!timeline) return;

  loadReposData()
    .then(() => {
      renderRepoTimeline(timeline, GITHUB_REPOS);
      initTimelineFadeIn();

      const hashId = location.hash.slice(1);
      const defaultId = (hashId && GITHUB_REPOS.some((r) => r.id === hashId))
        ? hashId
        : GITHUB_REPOS.filter((r) => r.created).slice(-1)[0]?.id
          || GITHUB_REPOS[0].id;
      selectRepo(defaultId, { updateHash: !hashId });

      initFadeIn();

      if (!githubJourneyBound) {
        githubJourneyBound = true;
        timeline.addEventListener('click', (e) => {
          const entry = e.target.closest('.repo-timeline-entry');
          if (!entry) return;
          selectRepo(entry.dataset.repoId, { scrollDetail: true });
        });
        window.addEventListener('hashchange', () => {
          if (getPageKey(location.pathname) !== 'github-journey') return;
          const id = location.hash.slice(1);
          if (id && GITHUB_REPOS.some((r) => r.id === id)) {
            selectRepo(id, { updateHash: false });
          }
        });
      }
    })
    .catch(() => {
      timeline.innerHTML = '<p class="repo-detail-placeholder">Could not load repository data.</p>';
    });
}

function initPageModules() {
  typingSession++;
  initFadeIn();
  initHeroCanvas();

  if (document.getElementById('typing-text')) {
    initTypingAnimator(
      ['Android Developer - Learning', 'Cloud Engineer', 'AI/CV Builder', 'Python Developer'],
      100,
      60,
      1800
    );
  }

  if (document.querySelector('.project-card')) {
    applyFilterToDOM('all');
  }

  updateNavActive();
  syncSoundUIFromTrack();
  setTheme(html.getAttribute('data-theme') === 'dark');
  initGithubJourney();
}

initFilterController();
initPageModules();

// SPA navigation - to keep the audio same in home page and blog page
function shouldSwapPage(url) {
  return getPageKey(location.pathname) !== getPageKey(url.pathname);
}

function fetchPageUrl(url) {
  const dir = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
  const key = getPageKey(url.pathname);
  if (key === 'blogs') return dir + 'blogs.html';
  if (key === 'github-journey') return dir + 'github-journey.html';
  return dir + 'index.html';
}

async function navigateToPage(url, { historyMode = 'push' } = {}) {
  const fetchPath = fetchPageUrl(url);
  const res = await fetch(fetchPath);
  if (!res.ok) {
    window.location.href = url.href;
    return;
  }

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const newNav = doc.querySelector('nav');
  const newMain = doc.querySelector('main');
  const skipLink = doc.querySelector('.skip-to-main');

  if (!newMain) {
    window.location.href = url.href;
    return;
  }

  const nav = document.querySelector('nav');
  const main = document.querySelector('main');
  const skip = document.querySelector('.skip-to-main');

  if (newNav && nav) nav.innerHTML = newNav.innerHTML;
  if (main) main.replaceWith(newMain);
  if (skipLink && skip) {
    skip.href = skipLink.getAttribute('href');
    skip.textContent = skipLink.textContent;
  }

  document.title = doc.title;
  document.body.dataset.page = getPageKey(url.pathname);

  const stateUrl = url.pathname + url.search + url.hash;
  if (historyMode === 'push') {
    history.pushState({ spa: true }, '', stateUrl);
  } else if (historyMode === 'replace') {
    history.replaceState({ spa: true }, '', stateUrl);
  }

  initPageModules();

  if (url.hash && getPageKey(url.pathname) !== 'github-journey') {
    const target = document.querySelector(url.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;

  let url;
  try {
    url = new URL(href, window.location.href);
  } catch (_) {
    return;
  }

  if (url.origin !== window.location.origin) return;

  if (!shouldSwapPage(url)) return;

  e.preventDefault();
  navigateToPage(url);
});

window.addEventListener('popstate', () => {
  navigateToPage(new URL(window.location.href), { historyMode: 'none' });
});

document.body.dataset.page = getPageKey(location.pathname);
