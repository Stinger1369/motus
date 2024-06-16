// UserStats.js
import React from "react";
import { useNavigate } from "react-router-dom";

const UserStats = ({ userStats, user }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      {userStats ? (
        <>
          <h3>Vos statistiques</h3>
          <p>Total des points: {userStats.totalScore}</p>
          <p>Parties jouées: {userStats.gamesPlayed}</p>
          <p>Temps moyen par partie: {userStats.averageTime} secondes</p>
        </>
      ) : (
        <>
          <h3>Commencez une nouvelle partie</h3>
          <button onClick={() => navigate("/game")}>Nouvelle partie</button>
        </>
      )}
    </div>
  );
};

export default UserStats;
