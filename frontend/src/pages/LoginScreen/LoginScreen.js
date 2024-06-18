import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginScreen.css"; // Vous pouvez ajouter des styles personnalisés ici

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
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="card-title text-center mb-4">Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="pseudo" className="form-label">
              Pseudo
            </label>
            <input
              type="text"
              className="form-control"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Pseudo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
