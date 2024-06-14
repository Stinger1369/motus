import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../../context/GameContext";
import Random from "../../components/diff/Random";
import SelectedDif from "../../components/diff/SelectedDif";
import "./styles.css"; // Import the CSS file

const GameScreen = () => {
  const [difficulty, setDifficulty] = useState("");
  const [randomDifficulty, setRandomDifficulty] = useState(false);
  const { startGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    const finalDifficulty = randomDifficulty
      ? "random"
      : parseInt(difficulty, 10);
    await startGame(finalDifficulty);
    navigate(randomDifficulty ? "/randomgameboard" : "/selecteddifgameboard", {
      state: { difficulty: finalDifficulty },
    });
  };

  return (
    <div className="game-container">
      <h1>Game Screen</h1>
      <div>
        <SelectedDif
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          randomDifficulty={randomDifficulty}
        />
        <Random setRandomDifficulty={setRandomDifficulty} />
        <button
          onClick={handleStartGame}
          disabled={!difficulty && !randomDifficulty}
        >
          Commencer le jeu
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
