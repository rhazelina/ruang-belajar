function initMobileNav() {
  const toggles = document.querySelectorAll("[data-menu-toggle]");

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("data-menu-toggle");
    const menu = document.getElementById(targetId);
    if (!menu) return;

    const closeMenu = () => {
      menu.dataset.open = "false";
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.dataset.open === "true";
      menu.dataset.open = isOpen ? "false" : "true";
      toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) {
        closeMenu();
      }
    });
  });
}

function initActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const href = (link.getAttribute("href") || "").replace(/^\.\//, "");
    const isCurrent = href === path;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initScrollFeatures() {
  const progressBar = document.getElementById("reading-progress");
  const backToTopBtn = document.getElementById("back-to-top");

  if (!progressBar && !backToTopBtn) return;

  window.addEventListener("scroll", () => {
    // Progress Bar Logic
    if (progressBar) {
      const scrollTotal = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTotal / height) * 100;
      progressBar.style.width = scrollPercent + "%";
    }

    // Back to Top Logic
    if (backToTopBtn) {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

function initThemeToggle() {
  const headerInner = document.querySelector('.site-header-inner');
  if (!headerInner) return;

  // Create theme toggle button
  const themeBtn = document.createElement('button');
  themeBtn.id = 'theme-toggle';
  themeBtn.innerHTML = '🌙';
  themeBtn.title = 'Toggle Dark Mode';
  themeBtn.style.background = 'transparent';
  themeBtn.style.border = 'none';
  themeBtn.style.fontSize = '1.3rem';
  themeBtn.style.cursor = 'pointer';
  themeBtn.style.marginRight = '12px';
  themeBtn.style.display = 'inline-flex';
  themeBtn.style.alignItems = 'center';

  // Inject CSS dynamically
  const darkCSS = `
  body.dark-theme {
    --bg: #1a1c1a;
    --bg-main: #1a1c1a;
    --surface: rgba(30, 34, 31, 0.9);
    --surface-alt: #242926;
    --surface-strong: #242926;
    --bg-surface: rgba(30, 34, 31, 0.9);
    --bg-card: #242926;
    --bg-hover: #2c332f;
    --line: rgba(255, 255, 255, 0.12);
    --text: #e0e5e1;
    --text-primary: #e0e5e1;
    --text-secondary: #9aa89e;
    --text-muted: #788879;
    --muted: #9aa89e;
    --accent: #4ade80;
    --accent-strong: #22c55e;
    --accent-soft: #14532d;
    --primary-700: #4ade80;
    --primary-400: #22c55e;
    --primary-300: #4ade80;
    --primary-100: #14532d;
    --warm: #3f3523;
  }
  body.dark-theme .brand-mark { background: #242926; border-color: rgba(255,255,255,0.1); }
  body.dark-theme .callout { background: linear-gradient(180deg, rgba(20, 83, 45, 0.4), rgba(36, 41, 38, 0.8)); }
  body.dark-theme .callout.warn { background: linear-gradient(180deg, rgba(63, 53, 35, 0.6), rgba(36, 41, 38, 0.8)); }
  body.dark-theme .site-header, body.dark-theme .nav { background: rgba(26, 28, 26, 0.92); }
  body.dark-theme .mobile-nav, body.dark-theme .nav-mobile { background: #242926; }
  body.dark-theme .menu-toggle, body.dark-theme .nav-hamburger { background: #242926; color: #fff; }
  body.dark-theme .focus-mode-btn { background: #242926; color: #e0e5e1; border: 1px solid rgba(255,255,255,0.1); }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = darkCSS;
  document.head.appendChild(styleSheet);

  const menuToggle = headerInner.querySelector('.menu-toggle');
  if (menuToggle) {
    headerInner.insertBefore(themeBtn, menuToggle);
  } else {
    headerInner.appendChild(themeBtn);
  }

  // Handle localStorage
  const savedTheme = localStorage.getItem('luolearn_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeBtn.innerHTML = '☀️';
  }

  // Toggle event
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('luolearn_theme', 'dark');
      themeBtn.innerHTML = '☀️';
    } else {
      localStorage.setItem('luolearn_theme', 'light');
      themeBtn.innerHTML = '🌙';
    }
  });
}

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = "Tersalin! ✓";
          setTimeout(() => btn.innerHTML = originalText, 2000);
        }).catch(err => console.error("Gagal menyalin teks: ", err));
      }
    });
  });
}

function initFocusMode() {
  const isReadingPage = document.querySelector('.reading-shell');
  if (!isReadingPage) return;

  const btn = document.createElement('button');
  btn.className = 'focus-mode-btn';
  btn.innerHTML = '🎯 Mode Fokus';
  btn.title = 'Aktifkan Mode Fokus';
  btn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 24px;
    background: var(--surface-strong);
    color: var(--text);
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow);
    z-index: 99;
    transition: all 0.3s;
  `;
  
  const focusCSS = `
    body.focus-active .reading-shell p,
    body.focus-active .reading-shell li,
    body.focus-active .reading-shell h3,
    body.focus-active .reading-shell h4 {
      opacity: 0.3;
      transition: opacity 0.3s;
    }
    body.focus-active .reading-shell p.focus-highlight,
    body.focus-active .reading-shell li.focus-highlight,
    body.focus-active .reading-shell h3.focus-highlight,
    body.focus-active .reading-shell h4.focus-highlight {
      opacity: 1 !important;
      background: var(--accent-soft);
      border-radius: 4px;
      padding: 2px 4px;
    }
  `;
  const style = document.createElement('style');
  style.innerText = focusCSS;
  document.head.appendChild(style);

  document.body.appendChild(btn);

  let isActive = false;
  btn.addEventListener('click', () => {
    isActive = !isActive;
    document.body.classList.toggle('focus-active', isActive);
    btn.style.background = isActive ? 'var(--accent)' : 'var(--surface-strong)';
    btn.style.color = isActive ? '#fff' : 'var(--text)';
  });

  const elements = document.querySelectorAll('.reading-shell p, .reading-shell li, .reading-shell h3, .reading-shell h4');
  elements.forEach(el => {
    el.addEventListener('click', (e) => {
      if (!isActive) return;
      e.stopPropagation();
      document.querySelectorAll('.focus-highlight').forEach(hl => hl.classList.remove('focus-highlight'));
      el.classList.add('focus-highlight');
    });
  });

  document.body.addEventListener('click', () => {
    if (isActive) {
      document.querySelectorAll('.focus-highlight').forEach(hl => hl.classList.remove('focus-highlight'));
    }
  });
}

function initPomodoroGlobal() {
  if (document.getElementById('pomo-fab')) return; // already exists

  const pomoHTML = `
    <div id="pomo-fab">
      <div class="pomo-panel" id="pomo-panel">
        <div class="pomo-hd">
          <span>⏱ Timer Belajar</span>
          <button class="pomo-close-btn" id="pomo-close">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="pomo-tabs">
          <button class="pomo-tab on" data-mode="work">Fokus</button>
          <button class="pomo-tab" data-mode="short">Istirahat</button>
          <button class="pomo-tab" data-mode="long">Panjang</button>
        </div>
        <div class="pomo-center">
          <div class="pomo-clock" id="pomo-clock">25:00</div>
          <div class="pomo-sub" id="pomo-sub">Sesi ke-1 · Fokus Belajar</div>
        </div>
        <div class="pomo-bar-wrap">
          <div class="pomo-bar" id="pomo-bar" style="width:100%"></div>
        </div>
        <div class="pomo-btns">
          <button class="pomo-btn go" id="pomo-go">▶ Mulai</button>
          <button class="pomo-btn" id="pomo-reset">↺ Reset</button>
        </div>
      </div>
      <button class="pomo-toggle" id="pomo-fab-btn" title="Timer Belajar">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', pomoHTML);

  const MODES = { work: 25*60, short: 5*60, long: 15*60 };
  const LABELS = { work: 'Fokus Belajar', short: 'Istirahat Pendek', long: 'Istirahat Panjang' };
  
  let curMode = 'work';
  let total = MODES.work;
  let left = MODES.work;
  let running = false;
  let tick = null;
  let sessions = 1;

  // Load from localStorage
  try {
    const saved = JSON.parse(localStorage.getItem('luolearn_pomo'));
    if (saved && saved.running) {
      const elapsed = Math.floor((Date.now() - saved.timestamp) / 1000);
      curMode = saved.mode;
      total = MODES[curMode];
      sessions = saved.sessions || 1;
      left = saved.left - elapsed;
      if (left > 0) {
        running = true;
      } else {
        left = 0;
        running = false;
      }
    } else if (saved) {
      curMode = saved.mode || 'work';
      total = MODES[curMode];
      left = saved.left || total;
      sessions = saved.sessions || 1;
    }
  } catch (e) {}

  function saveState() {
    localStorage.setItem('luolearn_pomo', JSON.stringify({
      running, mode: curMode, left, sessions, timestamp: Date.now()
    }));
  }

  function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  function fmt(s){ return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); }
  function render(){
    document.getElementById('pomo-clock').textContent=fmt(left);
    document.getElementById('pomo-sub').textContent='Sesi ke-'+sessions+' · '+LABELS[curMode];
    document.getElementById('pomo-bar').style.width=(left/total*100)+'%';
    document.getElementById('pomo-bar').style.background = curMode==='work' ? 'var(--btn-accent)' : 'var(--btn-primary)';
    
    document.querySelectorAll('.pomo-tab').forEach(b => b.classList.remove('on'));
    document.querySelector(`.pomo-tab[data-mode="${curMode}"]`).classList.add('on');
  }

  function startTick() {
    tick = setInterval(() => {
      if (left <= 0) {
        clearInterval(tick); running = false;
        playBeep();
        document.getElementById('pomo-go').textContent = '▶ Mulai';
        document.getElementById('pomo-fab-btn').classList.remove('ticking');
        if(curMode === 'work') sessions++;
        document.getElementById('pomo-panel').classList.add('show');
        alert(curMode === 'work' ? '✅ Sesi fokus selesai! Saatnya istirahat.' : '📚 Istirahat selesai! Ayo kembali belajar.');
        resetTimer();
        return;
      }
      left--;
      render();
      if (left % 5 === 0) saveState(); // save every 5 seconds
    }, 1000);
  }

  function toggleTimer(){
    if(running){
      running = false; clearInterval(tick);
      document.getElementById('pomo-go').textContent = '▶ Lanjut';
      document.getElementById('pomo-fab-btn').classList.remove('ticking');
    } else {
      if (left <= 0) resetTimer();
      running = true;
      document.getElementById('pomo-go').textContent = '⏸ Jeda';
      document.getElementById('pomo-fab-btn').classList.add('ticking');
      startTick();
    }
    saveState();
  }

  function resetTimer(){
    clearInterval(tick); running = false; left = MODES[curMode]; total = MODES[curMode];
    document.getElementById('pomo-go').textContent = '▶ Mulai';
    document.getElementById('pomo-fab-btn').classList.remove('ticking');
    render();
    saveState();
  }

  // Events
  document.querySelectorAll('.pomo-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      if(running) resetTimer();
      curMode = btn.dataset.mode;
      total = left = MODES[curMode];
      render();
      saveState();
    });
  });

  document.getElementById('pomo-go').addEventListener('click', toggleTimer);
  document.getElementById('pomo-reset').addEventListener('click', resetTimer);
  document.getElementById('pomo-fab-btn').addEventListener('click', () => document.getElementById('pomo-panel').classList.toggle('show'));
  document.getElementById('pomo-close').addEventListener('click', () => document.getElementById('pomo-panel').classList.remove('show'));

  render();
  if (running && left > 0) {
    document.getElementById('pomo-go').textContent = '⏸ Jeda';
    document.getElementById('pomo-fab-btn').classList.add('ticking');
    startTick();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNav();
  initScrollFeatures();
  initThemeToggle();
  initCopyButtons();
  initFocusMode();
  initPomodoroGlobal();
});
