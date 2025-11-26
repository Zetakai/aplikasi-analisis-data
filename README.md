# Aplikasi Analisis Data Penjualan

Aplikasi web untuk menganalisis data penjualan dengan fitur import Excel, CRUD data, dan statistik penjualan.

## Fitur Utama

1. **Import Data dari Excel** - Upload file Excel dan otomatis memproses data penjualan
2. **Manajemen Data** - Tambah, edit, dan hapus data penjualan
3. **Pencarian & Filter** - Cari dan filter data berdasarkan berbagai kriteria
4. **Analisis Statistik** - Hitung total penjualan, rata-rata, dan statistik lainnya

## Teknologi

- React 18
- Vite
- XLSX (untuk parsing Excel)
- CSS Modules

## Instalasi

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Project

```
src/
├── components/          # Komponen React modular
│   ├── Header.jsx
│   ├── Dashboard.jsx
│   ├── ImportExcel.jsx
│   ├── FormPenjualan.jsx
│   └── DataTable.jsx
├── utils/               # Utility functions
│   └── statistics.js
├── styles/              # CSS modules
│   ├── index.css
│   ├── App.module.css
│   ├── Header.module.css
│   ├── Dashboard.module.css
│   ├── ImportExcel.module.css
│   ├── FormPenjualan.module.css
│   └── DataTable.module.css
├── App.jsx              # Komponen utama
└── main.jsx             # Entry point
```

## Format Excel untuk Import

File Excel harus memiliki kolom berikut (nama kolom bisa bervariasi):
- **Nama Produk** / namaProduk / Nama
- **Kategori** / kategori
- **Jumlah** / jumlah / Qty
- **Harga** / harga / Price
- **Bulan** / bulan / Month (opsional)
- **Tanggal** / tanggal / Date (opsional)

Contoh format:
| Nama Produk | Kategori | Jumlah | Harga | Bulan | Tanggal |
|-------------|----------|--------|-------|-------|---------|
| Laptop ASUS | Elektronik | 5 | 8000000 | Januari | 2024-01-15 |
| Mouse Logitech | Elektronik | 20 | 250000 | Februari | 2024-02-10 |

## Fitur Aplikasi

### 1. Dashboard Statistik
- Total penjualan
- Rata-rata per transaksi
- Total unit terjual
- Jumlah transaksi
- Penjualan tertinggi
- Penjualan terendah

### 2. Manajemen Data
- Tambah data penjualan baru
- Edit data yang sudah ada
- Hapus data dengan konfirmasi
- Form dengan validasi lengkap

### 3. Filter & Pencarian
- Pencarian berdasarkan nama produk atau kategori
- Filter berdasarkan kategori
- Filter berdasarkan bulan
- Reset filter

### 4. Import Excel
- Upload file .xlsx atau .xls
- Otomatis memproses dan menambahkan data
- Tambah produk baru untuk referensi

## UX Research

### Target Pengguna
- Manajer penjualan yang perlu menganalisis data penjualan
- Staf administrasi yang mengelola data transaksi
- Pemilik bisnis kecil yang ingin tracking penjualan

### Persona
**Budi, 35 tahun - Manajer Penjualan**
- Menggunakan aplikasi untuk menganalisis performa penjualan bulanan
- Perlu melihat statistik cepat dan filter data berdasarkan kategori
- Sering import data dari Excel yang dikirim tim

### User Tasks
1. Import data penjualan dari file Excel yang diterima dari tim
2. Melihat statistik penjualan secara keseluruhan dan per kategori
3. Menambah atau mengedit data penjualan manual jika ada transaksi baru
4. Mencari data penjualan tertentu berdasarkan produk atau periode
5. Menghapus data yang salah atau duplikat

## Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

