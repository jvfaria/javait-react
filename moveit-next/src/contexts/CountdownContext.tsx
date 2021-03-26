import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isDone: boolean;
  startCountdown(): void;
  resetCountdown(): void;
}
interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false)
  const [isDone, setIsDone] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const { startNewChallenge } = useContext(ChallengesContext);

  function startCountdown() {
    setIsActive(true);
    setIsDone(false);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setIsDone(false);
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
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      startCountdown,
      resetCountdown,
      isDone
    }}>
      {children}
    </CountdownContext.Provider>
  );
}