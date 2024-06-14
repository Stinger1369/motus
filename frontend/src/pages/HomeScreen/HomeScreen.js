import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const HomeScreen = () => {
  const { users } = useContext(UserContext);
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

  return (
    <div>
      <h1>Accueil</h1>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.pseudo}</li>
        ))}
      </ul>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.login} - {entry.Scores} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
