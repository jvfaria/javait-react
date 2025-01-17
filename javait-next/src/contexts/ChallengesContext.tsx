import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
  code: string[];
  choices: string[];
  explanation: string;
  answer: string;

}

interface ChallengesProviderProps {
  children: ReactNode;

}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)



export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }
  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    new Notification('Novo desafio 🆕', {
      body: `Worth ${challenge.amount}xp`
    });
  }




  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        activeChallenge,
        experienceToNextLevel,
        currentExperience,
        challengesCompleted,
        levelUp,
        resetChallenge,
        startNewChallenge,
        completeChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}
