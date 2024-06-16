// TopWinningGames.js
import React from "react";

const TopWinningGames = ({ winningGames }) => {
  return (
    <div className="card">
      <h3>Top 10 parties gagnées en minimum de coups</h3>
      <ol>
        {winningGames.map((game, index) => (
          <li key={index}>
            {game.pseudo} - Score: {game.score} en {game.moves} coups et{" "}
            {game.time} secondes (Mot: {game.wordLength} lettres)
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopWinningGames;
