import { useState, useEffect } from 'react'
import styles from '../styles/FormPenjualan.module.css'

function FormPenjualan({ produk, penjualan, editingItem, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    namaProduk: '',
    kategori: '',
    jumlah: '',
    harga: '',
    bulan: new Date().toLocaleString('id-ID', { month: 'long' }),
    tanggal: new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors] = useState({})

  // Helper function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return new Date().toISOString().split('T')[0]
    
    // If it's already in YYYY-MM-DD format, return as is
    if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      return dateValue
    }
    
    // Try to parse the date
    try {
      const date = new Date(dateValue)
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]
      }
    } catch (e) {
      // If parsing fails, return today's date
    }
    
    return new Date().toISOString().split('T')[0]
  }

  useEffect(() => {
    if (editingItem) {
      setFormData({
        namaProduk: editingItem.namaProduk || '',
        kategori: editingItem.kategori || '',
        jumlah: editingItem.jumlah || '',
        harga: editingItem.harga || '',
        bulan: editingItem.bulan || new Date().toLocaleString('id-ID', { month: 'long' }),
        tanggal: formatDateForInput(editingItem.tanggal)
      })
      setErrors({})
    } else {
      setFormData({
        namaProduk: '',
        kategori: '',
        jumlah: '',
        harga: '',
        bulan: new Date().toLocaleString('id-ID', { month: 'long' }),
        tanggal: new Date().toISOString().split('T')[0]
      })
      setErrors({})
    }
  }, [editingItem])

  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  // Helper function to get month name from date string
  const getMonthFromDate = (dateString) => {
    if (!dateString) return new Date().toLocaleString('id-ID', { month: 'long' })
    try {
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return date.toLocaleString('id-ID', { month: 'long' })
      }
    } catch (e) {
      // If parsing fails, return current month
    }
    return new Date().toLocaleString('id-ID', { month: 'long' })
  }

  const kategoriFromProduk = produk.map(p => p.kategori).filter(Boolean)
  const kategoriFromPenjualan = penjualan.map(p => p.kategori).filter(Boolean)
  const kategoriOptions = [...new Set([...kategoriFromProduk, ...kategoriFromPenjualan])]

  const validate = () => {
    const newErrors = {}
    if (!formData.namaProduk.trim()) newErrors.namaProduk = 'Nama produk wajib diisi'
    if (!formData.kategori.trim()) newErrors.kategori = 'Kategori wajib diisi'
    if (!formData.jumlah || parseInt(formData.jumlah) <= 0) {
      newErrors.jumlah = 'Jumlah harus lebih dari 0'
    }
    if (!formData.harga || parseFloat(formData.harga) <= 0) {
      newErrors.harga = 'Harga harus lebih dari 0'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      ...formData,
      id: editingItem?.id,
      jumlah: parseInt(formData.jumlah),
      harga: parseFloat(formData.harga)
    }
    onSubmit(data)
  }

  const handleProdukChange = (namaProduk) => {
    const selectedProduk = produk.find(p => p.nama === namaProduk)
    const penjualanItem = penjualan.find(p => p.namaProduk === namaProduk)
    
    setFormData({
      ...formData,
      namaProduk,
      kategori: selectedProduk?.kategori || penjualanItem?.kategori || formData.kategori,
      harga: selectedProduk?.harga || penjualanItem?.harga || formData.harga
    })
  }

  return (
    <div className={styles.formOverlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formHeader}>
          <h3>{editingItem ? 'Edit Data Penjualan' : 'Tambah Data Penjualan'}</h3>
          <button type="button" onClick={onCancel} className={styles.closeBtn}>✕</button>
        </div>

        <div className={styles.formGroup}>
          <label>Nama Produk</label>
          {(() => {
            const produkNamesFromPenjualan = [...new Set(penjualan.map(p => p.namaProduk).filter(Boolean))]
            const allProdukNames = [...new Set([...produk.map(p => p.nama), ...produkNamesFromPenjualan])]
            
            // Always use dropdown (select)
            return (
              <select
                value={formData.namaProduk}
                onChange={(e) => handleProdukChange(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Pilih Produk</option>
                {allProdukNames.map(nama => (
                  <option key={nama} value={nama}>{nama}</option>
                ))}
              </select>
            )
          })()}
          {errors.namaProduk && <span className={styles.error}>{errors.namaProduk}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Kategori</label>
          <select
            value={formData.kategori}
            onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
            className={styles.select}
            required
          >
            <option value="">Pilih Kategori</option>
            {kategoriOptions.map(kat => (
              <option key={kat} value={kat}>{kat}</option>
            ))}
          </select>
          {errors.kategori && <span className={styles.error}>{errors.kategori}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Jumlah</label>
            <input
              type="number"
              value={formData.jumlah}
              onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
              className={styles.input}
              min="1"
              required
            />
            {errors.jumlah && <span className={styles.error}>{errors.jumlah}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Harga</label>
            <input
              type="number"
              value={formData.harga}
              onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
              className={styles.input}
              min="0"
              step="1000"
              required
            />
            {errors.harga && <span className={styles.error}>{errors.harga}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Bulan</label>
            <select
              value={formData.bulan}
              onChange={(e) => setFormData({ ...formData, bulan: e.target.value })}
              className={styles.select}
              required
            >
              {bulanOptions.map(bulan => (
                <option key={bulan} value={bulan}>{bulan}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Tanggal</label>
            <input
              type="date"
              value={formData.tanggal}
              onChange={(e) => {
                const newTanggal = e.target.value
                const newBulan = getMonthFromDate(newTanggal)
                setFormData({ ...formData, tanggal: newTanggal, bulan: newBulan })
              }}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={onCancel} className={styles.btnCancel}>
            Batal
          </button>
          <button type="submit" className={styles.btnSubmit}>
            {editingItem ? 'Update' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPenjualan

