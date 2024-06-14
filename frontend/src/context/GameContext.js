import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [hints, setHints] = useState([]);
  const [message, setMessage] = useState("");

  const startGame = async (difficulty) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/game/start",
        { length: difficulty },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );
      setGame({
        word: response.data.word,
        firstLetter: response.data.firstLetter,
      });
      setMessage(response.data.message);
      setHints([]);
      console.log("Game started with word:", response.data.word); // Log for debugging
    } catch (error) {
      console.error("Start game error:", error);
    }
  };

  const startRandomGame = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/game/start-random",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );
      setGame({
        word: response.data.word,
        firstLetter: response.data.firstLetter,
      });
      setMessage(response.data.message);
      setHints([]);
      console.log("Random game started with word:", response.data.word); // Log for debugging
    } catch (error) {
      console.error("Start random game error:", error);
    }
  };

  const handleGuess = async (guess, currentRow) => {
    try {
      console.log("Current word:", game?.word); // Log for the word to guess
      console.log("User's guess in handleGuess:", guess); // Log for the guessed word

      const response = await axios.post(
        "http://localhost:3000/api/game/guess",
        { guess },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );

      console.log("Response from guess:", response.data);

      const newHints = [...hints];
      newHints[currentRow] = response.data.hints;
      setHints(newHints);
      setMessage(response.data.message);

      console.log("New hints:", newHints);

      return response.data; // Return the response data
    } catch (error) {
      console.error("Guess word error:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{ game, hints, message, startGame, startRandomGame, handleGuess }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
