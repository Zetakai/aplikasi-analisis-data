import { useState } from 'react'
import styles from '../styles/ProdukForm.module.css'

function ProdukForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    harga: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nama || !formData.kategori || !formData.harga) {
      return
    }
    onSubmit({
      nama: formData.nama,
      kategori: formData.kategori,
      harga: parseFloat(formData.harga)
    })
    setFormData({ nama: '', kategori: '', harga: '' })
  }

  return (
    <form className={styles.produkForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama Produk"
        value={formData.nama}
        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Kategori"
        value={formData.kategori}
        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={formData.harga}
        onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
        className={styles.input}
        min="0"
        step="1000"
        required
      />
      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.btnCancel}>
          Batal
        </button>
        <button type="submit" className={styles.btnSubmit}>
          Simpan
        </button>
      </div>
    </form>
  )
}

export default ProdukForm

