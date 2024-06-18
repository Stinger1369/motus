import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import TopScoreLeaderboard from "./ClassementScreen/TopScoreLeaderboard/TopScoreLeaderboard";
import TopWinningGames from "./ClassementScreen/TopWinningGames/TopWinningGames";
import UserStats from "./ClassementScreen/UserStats/UserStats";
import MotusGame from "./MotusGame";
import "./HomeScreen.css";

const HomeScreen = () => {
  const { users } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  return (
    <div>

      {user ? (
        <>
          <h2>Top Classement</h2>
          <div className="card-container">
            <TopScoreLeaderboard />
            <TopWinningGames />
            <UserStats />
          </div>
        </>
      ) : (
        <>
          <p>
            Veuillez vous connecter pour voir les détails et jouer aux jeux.
          </p>
          <MotusGame />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
