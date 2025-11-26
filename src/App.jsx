import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ImportExcel from './components/ImportExcel'
import DataTable from './components/DataTable'
import FormPenjualan from './components/FormPenjualan'
import { calculateStatistics, getChartDataByBulan, getChartDataByKategori } from './utils/statistics'
import styles from './styles/App.module.css'

function App() {
  const [penjualan, setPenjualan] = useState([])
  const [produk, setProduk] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [filter, setFilter] = useState({ search: '', kategori: '', bulan: '' })
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const savedPenjualan = localStorage.getItem('penjualan')
    const savedProduk = localStorage.getItem('produk')
    if (savedPenjualan) setPenjualan(JSON.parse(savedPenjualan))
    if (savedProduk) setProduk(JSON.parse(savedProduk))
  }, [])

  useEffect(() => {
    localStorage.setItem('penjualan', JSON.stringify(penjualan))
  }, [penjualan])

  useEffect(() => {
    localStorage.setItem('produk', JSON.stringify(produk))
  }, [produk])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddPenjualan = (data) => {
    const newId = Date.now().toString()
    const newData = { ...data, id: newId }
    setPenjualan([...penjualan, newData])
    showNotification('Data penjualan berhasil ditambahkan')
    setShowForm(false)
  }

  const handleUpdatePenjualan = (data) => {
    setPenjualan(penjualan.map(item => 
      item.id === data.id ? data : item
    ))
    showNotification('Data penjualan berhasil diupdate')
    setShowForm(false)
    setEditingItem(null)
  }

  const handleDeletePenjualan = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      setPenjualan(penjualan.filter(item => item.id !== id))
      showNotification('Data penjualan berhasil dihapus')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleImport = (data) => {
    const newData = data.map((item, index) => ({
      ...item,
      id: (Date.now() + index).toString()
    }))
    setPenjualan([...penjualan, ...newData])
    showNotification(`${newData.length} data berhasil diimport`)
  }

  const handleAddProduk = (data) => {
    const newId = Date.now().toString()
    const newData = { ...data, id: newId }
    setProduk([...produk, newData])
    showNotification('Data produk berhasil ditambahkan')
  }

  const filteredPenjualan = penjualan.filter(item => {
    const matchSearch = !filter.search || 
      item.namaProduk?.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.kategori?.toLowerCase().includes(filter.search.toLowerCase())
    const matchKategori = !filter.kategori || item.kategori === filter.kategori
    const matchBulan = !filter.bulan || item.bulan === filter.bulan
    return matchSearch && matchKategori && matchBulan
  })

  const stats = calculateStatistics(filteredPenjualan)
  const chartDataBulan = getChartDataByBulan(filteredPenjualan)
  const chartDataKategori = getChartDataByKategori(filteredPenjualan)

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Dashboard 
          stats={stats} 
          chartDataBulan={chartDataBulan}
          chartDataKategori={chartDataKategori}
        />
        
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Data Penjualan</h2>
            <button 
              className={styles.btnPrimary}
              onClick={() => {
                setEditingItem(null)
                setShowForm(true)
              }}
            >
              + Tambah Data
            </button>
          </div>

          <ImportExcel 
            onImport={handleImport}
            onAddProduk={handleAddProduk}
            produk={produk}
          />

          {showForm && (
            <FormPenjualan
              produk={produk}
              editingItem={editingItem}
              onSubmit={editingItem ? handleUpdatePenjualan : handleAddPenjualan}
              onCancel={() => {
                setShowForm(false)
                setEditingItem(null)
              }}
            />
          )}

          <DataTable
            data={filteredPenjualan}
            filter={filter}
            onFilterChange={setFilter}
            onEdit={handleEdit}
            onDelete={handleDeletePenjualan}
          />
        </section>
      </main>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default App

