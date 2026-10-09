
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
