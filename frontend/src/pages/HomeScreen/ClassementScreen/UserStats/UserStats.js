// UserStats.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";

const UserStats = () => {
  const { user } = useContext(AuthContext);
  const [userStats, setUserStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/userstats/${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setUserStats(response.data);
      } catch (error) {
        console.error("Fetch user stats error:", error);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

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
