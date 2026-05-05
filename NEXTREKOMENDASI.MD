# Audit & Rekomendasi Fitur Lanjutan (Tahap 4)

Perbaikan mode gelap yang responsif, *widget* global Pomodoro dengan notifikasi suara, serta fitur Mode Fokus telah selesai diimplementasikan dengan murni menggunakan *Vanilla JS*!

Berdasarkan audit terbaru, sisa ide fitur yang paling potensial untuk ditambahkan adalah:

## 1. Waktu Baca Estimasi (Estimated Reading Time)
**Deskripsi:** Teks kecil informatif di bawah judul materi (misal: "⏱ Estimasi baca: 4 Menit") agar siswa bisa mempersiapkan diri sebelum membaca panjang.
**Implementasi:** Script JS murni yang otomatis menghitung panjang karakter/kata di dalam area artikel (`.reading-shell`), lalu dibagi rata-rata kecepatan membaca.

## 2. Bookmark Lokal (Simpan Bab Favorit)
**Deskripsi:** Ikon "Bintang" atau "Bookmark" di halaman Buku Saku. Jika diklik, URL/ID Bab tersebut akan tersimpan ke dalam list "Baca Nanti" yang bisa diakses dari tombol navigasi.
**Implementasi:** Memanfaatkan API `localStorage` untuk memanajemen *array* tautan favorit siswa tanpa perlu login/database.

## 3. Mini-Kuis Interaktif Evaluasi Mandiri
**Deskripsi:** Menggunakan elemen `<form>` statis pada akhir Bab (atau file tersendiri) berisi 2-3 pertanyaan *multiple choice* yang bisa langsung diklik untuk mengetahui Benar (hijau) atau Salah (merah).
**Implementasi:** Validasinya dilakukan menggunakan fungsi JavaScript klien yang sangat ringan, tanpa validasi backend.

---
**Catatan:** Anda bisa memilih rekomendasi fitur di atas atau membiarkan proyek dalam rilis stabilnya saat ini!
