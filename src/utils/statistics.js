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

