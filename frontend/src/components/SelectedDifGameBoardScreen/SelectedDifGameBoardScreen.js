import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sounds from "../sounds";
import Timer from "../GameBoard/Timer/Timer";
import GameRow from "../GameBoard/GameRow";
import GameContext from "../../context/GameContext";
import "./styles.css";

const SelectedDifGameBoardScreen = () => {
  const { game, hints, message, handleGuess, startGame, resetGame } =
    useContext(GameContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(5);
  const [isValidDifficulty, setIsValidDifficulty] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  // Hooks
  const [currentGuess, setCurrentGuess] = useState(
    Array(6)
      .fill()
      .map(() => Array(difficulty).fill(""))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const inputRefs = useRef([]);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    const initialDifficulty = location.state
      ? parseInt(location.state.difficulty, 10)
      : 5;
    const validDifficulty =
      !isNaN(initialDifficulty) &&
      initialDifficulty >= 3 &&
      initialDifficulty <= 15;

    setDifficulty(initialDifficulty);
    setIsValidDifficulty(validDifficulty);

    if (validDifficulty && !gameStarted) {
      resetGame();
      startGame(initialDifficulty).then(() => setGameStarted(true));
    } else if (!validDifficulty) {
      console.error("Invalid difficulty level:", initialDifficulty);
    }
  }, [location.state, resetGame, startGame, gameStarted]);

  useEffect(() => {
    if (!isValidDifficulty || !gameStarted || !game) return;

    const initialGuesses = Array(6)
      .fill()
      .map(() => Array(difficulty).fill(""));
    if (game.firstLetter) {
      initialGuesses[0][0] = game.firstLetter.toUpperCase();
    }
    setCurrentGuess(initialGuesses);

    console.log("Playing sound grille_creation");
    new Audio(Sounds.grille_creation).play();
  }, [game, isValidDifficulty, gameStarted, difficulty]);

  useEffect(() => {
    setResetTimer((prev) => !prev);
  }, [currentRow]);

  const highlightAndPlaySound = (row, col, hint) => {
    const tile = inputRefs.current[row * difficulty + col];
    if (tile) {
      tile.classList.add("highlight");
      playSoundForHint(hint);
      setTimeout(() => {
        tile.classList.remove("highlight");
      }, 500);
    }
  };

  const onStartGame = () => {
    navigate("/game"); // Redirection vers l'écran de sélection de difficulté
  };

  const playSoundForHint = (hint) => {
    console.log("Playing sound for hint:", hint);
    if (hint.status === "correct") {
      new Audio(Sounds.lettre_ok).play();
    } else if (hint.status === "misplaced") {
      new Audio(Sounds.lettre_mauvaise).play();
    } else if (hint.status === "incorrect") {
      new Audio(Sounds.lettre_absente).play();
    }
  };

  const onHandleGuess = async () => {
    if (gameWon || gameOver) return;

    const guess = currentGuess[currentRow].join("");
    console.log("User's guess:", guess);
    const response = await handleGuess(guess.toLowerCase(), currentRow);

    console.log("Response from handleGuess:", response);

    if (!response || !response.hints) {
      console.error("Invalid response from handleGuess:", response);
      return;
    }

    const currentHints = response.hints;
    console.log("Hints for current row:", currentHints);

    currentHints.forEach((hint, index) => {
      setTimeout(() => {
        highlightAndPlaySound(currentRow, index, hint);
      }, 500 * index);
    });

    setTimeout(() => {
      if (response.message && response.message.includes("Congratulations")) {
        console.log("Playing victory sound");
        new Audio(Sounds.victory).play();
        setGameWon(true);
        setScore(response.score);
        return;
      }

      setCurrentGuess((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        currentHints.forEach((hint, index) => {
          if (hint.status === "correct" || hint.status === "misplaced") {
            newGuesses[currentRow][index] = hint.letter.toUpperCase();
            if (currentRow + 1 < 6) {
              newGuesses[currentRow + 1][index] = hint.letter.toUpperCase();
            }
          }
        });
        if (
          currentRow + 1 < 6 &&
          !currentHints.some((hint) => hint.status === "correct")
        ) {
          newGuesses[currentRow + 1][0] = game.firstLetter.toUpperCase();
        }
        return newGuesses;
      });

      setCurrentRow((prevRow) => prevRow + 1);
    }, 500 * currentHints.length);

    if (response.message && response.message.includes("Game over")) {
      console.log("Playing error sound");
      new Audio(Sounds.erreur).play();
      setGameOver(true);
    }
  };

  const handleTileChange = (row, col, value) => {
    if (value.length > 1) return;
    setCurrentGuess((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[row][col] = value.toUpperCase();
      return newGuesses;
    });
    if (value) {
      console.log("Playing sound grille_numero");
      new Audio(Sounds.grille_numero).play();
      if (col < difficulty - 1) {
        inputRefs.current[row * difficulty + col + 1].focus();
      }
    }
  };

  const isCurrentRowComplete = () => {
    return currentGuess[currentRow].every((letter) => letter !== "");
  };

  const handleTimerExpire = async () => {
    if (gameWon || gameOver) return;

    if (!gameWon && !gameOver && currentRow < 6) {
      await onHandleGuess();
      if (currentRow < 5) {
        setResetTimer((prev) => !prev);
      } else {
        console.log("Playing error sound");
        new Audio(Sounds.erreur).play();
        setGameOver(true);
      }
    }
  };

  if (!isValidDifficulty) {
    return <div>Invalid difficulty level selected. Please try again.</div>;
  }

  return (
    <div>
      <h2>{message}</h2>

      <div className="game-board">
        {!gameWon && !gameOver && (
          <Timer key={resetTimer} duration={30} onExpire={handleTimerExpire} />
        )}
        {Array(6)
          .fill(null)
          .map((_, rowIndex) => (
            <GameRow
              key={rowIndex}
              rowIndex={rowIndex}
              difficulty={difficulty}
              currentRow={currentRow}
              currentGuess={currentGuess}
              handleTileChange={handleTileChange}
              gameWon={gameWon}
              onHandleGuess={onHandleGuess}
              isCurrentRowComplete={isCurrentRowComplete}
              inputRefs={inputRefs}
              hints={hints}
            />
          ))}
      </div>
      {gameWon && (
        <div>
          <h3>Félicitations! Vous avez gagné {score} points!</h3>
          <button onClick={onStartGame}>Commencer un nouveau jeu</button>
        </div>
      )}
      {gameOver && (
        <div>
          <h3>Le mot correct était : {game.word.toUpperCase()}</h3>
          <button onClick={onStartGame}>Commencer un nouveau jeu</button>
        </div>
      )}
    </div>
  );
};

export default SelectedDifGameBoardScreen;
