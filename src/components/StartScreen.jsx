import './../styles/StartScreen.css'
import { useState } from "react"
import propTypes from 'prop-types'

export default function StartScreen({ startGame, setDifficulty }) {
    const [status, setStatus] = useState(false)
    const [amount, setAmount] = useState(10)
    const changeStatus = () => setStatus(!status)

    function setValues(val) {
        setAmount(val);
        setDifficulty(val);
    }

    function displayCorrect() {
        if (!status) {
            return (
                <>
                    <button onClick={changeStatus}>Select Difficulty</button>
                </>
            )
        } else {
            return (
                <>
                    <div className="difficulty-div" style={{display: "flex"}}>
                        <p style={{ width: "20px" }}>{amount}</p>
                        <input type="range" min={1} max={15} onChange={(e) => setValues(e.target.value)} value={amount} style={{ width: "150px" }} />
                    </div>
                    <button onClick={changeStatus}>Confirm</button>
                </>
            )
        }
    }

    return (
        <div id='start-screen'>
            {displayCorrect()}
            {!status && <button id='start-button' onClick={startGame}>Start!</button>}
        </div>
    )
}

StartScreen.propTypes = {
    startGame: propTypes.func,
    setDifficulty: propTypes.func,
}