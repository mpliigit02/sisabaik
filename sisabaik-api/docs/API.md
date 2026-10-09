
# Dokumentasi REST API SisaBaik

## 1. Informasi Umum

- Base URL: `http://127.0.0.1:3000`
- Format respons: JSON
- Database: PostgreSQL (`sisabaik_dev`)
- Header untuk POST dan PUT: `Content-Type: application/json`
- API hanya untuk praktikum lokal dan belum memiliki autentikasi.

## 2. Health Check

### GET `/api/health`

Memeriksa koneksi server dan database.

Respons sukses: `200 OK`

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "database": "connected",
    "waktu": "2026-10-09T08:00:00.000Z"
  }
}
```

## 3. Endpoint Penawaran

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/penawaran` | Daftar penawaran |
| GET | `/api/penawaran/:id` | Detail penawaran |
| POST | `/api/penawaran` | Membuat penawaran |
| PUT | `/api/penawaran/:id` | Memperbarui penawaran |
| DELETE | `/api/penawaran/:id` | Menghapus penawaran |

### Query parameter GET `/api/penawaran`

| Parameter | Keterangan |
|---|---|
| `q` | Pencarian nama penawaran atau nama usaha |
| `kategori` | Filter kategori |
| `status` | Filter status |
| `tersedia=true` | Hanya penawaran aktif, stok positif, dan belum kedaluwarsa |
| `page` | Nomor halaman, default 1 |
| `limit` | Jumlah data, default 10, maksimum 50 |

Contoh:

`/api/penawaran?q=roti&tersedia=true&page=1&limit=10`

### Payload POST dan PUT penawaran

Field yang didukung:

- `penyediaId`: ID penyedia dalam bentuk string digit.
- `nama`: nama penawaran.
- `kategori`: kategori penawaran.
- `hargaNormal`: harga normal dalam rupiah.
- `hargaPenawaran`: harga penawaran dalam rupiah.
- `stok`: stok berupa integer.
- `satuan`: satuan produk.
- `status`: status penawaran yang diizinkan.
- `berakhirPada`: waktu berakhir dalam format ISO 8601 dengan zona waktu.

`PUT` menggunakan payload lengkap. ID dan penyedia tidak dapat diganti melalui pembaruan.

Contoh payload:

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
  "berakhirPada": "2026-10-10T08:00:00.000Z"
}
```

Contoh tersebut hanya ilustrasi. Waktu berakhir harus berada di masa depan saat request dilakukan.

## 4. Endpoint Pesanan

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/pesanan` | Daftar ringkasan pesanan |
| GET | `/api/pesanan/:id` | Detail pesanan |
| POST | `/api/pesanan` | Membuat pesanan |

Endpoint daftar pesanan mendukung `page` dan `limit`.

### Payload POST pesanan

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

Email harus cocok dengan akun pembeli fiktif yang aktif di database. Email bukan bukti autentikasi.

Aturan pesanan:

- Satu pesanan hanya boleh berasal dari satu penyedia.
- Setiap item harus tersedia dan memiliki stok yang cukup.
- Kuantitas harus valid.
- Stok diperbarui dalam transaksi database.
- Harga satuan disimpan sebagai snapshot saat pemesanan.
- Total transaksi dihitung dari detail pesanan.

## 5. Format Respons

Respons sukses:

```json
{
  "success": true,
  "data": {}
}
```

Respons gagal:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input tidak valid."
  }
}
```

Respons koleksi menambahkan metadata:

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

ID dikirim sebagai string untuk menjaga presisi. Penghapusan yang berhasil menggunakan `204 No Content` tanpa body.

## 6. Status HTTP

| Status | Makna |
|---|---|
| 200 | Request berhasil |
| 201 | Resource baru dibuat |
| 204 | Penghapusan berhasil tanpa body |
| 400 | Input atau JSON tidak valid |
| 404 | Resource tidak ditemukan |
| 409 | Konflik stok, relasi, atau state |
| 413 | Payload terlalu besar |
| 415 | Content-Type tidak didukung |
| 500 | Kesalahan internal server |
| 503 | Database tidak tersedia |

Kode error penting mencakup `INVALID_JSON`, `JSON_REQUIRED`, `PAYLOAD_TOO_LARGE`, `OFFER_NOT_FOUND`, `BUYER_NOT_FOUND`, `MIXED_PROVIDER`, `INSUFFICIENT_STOCK`, dan `TRANSACTION_BUSY`.

## 7. Batasan

API ini merupakan aplikasi praktikum lokal. API belum menyediakan autentikasi, otorisasi, pembayaran, atau bukti pengambilan produk. Jangan mengekspos server ini ke jaringan publik.
