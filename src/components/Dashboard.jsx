import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import styles from '../styles/Dashboard.module.css'

function Dashboard({ stats, chartDataBulan, chartDataKategori }) {
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

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

      {chartDataBulan && chartDataBulan.length > 0 && (
        <div className={styles.chartSection}>
          <h3 className={styles.chartTitle}>Penjualan per Bulan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartDataBulan}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bulan" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(value)}
              />
              <Legend />
              <Bar dataKey="total" fill="#2563eb" name="Total Penjualan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartDataKategori && chartDataKategori.length > 0 && (
        <div className={styles.chartSection}>
          <h3 className={styles.chartTitle}>Penjualan per Kategori</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartDataKategori}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ kategori, percent }) => `${kategori} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="total"
              >
                {chartDataKategori.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}

export default Dashboard

