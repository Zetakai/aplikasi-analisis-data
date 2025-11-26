import styles from '../styles/DataTable.module.css'

function DataTable({ data, filter, onFilterChange, onEdit, onDelete }) {
  const bulanOptions = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const kategoriOptions = [...new Set(data.map(item => item.kategori).filter(Boolean))]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const calculateTotal = (item) => {
    return item.jumlah * item.harga
  }

  if (data.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Belum ada data penjualan. Tambah data baru atau import dari Excel.</p>
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Cari produk atau kategori..."
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          className={styles.searchInput}
        />

        <select
          value={filter.kategori}
          onChange={(e) => onFilterChange({ ...filter, kategori: e.target.value })}
          className={styles.filterSelect}
        >
          <option value="">Semua Kategori</option>
          {kategoriOptions.map(kat => (
            <option key={kat} value={kat}>{kat}</option>
          ))}
        </select>

        <select
          value={filter.bulan}
          onChange={(e) => onFilterChange({ ...filter, bulan: e.target.value })}
          className={styles.filterSelect}
        >
          <option value="">Semua Bulan</option>
          {bulanOptions.map(bulan => (
            <option key={bulan} value={bulan}>{bulan}</option>
          ))}
        </select>

        {(filter.search || filter.kategori || filter.bulan) && (
          <button
            onClick={() => onFilterChange({ search: '', kategori: '', bulan: '' })}
            className={styles.clearFilter}
          >
            Reset Filter
          </button>
        )}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Harga Satuan</th>
              <th>Total</th>
              <th>Bulan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>{item.namaProduk}</td>
                <td>
                  <span className={styles.badge}>{item.kategori}</span>
                </td>
                <td>{item.jumlah}</td>
                <td>{formatCurrency(item.harga)}</td>
                <td className={styles.total}>{formatCurrency(calculateTotal(item))}</td>
                <td>{item.bulan}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onEdit(item)
                      }}
                      className={styles.btnEdit}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (item.id) {
                          onDelete(item.id)
                        } else {
                          console.error('Delete: Item has no ID', item)
                        }
                      }}
                      className={styles.btnDelete}
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <p>Menampilkan {data.length} dari {data.length} data</p>
      </div>
    </div>
  )
}

export default DataTable

