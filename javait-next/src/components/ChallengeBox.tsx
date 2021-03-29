import { useContext, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import { useForm } from 'react-hook-form';

import { FiCheckCircle } from 'react-icons/fi';

import { ModalCustom } from '../components/ModalCustom';

import styles from '../styles/components/ChallengeBox.module.css';

interface CheckboxProps {
  id: Number,
  isChecked: boolean,
}

export function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
  } = useContext(ChallengesContext);
  useEffect(() => {
    setModalIsOpen(false);
  }, [activeChallenge]);

  const { handleSubmit } = useForm();
  const [rightAnswer, setRightAnswer] = useState('')
  const [success, setSuccess] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [explanation, setExplanation] = useState('')
  const [challengeAmount, setChallengeAmount] = useState(0)



  const onSubmit = () => {
    const hasCheckboxMarked = (checkbox.find(c => c.isChecked === true)) ? true : false;

    if (!hasCheckboxMarked) {
      alert("You need to mark at least one option or GIVE UP !");
      return;
    }
    const answers = { 0: "a", 1: "b", 2: "c", 3: "d" };
    const { id } = checkbox.find(c => c.isChecked === true);
    const userAnswer = answers[Number(id) - 1];
    const textAnswer = document.getElementById(`${userAnswer}`).textContent.split(")")[1].trim();

    if (activeChallenge.answer === userAnswer) {
      setRightAnswer(textAnswer);
      setSuccess(true);
      setExplanation(activeChallenge.explanation);
      setChallengeAmount(activeChallenge.amount);
      setModalIsOpen(true);

      return;
    }
    setSuccess(false);
    const letterAnswer = activeChallenge.answer;
    const textRightAnswer = document.getElementById(`${letterAnswer}`).textContent.split(")")[1].trim();
    setRightAnswer(letterAnswer+") " + textRightAnswer);
    setExplanation(activeChallenge.explanation);
    setModalIsOpen(true);
    return;

  }


  const { resetCountdown } = useContext(CountdownContext);
  const choicesInitialValue: CheckboxProps[] = [
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false }
  ]
  const [checkbox, setCheckbox] = useState<Array<CheckboxProps>>(choicesInitialValue);

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }


  function handleChecked(event) {
    const index = Number(event.target.id);
    const condition = checkbox[index - 1].isChecked ? false : true;
    const newArr = [...checkbox]
    const previousInput = newArr.find(ck => (ck.id !== index && ck.isChecked === true))
    if (previousInput) {
      const previousInputId = Number(previousInput.id) - 1;
      newArr[previousInputId] = { id: previousInputId, isChecked: false }
    }
    newArr[index - 1] = { id: index, isChecked: condition }
    setCheckbox(newArr)

  }
  return (
    <div className={styles.challengeBoxContainer}>
      {
        modalIsOpen &&

        <ModalCustom
          isOpen={modalIsOpen}
          success={success}
          challengeAmount={challengeAmount}
          explanation={explanation}
          rightAnswer={rightAnswer}
        />
      }


      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Get {activeChallenge.amount}xp</header>

          <main>
            {
              (activeChallenge.type === 'body') ?
                (<img src="icons/code.png" alt="body" />) :
                (<img src="icons/eye.svg" alt="eye" />)
            }

            <strong>New challenge</strong>
            <p>{activeChallenge.description}</p>
            <SyntaxHighlighter language="java">
              {activeChallenge.code.join("")}
            </SyntaxHighlighter>
            <strong>Pick an answer or give up</strong>

            <form onSubmit={handleSubmit(onSubmit)} >
              <div>
                <div>

                  <label id="a" className={styles.choicesLabel}>
                    {`a) ${activeChallenge.choices["a"]}`}
                    <input
                      id="1"
                      name="a"
                      type="checkbox"
                      defaultValue=""
                      checked={checkbox[0].isChecked}
                      onChange={handleChecked}
                    />

                  </label>
                </div>

                <div>
                  <label id="b" className={styles.choicesLabel}>
                    {`b) ${activeChallenge.choices["b"]}`}
                    <input
                      id="2"
                      name="b"
                      type="checkbox"
                      defaultValue=""
                      checked={checkbox[1].isChecked}
                      onChange={handleChecked}
                    />
                  </label>
                </div>
                <div>
                  <label id="c" className={styles.choicesLabel}>
                    {`c) ${activeChallenge.choices["c"]}`}
                    <input
                      id="3"
                      name="c"
                      type="checkbox"
                      defaultValue=""
                      checked={checkbox[2].isChecked}
                      onChange={handleChecked}
                    />
                  </label>
                </div>
                <div>
                  <label id="d" className={styles.choicesLabel}>
                    {`d) ${activeChallenge.choices["d"]}`}
                    <input
                      id="4"
                      name="d"
                      type="checkbox"
                      defaultValue=""
                      checked={checkbox[3].isChecked}
                      onChange={handleChecked}
                    />
                  </label>
                </div>
              </div>
              <footer>
                <button
                  type="button"
                  onClick={handleChallengeFailed}
                  className={styles.challengeFailedButton}
                >Give Up</button>
                <button
                  type="submit"
                  className={styles.challengeSuccededButton}
                >Answer</button>
              </footer>
            </form>
          </main>


        </div>
      ) :
        (
          <div className={styles.challengeNotActive}>
            <strong>Start a new cicle <br /> to receive new challenges to be completed
        </strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
              Level up completing challenges !
        </p>
          </div>
        )
      }

    </div>
  )
}