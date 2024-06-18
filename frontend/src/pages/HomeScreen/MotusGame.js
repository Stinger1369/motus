import React, { useState, useEffect } from "react";
import "./MotusGame.css";

const MotusGame = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [words, setWords] = useState(["SALUT", "DEMONSTRATION","MOTUS"]); // Example words

  useEffect(() => {
    const fillWord = async () => {
      for (let word of words) {
        for (let i = 0; i <= word.length; i++) {
          setCurrentWord(word.slice(0, i));
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    fillWord();
  }, [words]);

  return (
    <div className="motus-game">
      <h2>Motus</h2>
      <div className="word-display">
        {currentWord.split("").map((letter, index) => (
          <span key={index} className={`letter letter-${index % 5}`}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MotusGame;
