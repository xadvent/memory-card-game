import "../styles/ResultsScreen.css";
import PropTypes from "prop-types";

const levelCSS = {
  color: "red",
};

export default function ResultsScreen({ difficulty, score, loss }) {
  return !loss ? (
    <>
      <h1 className="holder">
        You have <span className="won-span"> won </span>{" "}
        <div>
          at difficulty
          <span style={levelCSS}> level {difficulty}</span>
        </div>
      </h1>
      <h2>Congratulations!</h2>
    </>
  ) : (
    <>
      <h1 className="holder">
        You have <span className="loss-span"> lost </span>{" "}
        <div>
          at difficulty
          <span style={levelCSS}> level {difficulty}</span>
        </div>
      </h1>
    </>
  );
}

ResultsScreen.propTypes = {
  difficulty: PropTypes.number,
  loss: PropTypes.bool,
};
