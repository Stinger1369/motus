import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import UserContext from "../../../../context/UserContext";
import MotContext from "../../../../context/MotContext";
import "./UserStats.css";

const UserStats = () => {
  const { user } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);
  const { words, fetchWords } = useContext(MotContext);
  const [userStats, setUserStats] = useState(null);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false); // New state to track loading

  const fetchUserStats = async () => {
    try {
      const userStatsData = await getUser(user.id);
      setUserStats(userStatsData);
      await fetchWords(); // Make sure this is awaited
    } catch (error) {
      console.error("Fetch user stats error:", error);
    } finally {
      setIsLoaded(true); // Set loading to true after fetch
    }
  };

  useEffect(() => {
    if (user && !isLoaded) {
      fetchUserStats();
    }
  }, [user, getUser]); // Do not include fetchWords in dependencies

  const calculateAverageTime = (games) => {
    if (games.length === 0) return 0;
    const totalSeconds = games.reduce((acc, game) => acc + game.seconds, 0);
    return (totalSeconds / games.length).toFixed(2);
  };

  const averageTime = calculateAverageTime(words);

  return (
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
