export function calculateStatistics(data) {
  if (!data || data.length === 0) {
    return {
      total: 0,
      rataRata: 0,
      totalUnit: 0,
      jumlahTransaksi: 0,
      maksimum: 0,
      minimum: 0
    }
  }

  const totals = data.map(item => item.jumlah * item.harga)
  const total = totals.reduce((sum, val) => sum + val, 0)
  const totalUnit = data.reduce((sum, item) => sum + item.jumlah, 0)
  const jumlahTransaksi = data.length
  const rataRata = total / jumlahTransaksi
  const maksimum = Math.max(...totals)
  const minimum = Math.min(...totals)

  return {
    total,
    rataRata: isNaN(rataRata) ? 0 : rataRata,
    totalUnit,
    jumlahTransaksi,
    maksimum: maksimum === -Infinity ? 0 : maksimum,
    minimum: minimum === Infinity ? 0 : minimum
  }
}

export function getChartDataByBulan(data) {
  const bulanMap = {}
  
  data.forEach(item => {
    const bulan = item.bulan || 'Tidak Diketahui'
    if (!bulanMap[bulan]) {
      bulanMap[bulan] = { bulan, total: 0, jumlah: 0 }
    }
    bulanMap[bulan].total += item.jumlah * item.harga
    bulanMap[bulan].jumlah += item.jumlah
  })

  const bulanOrder = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  return Object.values(bulanMap)
    .sort((a, b) => {
      const indexA = bulanOrder.indexOf(a.bulan)
      const indexB = bulanOrder.indexOf(b.bulan)
      if (indexA === -1 && indexB === -1) return a.bulan.localeCompare(b.bulan)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })
}

export function getChartDataByKategori(data) {
  const kategoriMap = {}
  
  data.forEach(item => {
    const kategori = item.kategori || 'Tidak Diketahui'
    if (!kategoriMap[kategori]) {
      kategoriMap[kategori] = { kategori, total: 0, jumlah: 0 }
    }
    kategoriMap[kategori].total += item.jumlah * item.harga
    kategoriMap[kategori].jumlah += item.jumlah
  })

  return Object.values(kategoriMap)
    .sort((a, b) => b.total - a.total)
}

