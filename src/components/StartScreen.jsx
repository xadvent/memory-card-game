import './../styles/StartScreen.css'
import { useState } from "react"
import propTypes from 'prop-types'

export default function StartScreen({ startGame }) {
    const [status, setStatus] = useState(false)
    const changeStatus = () => setStatus(!status)

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
                    <input type="number" />
                    <button>Submit</button>
                    <button onClick={changeStatus}>Cancel</button>
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
    startGame: propTypes.func
}