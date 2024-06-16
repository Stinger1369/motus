import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import MotContext from "../../context/MotContext";
import "./PlayerStats.css";

const PlayerStats = () => {
  const { user } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);
  const { words, loading, fetchWords } = useContext(MotContext);
  const [userStats, setUserStats] = useState(null);
  const [winningGames, setWinningGames] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  const fetchUserStats = async () => {
    try {
      const userStatsData = await getUser(user.id);
      setUserStats(userStatsData);

      const winningGamesResponse = await axios.get(
        "http://localhost:3000/api/walloffame/winninggames",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setWinningGames(winningGamesResponse.data);

      const leaderboardResponse = await axios.get(
        "http://localhost:3000/api/walloffame",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const filteredLeaderboard = leaderboardResponse.data.filter(
        (entry) => entry.totalScore > 0
      );
      setLeaderboard(filteredLeaderboard);
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserStats();
      fetchWords();
    }
  }, [user]);

  const calculateAverageTime = (games) => {
    if (games.length === 0) return 0;
    const totalSeconds = games.reduce((acc, game) => acc + game.seconds, 0);
    return (totalSeconds / games.length).toFixed(2);
  };

  const averageTime = calculateAverageTime(words);

  return (
    <div className="player-stats">
      <h1>Player Statistics</h1>
      <button onClick={fetchUserStats} className="refresh-button">
        Rafraîchir
      </button>
      <div className="card-container">
        <div className="card">
          {userStats && words.length > 0 ? (
            <>
              <h3>Vos statistiques</h3>
              <p>Total des points: {userStats.totalScore}</p>
              <p>Parties jouées: {words.length}</p>

              <details>
                <summary>Mots joués:</summary>
                <ul>
                  {words.map((word, index) => (
                    <li key={index}>
                      Mot: {word.word}, Longueur: {word.longueur}, Difficulté:{" "}
                      {word.difficulté}
                    </li>
                  ))}
                </ul>
              </details>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={words}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="word" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="longueur" stroke="#8884d8" />
                  <Line type="monotone" dataKey="difficulté" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <h3>Commencez une nouvelle partie</h3>
              <button onClick={() => navigate("/game")}>Nouvelle partie</button>
            </>
          )}
        </div>

        <div className="card">
          <h3>Top 10 parties gagnées en minimum de temps</h3>
          <ol>
            {winningGames.map((game, index) => (
              <li key={index}>
                <span>{game.pseudo}</span> - Score: <span>{game.score}</span>,{" "}
                {game.moves} coups, {game.seconds} secondes, (Mot:{" "}
                <span>{game.wordLength}</span> lettres)
              </li>
            ))}
          </ol>
        </div>

        <div className="card">
          <h3>
            Top des leaders score (
            {leaderboard.reduce((acc, curr) => acc + curr.totalScore, 0)})
          </h3>
          <ol>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {index + 1}. {entry.pseudo} - {entry.totalScore} points (Parties
                jouées: {entry.gamesPlayed})
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card-container">
        {leaderboard.map((entry, index) => (
          <div className="card" key={index}>
            <h3>{entry.pseudo}</h3>
            <p>Total des points: {entry.totalScore}</p>
            <p>Parties jouées: {entry.gamesPlayed}</p>
            {words.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={words}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="word" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="longueur" stroke="#8884d8" />
                  <Line type="monotone" dataKey="difficulté" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No game data available.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStats;
