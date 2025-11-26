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

    // Validate file type
    const validExtensions = ['.xlsx', '.xls']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    if (!validExtensions.includes(fileExtension)) {
      alert('Format file tidak didukung. Silakan gunakan file .xlsx atau .xls')
      e.target.value = ''
      return
    }

    const reader = new FileReader()
    
    reader.onerror = () => {
      alert('Error membaca file. Pastikan file tidak rusak dan dapat dibaca.')
      e.target.value = ''
    }

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
        
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          alert('File Excel tidak memiliki sheet. Pastikan file memiliki data.')
          e.target.value = ''
          return
        }

        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        
        // Convert to JSON - dates will be Date objects when cellDates is true
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
          raw: true, // Get raw values (dates will be Date objects or numbers)
          defval: null // Default value for empty cells
        })

        if (!jsonData || jsonData.length === 0) {
          alert('File Excel tidak memiliki data. Pastikan ada data di sheet pertama.')
          e.target.value = ''
          return
        }

        // Log first row to help debug column mapping
        console.log('Sample row from Excel:', jsonData[0])
        console.log('Total rows in Excel:', jsonData.length)

        const formattedData = jsonData.map((row, index) => {
          // Get date value - try multiple column names
          const dateValue = row['Tanggal'] || row['tanggal'] || row['Date'] || row['TANGGAL'] || row['DATE']
          
          // Try multiple column name variations
          const namaProduk = row['Nama Produk'] || row['namaProduk'] || row['Nama'] || row['NAMA'] || row['nama'] || row['Produk'] || row['produk'] || ''
          const kategori = row['Kategori'] || row['kategori'] || row['CATEGORY'] || row['Category'] || ''
          const jumlah = parseInt(row['Jumlah'] || row['jumlah'] || row['Qty'] || row['qty'] || row['QUANTITY'] || row['Quantity'] || 0)
          const harga = parseFloat(row['Harga'] || row['harga'] || row['Price'] || row['price'] || row['PRICE'] || 0)
          const bulan = row['Bulan'] || row['bulan'] || row['Month'] || row['MONTH'] || new Date().toLocaleString('id-ID', { month: 'long' })
          
          return {
            namaProduk,
            kategori,
            jumlah,
            harga,
            bulan,
            tanggal: parseExcelDate(dateValue)
          }
        })

        // Filter out invalid rows but keep track
        const validData = formattedData.filter(item => {
          const hasNama = item.namaProduk && item.namaProduk.trim() !== ''
          const hasJumlah = !isNaN(item.jumlah) && item.jumlah > 0
          return hasNama && hasJumlah
        })

        const invalidCount = formattedData.length - validData.length

        if (validData.length === 0) {
          alert(`Tidak ada data valid yang dapat diimport.\n\n` +
                 `Total baris: ${formattedData.length}\n` +
                 `Pastikan file memiliki kolom: Nama Produk, Jumlah (dan Harga, Kategori jika ada).\n\n` +
                 `Kolom yang ditemukan: ${Object.keys(jsonData[0] || {}).join(', ')}`)
          e.target.value = ''
          return
        }

        if (invalidCount > 0) {
          console.warn(`${invalidCount} baris diabaikan karena tidak valid (nama produk atau jumlah kosong/0)`)
        }

        console.log(`Importing ${validData.length} valid rows out of ${formattedData.length} total rows`)
        
        onImport(validData)
        
        if (invalidCount > 0) {
          alert(`${validData.length} data berhasil diimport.\n${invalidCount} baris diabaikan karena tidak valid.`)
        }
      } catch (error) {
        console.error('Error importing Excel:', error)
        alert('Error membaca file Excel:\n' + error.message + '\n\nPastikan file format Excel valid (.xlsx atau .xls)')
        e.target.value = ''
      }
    }
    
    reader.readAsArrayBuffer(file)
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

