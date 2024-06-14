import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { GameProvider } from "./context/GameContext"; // Ajouter le GameProvider ici

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
