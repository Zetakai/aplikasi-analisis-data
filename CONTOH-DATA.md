# Contoh Data Excel untuk Import

File ini berisi contoh data yang bisa digunakan untuk testing aplikasi analisis data penjualan.

## Format File Excel

File Excel harus memiliki kolom berikut (nama kolom bisa bervariasi):

| Kolom | Nama Alternatif | Contoh |
|-------|----------------|--------|
| Nama Produk | namaProduk, Nama | Laptop ASUS ROG |
| Kategori | kategori | Elektronik |
| Jumlah | jumlah, Qty | 5 |
| Harga | harga, Price | 12000000 |
| Bulan | bulan, Month | Januari |
| Tanggal | tanggal, Date | 2024-01-15 |

## Contoh Data

### Data Penjualan Elektronik

| Nama Produk | Kategori | Jumlah | Harga | Bulan | Tanggal |
|-------------|----------|--------|-------|-------|---------|
| Laptop ASUS ROG | Elektronik | 5 | 12000000 | Januari | 2024-01-15 |
| Mouse Logitech MX Master | Elektronik | 20 | 850000 | Januari | 2024-01-20 |
| Keyboard Mechanical | Elektronik | 15 | 1500000 | Januari | 2024-01-25 |
| Monitor LG 27 inch | Elektronik | 8 | 3500000 | Februari | 2024-02-10 |
| Webcam Logitech C920 | Elektronik | 12 | 1200000 | Februari | 2024-02-15 |
| Headset SteelSeries | Elektronik | 10 | 2500000 | Februari | 2024-02-20 |
| Kabel USB-C | Elektronik | 35 | 75000 | Juni | 2024-06-01 |
| Power Bank 20000mAh | Elektronik | 18 | 450000 | Juni | 2024-06-05 |
| Kabel HDMI | Elektronik | 22 | 150000 | Juni | 2024-06-10 |

### Data Penjualan Furnitur

| Nama Produk | Kategori | Jumlah | Harga | Bulan | Tanggal |
|-------------|----------|--------|-------|-------|---------|
| Meja Kerja Minimalis | Furnitur | 3 | 2500000 | Maret | 2024-03-05 |
| Kursi Ergonomis | Furnitur | 5 | 3500000 | Maret | 2024-03-10 |
| Lampu Meja LED | Furnitur | 25 | 350000 | Maret | 2024-03-15 |

### Data Penjualan Buku

| Nama Produk | Kategori | Jumlah | Harga | Bulan | Tanggal |
|-------------|----------|--------|-------|-------|---------|
| Buku Programming JavaScript | Buku | 30 | 150000 | April | 2024-04-01 |
| Buku React Complete Guide | Buku | 25 | 200000 | April | 2024-04-05 |
| Buku CSS Mastery | Buku | 20 | 175000 | April | 2024-04-10 |

### Data Penjualan Alat Tulis

| Nama Produk | Kategori | Jumlah | Harga | Bulan | Tanggal |
|-------------|----------|--------|-------|-------|---------|
| Notebook A4 100 lembar | Alat Tulis | 50 | 25000 | Mei | 2024-05-01 |
| Pulpen Pilot G2 | Alat Tulis | 100 | 15000 | Mei | 2024-05-05 |
| Stabilo Highlighter | Alat Tulis | 40 | 12000 | Mei | 2024-05-10 |

## Cara Menggunakan

1. Buka file `contoh-data-penjualan.csv` di Excel atau Google Sheets
2. Simpan sebagai file `.xlsx` atau `.xls`
3. Di aplikasi, klik tombol "📁 Import dari Excel"
4. Pilih file Excel yang sudah dibuat
5. Data akan otomatis terimport dan muncul di tabel

## Catatan

- Kolom **Bulan** dan **Tanggal** bersifat opsional
- Jika tidak ada, aplikasi akan menggunakan bulan dan tanggal saat ini
- Kolom **Jumlah** harus berupa angka positif
- Kolom **Harga** harus berupa angka positif
- Kolom **Nama Produk** dan **Kategori** wajib diisi

## Format Tanggal

Format tanggal yang didukung:
- `2024-01-15` (YYYY-MM-DD)
- `15/01/2024` (DD/MM/YYYY)
- Format tanggal Excel standar

## Format Bulan

Nama bulan dalam bahasa Indonesia:
- Januari, Februari, Maret, April, Mei, Juni
- Juli, Agustus, September, Oktober, November, Desember

