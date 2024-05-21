/* eslint-disable react-hooks/exhaustive-deps */
import './styles/App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import StartScreen from './components/StartScreen';

function App() {
  const [score, setScore] = useState(0);
  const [characterList, setCharacterList] = useState([]);
  const [reset, setReset] = useState(true); // Change to false to have a "start" button
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
  }

  // ----------- Populating Character List ------------
  function populateCharList() {
    let newCharList = [];
    while (newCharList.length < 10){
      let num = randomNumber();
      !newCharList.includes(num) ? newCharList.push(num) : null
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
          <StartScreen startGame={startGame} />
        )}

      <div id="footer">
      </div>
    </>
  )
}

export default App;
