
# Hasil Pengujian Chapter 7 — SisaBaik API

## Informasi Pengujian

- Database: sisabaik_dev
- Server: http://127.0.0.1:3000
- Tanggal pengujian: [isi tanggal aktual]
- Branch: feature/rest-postgresql
- Commit yang diuji: [isi hash commit]
- Penguji: [isi nama]

## Ringkasan Hasil

| Skenario | Hasil aktual | Status |
|---|---|---|
| Health check | HTTP 200 | [isi] |
| Validasi query dan ID | HTTP 400/404 | [isi] |
| CRUD penawaran | Sesuai kontrak API | [isi] |
| Pencarian dan filter | Sesuai kontrak API | [isi] |
| Pesanan lintas penyedia | HTTP 409 | [isi] |
| Stok tidak mencukupi | HTTP 409 | [isi] |
| Pesanan valid | HTTP 201 | [isi] |
| Snapshot harga | Harga historis tetap | [isi] |
| JSON rusak | HTTP 400 | [isi] |
| Content-Type salah | HTTP 415 | [isi] |
| Payload terlalu besar | HTTP 413 | [isi] |
| Persistensi setelah restart | Data tetap tersedia | [isi] |
| Uji konkurensi stok satu | Satu 201 dan satu 409 | [isi] |

## Catatan

Tuliskan hasil aktual, ID pesanan uji, ID penawaran uji, kegagalan yang ditemukan, dan perbaikan yang dilakukan.

Jangan mencantumkan password atau isi file .env.
