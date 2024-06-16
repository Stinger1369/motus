import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const MotContext = createContext();

export const MotProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    if (user && user.token) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/mots/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setWords(response.data);
      } catch (error) {
        console.error("Fetch words error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWords();
  }, [user]);

  return (
    <MotContext.Provider value={{ words, loading, fetchWords }}>
      {children}
    </MotContext.Provider>
  );
};

export default MotContext;
