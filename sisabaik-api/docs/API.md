# Dokumentasi REST API SisaBaik

## 1. Informasi Umum

API ini dibuat untuk menghubungkan aplikasi SisaBaik dengan database PostgreSQL. API dijalankan secara lokal untuk keperluan praktikum Chapter 7.

- Base URL: `http://127.0.0.1:3000`
- Database: `sisabaik_dev`
- Format data: JSON
- Header untuk POST dan PUT: `Content-Type: application/json`
- Autentikasi: belum tersedia.

## 2. Health Check

### GET `/api/health`

Endpoint ini digunakan untuk mengecek apakah server berjalan dan database bisa diakses.

Jika berhasil, API mengembalikan status HTTP `200 OK`. Contoh respons:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "database": "connected",
    "waktu": "CONTOH_WAKTU_DARI_SERVER"
  }
}
```

Waktu pada respons mengikuti waktu server saat request dilakukan.

## 3. API Penawaran

Endpoint penawaran digunakan untuk melihat, menambah, mengubah, dan menghapus data penawaran makanan.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/penawaran` | Menampilkan daftar penawaran |
| GET | `/api/penawaran/:id` | Menampilkan satu penawaran |
| POST | `/api/penawaran` | Menambahkan penawaran |
| PUT | `/api/penawaran/:id` | Mengubah penawaran |
| DELETE | `/api/penawaran/:id` | Menghapus penawaran |

### Query parameter

Daftar penawaran dapat dicari dan difilter menggunakan parameter berikut.

| Parameter | Kegunaan |
|---|---|
| `q` | Mencari nama penawaran atau nama usaha |
| `kategori` | Memilih kategori tertentu |
| `status` | Memilih status penawaran |
| `tersedia=true` | Menampilkan penawaran aktif, stok masih ada, dan belum kedaluwarsa |
| `page` | Menentukan halaman, default 1 |
| `limit` | Menentukan jumlah data per halaman, default 10 dan maksimum 50 |

Contoh penggunaan:

`/api/penawaran?q=roti&tersedia=true&page=1&limit=10`

### Data untuk POST dan PUT

Penambahan dan perubahan penawaran menggunakan field berikut:

- `penyediaId`: ID penyedia.
- `nama`: nama penawaran.
- `kategori`: kategori makanan.
- `hargaNormal`: harga normal dalam rupiah.
- `hargaPenawaran`: harga setelah diskon dalam rupiah.
- `stok`: jumlah stok.
- `satuan`: satuan produk.
- `status`: status penawaran.
- `berakhirPada`: waktu berakhir penawaran dalam format ISO 8601 dengan zona waktu.

Harga dan stok harus dikirim sebagai angka integer. ID dikirim sebagai string. Harga penawaran tidak boleh lebih besar daripada harga normal.

Contoh request:

```json
{
  "penyediaId": "1",
  "nama": "Roti latihan",
  "kategori": "roti",
  "hargaNormal": 10000,
  "hargaPenawaran": 5000,
  "stok": 2,
  "satuan": "paket",
  "status": "aktif",
  "berakhirPada": "2027-01-01T08:00:00.000Z"
}
```

Tanggal tersebut hanya contoh. Saat melakukan pengujian, gunakan tanggal yang masih berada di masa depan.

Untuk PUT, seluruh field yang diperlukan harus dikirim kembali. ID penawaran diambil dari URL dan penyedia pemilik penawaran tidak dapat diganti.

Jika penawaran masih memiliki riwayat pesanan, penghapusan dapat ditolak oleh API.

## 4. API Pesanan

Endpoint pesanan digunakan untuk melihat daftar pesanan, melihat detail pesanan, dan membuat pesanan baru.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/pesanan` | Menampilkan daftar pesanan |
| GET | `/api/pesanan/:id` | Menampilkan detail pesanan |
| POST | `/api/pesanan` | Membuat pesanan baru |

Daftar pesanan mendukung parameter `page` dan `limit` untuk membatasi jumlah data yang ditampilkan.

### Data untuk membuat pesanan

Contoh request:

```json
{
  "emailPembeli": "siti.pembeli@example.test",
  "items": [
    {
      "penawaranId": "1",
      "kuantitas": 1
    }
  ]
}
```

Email harus sesuai dengan akun pembeli aktif yang tersedia di database. Email ini digunakan untuk mencari akun pembeli, bukan untuk login.

Beberapa aturan saat membuat pesanan:

- Satu pesanan hanya boleh berisi penawaran dari satu penyedia.
- Setiap penawaran harus memiliki stok yang cukup.
- Jumlah barang harus berupa integer dari 1 sampai 1000.
- Satu ID penawaran tidak boleh dimasukkan berulang dalam pesanan yang sama.
- Pengurangan stok dan penyimpanan pesanan dilakukan dalam transaksi database.
- Harga pada detail pesanan disimpan sesuai harga saat pesanan dibuat, sehingga perubahan harga penawaran berikutnya tidak mengubah riwayat harga tersebut.

Jika proses gagal, perubahan pesanan dan stok dalam transaksi dibatalkan.

## 5. Format Respons

Jika request berhasil, API menggunakan format respons berikut:

```json
{
  "success": true,
  "data": {}
}
```

Jika terjadi kesalahan, respons berisi kode dan pesan error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input tidak valid."
  }
}
```

Contoh di atas menunjukkan bentuk respons. Kode dan pesan sebenarnya mengikuti kesalahan yang terjadi.

Untuk endpoint yang menampilkan daftar data, respons juga menyertakan metadata pagination:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "jumlah": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

ID dikembalikan sebagai string, sedangkan harga menggunakan integer rupiah. Waktu menggunakan format ISO 8601. Jika penghapusan berhasil, API mengembalikan `204 No Content` tanpa body.

## 6. Status HTTP

| Status | Keterangan |
|---|---|
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 204 | Data berhasil dihapus tanpa response body |
| 400 | Request atau input tidak valid |
| 404 | Data tidak ditemukan |
| 409 | Terjadi konflik, misalnya stok tidak cukup atau penawaran berasal dari penyedia berbeda |
| 413 | Ukuran payload terlalu besar |
| 415 | Format Content-Type tidak sesuai |
| 500 | Terjadi kesalahan pada server |
| 503 | Database atau layanan terkait tidak tersedia |

Beberapa kode error yang digunakan dalam pengujian antara lain `INVALID_JSON`, `JSON_REQUIRED`, `PAYLOAD_TOO_LARGE`, `OFFER_NOT_FOUND`, `BUYER_NOT_FOUND`, `MIXED_PROVIDER`, `INSUFFICIENT_STOCK`, dan `TRANSACTION_BUSY`. Kode tersebut perlu dicocokkan dengan implementasi aktual.

## 7. Batasan API

API ini masih digunakan untuk praktikum lokal dan belum memiliki autentikasi maupun otorisasi. Fitur pembayaran dan bukti pengambilan produk juga belum tersedia.

Server tidak boleh dibuka ke jaringan publik tanpa pengamanan tambahan. File `.env` yang berisi konfigurasi database lokal tidak boleh diunggah ke repository.
