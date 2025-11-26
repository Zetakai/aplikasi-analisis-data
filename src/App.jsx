import { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ImportExcel from './components/ImportExcel'
import DataTable from './components/DataTable'
import FormPenjualan from './components/FormPenjualan'
import ProdukForm from './components/ProdukForm'
import Footer from './components/Footer'
import { 
  calculateStatistics, 
  getChartDataByBulan, 
  getChartDataByKategori,
  getTopProducts,
  getKategoriTrendByBulan,
  calculateGrowthRate
} from './utils/statistics'
import styles from './styles/App.module.css'

function App() {
  const [penjualan, setPenjualan] = useState([])
  const [produk, setProduk] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showProdukForm, setShowProdukForm] = useState(false)
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
    if (!id) {
      console.error('Delete: No ID provided')
      return
    }
    
    const confirmed = window.confirm('Yakin ingin menghapus data ini?')
    if (confirmed) {
      setPenjualan(prevPenjualan => {
        // Convert both to string for comparison to handle type mismatches
        const idStr = String(id)
        return prevPenjualan.filter(item => String(item.id) !== idStr)
      })
      showNotification('Data penjualan berhasil dihapus')
    }
  }

  const handleDeleteAll = () => {
    if (penjualan.length === 0) {
      showNotification('Tidak ada data untuk dihapus', 'error')
      return
    }
    
    const count = penjualan.length
    const confirmMessage = `Yakin ingin menghapus SEMUA data penjualan (${count} item)?\n\nTindakan ini TIDAK DAPAT DIBATALKAN!`
    
    const confirmed = window.confirm(confirmMessage)
    if (confirmed) {
      setPenjualan([])
      showNotification(`Semua data (${count} item) berhasil dihapus`)
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
    
    const existingProdukNames = new Set(produk.map(p => p.nama.toLowerCase()))
    const newProduk = []
    
    data.forEach(item => {
      if (item.namaProduk && item.kategori && item.harga) {
        const namaLower = item.namaProduk.toLowerCase()
        if (!existingProdukNames.has(namaLower)) {
          existingProdukNames.add(namaLower)
          newProduk.push({
            id: (Date.now() + newProduk.length).toString(),
            nama: item.namaProduk,
            kategori: item.kategori,
            harga: parseFloat(item.harga) || 0
          })
        }
      }
    })
    
    if (newProduk.length > 0) {
      setProduk([...produk, ...newProduk])
      showNotification(`${newData.length} data dan ${newProduk.length} produk berhasil diimport`)
    } else {
      showNotification(`${newData.length} data berhasil diimport`)
    }
  }

  const handleAddProduk = (data) => {
    const newId = Date.now().toString()
    const newData = { ...data, id: newId }
    setProduk([...produk, newData])
    showNotification('Data produk berhasil ditambahkan')
    setShowProdukForm(false)
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
  const topProducts = getTopProducts(filteredPenjualan, 5)
  const kategoriTrend = getKategoriTrendByBulan(filteredPenjualan)
  const growthRate = calculateGrowthRate(filteredPenjualan)

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Dashboard 
          stats={stats} 
          chartDataBulan={chartDataBulan}
          chartDataKategori={chartDataKategori}
          topProducts={topProducts}
          kategoriTrend={kategoriTrend}
          growthRate={growthRate}
        />
        
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Data Penjualan</h2>
              {penjualan.length > 0 && (
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={handleDeleteAll}
                  title="Hapus semua data"
                >
                  Hapus Semua Data
                </button>
              )}
            </div>
            <div className={styles.actionButtons}>
              <button 
                className={styles.btnSecondary}
                onClick={() => setShowProdukForm(!showProdukForm)}
              >
                {showProdukForm ? '✕ Batal' : '+ Tambah Produk'}
              </button>
              <button 
                className={styles.btnSecondary}
                onClick={() => {
                  setEditingItem(null)
                  setShowForm(true)
                }}
              >
                + Tambah Data Penjualan
              </button>
              <ImportExcel 
                onImport={handleImport}
                produk={produk}
              />
            </div>
          </div>

          {showProdukForm && (
            <ProdukForm
              onSubmit={handleAddProduk}
              onCancel={() => setShowProdukForm(false)}
            />
          )}

          {showForm && (
            <FormPenjualan
              produk={produk}
              penjualan={penjualan}
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

      <Footer />
    </div>
  )
}

export default App

