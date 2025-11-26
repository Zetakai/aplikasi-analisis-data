import { useState, useEffect } from 'react'
import styles from '../styles/FormPenjualan.module.css'

function FormPenjualan({ produk, editingItem, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    namaProduk: '',
    kategori: '',
    jumlah: '',
    harga: '',
    bulan: new Date().toLocaleString('id-ID', { month: 'long' }),
    tanggal: new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingItem) {
      setFormData({
        namaProduk: editingItem.namaProduk || '',
        kategori: editingItem.kategori || '',
        jumlah: editingItem.jumlah || '',
        harga: editingItem.harga || '',
        bulan: editingItem.bulan || new Date().toLocaleString('id-ID', { month: 'long' }),
        tanggal: editingItem.tanggal || new Date().toISOString().split('T')[0]
      })
    }
  }, [editingItem])

  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const kategoriOptions = [...new Set(produk.map(p => p.kategori))]

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
    setFormData({
      ...formData,
      namaProduk,
      kategori: selectedProduk?.kategori || formData.kategori,
      harga: selectedProduk?.harga || formData.harga
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
          {produk.length > 0 ? (
            <select
              value={formData.namaProduk}
              onChange={(e) => handleProdukChange(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Pilih Produk</option>
              {produk.map(p => (
                <option key={p.id} value={p.nama}>{p.nama}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={formData.namaProduk}
              onChange={(e) => setFormData({ ...formData, namaProduk: e.target.value })}
              className={styles.input}
              required
            />
          )}
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
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
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

