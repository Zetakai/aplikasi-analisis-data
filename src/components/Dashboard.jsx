import styles from '../styles/Dashboard.module.css'

function Dashboard({ stats }) {
  return (
    <section className={styles.dashboard}>
      <h2 className={styles.sectionTitle}>Statistik Penjualan</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Penjualan</div>
          <div className={styles.statValue}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(stats.total)}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Rata-rata per Transaksi</div>
          <div className={styles.statValue}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(stats.rataRata)}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Unit Terjual</div>
          <div className={styles.statValue}>{stats.totalUnit}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Jumlah Transaksi</div>
          <div className={styles.statValue}>{stats.jumlahTransaksi}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Penjualan Tertinggi</div>
          <div className={styles.statValue}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(stats.maksimum)}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Penjualan Terendah</div>
          <div className={styles.statValue}>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(stats.minimum)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard

