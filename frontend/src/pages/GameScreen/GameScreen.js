import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../../context/GameContext";
import Random from "../../components/diff/Random";
import SelectedDif from "../../components/diff/SelectedDif";
import "./GameScreen.css";

const GameScreen = () => {
  const [difficulty, setDifficulty] = useState("");
  const [randomDifficulty, setRandomDifficulty] = useState(false);
  const { startGame, resetGame } = useContext(GameContext);
  const navigate = useNavigate();

  const handleStartGame = async () => {
    const finalDifficulty = randomDifficulty
      ? "random"
      : parseInt(difficulty, 10);
    await resetGame(); // Reset the game before starting a new one
    await startGame(finalDifficulty);
    navigate(randomDifficulty ? "/randomgameboard" : "/selecteddifgameboard", {
      state: { difficulty: finalDifficulty },
    });
  };

  return (
    <div className="game-container">
      <div className="game-setup">
        <h1>Le jeu du Motus</h1>
        <div>
          <SelectedDif
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            randomDifficulty={randomDifficulty}
          />
          <Random setRandomDifficulty={setRandomDifficulty} />
        </div>
        <div>
          <button
            onClick={handleStartGame}
            disabled={!difficulty && !randomDifficulty}
          >
            Commencer le jeu
          </button>
        </div>
      </div>
      <div className="game-info">
        <h2>But du jeu du Motus</h2>
        <p>Retrouver un mot de 3 à 15 lettres en un minimum de coups !</p>
        <h3>Explications et règles du jeu :</h3>
        <p>
          <strong className="correct">A</strong> La lettre est bien placée
        </p>
        <p>
          <strong className="misplaced">A</strong> La lettre est présente mais
          mal placée
        </p>
        <p>
          <strong className="incorrect">A</strong> La lettre n'est pas présente
          dans le mot
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
