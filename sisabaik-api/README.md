# SisaBaik API

SisaBaik merupakan aplikasi berbasis web untuk menghubungkan penyedia makanan dengan pembeli melalui penawaran makanan yang masih layak konsumsi. Proyek ini menggunakan Node.js, Express, dan PostgreSQL.

## 1. Teknologi

- Node.js (minimal versi 22)
- Express 5
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs
- express-rate-limit
- Helmet

## 2. Persiapan Database

Gunakan database PostgreSQL bernama `sisabaik_dev`.

Pastikan tabel dari Chapter 6–7 tetap tersedia:

- pengguna
- penyedia
- penawaran
- pesanan
- detail_pesanan
- pengambilan

Terapkan migrasi autentikasi:

```bash
psql -h localhost -U postgres -d sisabaik_dev -v ON_ERROR_STOP=1 -f database/07_auth.sql
```

Migrasi `07_auth.sql` menambahkan:

- `kata_sandi_hash` untuk menyimpan hash kata sandi pengguna.
- `versi_token` untuk mendukung pencabutan sesi melalui perubahan versi token.

Migrasi mempertahankan data pengguna dan pesanan yang sudah tersedia.

## 3. Konfigurasi Environment

Salin `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi PostgreSQL.

Environment yang digunakan:

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=sisabaik_dev
PGUSER=postgres
PGPASSWORD=
JWT_SECRET=
```

Buat JWT secret menggunakan:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Masukkan hasilnya ke `JWT_SECRET`.

**Catatan keamanan:** Jangan memasukkan `.env`, password, hash, maupun token ke repositori Git.

## 4. Instalasi Dependency

Jalankan dari root proyek:

```bash
npm install
```

## 5. Menjalankan Server

Mode pengembangan:

```bash
npm run dev
```

Mode normal:

```bash
npm start
```

Server secara default berjalan pada:

`http://127.0.0.1:3000`

Pemeriksaan koneksi database:

`http://127.0.0.1:3000/api/health`

## 6. Halaman Latihan Autentikasi

Buka halaman berikut melalui server Express:

`http://127.0.0.1:3000/auth.html`

Halaman menyediakan fasilitas:

- Registrasi pembeli.
- Registrasi penyedia.
- Login dan logout.
- Pemeriksaan identitas akun.
- Pemeriksaan status verifikasi penyedia.
- Pengujian izin akses bisnis.

Token autentikasi disimpan di memori halaman dan tidak dipertahankan setelah halaman dimuat ulang.

Halaman utama dari Chapter 7 tetap dipertahankan sebagai bagian dari proyek.

## 7. Registrasi dan Verifikasi Penyedia

Pembeli dan penyedia melakukan pendaftaran menggunakan kata sandi masing-masing.

Penyedia yang baru mendaftar memiliki status menunggu peninjauan sebelum memperoleh izin melakukan operasi bisnis.

Peninjauan dilakukan melalui script operator:

```bash
npm run penyedia:verifikasi -- email@domain.com
```

Untuk menolak verifikasi:

```bash
npm run penyedia:verifikasi -- email@domain.com --tolak
```

Setelah status diperbarui, pengguna dapat memeriksa status melalui halaman autentikasi.

## 8. Pengujian Otomatis

Pastikan server berjalan dan database praktikum menggunakan `sisabaik_dev`.

Jalankan:

```bash
npm run auth:test
```

Pengujian mencakup autentikasi, otorisasi berbasis peran, kepemilikan data, serta konsistensi snapshot harga pesanan.

Script pengujian menggunakan akun dan fixture otomatis. Pengujian ini tidak menggantikan pemeriksaan manual.

## 9. Dokumentasi API

Dokumentasi kontrak API tersedia pada:

`docs/API.md`

Dokumentasi mencakup endpoint autentikasi, registrasi, profil pengguna, penawaran, pesanan, validasi input, serta status kesalahan API.

## 10. Keamanan Aplikasi

Implementasi keamanan Chapter 8 mencakup:

- Hash kata sandi menggunakan bcrypt.
- Autentikasi berbasis JWT.
- Validasi token, issuer, audience, dan masa berlaku.
- Otorisasi berdasarkan peran pengguna.
- Pemeriksaan kepemilikan data di sisi server.
- Pembatasan request autentikasi dan registrasi.
- Pencabutan sesi melalui perubahan versi token.
- Pengelolaan secret melalui environment variables.
- Perlindungan data sensitif dari response dan log.

Logout mencabut sesi berdasarkan versi token sehingga token sebelumnya tidak dapat digunakan kembali.

## 11. Dokumentasi Pengujian

Hasil pengujian aktual disimpan dalam:

`docs/hasil-uji-chapter8.md`

Dokumen tersebut mencatat skenario pengujian, status HTTP, kode error, serta dampaknya terhadap database.

## 12. Struktur Proyek

```text
sisabaik-api/
├── database/
├── docs/
├── public/
│   ├── auth.html
│   ├── auth.css
│   ├── auth.js
│   ├── index.html
│   └── app.js
├── scripts/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── lib/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   └── services/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

