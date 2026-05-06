# Integrasi Halaman Materi IPA dan PJOK/Seni Budaya

## Ringkasan

Workspace utama Luo-Learn saat ini sudah punya sistem visual yang konsisten untuk halaman statis seperti `materi.html` dan `about.html`, tetapi konten baru di direktori `baru/` masih hadir sebagai halaman mandiri berbasis Tailwind CDN dengan struktur, tipografi, navigasi, dan perilaku responsif yang berbeda total. Tujuan pekerjaan ini adalah mengintegrasikan konten dari `baru/IPA.html` dan `baru/PJOK-DAN-SENBUD.html` ke workspace utama sebagai halaman materi resmi baru tanpa membawa sistem desain lama dari folder `baru`.

Hasil akhirnya adalah:

- `materi.html` tetap menjadi hub utama materi.
- Tersedia dua halaman detail baru: `ipa.html` dan `pjok-senbud.html`.
- Kedua halaman baru memakai bahasa visual Luo-Learn yang sama dengan workspace utama.
- Konten tetap padat seperti sumber asli, tetapi disusun ulang agar lebih rapi, mudah dipindai, dan stabil pada layar kecil.

## Masalah Saat Ini

Temuan dari file sumber dan workspace utama:

- `baru/IPA.html` dan `baru/PJOK-DAN-SENBUD.html` memakai Tailwind CDN dan font `Poppins`, sedangkan workspace utama memakai CSS lokal statis dengan `Literata`/`Plus Jakarta Sans`.
- Kedua file di `baru/` tidak memiliki header, navigasi, dan footer yang konsisten dengan Luo-Learn.
- Struktur layout di `baru/` masih berdiri sendiri dan belum memanfaatkan pola komponen halaman utama seperti intro card, topic card, resource CTA, serta mobile nav yang memakai `script.js`.
- Ada karakter rusak pada beberapa simbol/emoji di sumber `PJOK-DAN-SENBUD.html`, sehingga tidak aman dipindah mentah ke workspace utama.
- `materi.html` masih terasa sebagai hub materi Informatika, sehingga perlu diperluas agar IPA dan PJOK/Seni Budaya muncul sebagai bagian resmi dari katalog materi.

## Tujuan

### Tujuan utama

- Menambahkan dua halaman detail materi baru yang terintegrasi penuh ke workspace utama.
- Menjaga konten tetap padat dan informatif seperti sumber di `baru/`.
- Menyamakan desain, navigasi, dan perilaku responsif dengan pola Luo-Learn.

### Tujuan sekunder

- Merapikan encoding dan copy yang tidak konsisten.
- Membuat jalur navigasi dari `materi.html` ke halaman detail lebih jelas.
- Meningkatkan keterbacaan di mobile tanpa mengubah substansi materi.

### Di luar scope

- Tidak mengubah sumber di direktori `baru/` menjadi basis runtime halaman utama.
- Tidak membangun sistem templating baru.
- Tidak melakukan refactor besar pada `script.js` kecuali ada penyesuaian kecil yang benar-benar diperlukan untuk halaman baru.
- Tidak mengubah konten materi menjadi narasi panjang.

## Pendekatan yang Dipilih

Pendekatan yang dipilih adalah membangun ulang dua halaman detail baru dengan komponen visual Luo-Learn, lalu memindahkan isi dari folder `baru` ke struktur HTML baru.

Alasan pemilihan pendekatan ini:

- Konsistensi visual terjaga karena halaman baru memakai kerangka yang sama dengan halaman utama.
- Responsif lebih mudah dikontrol karena mengikuti pola CSS yang sudah terbukti dipakai di workspace utama.
- Konten dapat dibersihkan dan dikelompokkan ulang tanpa membawa hutang desain dari file Tailwind mandiri.
- Scope tetap fokus pada dua halaman baru dan hub materi tanpa perlu membuat abstraksi template yang belum diperlukan.

## Arsitektur Halaman

### 1. `materi.html` sebagai hub

`materi.html` tetap menjadi pintu masuk utama, tetapi isinya diperluas agar tidak hanya terasa sebagai indeks materi Informatika.

Perubahan yang direncanakan:

- Menambahkan kartu topik baru untuk IPA.
- Menambahkan kartu topik baru untuk PJOK/Seni Budaya.
- Menyesuaikan copy pada intro atau resource section agar menggambarkan hub materi yang lebih luas.
- Menautkan kartu-kartu baru ke `ipa.html` dan `pjok-senbud.html`.

### 2. `ipa.html`

Halaman ini akan menjadi halaman materi detail untuk IPA dengan struktur berikut:

- Header Luo-Learn standar.
- Intro card yang menjelaskan bahwa halaman ini merangkum materi asesmen IPA secara padat.
- Section per kelas: `VII`, `VIII`, `IX`.
- Di setiap section kelas, tersedia grid kartu kategori seperti Biologi, Fisika, Kimia, atau kelompok tema lain yang memang sudah ada pada sumber.
- Footer konsisten dengan gaya halaman utama.

Konten dipertahankan padat. Setiap kartu berisi daftar poin materi/indikator yang sudah ada pada file sumber, hanya dirapikan redaksinya bila perlu agar lebih enak dipindai.

### 3. `pjok-senbud.html`

Halaman ini akan menjadi halaman materi detail gabungan untuk PJOK dan Seni Budaya dengan struktur berikut:

- Header Luo-Learn standar.
- Intro card yang menjelaskan bahwa halaman ini memuat dua rumpun materi dalam satu halaman.
- Section pertama untuk Seni Rupa/Seni Budaya.
- Section kedua untuk PJOK.
- Masing-masing section memakai kelompok kartu berdasarkan tema isi sumber.

Pemecahan ini dipilih karena struktur sumber aslinya memang semantis sebagai dua cabang besar, bukan per kelas seperti IPA.

## Desain Visual

Bahasa visual harus tetap satu keluarga dengan Luo-Learn:

- Latar belakang hangat dengan gradient lembut.
- Kartu semi-transparan dengan border tipis dan bayangan halus.
- Heading serif, body sans-serif.
- Navigasi sticky dengan mobile menu dari `script.js`.
- Tombol dan badge berbentuk pill.

Pembeda antar mapel hanya ada pada aksen warna:

- `ipa.html` memakai aksen biru-hijau dingin.
- `pjok-senbud.html` memakai aksen yang tetap harmonis dengan brand, tetapi dapat dibedakan per section untuk PJOK dan Seni Budaya.

Hal yang tidak dibawa dari sumber `baru/`:

- Tailwind CDN.
- Font `Poppins`.
- Header gradient besar yang berdiri sendiri tanpa pola brand Luo-Learn.
- Footer personal yang tidak konsisten dengan halaman utama.

## Responsif dan Layout

Aturan layout yang wajib dipenuhi:

- Desktop: grid 2 atau 3 kolom bila isi masih nyaman dibaca.
- Tablet: grid turun menjadi 2 kolom.
- Mobile: seluruh kartu menjadi 1 kolom penuh.
- Tidak boleh ada overflow horizontal.
- Spasi heading, list, dan section harus tetap lega pada layar kecil.

Pedoman implementasi:

- Gunakan pola lebar kontainer yang sama dengan `materi.html` dan `about.html`.
- Gunakan radius dan padding yang serupa agar tidak terasa seperti halaman asing.
- Hindari layout yang terlalu rapat pada list materi yang panjang.

## Konten dan Penyajian

Prinsip utama penyajian konten:

- Substansi materi tetap setia pada file `baru/`.
- Penyajian dirombak seperlunya agar scanability lebih baik.
- List panjang dipertahankan sebagai poin-poin, bukan dipaksa menjadi paragraf naratif.
- Judul kategori disederhanakan bila perlu agar tetap konsisten.

Pembersihan konten yang diizinkan:

- Memperbaiki karakter rusak.
- Menormalkan istilah yang penulisannya tidak konsisten.
- Menghapus penanda sitasi yang tidak relevan bila hanya artefak sumber statis dan tidak didukung sistem referensi di workspace utama.

## Perubahan File

### File baru

- `ipa.html`
- `pjok-senbud.html`

### File yang dimodifikasi

- `materi.html`

### File yang dipakai ulang tanpa refactor besar

- `script.js`

## Risiko dan Mitigasi

### Risiko 1: Halaman baru terasa seperti tempelan

Mitigasi:

- Pakai kerangka visual dan navigasi yang sama dengan halaman utama.
- Selaraskan intro, footer, spacing, dan sistem badge dengan pola Luo-Learn.

### Risiko 2: Konten padat menjadi sulit dibaca di mobile

Mitigasi:

- Pecah ke kartu-kartu kategori yang pendek.
- Batasi jumlah kolom di breakpoint kecil.
- Jaga line-height dan padding tetap lega.

### Risiko 3: Integrasi ke `materi.html` terasa memaksa

Mitigasi:

- Perbarui copy dan urutan kartu agar hub materi terasa lebih umum, bukan sekadar menambah link baru di bagian akhir.

### Risiko 4: Karakter rusak terbawa ke produksi

Mitigasi:

- Lakukan translasi manual dari konten sumber ke HTML baru, bukan copy mentah seluruh blok.

## Pengujian

Verifikasi minimal yang harus dilakukan:

- Link dari `materi.html` ke `ipa.html` dan `pjok-senbud.html` berfungsi.
- Active nav bekerja benar pada dua halaman baru.
- Mobile nav terbuka dan tertutup normal.
- Layout tidak overflow pada lebar mobile.
- Kartu dan list materi tetap terbaca baik di desktop dan mobile.
- Tidak ada karakter rusak yang tampak pada konten akhir.

## Kriteria Selesai

Pekerjaan dianggap selesai jika:

- `materi.html` sudah menampilkan akses resmi ke dua halaman materi baru.
- `ipa.html` dan `pjok-senbud.html` sudah tersedia dan konsisten secara visual dengan Luo-Learn.
- Konten dari `baru/IPA.html` dan `baru/PJOK-DAN-SENBUD.html` sudah terintegrasi ke halaman baru.
- Tidak ada ketergantungan Tailwind CDN pada halaman baru.
- Responsif dan navigasi berfungsi sesuai pola workspace utama.
