// HomeScreen.js
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import TopScoreLeaderboard from "./ClassementScreen/TopScoreLeaderboard/TopScoreLeaderboard";
import TopWinningGames from "./ClassementScreen/TopWinningGames/TopWinningGames";
import UserStats from "./ClassementScreen/UserStats/UserStats";
import "./HomeScreen.css";
const HomeScreen = () => {
  const { users } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [winningGames, setWinningGames] = useState([]);
  const [userStats, setUserStats] = useState(null);

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

    const fetchWinningGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/winninggames",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setWinningGames(response.data);
      } catch (error) {
        console.error("Fetch winning games error:", error);
      }
    };

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
      fetchLeaderboard();
      fetchWinningGames();
      fetchUserStats();
    }
  }, [user]);

  return (
    <div>
      <h1>Accueil</h1>
      <h2>Top Classement</h2>
      <div className="card-container">
        <TopScoreLeaderboard leaderboard={leaderboard} />
        <TopWinningGames winningGames={winningGames} />
        <UserStats userStats={userStats} user={user} />
      </div>
    </div>
  );
};

export default HomeScreen;
