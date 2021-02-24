import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div className={styles.progressBar} style={{ width: '60%' }}></div>
        <span className={styles.currentProgress} style={{ left: '60%' }}>
          350 xp
        </span>
      </div>
      <span>600xp</span>
    </header>
  )
}