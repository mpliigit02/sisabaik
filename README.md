
## Chapter 7 — REST API PostgreSQL

### Prasyarat

- Node.js versi 22 atau lebih baru.
- PostgreSQL lokal.
- Database `sisabaik_dev` dan skema Chapter 6.
- File `.env` yang berisi konfigurasi database lokal.

### Menjalankan aplikasi

Jalankan seluruh perintah dari root folder `sisabaik-api`.

```bash
npm install
npm run db:check -- 0
npm run dev
```

Buka aplikasi lokal:

- Halaman penguji: http://127.0.0.1:3000/
- Health check: http://127.0.0.1:3000/api/health
- Daftar penawaran: http://127.0.0.1:3000/api/penawaran

### Pengujian

Dengan server berjalan di terminal pertama, gunakan terminal kedua:

```bash
npm run api:test
node scripts/uji-konkurensi.js
```

Pengujian mutasi membuat data latihan di database lokal. Jalankan hanya pada database praktikum.

### Perubahan API

- Data penawaran disimpan melalui PostgreSQL, bukan array dalam memori.
- Request pesanan menggunakan `emailPembeli`, bukan `namaPemesan`.
- `penawaranId` dikirim sebagai string.
- Pesanan menggunakan transaksi database, validasi stok, dan snapshot harga.
- Endpoint mutasi belum memiliki autentikasi.

### Konfigurasi dan keamanan

Salin konfigurasi dari `.env.example` untuk menyiapkan `.env` lokal, lalu isi kredensial database sendiri. Jangan commit `.env`, password, atau data pribadi.

Dokumentasi endpoint lengkap tersedia pada `docs/API.md`.




## Frontend — SisaBaik (Vue)

### Teknologi
- Vue 3
- Vite
- JavaScript
- CSS
- SVG untuk aset visual lokal

### Persiapan
Pastikan Node.js memenuhi versi yang ditentukan dalam `frontend/package.json`.

```powershell
cd frontend
npm install
```

### Menjalankan development server

```powershell
npm run dev
```

Aplikasi dapat diakses melalui `http://127.0.0.1:5173/`.

### Build produksi

```powershell
npm run build
```

Hasil build tersimpan pada direktori `frontend/dist`.

### Menjalankan preview produksi

```powershell
npm run preview
```

Preview dapat diakses melalui `http://127.0.0.1:4173/`.

### Struktur frontend

- `frontend/src/components/` — komponen Vue yang dapat digunakan ulang.
- `frontend/src/data/` — data latihan penawaran.
- `frontend/src/lib/` — fungsi format tampilan, visual, dan validasi formulir.
- `frontend/src/assets/` — logo dan ilustrasi SVG.
- `frontend/src/App.vue` — komponen utama aplikasi.
- `frontend/src/style.css` — stylesheet global.

### Status implementasi
Frontend Chapter 9 menggunakan data fixture di memori browser. Pada tahap ini frontend belum memanggil API backend dan data penawaran baru tidak bertahan setelah browser di-refresh. Integrasi API dan autentikasi dilakukan pada tahap berikutnya.

Folder `node_modules` dan `dist` tidak perlu dimasukkan ke repositori Git.



# Hasil Uji Chapter 9 — SisaBaik

## 1. Informasi Pengujian

- Penguji: Muhammad Rafli
- Tanggal pengujian: 3 November 2026
- Branch Git: Belum dicatat
- Commit: Menunggu commit akhir
- Versi Node.js: Belum dicatat
- Versi npm: Belum dicatat
- Browser: Google Chrome

## 2. Hasil Pengujian Fungsional

| Skenario | Hasil aktual | Status |
|---|---|---|
| Halaman pembeli | 3 kartu penawaran, 15 unit, dan 2 penyedia tampil | Lulus |
| Pencarian LAPAU | 2 penawaran Lapau Uni Rina | Lulus |
| Pencarian tidak ditemukan | Empty state tampil | Lulus |
| Reset dan filter kategori roti | Paket Roti Sore tampil | Lulus |
| Pilih makanan | Ringkasan pilihan muncul dan stok tetap 6 | Lulus |
| Mode penyedia | 3 penawaran, 2 tersedia, dan 9 unit | Lulus |
| Submit form kosong | Validasi muncul dan data tidak bertambah | Lulus |
| Harga penawaran melebihi harga normal | Validasi menolak data | Lulus |
| Form valid dengan harga 0 | Penawaran gratis berhasil ditambahkan | Lulus |
| Refresh browser | Data kembali ke 3 fixture awal | Lulus |
| Batas waktu penawaran | Penawaran kedaluwarsa menghilang setelah batas waktu terlampaui | Lulus |

## 3. Hasil Pengujian Responsivitas dan Aksesibilitas Dasar

| Pengujian | Hasil aktual | Status |
|---|---|---|
| Lebar 375 px | Pemeriksaan responsivitas sesuai skenario modul | Lulus |
| Lebar 768 px | Pemeriksaan responsivitas sesuai skenario modul | Lulus |
| Lebar 1280 px | Tampilan desktop terstruktur dengan baik | Lulus |
| Navigasi keyboard | Kontrol interaktif dapat diuji melalui keyboard | Lulus |
| Fokus elemen interaktif | Fokus terlihat pada elemen interaktif | Lulus |
| Tidak ada scroll horizontal | Tidak ditemukan masalah tata letak horizontal | Lulus |

## 4. Hasil Build dan Preview

- Perintah `npm run build`: Berhasil.
- Perintah `npm run preview`: Berhasil.
- URL preview: `http://127.0.0.1:4173/`.
- Pemeriksaan tampilan preview: Berhasil. Aplikasi dapat dibuka dan fitur utama berjalan pada hasil build produksi.

## 5. Aliran Data Komponen

- `App.vue` menyimpan state utama melalui `ref`.
- Nilai katalog dan ringkasan dihitung menggunakan `computed`.
- `FilterPenawaran.vue` menerima props pencarian, kategori, dan daftar kategori.
- `FilterPenawaran.vue` mengirim event perubahan pencarian, kategori, dan reset kepada `App.vue`.
- `KartuPenawaran.vue` menerima data penawaran dan waktu sekarang melalui props.
- `KartuPenawaran.vue` mengirim event `pilih` kepada `App.vue`.
- `FormPenawaran.vue` memvalidasi input dan mengirim event `simpan` ketika data valid.
- `App.vue` memperbarui daftar penawaran berdasarkan event yang diterima.

## 6. Ringkasan Data Fixture

### Pembeli

- Penawaran tersedia: 3
- Unit tersedia: 15
- Penyedia tersedia: 2

### Penyedia Rina

- Total penawaran: 3
- Penawaran tersedia: 2
- Unit tersedia: 9

Angka tersebut merupakan data fixture latihan, bukan data yang diambil dari PostgreSQL.

Setelah pengujian penambahan penawaran gratis, data Rina menjadi 4 penawaran, 3 penawaran tersedia, dan 11 unit tersedia. Setelah browser di-refresh, data kembali ke kondisi awal karena belum menggunakan penyimpanan permanen.

## 7. Dokumentasi Screenshot

Bukti visual yang telah diperoleh selama pengerjaan:

1. Screenshot katalog pembeli dan hero SisaBaik.
2. Screenshot tiga kartu penawaran, termasuk Paket Roti Sore, Nasi Padang Hemat, dan Sayur Layak Olah.
3. Screenshot tampilan desktop setelah penerapan CSS.

Bukti tambahan yang dapat disimpan ke folder `docs/screenshots/`:

- `empty-state.png`
- `form-invalid.png`
- `form-valid.png`
- `tampilan-mobile.png`
- `terminal-build.png`

## 8. Catatan dan Batasan

Frontend Chapter 9 telah berhasil dibangun menggunakan Vue 3 dan Vite. Komponen utama, pencarian, filter kategori, pemilihan penawaran, formulir, validasi, serta perubahan state telah diuji.

Frontend masih menggunakan fixture dan state di memori browser. Frontend belum terhubung ke API backend. Data penawaran yang ditambahkan melalui formulir akan hilang setelah refresh browser.

Autentikasi, otorisasi, verifikasi penyedia, dan penyimpanan permanen tetap ditangani melalui backend pada tahap integrasi berikutnya.

## 9. Kesimpulan

Berdasarkan hasil implementasi dan pengujian, pengembangan antarmuka SisaBaik pada Chapter 9 telah berhasil diselesaikan. Aplikasi dapat menampilkan katalog makanan, melakukan pencarian dan penyaringan, menampilkan dashboard penyedia, memvalidasi formulir penawaran, serta memperbarui tampilan berdasarkan perubahan state.

Proses build dan preview produksi juga berhasil dijalankan. Dengan demikian, implementasi frontend pada tahap ini dinyatakan berhasil dan siap dilanjutkan ke tahap integrasi frontend dengan API backend.