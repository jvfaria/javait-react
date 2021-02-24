import styles from '../styles/components/Profile.module.css';


export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img className={styles.profilePic} src="https://github.com/jvfaria.png" alt="profile" />
      <div>
        <strong className={styles.name}>João Vitor de Faria</strong>

        <p>
          <img src="icons/level.svg" alt="level" />
          Level 01
        </p>
      </div>
    </div>
  );
}