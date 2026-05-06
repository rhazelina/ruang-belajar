# Material Pages Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the content from `baru/IPA.html` and `baru/PJOK-DAN-SENBUD.html` into the main Luo-Learn workspace as two new detail pages and update `materi.html` so they are part of the official material hub.

**Architecture:** Rebuild the two source pages as static Luo-Learn pages using the same header, navigation, spacing, and responsive card system already used by `materi.html` and `about.html`. Keep `script.js` as the shared interaction layer for nav, theme toggle, and other global behaviors while translating the source content into cleaner, mobile-safe HTML sections.

**Tech Stack:** Static HTML, shared CSS embedded per page, existing `script.js`, manual browser verification

---

### Task 1: Re-map the source content into implementation-ready page structures

**Files:**
- Modify: `docs/superpowers/plans/2026-05-06-material-pages-integration.md`
- Reference: `baru/IPA.html`
- Reference: `baru/PJOK-DAN-SENBUD.html`
- Reference: `materi.html`
- Reference: `about.html`

- [x] **Step 1: Extract the final content groups for `ipa.html`**

Write this mapping into a working note inside this plan before implementation starts:

```text
IPA page structure:
- Intro card: page title, short explanation, class coverage summary
- Section Kelas VII:
  - Biologi & Ekologi
  - Fisika & Pengukuran
  - Kimia Dasar
- Section Kelas VIII:
  - Biologi: Sel & Sistem Tubuh
  - Fisika: Mekanika & Gelombang
  - Kimia: Materi
- Section Kelas IX:
  - Biologi: Reproduksi, Saraf, Ekskresi & Genetika
  - Fisika: Tekanan, Listrik & Magnet
  - Lingkungan, Bioteknologi & Kimia Lanjutan
```

- [x] **Step 2: Extract the final content groups for `pjok-senbud.html`**

Write this mapping into a working note inside this plan before implementation starts:

```text
PJOK/Senbud page structure:
- Intro card: page title, short explanation, two-rumpun overview
- Section Seni Rupa / Seni Budaya:
  - Capaian akhir fase callout
  - Konsep & Teori Dasar
  - Perspektif & Poster
  - Ragam Hias & Karya 3D
- Section PJOK:
  - Permainan Bola Besar & Kecil
  - Atletik & Bela Diri
  - Senam & Renang
  - Kebugaran, Kesehatan & P3K
```

- [x] **Step 3: Confirm the integration points in `materi.html`**

Record the intended updates before editing:

```text
Material hub updates:
- Keep existing Luo-Learn page shell and nav intact
- Broaden the page copy from Informatika-only wording to a wider material hub
- Add one topic card linking to ipa.html
- Add one topic card linking to pjok-senbud.html
- Update the CTA copy so the destination pages feel native to the hub
```

- [x] **Step 4: Run a quick reference check before implementation**

Run: `rg -n "page-intro|topic-grid|resource-links|mobile-nav|menu-toggle" materi.html about.html`

Expected: matching lines from the existing Luo-Learn pages so the new pages can reuse the same structural patterns.

- [ ] **Step 5: Commit the planning checkpoint**

```bash
git add docs/superpowers/plans/2026-05-06-material-pages-integration.md
git commit -m "docs: add material pages integration implementation plan"
```

### Task 2: Create `ipa.html` in the Luo-Learn page system

**Files:**
- Create: `ipa.html`
- Reference: `materi.html`
- Reference: `about.html`
- Reference: `baru/IPA.html`

- [ ] **Step 1: Write the failing verification target**

Define the acceptance checks for the page before writing the file:

```text
ipa.html must:
- use Luo-Learn header and mobile nav structure
- include an intro card and three class sections
- present all IPA source groups in responsive cards
- load script.js
- avoid Tailwind CDN and Poppins
```

- [ ] **Step 2: Verify the page does not exist yet**

Run: `Test-Path ipa.html`

Expected: `False`

- [ ] **Step 3: Write the initial implementation**

Create `ipa.html` with:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Materi IPA SMP | Luo-Learn</title>
  <link rel="shortcut icon" href="./assets/Luocha.png" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,600;7..72,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reuse the existing Luo-Learn page shell with an IPA accent palette. */
  </style>
</head>
<body>
  <header class="site-header">...</header>
  <main class="page-shell">
    <section class="page-intro">...</section>
    <section class="class-section">...</section>
    <section class="class-section">...</section>
    <section class="class-section">...</section>
    <section class="resource-links">...</section>
  </main>
  <footer class="site-footer">...</footer>
  <script src="./script.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify the file now exists**

Run: `Test-Path ipa.html`

Expected: `True`

- [ ] **Step 5: Run a source-safety check**

Run: `rg -n "tailwindcss|Poppins|cdn.tailwindcss|Nova Hoshizora|cite:" ipa.html`

Expected: no matches.

- [ ] **Step 6: Commit the page creation**

```bash
git add ipa.html
git commit -m "feat: add IPA material detail page"
```

### Task 3: Create `pjok-senbud.html` in the Luo-Learn page system

**Files:**
- Create: `pjok-senbud.html`
- Reference: `materi.html`
- Reference: `about.html`
- Reference: `baru/PJOK-DAN-SENBUD.html`

- [ ] **Step 1: Write the failing verification target**

Define the acceptance checks for the page before writing the file:

```text
pjok-senbud.html must:
- use Luo-Learn header and mobile nav structure
- include one section for Seni Budaya and one for PJOK
- preserve the dense source content in grouped cards
- fix broken symbols or encoding artifacts
- load script.js
```

- [ ] **Step 2: Verify the page does not exist yet**

Run: `Test-Path pjok-senbud.html`

Expected: `False`

- [ ] **Step 3: Write the initial implementation**

Create `pjok-senbud.html` with:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Materi PJOK dan Seni Budaya | Luo-Learn</title>
  <link rel="shortcut icon" href="./assets/Luocha.png" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,600;7..72,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reuse the existing Luo-Learn page shell with dual subject accent handling. */
  </style>
</head>
<body>
  <header class="site-header">...</header>
  <main class="page-shell">
    <section class="page-intro">...</section>
    <section class="subject-section subject-section-art">...</section>
    <section class="subject-section subject-section-sport">...</section>
    <section class="resource-links">...</section>
  </main>
  <footer class="site-footer">...</footer>
  <script src="./script.js"></script>
</body>
</html>
```

- [ ] **Step 4: Verify the file now exists**

Run: `Test-Path pjok-senbud.html`

Expected: `True`

- [ ] **Step 5: Run a content-cleanliness check**

Run: `rg -n "ðŸ|â|tailwindcss|Poppins|Nova Hoshizora|cite:" pjok-senbud.html`

Expected: no matches.

- [ ] **Step 6: Commit the page creation**

```bash
git add pjok-senbud.html
git commit -m "feat: add PJOK and Seni Budaya material page"
```

### Task 4: Update `materi.html` so the new pages are first-class material destinations

**Files:**
- Modify: `materi.html`
- Reference: `ipa.html`
- Reference: `pjok-senbud.html`

- [ ] **Step 1: Write the failing verification target**

Define the required outcomes before editing:

```text
materi.html must:
- keep the existing Luo-Learn shell and responsive behavior
- broaden copy beyond Informatika-only language
- add navigation cards for IPA and PJOK/Seni Budaya
- preserve existing working links and buttons
```

- [ ] **Step 2: Verify the current page still uses the old material scope**

Run: `rg -n "Materi Informatika SMP|Pengenalan AI|Baca Buku Saku Lengkap" materi.html`

Expected: matches showing the current Informatika-centered copy.

- [ ] **Step 3: Implement the hub update**

Update `materi.html` so it includes:

```html
<h1>Pusat Materi SMP</h1>
<p class="intro-copy">...</p>

<article class="topic-card">
  <span class="topic-meta">Sains • Ringkas</span>
  <h3>Materi IPA SMP</h3>
  <p>Ringkasan materi asesmen IPA per kelas dengan pembagian tema yang mudah dipindai.</p>
  <ul>
    <li>Kelas VII sampai IX</li>
    <li>Biologi, Fisika, Kimia, dan isu lingkungan</li>
    <li><a href="ipa.html">Buka halaman materi IPA</a></li>
  </ul>
</article>

<article class="topic-card">
  <span class="topic-meta">Praktik • Ringkas</span>
  <h3>PJOK dan Seni Budaya</h3>
  <p>Materi padat untuk dua rumpun mapel dalam satu halaman dengan pembagian topik yang jelas.</p>
  <ul>
    <li>Seni rupa dan teori dasar</li>
    <li>PJOK kelas IX</li>
    <li><a href="pjok-senbud.html">Buka halaman PJOK dan Seni Budaya</a></li>
  </ul>
</article>
```

- [ ] **Step 4: Verify the new links exist**

Run: `rg -n "ipa.html|pjok-senbud.html|Pusat Materi SMP|PJOK dan Seni Budaya" materi.html`

Expected: matches for the new heading and links.

- [ ] **Step 5: Commit the hub update**

```bash
git add materi.html
git commit -m "feat: expand material hub with new subject pages"
```

### Task 5: Verify integration and responsive safety

**Files:**
- Verify: `materi.html`
- Verify: `ipa.html`
- Verify: `pjok-senbud.html`
- Verify: `script.js`

- [ ] **Step 1: Run a structural verification sweep**

Run: `rg -n "data-menu-toggle|mobile-nav|script.js|aria-label=\"Navigasi utama\"" materi.html ipa.html pjok-senbud.html`

Expected: all three pages include the shared navigation structure and script hook.

- [ ] **Step 2: Run a consistency sweep for forbidden legacy dependencies**

Run: `rg -n "tailwindcss|Poppins|cdn.tailwindcss|Nova Hoshizora|Dibuat khusus untukmu|Ditata rapi oleh" materi.html ipa.html pjok-senbud.html`

Expected: no matches in the new final pages.

- [ ] **Step 3: Run a mobile safety sweep**

Run: `rg -n "@media \(max-width: 899px\)|@media \(max-width: 640px\)|overflow-x: hidden" ipa.html pjok-senbud.html materi.html`

Expected: the responsive breakpoints and overflow protections are present on the relevant pages.

- [ ] **Step 4: Perform manual verification in a browser**

Run these checks manually:

```text
1. Open materi.html and confirm the new cards are visible.
2. Open ipa.html and confirm all three class sections render in a responsive grid.
3. Open pjok-senbud.html and confirm the two subject sections render cleanly.
4. On a narrow viewport, open the mobile menu and confirm it toggles correctly.
5. Confirm there is no horizontal scrolling on the three pages.
6. Confirm the active nav highlight follows the current page.
```

Expected: all checks pass without layout breakage.

- [ ] **Step 5: Commit the verified integration**

```bash
git add materi.html ipa.html pjok-senbud.html
git commit -m "feat: integrate IPA and PJOK Seni Budaya material pages"
```
