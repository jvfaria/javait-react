import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
  } = useContext(ChallengesContext);
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}xp</header>

          <main>
            {
              (activeChallenge.type === 'body') ?
                (<img src="icons/body.svg" alt="body" />) :
                (<img src="icons/eye.svg" alt="eye" />)
            }

            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={resetChallenge}
              className={styles.challengeFailedButton}
            >Falhei</button>
            <button
              type="button"
              onClick={resetChallenge}
              className={styles.challengeSuccededButton}
            >Completei</button>
          </footer>
        </div>
      ) :
        (
          <div className={styles.challengeNotActive}>
            <strong>Inicie um ciclo <br /> para receber desafios a serem completados
        </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
              Avance de level completando desafios !
        </p>
          </div>
        )
      }

    </div>
  )
}