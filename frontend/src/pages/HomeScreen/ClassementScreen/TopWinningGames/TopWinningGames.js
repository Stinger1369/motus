import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";
import "./TopWinningGames.css"; // Import the CSS file

const TopWinningGames = () => {
  const { user } = useContext(AuthContext);
  const [winningGames, setWinningGames] = useState([]);

  useEffect(() => {
    const fetchWinningGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/walloffame/winninggames",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setWinningGames(response.data);
      } catch (error) {
        console.error("Fetch winning games error:", error);
      }
    };

    if (user) {
      fetchWinningGames();
    }
  }, [user]);

  const getFastestGameByUser = (games) => {
    const userGamesMap = {};
    games.forEach((game) => {
      if (
        !userGamesMap[game.pseudo] ||
        userGamesMap[game.pseudo].seconds > game.seconds
      ) {
        userGamesMap[game.pseudo] = game;
      }
    });
    return Object.values(userGamesMap);
  };

  const fastestGames = getFastestGameByUser(winningGames)
    .sort((a, b) => a.seconds - b.seconds)
    .slice(0, 10);

  if (!user) {
    return (
      <p>
        Veuillez vous connecter pour voir le classement des parties gagnées.
      </p>
    );
  }

  return (
    <div className="card">
      <h3>Top 10 parties gagnées en minimum de temps</h3>
      <ol>
        {fastestGames.map((game, index) => (
          <li key={index}>
            <span>{game.pseudo}</span> - Score: <span>{game.score}</span>,{" "}
            {game.moves} coups, {game.seconds} secondes, (Mot:{" "}
            <span>{game.wordLength}</span> lettres)
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopWinningGames;
