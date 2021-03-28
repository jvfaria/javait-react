import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';


import Head from 'next/head';

export default function Home() {
  return (

    <div className={styles.container}>
      <div>
      <img src="/icons/javait-logo.png" alt=""/>
      
      <h1>“Questions open a space in your mind that allow better answers to breathe.”</h1>
      </div>
      
      <Head><title>Home | Java It</title></Head>
      <ExperienceBar />
      <CountdownProvider>
        <section className={styles.section}>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>

            <ChallengeBox />

          </div>
        </section>
      </CountdownProvider>
    </div>

  );
}
