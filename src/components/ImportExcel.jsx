import { useState } from 'react'
import * as XLSX from 'xlsx'
import styles from '../styles/ImportExcel.module.css'

function ImportExcel({ onImport, produk }) {

  // Helper function to parse Excel date
  const parseExcelDate = (dateValue) => {
    if (!dateValue && dateValue !== 0) {
      return new Date().toISOString().split('T')[0]
    }

    // If it's already a string in YYYY-MM-DD format
    if (typeof dateValue === 'string') {
      // Check if it's already in YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue
      }
      // Try to parse common date formats
      const date = new Date(dateValue)
      if (!isNaN(date.getTime()) && date.getFullYear() > 1900) {
        return date.toISOString().split('T')[0]
      }
    }

    // If it's a number (Excel serial date), convert it
    if (typeof dateValue === 'number') {
      // Excel serial date: days since January 1, 1900
      // Excel incorrectly treats 1900 as a leap year, so we adjust
      const excelEpoch = new Date(1899, 11, 30) // December 30, 1899
      const date = new Date(excelEpoch.getTime() + (dateValue - 1) * 24 * 60 * 60 * 1000)
      if (!isNaN(date.getTime()) && date.getFullYear() > 1900) {
        return date.toISOString().split('T')[0]
      }
    }

    // If it's a Date object
    if (dateValue instanceof Date) {
      if (!isNaN(dateValue.getTime()) && dateValue.getFullYear() > 1900) {
        return dateValue.toISOString().split('T')[0]
      }
    }

    // Default to today's date
    return new Date().toISOString().split('T')[0]
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result)
        // Read Excel file
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: true, // Enable date parsing - converts Excel dates to JS Date objects
          cellNF: false,
          cellText: false
        })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        // Convert to JSON - dates will be Date objects when cellDates is true
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          raw: true, // Get raw values (dates will be Date objects or numbers)
          defval: null // Default value for empty cells
        })

        const formattedData = jsonData.map(row => {
          // Get date value - try multiple column names
          const dateValue = row['Tanggal'] || row['tanggal'] || row['Date'] || row['TANGGAL']
          
          return {
            namaProduk: row['Nama Produk'] || row['namaProduk'] || row['Nama'] || '',
            kategori: row['Kategori'] || row['kategori'] || '',
            jumlah: parseInt(row['Jumlah'] || row['jumlah'] || row['Qty'] || 0),
            harga: parseFloat(row['Harga'] || row['harga'] || row['Price'] || 0),
            bulan: row['Bulan'] || row['bulan'] || row['Month'] || new Date().toLocaleString('id-ID', { month: 'long' }),
            tanggal: parseExcelDate(dateValue)
          }
        }).filter(item => item.namaProduk && item.jumlah > 0)

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

