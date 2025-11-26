# Aplikasi Analisis Data Penjualan

Aplikasi web profesional untuk menganalisis data penjualan dengan fitur lengkap: import Excel, CRUD data, visualisasi chart interaktif, dan statistik real-time. Dilengkapi dengan dark/light mode untuk pengalaman yang nyaman.

## Fitur Utama

1. **Dashboard Interaktif** - Visualisasi data dengan berbagai chart (Line, Bar, Area, Pie)
2. **Import Data dari Excel** - Upload file Excel dan otomatis memproses data penjualan dengan parsing tanggal yang akurat
3. **Manajemen Data (CRUD)** - Tambah, edit, dan hapus data penjualan dengan validasi lengkap
4. **Hapus Semua Data** - Fitur untuk menghapus semua data sekaligus dengan konfirmasi
5. **Manajemen Produk** - Tambah produk terpisah untuk referensi saat input data
6. **Pencarian & Filter** - Cari dan filter data berdasarkan produk, kategori, dan bulan
7. **Analisis Statistik Real-time** - Total penjualan, rata-rata, growth rate, dan KPI lainnya
8. **Dark/Light Mode** - Toggle tema dengan preferensi tersimpan (dark mode default)
9. **Responsif** - Optimal di desktop, tablet, dan mobile

## Teknologi

- **React 18** - UI framework modern
- **Vite** - Build tool cepat
- **Recharts** - Library chart interaktif
- **XLSX** - Parsing file Excel
- **CSS Modules** - Styling terorganisir
- **LocalStorage** - Persistensi data

## Instalasi

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang ditampilkan di terminal)

## Struktur Project

```
src/
├── components/          # Komponen React modular
│   ├── Header.jsx       # Header dengan theme toggle
│   ├── Dashboard.jsx    # Dashboard dengan charts
│   ├── ImportExcel.jsx  # Import file Excel
│   ├── FormPenjualan.jsx # Form CRUD data
│   ├── DataTable.jsx    # Tabel data dengan filter
│   ├── ProdukForm.jsx   # Form tambah produk
│   └── Footer.jsx        # Footer dengan info developer
├── contexts/            # React Context
│   └── ThemeContext.jsx # Theme management (dark/light)
├── utils/               # Utility functions
│   └── statistics.js    # Kalkulasi statistik & chart data
├── styles/              # CSS modules dengan theme support
│   ├── index.css        # Global styles & theme variables
│   ├── App.module.css
│   ├── Header.module.css
│   ├── Dashboard.module.css
│   ├── ImportExcel.module.css
│   ├── FormPenjualan.module.css
│   ├── DataTable.module.css
│   ├── ProdukForm.module.css
│   └── Footer.module.css
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

## Fitur Aplikasi Detail

### 1. Dashboard Statistik & Visualisasi

**KPI Cards:**
- Total penjualan (dengan format currency Indonesia)
- Rata-rata per transaksi
- Total unit terjual
- Jumlah transaksi
- Penjualan tertinggi
- Penjualan terendah

**Charts Interaktif:**
- **Line Chart** - Tren penjualan bulanan dengan growth rate indicator
- **Bar Chart** - Penjualan per bulan (comparison)
- **Top 5 Produk** - Horizontal bar chart produk terlaris
- **Area Chart** - Tren penjualan per kategori (stacked)
- **Pie Chart** - Komposisi penjualan per kategori

**Fitur Chart:**
- Responsif dan interaktif
- Tooltip dengan format currency
- Auto-update saat data berubah
- Filter-aware (chart mengikuti filter)

### 2. Manajemen Data (CRUD)

- **Tambah Data** - Form dengan validasi lengkap
  - Input: text, number, select, date
  - Auto-fill dari produk yang sudah ada
  - Validasi: field wajib, angka positif
  
- **Edit Data** - Update data yang sudah ada
  - Pre-filled form dengan data existing
  - Real-time update statistik & chart
  
- **Hapus Data** - Dengan konfirmasi
  - Konfirmasi sebelum hapus per item
  - Auto-update setelah hapus
  
- **Hapus Semua Data** - Hapus semua data sekaligus
  - Konfirmasi dengan jumlah item yang akan dihapus
  - Tindakan tidak dapat dibatalkan
  - Tombol hanya muncul jika ada data

- **Manajemen Produk** - Tambah produk terpisah
  - Form khusus untuk menambah produk
  - Produk otomatis muncul di dropdown saat input penjualan
  - Produk dari data import juga ditambahkan otomatis

### 3. Filter & Pencarian

- **Search Box** - Pencarian real-time
  - Cari berdasarkan nama produk
  - Cari berdasarkan kategori
  
- **Filter Kategori** - Dropdown filter
  - Filter berdasarkan kategori produk
  - Auto-populate dari data yang ada
  
- **Filter Bulan** - Dropdown filter
  - Filter berdasarkan bulan transaksi
  - 12 bulan tersedia
  
- **Reset Filter** - Clear semua filter sekaligus

### 4. Import Excel

- **Format Support** - .xlsx dan .xls
- **Auto Mapping** - Deteksi kolom otomatis
  - Mendukung variasi nama kolom
  - Validasi data sebelum import
- **Parsing Tanggal Cerdas** - Parsing tanggal Excel yang akurat
  - Mendukung Excel serial date format
  - Mendukung berbagai format tanggal string
  - Auto-format ke YYYY-MM-DD
- **Batch Import** - Import banyak data sekaligus
- **Auto Tambah Produk** - Produk dari import otomatis ditambahkan ke daftar produk

### 5. Dark/Light Mode

- **Theme Toggle** - Tombol di header
- **Dark Mode Default** - Tema gelap sebagai default
- **Preferensi Tersimpan** - Setting tersimpan di localStorage
- **Smooth Transition** - Animasi transisi tema
- **Full Theme Support** - Semua komponen mendukung kedua tema

## Desain & UX

### Color Palette
- **Primary**: Blue (#3b82f6) dengan gradient ke Cyan dan Teal
- **Accent**: Cyan (#06b6d4) dan Teal (#14b8a6)
- **Gradient Header**: Animated gradient dari Dark Blue ke Cyan
- **Dark Theme**: Slate dark dengan subtle gradients
- **Light Theme**: Clean white dengan soft colors

### Layout
- **Landscape Dashboard** - Layout horizontal untuk chart
- **Grid System** - Responsif dengan CSS Grid & Flexbox
- **Modern UI** - Clean, professional, tidak terlihat AI-generated

## UX Research

### Target Pengguna
- Manajer penjualan yang perlu menganalisis data penjualan
- Staf administrasi yang mengelola data transaksi
- Pemilik bisnis kecil yang ingin tracking penjualan
- Analis data yang butuh visualisasi cepat

### Persona
**Budi, 35 tahun - Manajer Penjualan**
- Menggunakan aplikasi untuk menganalisis performa penjualan bulanan
- Perlu melihat statistik cepat dan filter data berdasarkan kategori
- Sering import data dari Excel yang dikirim tim
- Butuh visualisasi chart untuk presentasi

### User Tasks
1. Import data penjualan dari file Excel yang diterima dari tim
2. Melihat statistik penjualan secara keseluruhan dan per kategori
3. Menganalisis tren penjualan dengan chart interaktif
4. Menambah produk baru untuk referensi saat input data
5. Menambah atau mengedit data penjualan manual jika ada transaksi baru
6. Mencari data penjualan tertentu berdasarkan produk atau periode
7. Menghapus data yang salah atau duplikat (per item atau semua sekaligus)
8. Switch antara dark/light mode sesuai preferensi

## Penggunaan

### Development

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang ditampilkan di terminal)

### Production Build

```bash
npm run build
npm run preview
```

File hasil build akan ada di folder `dist/`

## Testing

### Load Test Data

1. Buka browser console (F12)
2. Copy paste isi file `test-data.js`
3. Refresh halaman
4. Data akan muncul di aplikasi

Atau import file `contoh-data-penjualan.csv` (convert ke .xlsx dulu)

## KPI yang Diukur

- **Total Revenue** - Total penjualan keseluruhan
- **Sales Growth Rate** - Persentase pertumbuhan (MoM)
- **Average Deal Size** - Rata-rata nilai transaksi
- **Top Performing Products** - Produk terlaris
- **Category Performance** - Performa per kategori
- **Revenue Distribution** - Distribusi penjualan

## Responsif

Aplikasi fully responsive dengan breakpoints:
- **Desktop**: > 1200px (Full layout dengan grid 2 kolom)
- **Tablet**: 768px - 1200px (Layout menyesuaikan)
- **Mobile**: < 768px (Single column, optimized touch)

## Data Persistence

Data disimpan di browser localStorage:
- Data penjualan tersimpan otomatis
- Data produk tersimpan otomatis
- Preferensi theme tersimpan
- Data tetap ada setelah refresh

## Developer

**Muhammad Farid Zaki**

- GitHub: [@Zetakai](https://github.com/Zetakai)
- LinkedIn: [mfzaki](https://www.linkedin.com/in/mfzaki/)

## License

MIT License - bebas digunakan untuk project pribadi atau komersial

