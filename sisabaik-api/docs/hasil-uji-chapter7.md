# Laporan Hasil Pengujian REST API — Chapter 7

## 1. Informasi Pengujian

- **Proyek:** SisaBaik REST API
- **Chapter:** 7 — Membangun REST API
- **Database:** `sisabaik_dev`
- **Base URL:** `http://127.0.0.1:3000`
- **Tanggal pengujian:** 9 Oktober 2026
- **Commit yang diuji:** 13 Oktober 2026

## 2. Tujuan Pengujian

Pengujian dilakukan untuk memastikan endpoint REST API berjalan sesuai fungsinya, data dapat disimpan ke PostgreSQL, input yang tidak valid ditangani, serta stok dan pesanan tetap konsisten ketika terjadi kegagalan transaksi.

## 3. Hasil Pengujian

Isi kolom hasil aktual dan status setelah setiap pengujian benar-benar dijalankan.

| No. | Skenario pengujian | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|
| 1 | Health check | Server dan database terhubung | [Isi hasil aktual] | [Lulus] |
| 2 | Membuka daftar penawaran | API menampilkan daftar penawaran | [Isi hasil aktual] | [Lulus] |
| 3 | Membuka detail penawaran | Data penawaran sesuai ID ditampilkan | [Isi hasil aktual] | [Lulus] |
| 4 | ID penawaran tidak ditemukan | API mengembalikan 404 | [Isi hasil aktual] | [Lulus] |
| 5 | Membuat penawaran valid | Data tersimpan dan API mengembalikan 201 | [Isi hasil aktual] | [Lulus] |
| 6 | Mengubah penawaran | Data berubah sesuai request | [Isi hasil aktual] | [Lulus] |
| 7 | Menghapus penawaran tanpa riwayat | API mengembalikan 204 tanpa body | [Isi hasil aktual] | [Lulus] |
| 8 | Pencarian dan filter | Hanya data yang sesuai ditampilkan | [Isi hasil aktual] | [Lulus] |
| 9 | Query atau ID tidak valid | API menolak input yang tidak valid | [Isi hasil aktual] | [Lulus] |
| 10 | Pesanan dari beberapa penyedia | API menolak pesanan dengan konflik penyedia | [Isi hasil aktual] | [Lulus] |
| 11 | Stok tidak mencukupi | Pesanan ditolak dan stok tidak berubah | [Isi hasil aktual] | [Lulus] |
| 12 | Membuat pesanan valid | Pesanan tersimpan dengan status 201 | [Isi hasil aktual] | [Lulus] |
| 13 | Memeriksa snapshot harga | Harga pada detail pesanan tetap sesuai saat transaksi dibuat | [Isi hasil aktual] | [Lulus] |
| 14 | JSON atau Content-Type tidak valid | API mengembalikan 400 atau 415 sesuai kasus | [Isi hasil aktual] | [Lulus] |
| 15 | Payload terlalu besar | API mengembalikan 413 | [Isi hasil aktual] | [Lulus] |
| 16 | Restart server | Data yang tersimpan tetap tersedia | [Isi hasil aktual] | [Lulus] |
| 17 | Dua pesanan untuk stok satu unit | Satu request berhasil dan satu ditolak; stok akhir nol | [Isi hasil aktual] | [Lulus] |

## 4. Pengujian Otomatis

Catat hasil dari perintah berikut setelah dijalankan dari root folder `sisabaik-api`.

**Pengujian API:**

```bash
npm run api:test
```

Hasil: PS D:\sisabaik\sisabaik-api> npm run api:test

> sisabaik-api@1.2.0 api:test
> node scripts/uji-api.js

PASS GET /api/health -> 200
PASS GET /api/penawaran?page=0 -> 400
PASS GET /api/penawaran?limit=51 -> 400
PASS GET /api/penawaran?q=roti&q=nasi -> 400
PASS GET /api/penawaran/abc -> 400
PASS GET /api/penawaran/9223372036854775807 -> 404
PASS POST /api/penawaran -> 400
PASS POST /api/penawaran -> 201
PASS PUT /api/penawaran/11 -> 200
PASS PUT /api/penawaran/11 -> 400
PASS GET /api/penawaran?q=Uji%20C7%201791893396376&limit=1&page=1 -> 200
PASS GET /api/penawaran?q=Uji%20C7%201791893396376&kategori=roti&status=aktif&tersedia=true -> 200
PASS GET /api/penawaran?q=Uji%20C7%201791893396376&limit=1&page=2 -> 200
PASS GET /api/penawaran?q='%20OR%201%3D1%20-- -> 200
PASS DELETE /api/penawaran/11 -> 204
PASS GET /api/penawaran/11 -> 404
PASS POST /api/penawaran -> 201
PASS POST /api/penawaran -> 201
PASS GET /api/pesanan?limit=1 -> 200
PASS POST /api/pesanan -> 409
PASS POST /api/pesanan -> 409
PASS GET /api/pesanan?limit=1 -> 200
PASS GET /api/penawaran/12 -> 200
PASS POST /api/pesanan -> 201
PASS GET /api/pesanan?limit=1 -> 200
PASS DELETE /api/penawaran/12 -> 409
PASS GET /api/penawaran/12 -> 200
PASS PUT /api/penawaran/12 -> 200
PASS GET /api/pesanan/5 -> 200
PASS DELETE /api/penawaran/13 -> 204
SELESAI: pesanan 5, penawaran 12 tetap tersimpan.


**Pengujian konkurensi:**

```bash
node scripts/uji-konkurensi.js
```

Hasil: PS D:\sisabaik\sisabaik-api> node scripts/uji-konkurensi.js
PASS: satu berhasil, satu ditolak; stok akhir 0.
Penawaran uji yang dipertahankan: 14


## 5. Kesimpulan

Berdasarkan pengujian yang telah dilakukan, REST API SisaBaik dapat menjalankan fungsi utama sesuai kebutuhan praktikum, mulai dari menampilkan, menambah, mengubah, dan menghapus penawaran hingga membuat dan melihat pesanan. Pengujian juga mencakup validasi input, pencarian, filter, pagination, serta penanganan kesalahan pada request.

Pada proses pemesanan, API menerapkan pemeriksaan stok dan transaksi database untuk menjaga konsistensi data. Harga pada detail pesanan disimpan sesuai kondisi saat pesanan dibuat. Pengujian terhadap input tidak valid dan permintaan yang menimbulkan konflik juga dilakukan untuk memastikan API memberikan respons yang sesuai.

Secara keseluruhan, hasil pengujian menunjukkan bahwa fungsi REST API yang diuji telah berjalan sesuai dengan hasil yang diharapkan. Dokumentasi API dan laporan pengujian disiapkan sebagai bagian dari penyelesaian Chapter 7. Pengembangan lebih lanjut masih diperlukan, terutama untuk menambahkan autentikasi dan otorisasi sebelum aplikasi digunakan di lingkungan publik.

