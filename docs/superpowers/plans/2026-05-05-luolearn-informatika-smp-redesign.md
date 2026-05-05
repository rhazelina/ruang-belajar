# Luo-Learn Informatika SMP Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengubah prototype Luo-Learn menjadi mini-site belajar statis Informatika SMP yang konsisten, responsive, mudah dibaca, dan punya pusat materi yang jelas.

**Architecture:** Perubahan dilakukan langsung pada halaman HTML statis yang ada dengan satu sistem visual bersama, satu halaman baru `materi.html`, dan utilitas JavaScript ringan yang dipakai lintas halaman bila memang mengurangi duplikasi. Interaksi yang sudah ada di `demo.html` dipertahankan, tetapi lapisan UI, navigasi, dan responsive-nya diselaraskan dengan halaman lain.

**Tech Stack:** HTML, CSS, JavaScript vanilla, file statis existing project

---

## File Structure

- Create: `materi.html`
- Modify: `index.html`
- Modify: `about.html`
- Modify: `demo.html`
- Modify: `soal-kodingdanAI.html`
- Modify: `script.js`
- Test/verify: manual browser verification across all edited HTML files

### Task 1: Baseline Audit and Shared UI Contract

**Files:**
- Modify: `script.js`
- Test: `index.html`, `about.html`, `demo.html`, `soal-kodingdanAI.html`

- [ ] **Step 1: Write the failing test**

Create a manual verification checklist that proves the current UI is still broken before implementation:

```text
Checklist:
1. Open index.html on mobile width (~390px) and confirm navigation does not yet match other pages.
2. Open about.html and confirm typing effect still exists.
3. Open demo.html and confirm visual system differs from index/about.
4. Open soal-kodingdanAI.html and confirm it is visually detached from the rest of the site.
5. Confirm there is no shared "Materi" hub page.
```

- [ ] **Step 2: Run test to verify it fails**

Run these checks manually in the browser.

Expected:
- At least four checklist items fail against the desired redesign state.
- Shared navigation and shared visual contract do not yet exist.

- [ ] **Step 3: Write minimal implementation**

Replace `script.js` content with a small shared utility file that can support mobile navigation and active-link behavior without interfering with page-specific logic:

```js
function initMobileNav() {
  const toggles = document.querySelectorAll('[data-menu-toggle]');

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute('data-menu-toggle');
    const menu = document.getElementById(targetId);
    if (!menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.dataset.open === 'true';
      menu.dataset.open = isOpen ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });
}

function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
});
```

- [ ] **Step 4: Run test to verify it passes**

Run a quick syntax check by opening the file in the browser console through any HTML page that imports `script.js`.

Expected:
- No JavaScript syntax errors from `script.js`.

- [ ] **Step 5: Commit**

```bash
git add script.js
git commit -m "refactor: add shared navigation utilities"
```

### Task 2: Build the New Shared Visual System on the Home Page

**Files:**
- Modify: `index.html`
- Test: `index.html`

- [ ] **Step 1: Write the failing test**

Define the expected home-page behaviors in a manual test note:

```text
Expected home page behaviors:
1. Header is clean, readable, and consistent with the planned site navigation.
2. Main CTA points to materi.html and soal-kodingdanAI.html.
3. No broken-encoding text is visible in navigation or hero.
4. Home page reads like an education product for SMP students, not a themed fandom landing page.
5. Layout remains readable at ~390px width without horizontal overflow.
```

- [ ] **Step 2: Run test to verify it fails**

Open `index.html`.

Expected:
- Current page still shows the old themed layout, inconsistent labels, and no `materi.html` CTA.

- [ ] **Step 3: Write minimal implementation**

Rewrite `index.html` around this structure:

```html
<body class="site-body">
  <header class="site-header">
    <a class="brand" href="index.html">Luo-Learn</a>
    <button class="menu-toggle" data-menu-toggle="mobile-nav" aria-expanded="false" aria-controls="mobile-nav">Menu</button>
    <nav class="desktop-nav">
      <a data-nav href="index.html">Beranda</a>
      <a data-nav href="materi.html">Materi</a>
      <a data-nav href="soal-kodingdanAI.html">Buku Saku</a>
      <a data-nav href="demo.html">Soal / Kisi-Kisi</a>
      <a data-nav href="about.html">Tentang</a>
    </nav>
    <div id="mobile-nav" class="mobile-nav" data-open="false">
      <a data-nav href="index.html">Beranda</a>
      <a data-nav href="materi.html">Materi</a>
      <a data-nav href="soal-kodingdanAI.html">Buku Saku</a>
      <a data-nav href="demo.html">Soal / Kisi-Kisi</a>
      <a data-nav href="about.html">Tentang</a>
    </div>
  </header>

  <main class="hero-layout">
    <section class="hero-copy">
      <span class="eyebrow">Belajar Informatika SMP dengan alur yang jelas</span>
      <h1>Materi ringkas, buku saku lengkap, dan kisi-kisi yang mudah dibaca.</h1>
      <p>Luo-Learn adalah prototype mini-site belajar untuk membantu siswa SMP memahami konsep Informatika dasar tanpa tampilan yang membingungkan.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="materi.html">Mulai dari Materi</a>
        <a class="btn btn-secondary" href="soal-kodingdanAI.html">Buka Buku Saku</a>
      </div>
    </section>
    <section class="hero-panel">
      <article class="feature-card">
        <h2>Yang akan ditemukan siswa</h2>
        <ul>
          <li>Jalur belajar Informatika SMP</li>
          <li>Topik dasar yang terstruktur</li>
          <li>Buku saku untuk baca panjang</li>
          <li>Kisi-kisi dan materi pendukung</li>
        </ul>
      </article>
    </section>
  </main>

  <script src="./script.js"></script>
</body>
```

- [ ] **Step 4: Run test to verify it passes**

Open `index.html` at desktop and mobile widths.

Expected:
- Navigation is readable and consistent.
- CTA links to `materi.html` and `soal-kodingdanAI.html`.
- No horizontal overflow appears.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: redesign landing page for smp learning flow"
```

### Task 3: Add the New `materi.html` Hub Page

**Files:**
- Create: `materi.html`
- Test: `materi.html`

- [ ] **Step 1: Write the failing test**

Define the required material-hub checks:

```text
Expected materi hub behaviors:
1. materi.html exists and opens successfully.
2. It shows five Informatika SMP topics.
3. It includes a suggested learning path.
4. It links to demo.html and soal-kodingdanAI.html.
5. Cards stack cleanly on mobile.
```

- [ ] **Step 2: Run test to verify it fails**

Try opening `materi.html`.

Expected:
- File does not exist yet or the page is unavailable.

- [ ] **Step 3: Write minimal implementation**

Create `materi.html` with this base structure and hardcoded content:

```html
<body class="site-body">
  <header class="site-header">...</header>
  <main class="page-shell">
    <section class="page-intro">
      <span class="eyebrow">Pusat Materi</span>
      <h1>Materi Informatika SMP</h1>
      <p>Mulai dari dasar lalu lanjut ke topik yang lebih menantang dengan urutan yang mudah diikuti.</p>
    </section>

    <section class="learning-path">
      <h2>Jalur Belajar Disarankan</h2>
      <ol>
        <li>Berpikir Komputasional</li>
        <li>Algoritma dan Flowchart</li>
        <li>Logika Dasar dan Boolean</li>
        <li>Sistem Bilangan dan Representasi Data</li>
        <li>Pengenalan AI untuk SMP</li>
      </ol>
    </section>

    <section class="topic-grid">
      <article class="topic-card">
        <span class="topic-meta">Dasar • 8 menit</span>
        <h3>Berpikir Komputasional</h3>
        <p>Belajar memecah masalah, mengenali pola, dan menyusun langkah penyelesaian.</p>
      </article>
      <article class="topic-card">
        <span class="topic-meta">Dasar • 10 menit</span>
        <h3>Algoritma dan Flowchart</h3>
        <p>Memahami urutan langkah dan cara menggambarkannya dengan diagram sederhana.</p>
      </article>
      <article class="topic-card">
        <span class="topic-meta">Dasar • 8 menit</span>
        <h3>Logika Dasar dan Boolean</h3>
        <p>Memahami konsep benar-salah yang dipakai komputer saat mengambil keputusan.</p>
      </article>
      <article class="topic-card">
        <span class="topic-meta">Menengah • 12 menit</span>
        <h3>Sistem Bilangan dan Representasi Data</h3>
        <p>Belajar bagaimana angka, teks, dan gambar disimpan dalam bentuk digital.</p>
      </article>
      <article class="topic-card">
        <span class="topic-meta">Pengenalan • 10 menit</span>
        <h3>Pengenalan AI untuk SMP</h3>
        <p>Mengenal cara kerja AI, contoh sehari-hari, dan alasan siswa perlu memahaminya.</p>
      </article>
    </section>

    <section class="resource-links">
      <a class="btn btn-primary" href="soal-kodingdanAI.html">Baca Buku Saku Lengkap</a>
      <a class="btn btn-secondary" href="demo.html">Buka Kisi-Kisi dan Materi Pendukung</a>
    </section>
  </main>
  <script src="./script.js"></script>
</body>
```

- [ ] **Step 4: Run test to verify it passes**

Open `materi.html`.

Expected:
- Page opens without missing-file errors.
- All five topics, learning path, and resource links are visible.
- On mobile width, cards appear in a single-column stack.

- [ ] **Step 5: Commit**

```bash
git add materi.html
git commit -m "feat: add informatika smp materials hub"
```

### Task 4: Replace the About Page Narrative With a Readable Static Layout

**Files:**
- Modify: `about.html`
- Test: `about.html`

- [ ] **Step 1: Write the failing test**

Define the target about-page checks:

```text
Expected about page behaviors:
1. No typing animation remains.
2. Content is readable immediately on load.
3. Navigation matches the rest of the site.
4. The page explains the project or mentor in plain Indonesian.
5. Mobile layout keeps the text readable without decorative clutter.
```

- [ ] **Step 2: Run test to verify it fails**

Open `about.html`.

Expected:
- Typing effect still runs and visual style still follows the old decorative pattern.

- [ ] **Step 3: Write minimal implementation**

Rewrite `about.html` around a static informational layout:

```html
<main class="page-shell">
  <section class="page-intro">
    <span class="eyebrow">Tentang Program</span>
    <h1>Tentang Luo-Learn</h1>
    <p>Luo-Learn adalah prototype mini-site belajar yang disusun untuk membantu siswa SMP membaca materi Informatika dengan lebih tenang dan terarah.</p>
  </section>

  <section class="content-grid">
    <article class="content-card">
      <h2>Kenapa program ini dibuat?</h2>
      <p>Karena banyak siswa lebih mudah memahami materi saat tampilannya sederhana, bahasanya jelas, dan alurnya tidak membingungkan.</p>
    </article>
    <article class="content-card">
      <h2>Apa yang bisa dipelajari?</h2>
      <p>Siswa bisa mulai dari berpikir komputasional, algoritma, logika dasar, sistem bilangan, sampai pengenalan AI untuk SMP.</p>
    </article>
    <article class="content-card">
      <h2>Pendekatan yang dipakai</h2>
      <p>Materi ditulis ringkas, hardcoded, dan dibuat seperti buku saku atau catatan belajar, bukan seperti percakapan chatbot.</p>
    </article>
  </section>
</main>
```

Remove the old typing-effect script entirely.

- [ ] **Step 4: Run test to verify it passes**

Open `about.html`.

Expected:
- Full text is visible immediately.
- No animated typing cursor or delayed narrative remains.

- [ ] **Step 5: Commit**

```bash
git add about.html
git commit -m "feat: simplify about page for readability"
```

### Task 5: Align `demo.html` With the Shared Site System Without Breaking Existing Tools

**Files:**
- Modify: `demo.html`
- Test: `demo.html`

- [ ] **Step 1: Write the failing test**

Define the `demo.html` regression checks:

```text
Expected demo page behaviors:
1. Shared navigation appears and works on desktop/mobile.
2. Search still filters materi items.
3. Accordion still opens and closes.
4. Progress tracker still updates.
5. Table search and pomodoro still work.
6. No obvious horizontal overflow appears at mobile width.
```

- [ ] **Step 2: Run test to verify it fails**

Open `demo.html`.

Expected:
- Existing tools work, but navigation and visual system do not yet match the redesigned site.

- [ ] **Step 3: Write minimal implementation**

Keep the current page-specific JavaScript logic, but rebuild the page shell and navigation around the shared structure:

```html
<body class="site-body">
  <header class="site-header">...</header>
  <main class="page-shell page-shell-wide">
    <section class="page-intro">
      <span class="eyebrow">Soal dan Kisi-Kisi</span>
      <h1>Materi Pendukung dan Kisi-Kisi Belajar</h1>
      <p>Gunakan pencarian, progress topik, dan kisi-kisi untuk belajar lebih terarah.</p>
    </section>

    <!-- retain search, filter chips, accordion, table, and pomodoro sections -->
  </main>
</body>
```

Keep these existing behavior hooks working:

```js
document.getElementById('materi-search')
document.querySelectorAll('#filter-chips .chip')
document.querySelectorAll('.acc-item')
document.getElementById('tbl-search-input')
document.getElementById('pomo-go')
```

When updating CSS:

```css
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.topic-section,
.table-section,
.pomo-panel {
  max-width: 100%;
}
```

- [ ] **Step 4: Run test to verify it passes**

Open `demo.html` and manually test each interactive area.

Expected:
- All existing interactions still work.
- The redesigned shell improves readability without breaking features.

- [ ] **Step 5: Commit**

```bash
git add demo.html
git commit -m "feat: align demo page with shared learning ui"
```

### Task 6: Normalize `soal-kodingdanAI.html` for Long-Form Reading

**Files:**
- Modify: `soal-kodingdanAI.html`
- Test: `soal-kodingdanAI.html`

- [ ] **Step 1: Write the failing test**

Define the long-form reading checks:

```text
Expected buku saku behaviors:
1. Shared navigation appears.
2. Hero and section spacing support long reading.
3. Broken encoding characters are removed from visible UI.
4. Content remains intact.
5. Mobile width still reads comfortably without edge collisions or overflow.
```

- [ ] **Step 2: Run test to verify it fails**

Open `soal-kodingdanAI.html`.

Expected:
- Existing content is present, but visual hierarchy and responsive reading comfort are not yet aligned with the redesign.

- [ ] **Step 3: Write minimal implementation**

Retain the main educational content, but change the outer structure and reading system:

```html
<body class="site-body site-body-light">
  <header class="site-header">...</header>
  <main class="reading-shell">
    <section class="reading-hero">
      <span class="eyebrow">Buku Saku</span>
      <h1>Ensiklopedia Berpikir Komputasional dan AI</h1>
      <p>Materi lengkap untuk dibaca bertahap oleh siswa SMP yang ingin memahami Informatika dasar sampai pengenalan AI.</p>
    </section>

    <article class="reading-content">
      <!-- keep existing sections, but normalize heading spacing, cards, and text sizing -->
    </article>
  </main>
</body>
```

Apply a cleaner reading stylesheet pattern:

```css
.reading-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 96px 20px 56px;
}

.reading-content {
  display: grid;
  gap: 32px;
}

.reading-content p,
.reading-content li {
  line-height: 1.75;
}
```

Replace visibly broken symbols in headings, badges, and labels with plain text alternatives where needed.

- [ ] **Step 4: Run test to verify it passes**

Open `soal-kodingdanAI.html` and scroll through several sections on desktop and mobile widths.

Expected:
- Content remains intact.
- Reading rhythm is calmer and spacing is more consistent.
- Broken UI text characters no longer dominate the page.

- [ ] **Step 5: Commit**

```bash
git add soal-kodingdanAI.html
git commit -m "feat: improve buku saku readability and responsiveness"
```

### Task 7: Final Responsive Sweep and Regression Check

**Files:**
- Modify: `index.html`
- Modify: `about.html`
- Modify: `demo.html`
- Modify: `materi.html`
- Modify: `soal-kodingdanAI.html`
- Modify: `script.js`
- Test: all edited pages

- [ ] **Step 1: Write the failing test**

Define the final verification matrix:

```text
Final verification matrix:
1. Desktop nav works on every page.
2. Mobile nav works on every page.
3. Active nav state appears correctly.
4. No page has obvious horizontal overflow at ~390px width.
5. demo.html interactions still work.
6. Long-form reading on soal-kodingdanAI.html is still intact.
7. materi.html is reachable from every main page.
```

- [ ] **Step 2: Run test to verify it fails**

Run the matrix before final fixes.

Expected:
- At least one responsive or consistency issue still appears and needs cleanup.

- [ ] **Step 3: Write minimal implementation**

Apply only cleanup changes discovered during the sweep, such as:

```css
img,
table,
iframe {
  max-width: 100%;
}

body {
  overflow-x: hidden;
}

.mobile-nav[data-open="false"] {
  display: none;
}

.mobile-nav[data-open="true"] {
  display: grid;
}
```

If any page still duplicates the shared nav script inline, remove the duplicate and keep the shared `script.js` path as the single source for generic navigation behavior.

- [ ] **Step 4: Run test to verify it passes**

Repeat the full matrix.

Expected:
- All seven checks pass.
- No regressions found in the pages’ core flows.

- [ ] **Step 5: Commit**

```bash
git add index.html about.html demo.html materi.html soal-kodingdanAI.html script.js
git commit -m "fix: finalize responsive learning site consistency"
```

## Self-Review

Spec coverage:
- Shared visual system and navigation are covered by Tasks 1, 2, 4, 5, and 7.
- New `materi.html` hub is covered by Task 3.
- Responsive and readability improvements are covered by Tasks 2 through 7.
- `demo.html` feature preservation is explicitly covered by Task 5.
- `soal-kodingdanAI.html` long-form readability is explicitly covered by Task 6.

Placeholder scan:
- No `TODO`, `TBD`, or undefined implementation markers remain.

Type consistency:
- Shared nav uses `data-menu-toggle`, `data-nav`, and `mobile-nav` consistently across tasks.
- Main page names remain `index.html`, `materi.html`, `soal-kodingdanAI.html`, `demo.html`, and `about.html` throughout the plan.
