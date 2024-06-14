import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/Motus.webp";
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="NavBar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Motus" className="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/game" className="nav-link">
                Game
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Connexion
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Inscription
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
