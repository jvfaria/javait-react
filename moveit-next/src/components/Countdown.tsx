import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';


let countdownTimeout: NodeJS.Timeout;
export function Countdown() {


  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false)
  const [isDone, setIsDone] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const { startNewChallenge } = useContext(ChallengesContext);


  function startCountdown() {
    setIsActive(true);
    setIsDone(false);
  }
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }



  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setIsDone(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      { isDone ? (
          <button className={styles.countdownButton} disabled>
            Ciclo encerrado
            
            <img src="closed-cycle.svg" alt="closed-cycle"/>
          </button>

      ) : (
          <>
            { isActive ? (
              <button
                onClick={resetCountdown}
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Abandonar Ciclo
              </button>
            ) : (
                <button
                  onClick={startCountdown}
                  type="button"
                  className={styles.countdownButton}>
                  Iniciar Ciclo
                </button>
              )}
          </>


        )
      }




    </div>
  );

}