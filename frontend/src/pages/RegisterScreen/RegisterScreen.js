import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const RegisterScreen = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [numeroSecu, setNumeroSecu] = useState("");
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(pseudo, password, numeroSecu);
      navigate("/login");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <h1>S'inscrire</h1>
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
        <input
          type="text"
          value={numeroSecu}
          onChange={(e) => setNumeroSecu(e.target.value)}
          placeholder="Numéro de Sécurité Sociale"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterScreen;
