import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";


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

  return (
    <div className="card">
      <h3>Top 10 parties gagnées en minimum de temps</h3>
      <ol>
        {winningGames.map((game, index) => (
          <li key={index}>
            {game.pseudo} - Score: {game.score}, {game.moves} coups,{" "}
            {game.seconds} secondes, (Mot: {game.wordLength} lettres)
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopWinningGames;
