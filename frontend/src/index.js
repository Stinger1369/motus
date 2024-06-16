import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { GameProvider } from "./context/GameContext";
import { MotProvider } from "./context/MotContext"; // Ajouter le MotProvider ici

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <GameProvider>
          <MotProvider>
            <App />
          </MotProvider>
        </GameProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
