import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LoginScreen = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(pseudo, password);
      navigate("/game");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Pseudo"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginScreen;
