// HomeScreen.js
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import TopScoreLeaderboard from "./ClassementScreen/TopScoreLeaderboard/TopScoreLeaderboard";
import TopWinningGames from "./ClassementScreen/TopWinningGames/TopWinningGames";
import UserStats from "./ClassementScreen/UserStats/UserStats";
import "./HomeScreen.css";

const HomeScreen = () => {
  const { users } = useContext(UserContext);

  return (
    <div>
      <h1>Accueil</h1>
      <h2>Top Classement</h2>
      <div className="card-container">
        <TopScoreLeaderboard />
        <TopWinningGames />
        <UserStats />
      </div>

    </div>
  );
};

export default HomeScreen;
