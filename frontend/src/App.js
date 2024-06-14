import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import Login from "./pages/LoginScreen/LoginScreen";
import Register from "./pages/RegisterScreen/RegisterScreen";
import GameScreen from "./pages/GameScreen/GameScreen";
import RandomGameBoardScreen from "./components/RandomGameBoardScreen/RandomGameBoardScreen"; // Import new screen
import SelectedDifGameBoardScreen from "./components/SelectedDifGameBoardScreen/SelectedDifGameBoardScreen"; // Import new screen
import User from "./components/User";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import Leaderboard from "./pages/LeaderboardScreen/LeaderboardScreen";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GameScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/randomgameboard"
          element={
            <PrivateRoute>
              <RandomGameBoardScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/selecteddifgameboard"
          element={
            <PrivateRoute>
              <SelectedDifGameBoardScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
