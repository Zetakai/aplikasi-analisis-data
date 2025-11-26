import styles from '../styles/Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Analisis Data Penjualan</h1>
        <p className={styles.subtitle}>Kelola dan analisis data penjualan dengan mudah</p>
      </div>
    </header>
  )
}

export default Header

