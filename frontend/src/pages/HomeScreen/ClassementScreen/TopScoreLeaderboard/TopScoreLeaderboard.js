// TopScoreLeaderboard.js
import React from "react";

const TopScoreLeaderboard = ({ leaderboard }) => {
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
