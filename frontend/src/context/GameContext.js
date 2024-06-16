import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [hints, setHints] = useState([]);
  const [message, setMessage] = useState("");
  const [isStartingGame, setIsStartingGame] = useState(false);

  const startGame = async (difficulty) => {
    if (isStartingGame) {
      return;
    }

    try {
      setIsStartingGame(true);
      const response = await axios.post(
        "http://localhost:3000/api/game/start",
        { length: difficulty },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );

      if (response.data.word) {
        setGame({
          word: response.data.word,
          firstLetter: response.data.firstLetter,
          attempts: 0,
          maxAttempts: 6,
        });
        setMessage(response.data.message);
        setHints([]);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Start game error:", error);
    } finally {
      setIsStartingGame(false);
    }
  };

  const startRandomGame = async () => {
    if (isStartingGame) {
      return;
    }

    try {
      setIsStartingGame(true);
      const response = await axios.post(
        "http://localhost:3000/api/game/start-random",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );

      if (response.data.word) {
        setGame({
          word: response.data.word,
          firstLetter: response.data.firstLetter,
          attempts: 0,
          maxAttempts: 6,
        });
        setMessage(response.data.message);
        setHints([]);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Start random game error:", error);
    } finally {
      setIsStartingGame(false);
    }
  };

  const handleGuess = async (guess, currentRow) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/game/guess",
        { guess },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );

      if (response.data.hints) {
        const newHints = [...hints];
        newHints[currentRow] = response.data.hints;
        setHints(newHints);
        setMessage(response.data.message);

        setGame((prevGame) => ({
          ...prevGame,
          attempts: (prevGame?.attempts || 0) + 1,
        }));

        return response.data;
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Guess word error:", error);
    }
  };

  const endGame = async (score, timeTaken) => {
    try {
      await axios.post(
        "http://localhost:3000/api/game/end",
        { score, timeTaken },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    } catch (error) {
      console.error("End game error:", error);
    }
  };

  const resetGame = () => {
    setGame(null);
    setHints([]);
    setMessage("");
  };

  return (
    <GameContext.Provider
      value={{
        game,
        hints,
        message,
        startGame,
        startRandomGame,
        handleGuess,
        resetGame,
        endGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
