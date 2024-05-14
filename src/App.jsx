import './styles/App.css'
import { useState, useEffect } from 'react'
import Card from './components/Card';

function App() {
  const [score, setScore] = useState(0);
  const [characterList, setCharacterList] = useState([])
  const [reset, setReset] = useState(true) // Change to false to have a "start" button
  const [answers, setAnswers] = useState([])

  const randomNumber = () => Math.floor(Math.random() * 1025)
  const addScore = () => setScore(score + 1);
  const changeReset = () => setReset(!reset);

  function resetAll() {
    setScore(0)
    setAnswers([])
    changeReset()
  }

  function guess(id) {
    if (answers.includes(id)) {
      resetAll()
    } else {
      let newAnswers = [...answers, id]
      setAnswers(newAnswers)
    }
  }

  // ----------- Populating Character List ------------
  function populateCharList() {
    let newCharList = [];
    for (let x = 0; x < 10; x++) {
      newCharList.push(randomNumber());
    }
    setCharacterList(newCharList);
  }

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
        <div id="score-box">Score: {score}</div>
        <button onClick={addScore}>Increase Score</button>
        <button onClick={resetAll}>Reset</button>
      </div>

      <div id="content">
        <Card characterList={characterList} />
      </div>

      <div id="footer">
      </div>
    </>
  );

}

export default App