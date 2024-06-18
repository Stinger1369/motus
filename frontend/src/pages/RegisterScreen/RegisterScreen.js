import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterScreen.css"; // Vous pouvez ajouter des styles personnalisés ici

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
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="card-title text-center mb-4">S'inscrire</h1>
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
          <div className="mb-3">
            <label htmlFor="numeroSecu" className="form-label">
              Numéro de Sécurité Sociale
            </label>
            <input
              type="text"
              className="form-control"
              id="numeroSecu"
              value={numeroSecu}
              onChange={(e) => setNumeroSecu(e.target.value)}
              placeholder="Numéro de Sécurité Sociale"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
