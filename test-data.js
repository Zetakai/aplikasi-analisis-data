// Script untuk generate test data
// Buka browser console di aplikasi dan paste script ini

const testData = [
  {
    id: '1',
    namaProduk: 'Laptop ASUS ROG',
    kategori: 'Elektronik',
    jumlah: 5,
    harga: 12000000,
    bulan: 'Januari',
    tanggal: '2024-01-15'
  },
  {
    id: '2',
    namaProduk: 'Mouse Logitech MX Master',
    kategori: 'Elektronik',
    jumlah: 20,
    harga: 850000,
    bulan: 'Januari',
    tanggal: '2024-01-20'
  },
  {
    id: '3',
    namaProduk: 'Keyboard Mechanical',
    kategori: 'Elektronik',
    jumlah: 15,
    harga: 1500000,
    bulan: 'Januari',
    tanggal: '2024-01-25'
  },
  {
    id: '4',
    namaProduk: 'Monitor LG 27 inch',
    kategori: 'Elektronik',
    jumlah: 8,
    harga: 3500000,
    bulan: 'Februari',
    tanggal: '2024-02-10'
  },
  {
    id: '5',
    namaProduk: 'Webcam Logitech C920',
    kategori: 'Elektronik',
    jumlah: 12,
    harga: 1200000,
    bulan: 'Februari',
    tanggal: '2024-02-15'
  },
  {
    id: '6',
    namaProduk: 'Headset SteelSeries',
    kategori: 'Elektronik',
    jumlah: 10,
    harga: 2500000,
    bulan: 'Februari',
    tanggal: '2024-02-20'
  },
  {
    id: '7',
    namaProduk: 'Meja Kerja Minimalis',
    kategori: 'Furnitur',
    jumlah: 3,
    harga: 2500000,
    bulan: 'Maret',
    tanggal: '2024-03-05'
  },
  {
    id: '8',
    namaProduk: 'Kursi Ergonomis',
    kategori: 'Furnitur',
    jumlah: 5,
    harga: 3500000,
    bulan: 'Maret',
    tanggal: '2024-03-10'
  },
  {
    id: '9',
    namaProduk: 'Lampu Meja LED',
    kategori: 'Furnitur',
    jumlah: 25,
    harga: 350000,
    bulan: 'Maret',
    tanggal: '2024-03-15'
  },
  {
    id: '10',
    namaProduk: 'Buku Programming JavaScript',
    kategori: 'Buku',
    jumlah: 30,
    harga: 150000,
    bulan: 'April',
    tanggal: '2024-04-01'
  },
  {
    id: '11',
    namaProduk: 'Buku React Complete Guide',
    kategori: 'Buku',
    jumlah: 25,
    harga: 200000,
    bulan: 'April',
    tanggal: '2024-04-05'
  },
  {
    id: '12',
    namaProduk: 'Buku CSS Mastery',
    kategori: 'Buku',
    jumlah: 20,
    harga: 175000,
    bulan: 'April',
    tanggal: '2024-04-10'
  },
  {
    id: '13',
    namaProduk: 'Notebook A4 100 lembar',
    kategori: 'Alat Tulis',
    jumlah: 50,
    harga: 25000,
    bulan: 'Mei',
    tanggal: '2024-05-01'
  },
  {
    id: '14',
    namaProduk: 'Pulpen Pilot G2',
    kategori: 'Alat Tulis',
    jumlah: 100,
    harga: 15000,
    bulan: 'Mei',
    tanggal: '2024-05-05'
  },
  {
    id: '15',
    namaProduk: 'Stabilo Highlighter',
    kategori: 'Alat Tulis',
    jumlah: 40,
    harga: 12000,
    bulan: 'Mei',
    tanggal: '2024-05-10'
  },
  {
    id: '16',
    namaProduk: 'Kabel USB-C',
    kategori: 'Elektronik',
    jumlah: 35,
    harga: 75000,
    bulan: 'Juni',
    tanggal: '2024-06-01'
  },
  {
    id: '17',
    namaProduk: 'Power Bank 20000mAh',
    kategori: 'Elektronik',
    jumlah: 18,
    harga: 450000,
    bulan: 'Juni',
    tanggal: '2024-06-05'
  },
  {
    id: '18',
    namaProduk: 'Kabel HDMI',
    kategori: 'Elektronik',
    jumlah: 22,
    harga: 150000,
    bulan: 'Juni',
    tanggal: '2024-06-10'
  }
]

const testProduk = [
  {
    id: 'p1',
    nama: 'Laptop ASUS ROG',
    kategori: 'Elektronik',
    harga: 12000000
  },
  {
    id: 'p2',
    nama: 'Mouse Logitech MX Master',
    kategori: 'Elektronik',
    harga: 850000
  },
  {
    id: 'p3',
    nama: 'Meja Kerja Minimalis',
    kategori: 'Furnitur',
    harga: 2500000
  },
  {
    id: 'p4',
    nama: 'Buku Programming JavaScript',
    kategori: 'Buku',
    harga: 150000
  }
]

// Simpan ke localStorage
localStorage.setItem('penjualan', JSON.stringify(testData))
localStorage.setItem('produk', JSON.stringify(testProduk))

console.log('✅ Test data berhasil dimuat!')
console.log(`📊 ${testData.length} data penjualan`)
console.log(`📦 ${testProduk.length} data produk`)
console.log('🔄 Refresh halaman untuk melihat data')

