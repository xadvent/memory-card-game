/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/App.css";
import Card from "./components/Card";
import Sound from "./assets/gb-startup.mp3";
import StartScreen from "./components/StartScreen";
import { useState, useEffect } from "react";
import ResultsScreen from "./components/ResultsScreen";

const startSound = new Audio(Sound); // Adjust the path and ensure the file exists
startSound.volume = 0.15;

function App() {
  const [characterList, setCharacterList] = useState([]);
  const [difficulty, setDifficulty] = useState(10);
  const [reset, setReset] = useState(true); // Change to false to have a "start" button
  const [score, setScore] = useState(0);
  const [loss, setLoss] = useState(false);

  const [_, setAnswers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const randomNumber = () => Math.floor(Math.random() * 1025);
  const changeReset = () => setReset(!reset);

  function resetAll() {
    setScore(0);
    setAnswers([]);
    setGameStarted(false);
    setLoss(false);
    setGameEnded(false);
    changeReset();
  }

  function resetWithScore() {
    setAnswers([]);
    setGameStarted(false);
    setLoss(false);
    setGameEnded(false);
    changeReset();
  }

  function addAnswer(id) {
    setAnswers((prevAnswers) => {
      if (prevAnswers.includes(id)) {
        resetWithScore();
        setLoss(true);
        setGameEnded(true);
        return prevAnswers;
      } else {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore >= difficulty) {
            setGameEnded(true);
          }
          return newScore;
        });
        return [...prevAnswers, id];
      }
    });
  }

  function startGame() {
    setGameStarted(true);
    populateCharList();
    startSound.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }

  // ----------- Populating Character List ------------
  function populateCharList() {
    let newCharList = [];
    while (newCharList.length < difficulty) {
      let num = randomNumber();
      if (!newCharList.includes(num)) {
        newCharList.push(num);
      }
    }
    setCharacterList(newCharList);
  }

  useEffect(() => {
    populateCharList();
  }, []);

  useEffect(() => {
    if (reset) {
      populateCharList();
      setReset(false);
    }
  }, [reset]);
  // --------------------------------------------------

  return (
    <>
      <div id="header">
        <h1>Memory Game</h1>
        <div id="score-box">
          Score: {score}/{difficulty}
        </div>
      </div>

      {gameEnded ? (
        <ResultsScreen
          difficulty={characterList.length}
          score={score}
          loss={loss}
        />
      ) : gameStarted ? (
        <div id="content">
          <Card characterList={characterList} addAnswer={addAnswer} />
        </div>
      ) : (
        <StartScreen startGame={startGame} setDifficulty={setDifficulty} />
      )}

      <button id="reset-button" onClick={resetAll}>
        Reset
      </button>
      <div id="footer"></div>
    </>
  );
}

export default App;
