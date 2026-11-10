
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


## Integrasi Full Stack — Chapter 10

### 1. Lingkungan Pengembangan

Aplikasi SisaBaik dikembangkan menggunakan Vue 3, Vite, Node.js, Express, dan PostgreSQL. Frontend Vue terintegrasi dengan backend REST API Express untuk mengelola autentikasi, penawaran, pesanan, dan dashboard berdasarkan peran pengguna.

Baseline lingkungan pada modul:
- Node.js: 24.19.0
- npm: 11.9.0
- Vue: 3.5.43
- Vite: 8.3.3
- Vue Router: 4.6.4
- PostgreSQL sebagai basis data utama.

### 2. Menjalankan Aplikasi

**Backend — Development**

Dari direktori `sisabaik-api`:

```bash
npm ci
npm run dev
```

Backend berjalan pada `http://127.0.0.1:3000`.

**Frontend — Development**

Dari direktori `sisabaik-api/frontend`:

```bash
npm ci
npm run dev
```

Frontend berjalan melalui Vite, umumnya pada `http://127.0.0.1:5173`.

**Build dan Preview Frontend**

Dari direktori `frontend`:

```bash
npm run build
npm run preview
```

Hasil build disimpan pada direktori `frontend/dist`. Preview secara default berjalan pada port 4173.

**Build dan Menjalankan Aplikasi Terpadu**

Dari root backend:

```bash
npm run build
npm run start:local
```

Aplikasi dapat diakses melalui `http://127.0.0.1:3000/`. Express menyajikan hasil build Vue sekaligus REST API.

### 3. Integrasi Frontend dan Backend

Frontend berkomunikasi dengan backend melalui endpoint REST API dengan prefix `/api`.

Pada mode development, Vite menggunakan konfigurasi proxy untuk meneruskan request `/api` ke backend `http://127.0.0.1:3000`. Dengan demikian, frontend dapat mengakses API tanpa perlu mengatur alamat backend secara terpisah pada setiap request.

Pada mode production lokal, frontend hasil build dan backend disajikan melalui satu server Express.

### 4. Autentikasi dan Hak Akses

Aplikasi menyediakan registrasi dan login untuk dua jenis pengguna, yaitu pembeli dan penyedia.

- Pengguna membuat akun menggunakan kata sandi sendiri.
- Penyedia melengkapi profil usaha dan menunggu proses verifikasi sebelum memperoleh akses sesuai ketentuan aplikasi.
- Autentikasi menggunakan token JWT yang dikirim melalui Bearer token.
- Hak akses dan kepemilikan data diperiksa kembali oleh backend.
- Pembeli dapat melihat katalog, membuat pesanan, dan memantau status pesanan.
- Penyedia dapat mengelola penawaran serta memproses pesanan masuk.

### 5. Pengelolaan Penawaran dan Pesanan

Penawaran dapat dibuat dan diperbarui oleh penyedia yang memiliki data tersebut. Foto bersifat opsional. Backend memproses foto yang valid menjadi WebP dan menyediakan gambar fallback apabila foto tidak tersedia.

Pembaruan penawaran menggunakan mekanisme versi data untuk mencegah perubahan yang menggunakan data usang. Riwayat pesanan menyimpan snapshot nama penawaran, harga, dan satuan sehingga perubahan penawaran tidak mengubah transaksi yang telah dibuat.

Alur pesanan mencakup:
- Pembuatan pesanan dan reservasi stok.
- Konfirmasi atau penolakan oleh penyedia.
- Pembaruan status menjadi siap diambil.
- Serah terima dan pembayaran di tempat.
- Pembatalan sesuai aturan status pesanan.

Reservasi mengurangi stok satu kali. Pembatalan atau penolakan yang valid dapat memulihkan stok, dengan perlindungan agar pemulihan tidak dilakukan berulang kali.

### 6. Pembayaran dan Dashboard

Pembayaran dilakukan saat pengambilan pesanan. Aplikasi belum menggunakan payment gateway eksternal.

Dashboard mengambil agregasi data dari server berdasarkan cakupan akun dan peran pengguna. Metrik yang ditampilkan mencakup belanja, pendapatan, diskon, unit tersalurkan, nilai normal makanan, serta pembatalan.

Pesanan yang masih menunggu atau baru siap diambil tidak langsung dihitung sebagai pendapatan maupun pengambilan selesai. Pesanan gratis juga tidak menambah pendapatan.

### 7. Batasan Implementasi

Batasan aplikasi pada tahap integrasi ini meliputi:
- Token sesi disimpan di memori halaman sehingga sesi login hilang ketika halaman di-refresh dan pengguna perlu login kembali.
- Belum tersedia payment gateway.
- Belum tersedia fitur reset kata sandi.
- Belum tersedia verifikasi email.
- Belum tersedia idempotency key untuk perlindungan menyeluruh terhadap pengulangan request transaksi.
- Belum tersedia pembaruan data secara realtime.

### 8. Hasil Pengujian

Pengujian otomatis workflow transaksi dilakukan melalui perintah:

```bash
npm run workflow:test
```

**Hasil: 26 skenario alur transaksi lulus.**

Cakupan pengujian otomatis meliputi:
- Fallback foto dan versi awal penawaran.
- Reservasi stok dan penggunaan harga dari server.
- Pembatasan akses berdasarkan peran dan kepemilikan pesanan.
- Pembatalan dan penolakan serta pemulihan stok.
- Pencegahan pemulihan stok berulang.
- Konfirmasi, kesiapan pengambilan, dan serah terima berbayar.
- Penyelesaian pesanan gratis tanpa penambahan pendapatan.
- Perhitungan dashboard berdasarkan transaksi.
- Pemrosesan foto PNG menjadi WebP.
- Penolakan SVG dan berkas foto palsu.
- Edit penawaran, kepemilikan foto, dan pemulihan gambar fallback.
- Pencegahan perubahan penawaran menggunakan versi data usang.
- Penanganan pembatalan dan konfirmasi yang berlangsung bersamaan.
- Pencegahan reservasi melebihi stok yang tersedia.

Seluruh fixture pengujian otomatis berhasil dibersihkan setelah proses selesai.

**Pengujian build frontend**

Perintah `npm run build` berhasil dijalankan dari direktori frontend. Vite berhasil memproses 55 modul dan menghasilkan direktori `dist` tanpa error kompilasi.

**Pemeriksaan integrasi lokal**

Backend berhasil dijalankan dalam mode development. Endpoint `/api/health` menunjukkan status berhasil dan koneksi database terhubung. Frontend juga berhasil mengakses endpoint tersebut melalui proxy Vite.

**Catatan:** Pengujian build backend, preview production, serta seluruh skenario pengujian manual perlu dicatat berdasarkan hasil eksekusi aktual masing-masing. Hasil pengujian otomatis tidak menggantikan seluruh pengujian browser dan deployment.