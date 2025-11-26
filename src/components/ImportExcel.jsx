import { useState } from 'react'
import * as XLSX from 'xlsx'
import styles from '../styles/ImportExcel.module.css'

function ImportExcel({ onImport, onAddProduk, produk }) {
  const [showProdukForm, setShowProdukForm] = useState(false)
  const [produkForm, setProdukForm] = useState({
    nama: '',
    kategori: '',
    harga: ''
  })

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet)

        const formattedData = jsonData.map(row => ({
          namaProduk: row['Nama Produk'] || row['namaProduk'] || row['Nama'] || '',
          kategori: row['Kategori'] || row['kategori'] || '',
          jumlah: parseInt(row['Jumlah'] || row['jumlah'] || row['Qty'] || 0),
          harga: parseFloat(row['Harga'] || row['harga'] || row['Price'] || 0),
          bulan: row['Bulan'] || row['bulan'] || row['Month'] || new Date().toLocaleString('id-ID', { month: 'long' }),
          tanggal: row['Tanggal'] || row['tanggal'] || row['Date'] || new Date().toISOString().split('T')[0]
        })).filter(item => item.namaProduk && item.jumlah > 0)

        if (formattedData.length > 0) {
          onImport(formattedData)
        }
      } catch (error) {
        alert('Error membaca file Excel: ' + error.message)
      }
    }
    reader.readAsArrayBuffer(file)
    e.target.value = ''
  }

  const handleSubmitProduk = (e) => {
    e.preventDefault()
    if (!produkForm.nama || !produkForm.kategori || !produkForm.harga) {
      alert('Semua field harus diisi')
      return
    }
    onAddProduk({
      nama: produkForm.nama,
      kategori: produkForm.kategori,
      harga: parseFloat(produkForm.harga)
    })
    setProdukForm({ nama: '', kategori: '', harga: '' })
    setShowProdukForm(false)
  }

  return (
    <div className={styles.importSection}>
      <div className={styles.importControls}>
        <label className={styles.fileInputLabel}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className={styles.fileInput}
          />
          📁 Import dari Excel
        </label>

        <button
          className={styles.btnSecondary}
          onClick={() => setShowProdukForm(!showProdukForm)}
        >
          {showProdukForm ? '✕ Batal' : '+ Tambah Produk'}
        </button>
      </div>

      {showProdukForm && (
        <form className={styles.produkForm} onSubmit={handleSubmitProduk}>
          <input
            type="text"
            placeholder="Nama Produk"
            value={produkForm.nama}
            onChange={(e) => setProdukForm({ ...produkForm, nama: e.target.value })}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Kategori"
            value={produkForm.kategori}
            onChange={(e) => setProdukForm({ ...produkForm, kategori: e.target.value })}
            className={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Harga"
            value={produkForm.harga}
            onChange={(e) => setProdukForm({ ...produkForm, harga: e.target.value })}
            className={styles.input}
            min="0"
            step="1000"
            required
          />
          <button type="submit" className={styles.btnPrimary}>Simpan Produk</button>
        </form>
      )}
    </div>
  )
}

export default ImportExcel

