/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.css';
import Card from './components/Card';
import Sound from './assets/gb-startup.mp3'
import StartScreen from './components/StartScreen';
import { useState, useEffect } from 'react';

const startSound = new Audio(Sound); // Adjust the path and ensure the file exists
startSound.volume = 0.15

function App() {
  const [characterList, setCharacterList] = useState([]);
  const [difficulty, setDifficulty] = useState(10);
  const [reset, setReset] = useState(true); // Change to false to have a "start" button
  const [score, setScore] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [_, setAnswers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false)

  const randomNumber = () => Math.floor(Math.random() * 1025);
  const changeReset = () => setReset(!reset);

  function resetAll() {
    setScore(0);
    setAnswers([]);
    changeReset();
  }

  function addAnswer(id) {
    setAnswers((prevAnswers) => {
      if (prevAnswers.includes(id)) {
        resetAll();
        return prevAnswers;
      } else {
        setScore((prevScore) => prevScore + 1);
        return [...prevAnswers, id];
      }
    });
  }

  function startGame() {
    setGameStarted(true)
    populateCharList()
    startSound.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }

  // ----------- Populating Character List ------------
  function populateCharList() {
    let newCharList = [];
    while (newCharList.length < difficulty){
      let num = randomNumber();
      !newCharList.includes(num) ? newCharList.push(num) : {}
    } 
    setCharacterList(newCharList);
  }

  useEffect(() => {
    populateCharList();
  }, [])

  useEffect(() => {
    if (reset) {
      populateCharList();
      setReset(false);
    }
  }, [reset])
  // --------------------------------------------------

  return (
    <>
      <div id="header">
        <h1>Memory Game</h1>
        <div id="score-box">Score: {score}</div>
        <button onClick={resetAll}>Reset</button>
      </div>

        {gameStarted ? (
          <div id="content">
            <Card characterList={characterList} addAnswer={addAnswer} />
          </div>
        ) : (
          <StartScreen startGame={startGame} setDifficulty={setDifficulty} />
        )}

      <div id="footer">
      </div>
    </>
  )
}

export default App;
