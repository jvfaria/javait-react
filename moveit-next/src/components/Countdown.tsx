import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown() {

  const { 
    isActive, 
    seconds, 
    isDone, 
    minutes, 
    resetCountdown, 
    startCountdown 
} = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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