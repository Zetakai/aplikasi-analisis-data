import { useState } from 'react'
import * as XLSX from 'xlsx'
import styles from '../styles/ImportExcel.module.css'

function ImportExcel({ onImport, produk }) {

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

  return (
    <label className={styles.fileInputLabel}>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      Import dari Excel
    </label>
  )
}

export default ImportExcel

