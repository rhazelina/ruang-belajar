# Luo-Learn Informatika SMP Redesign Design

## Ringkasan

Project ini akan diubah dari kumpulan halaman statis yang visualnya terpisah-pisah menjadi mini-site belajar statis untuk siswa SMP. Fokus utamanya adalah keterbacaan, konsistensi UI, responsivitas mobile-first, dan struktur materi yang lebih jelas.

Target redesign ini bukan membangun sistem dinamis. Semua konten boleh tetap hardcoded selama hasilnya rapi, mudah dipahami, dan siap dijadikan dasar implementasi penuh di tahap berikutnya.

## Masalah Saat Ini

- Identitas UI antar halaman tidak konsisten. `index.html`, `about.html`, `demo.html`, dan `soal-kodingdanAI.html` terasa seperti produk yang berbeda.
- Beberapa efek visual justru mengganggu membaca, seperti typing effect, glow berlebihan, dan dekorasi yang tidak menambah nilai belajar.
- Ada banyak karakter rusak karena encoding yang menurunkan kualitas pengalaman pengguna.
- Struktur navigasi belum membentuk alur belajar. Halaman materi utama dan buku saku berdiri sendiri tanpa pusat navigasi yang jelas.
- Responsivitas belum stabil. Beberapa elemen masih berisiko terlalu padat, terlalu lebar, atau kurang nyaman untuk dibaca di layar HP.

## Tujuan

- Menyatukan semua halaman ke dalam satu sistem UI yang netral, bersih, dan konsisten.
- Membuat pengalaman baca yang lebih human, tenang, dan cocok untuk siswa SMP.
- Menambahkan halaman pusat materi Informatika SMP sebagai pintu masuk utama ke konten belajar.
- Mempertahankan materi yang sudah ada, terutama `demo.html` dan `soal-kodingdanAI.html`, sambil menempatkannya dalam struktur yang lebih masuk akal.
- Mengutamakan implementasi native HTML/CSS/JS ringan tanpa ketergantungan arsitektur baru.

## Non-Tujuan

- Tidak membangun backend, CMS, atau sistem autentikasi.
- Tidak mengubah project menjadi SPA atau framework-based app.
- Tidak menambahkan generator konten otomatis atau pola interaksi yang terasa seperti AI chat.
- Tidak melakukan refactor berlebihan yang tidak membantu tujuan UI, responsive, dan materi.

## Pengguna Sasaran

Pengguna utama adalah siswa SMP yang membutuhkan materi Informatika dasar dengan bahasa yang mudah dipahami, ringkas, dan terasa seperti modul belajar manusia. Pengguna sekunder adalah pengelola project yang nanti akan memakai prototype ini sebagai dasar implementasi penuh.

## Pendekatan Produk

Project akan dikonsolidasikan menjadi mini-site belajar statis dengan empat pengalaman utama:

- `Beranda` untuk orientasi singkat dan CTA ke materi.
- `Pusat Materi` sebagai katalog topik Informatika SMP.
- `Materi Detail` untuk halaman materi/kisi-kisi/buku saku yang sudah ada.
- `Tentang` untuk menjelaskan konteks program atau mentor tanpa efek naratif berlebihan.

Arsitektur informasi ini dipilih karena mampu memperbaiki masalah sinkronisasi UI sekaligus memberi ruang penambahan materi baru tanpa harus mengubah struktur dasar situs lagi.

## Struktur Navigasi

Semua halaman utama akan memakai menu yang konsisten:

- `Beranda`
- `Materi`
- `Buku Saku`
- `Soal / Kisi-Kisi`
- `Tentang`

Interpretasi implementasi:

- `Beranda` mengarah ke `index.html`
- `Materi` mengarah ke halaman baru `materi.html`
- `Buku Saku` mengarah ke `soal-kodingdanAI.html`
- `Soal / Kisi-Kisi` mengarah ke `demo.html`
- `Tentang` mengarah ke `about.html`

Di mobile, navigasi ditampilkan dalam panel sederhana yang mudah dibuka dan ditutup. Tidak perlu animasi berat. Prioritasnya adalah keterbacaan, target sentuh yang cukup besar, dan kejelasan state aktif.

## Arah Visual

Visual akan digeser ke desain yang lebih netral dan edukatif. Identitas sebelumnya yang terlalu ornamental tidak dipertahankan sebagai pusat desain.

Karakter visual yang diinginkan:

- Warna dasar netral dengan aksen lembut yang tetap memberi identitas.
- Tipografi yang nyaman untuk membaca blok materi panjang.
- Spacing lega dan ritme layout yang stabil.
- Kartu, badge, dan CTA yang fungsional, bukan dekoratif semata.

Karakter visual yang akan dikurangi atau dihapus:

- Typing text effect
- Glow agresif
- Dekorasi latar yang terlalu ramai
- Simbol atau ikon yang rawan rusak encoding

## Sistem Layout

Semua halaman akan mengikuti kerangka yang sama:

1. Header sticky sederhana
2. Hero ringkas atau header halaman
3. Konten utama dengan max-width baca yang terkontrol
4. Footer ringan

Prinsip layout:

- Mobile-first
- Satu kolom di layar kecil untuk konten utama
- Grid melebar bertahap di tablet dan desktop
- Lebar paragraf dijaga agar nyaman dibaca
- Tabel atau blok lebar dibungkus aman untuk scroll horizontal lokal, bukan menyebabkan halaman bergeser

## Struktur Konten Baru

Halaman baru `materi.html` akan menjadi pusat materi Informatika SMP.

Konten minimal yang ditampilkan:

- ringkasan tujuan belajar
- jalur belajar yang disarankan
- katalog kartu topik
- akses ke buku saku lengkap
- akses ke kisi-kisi atau materi pendukung

Topik utama yang wajib ada:

- Berpikir Komputasional
- Algoritma dan Flowchart
- Logika Dasar dan Boolean
- Sistem Bilangan dan Representasi Data
- Pengenalan AI untuk SMP

Setiap kartu topik minimal memuat:

- judul
- deskripsi singkat
- level atau kategori
- estimasi waktu baca
- CTA untuk membuka detail atau lompat ke bagian terkait

## Konten dan Gaya Bahasa

Konten baru harus terasa seperti modul belajar manusia. Teks harus:

- menggunakan bahasa Indonesia yang sederhana
- menghindari gaya promosi berlebihan
- menjelaskan konsep dengan contoh sehari-hari
- menyertakan poin penting dan kesalahan umum bila relevan
- tidak memakai format yang terasa seperti hasil generasi AI bercorak naratif kosong

Konten harus tetap hardcoded dan boleh ringkas, asalkan utuh dan mudah dipahami siswa SMP.

## Perubahan Per Halaman

### `index.html`

- Ubah menjadi landing page yang lebih bersih dan singkat.
- Fokus pada pengantar produk, manfaat untuk siswa SMP, dan CTA ke `materi.html` serta `soal-kodingdanAI.html`.
- Hilangkan ornamen dan copy yang terlalu bergantung pada tema lama.

### `about.html`

- Ubah menjadi halaman tentang yang statis dan terbaca normal.
- Hapus typing effect sepenuhnya.
- Pertahankan narasi singkat, tetapi buat lebih informatif dan lebih tenang secara visual.

### `demo.html`

- Pertahankan fungsi sebagai materi/kisi-kisi pendukung.
- Samakan navigasi, spacing, warna, dan elemen UI dengan sistem baru.
- Pastikan accordion, pencarian, progress, dan tabel tetap nyaman dipakai di mobile.

### `soal-kodingdanAI.html`

- Pertahankan sebagai buku saku lengkap.
- Rapikan header, jarak antar section, dan skala tipografi.
- Perbaiki encoding dan elemen visual yang terlalu ramai agar sesi membaca panjang tetap nyaman.

### `materi.html`

- Tambahkan sebagai halaman baru.
- Jadikan pusat orientasi untuk seluruh materi Informatika SMP.
- Muat jalur belajar dan daftar topik inti.

### `script.js`

- Gunakan sebagai tempat perilaku umum lintas halaman bila itu mengurangi duplikasi.
- Cocok untuk menu mobile, state navigasi sederhana, atau utilitas UI ringan.
- Jangan memindahkan logic halaman yang sangat spesifik bila justru membuat file jadi kabur tanggung jawabnya.

## Responsivitas

Perbaikan responsive yang harus diterapkan:

- navigation mobile yang stabil dan mudah dipakai
- font size mobile yang tetap nyaman dibaca
- tombol dan link dengan target sentuh memadai
- grid kartu yang runtuh rapi ke satu kolom di HP
- tabel dibungkus dalam kontainer overflow lokal
- gambar dan hero tidak mengambil ruang berlebihan di layar kecil
- tidak ada horizontal overflow pada viewport kecil

## Aksesibilitas dan Kualitas Dasar

Walau ini prototype, kualitas dasar tetap harus dijaga:

- heading hierarchy masuk akal
- alt text gambar yang relevan
- kontras teks memadai
- state hover dan focus cukup jelas
- elemen interaktif tetap bisa dipakai tanpa asumsi pointer desktop

## Risiko

- Konten yang sudah ada cukup panjang, terutama `soal-kodingdanAI.html`, sehingga perubahan visual harus hati-hati agar tidak merusak keterbacaan bagian yang sudah bernilai.
- `demo.html` punya interaksi JS sendiri, jadi konsolidasi UI tidak boleh mematahkan fitur pencarian, accordion, progress, dan pomodoro.
- Ada indikasi file dengan encoding campuran, sehingga normalisasi karakter perlu diperhatikan saat editing.

## Strategi Implementasi

Strategi implementasi disarankan bertahap:

1. Bentuk sistem visual dan navigasi bersama
2. Tambah `materi.html` sebagai pusat materi
3. Rapikan `index.html` dan `about.html`
4. Selaraskan `demo.html`
5. Rapikan `soal-kodingdanAI.html`
6. Lakukan pengecekan responsive dan overflow

Urutan ini menjaga momentum karena halaman pusat materi dapat segera menjadi acuan struktur halaman lainnya.

## Pengujian

Verifikasi minimum setelah implementasi:

- semua link navigasi antar halaman bekerja
- menu mobile dapat dibuka dan ditutup dengan stabil
- tidak ada overflow horizontal pada lebar mobile umum
- `demo.html` tetap mempertahankan fitur interaktif utamanya
- `soal-kodingdanAI.html` tetap utuh dan lebih nyaman dibaca
- karakter rusak yang terlihat di UI utama telah dibersihkan

## Hasil Akhir yang Diharapkan

Prototype ini harus terasa seperti mini-site belajar yang rapi dan konsisten, bukan eksperimen visual. Siswa SMP harus bisa masuk dari beranda, menemukan jalur belajar, memilih materi yang tepat, membaca dengan nyaman di HP, lalu pindah ke buku saku atau kisi-kisi tanpa kebingungan.
