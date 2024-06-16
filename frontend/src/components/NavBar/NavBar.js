import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";
import MotContext from "../../context/MotContext"; // Import MotContext
import logo from "../../assets/images/Motus.webp";
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const { users } = useContext(UserContext);
  const { fetchWords } = useContext(MotContext); // Get fetchWords from MotContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getUserName = () => {
    if (user && users) {
      const currentUser = users.find((u) => u.pseudo === user.pseudo);
      return currentUser ? capitalizeFirstLetter(currentUser.pseudo) : null;
    }
    return null;
  };

  const handleNavigation = (path) => {
    navigate(path);
    fetchWords(); // Fetch words when navigating
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Motus" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user && (
              <li className="nav-item">
                <span className="navbar-text welcome-message">
                  Bonjour {getUserName()}
                </span>
              </li>
            )}
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/game" className="nav-link">
                    Game
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link btn btn-link logout-button"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Connexion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
