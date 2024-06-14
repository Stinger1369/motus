import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;
