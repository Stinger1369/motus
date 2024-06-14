import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!loading && user && user.token) {
        console.log("Fetching users with token:", user.token);
        try {
          const response = await axios.get("http://localhost:3000/api/users", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Fetch users error:", error);
        }
      }
    };

    fetchUsers();
  }, [user, loading]);

  const getUser = async (id) => {
    if (user && user.token) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Get user error:", error);
        throw error;
      }
    } else {
      throw new Error("User not authenticated");
    }
  };

  const createUser = async (pseudo, password, numeroSecu) => {
    console.log("Sending data to create user:", {
      pseudo,
      password,
      numero_secu: numeroSecu,
    }); // Log the data being sent
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        pseudo,
        password,
        numero_secu: numeroSecu, // Ensure the key matches the backend
      });
      console.log("Create user response:", response.data); // Log the response data
      return response.data;
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ getUser, createUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
