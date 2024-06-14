import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const { getUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(id);
        setUserData(user);
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };

    fetchUser();
  }, [id, getUser]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>Pseudo: {userData.pseudo}</p>
      <p>Numéro de Sécurité Sociale: {userData.numero_secu}</p>
    </div>
  );
};

export default User;
