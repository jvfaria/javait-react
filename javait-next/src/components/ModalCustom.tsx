import { useState, useContext, useEffect } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import Modal from 'react-modal';

import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import styles from '../styles/components/ModalCustom.module.css';

interface ModalCustomProps {
  success: boolean;
  explanation: string;
  rightAnswer: string;
  challengeAmount: Number;
  isOpen: boolean;
}

export function ModalCustom({ success, explanation, rightAnswer, challengeAmount }: ModalCustomProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const {
    resetChallenge,
    completeChallenge
  } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  useEffect(() => {
    modalIsOpen ? setModalIsOpen(true) : setModalIsOpen(true);
  }, [modalIsOpen]);

  const customStyleModal = {
    content: {
      width: '550px',
      background: '#fff',
      height: '700px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderColor: 'white',
      padding: '0',
      margin: '0',
    }
  }
  function redeemXP() {
    handleChallengeSucceded();
  }

  function handleChallengeSucceded() {
    completeChallenge();
    resetCountdown();
  }
  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
    closeModal();
  }



  function closeModal() {
    setModalIsOpen(false);
  }


  return (
    <>
      {
        success ?

          <Modal
            isOpen={modalIsOpen}
            style={customStyleModal}
            contentLabel={"Explanation modal: "}
          >
            <div className={styles.modal}>

              <div>
                <FiCheckCircle size={120} style={{ color: '#fff' }} />
              </div>

              <div className={styles.explanationContainer}>
                <h1>You got it !</h1>
                <h3>Right answer:   <strong>{rightAnswer}</strong></h3>

                <hr />
                <div className={styles.explanationDescription}>
                  <h4>
                    Explanation:
              </h4>
                  <div>
                    <p>{explanation}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={redeemXP}
                className={styles.redeemButton}>
                Redeem {challengeAmount} XP
          </button>
            </div>

          </Modal> :
          <Modal
            isOpen={modalIsOpen}
            style={customStyleModal}
            contentLabel={"Explanation modal: "}
          >
            <div className={styles.failedModal} >

              <div>
                <FiXCircle size={120} style={{ color: '#fff' }} />
              </div>

              <div className={styles.explanationContainer}>
                <h1>Wrong answer !</h1>
                <h3>Right answer:   <strong>{rightAnswer}</strong></h3>

                <hr />
                <div className={styles.explanationDescription}>
                  <h4>
                    Explanation:
              </h4>
                  <div>
                    <p>{explanation}</p>
                  </div>
                </div>
              </div>


              <button
                onClick={handleChallengeFailed}
                className={styles.understoodButton}>
                Understood
          </button>

            </div>

          </Modal>
      }

    </>
  )
}