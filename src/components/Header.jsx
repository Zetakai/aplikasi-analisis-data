import { useTheme } from '../contexts/ThemeContext'
import styles from '../styles/Header.module.css'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Analisis Data Penjualan</h1>
          <p className={styles.subtitle}>Kelola dan analisis data penjualan dengan mudah</p>
        </div>
        <button 
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header

