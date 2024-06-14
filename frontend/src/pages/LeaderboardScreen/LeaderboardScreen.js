import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Leaderboard = () => {
  const { user } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/leaderboard', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Fetch leaderboard error:', error);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  return (
    <div>
      <h1>Leaderboard</h1>
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

export default Leaderboard;
