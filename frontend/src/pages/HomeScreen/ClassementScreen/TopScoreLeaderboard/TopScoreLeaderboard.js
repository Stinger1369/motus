import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";

const TopScoreLeaderboard = () => {
  const { user } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/walloffame",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Fetch leaderboard error:", error);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  if (!user) {
    return <p>Veuillez vous connecter pour voir le classement des scores.</p>;
  }

  return (
    <div className="card">
      <h3>
        Top des leader score (
        {leaderboard.reduce((acc, curr) => acc + curr.totalScore, 0)})
      </h3>
      <ol>
        {leaderboard
          .filter((entry) => entry.totalScore > 0)
          .map((entry, index) => (
            <li key={index}>
              {index + 1}. {entry.pseudo} - {entry.totalScore} points (Parties
              jouées: {entry.gamesPlayed})
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TopScoreLeaderboard;
