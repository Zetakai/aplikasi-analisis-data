import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts'
import styles from '../styles/Dashboard.module.css'

function Dashboard({ stats, chartDataBulan, chartDataKategori, topProducts, kategoriTrend, growthRate }) {
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const formatCurrencyCompact = (value) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)}M`
    } else if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1)}jt`
    } else if (value >= 1000) {
      return `Rp ${(value / 1000).toFixed(0)}rb`
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const COLORS = ['#6366f1', '#06b6d4', '#8b5cf6', '#22c55e', '#f59e0b', '#f43f5e', '#3b82f6', '#a855f7']

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
            {formatCurrencyCompact(stats.rataRata)}
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
        <div className={styles.chartsGrid}>
          <div className={`${styles.chartSection} ${styles.fullWidth}`}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Tren Penjualan Bulanan</h3>
              {growthRate !== 0 && (
                <span className={`${styles.growthBadge} ${growthRate > 0 ? styles.positive : styles.negative}`}>
                  {growthRate > 0 ? '↑' : '↓'} {Math.abs(growthRate).toFixed(1)}%
                </span>
              )}
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartDataBulan}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                <XAxis dataKey="bulan" stroke="#94a3b8" />
                <YAxis tickFormatter={formatCurrency} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(value)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  name="Total Penjualan"
                  dot={{ fill: '#6366f1', r: 5 }}
                  activeDot={{ r: 7, fill: '#818cf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {topProducts && topProducts.length > 0 && (
            <div className={styles.chartSection}>
              <h3 className={styles.chartTitle}>Top 5 Produk Terlaris</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis type="number" tickFormatter={formatCurrency} stroke="#94a3b8" />
                  <YAxis dataKey="nama" type="category" width={140} stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(value)}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="#06b6d4" name="Total Penjualan" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {chartDataKategori && chartDataKategori.length > 0 && (
            <div className={styles.chartSection}>
              <h3 className={styles.chartTitle}>Komposisi Kategori</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={chartDataKategori}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ kategori, percent }) => `${kategori} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="total"
                  >
                    {chartDataKategori.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
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

          {kategoriTrend && kategoriTrend.data.length > 0 && kategoriTrend.categories.length > 0 && (
            <div className={`${styles.chartSection} ${styles.fullWidth}`}>
              <h3 className={styles.chartTitle}>Tren Penjualan per Kategori</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={kategoriTrend.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis dataKey="bulan" stroke="#94a3b8" />
                  <YAxis tickFormatter={formatCurrency} stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--surface)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(value)}
                  />
                  <Legend />
                  {kategoriTrend.categories.map((kategori, index) => (
                    <Area
                      key={kategori}
                      type="monotone"
                      dataKey={kategori}
                      stackId="1"
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.7}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Dashboard

