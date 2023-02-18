import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "src/constants/routes";
import { UserContext } from "src/contexts/userContext";

const Gnb = () => {
  const { user, isLoading, logout } = useContext(UserContext);

  return (
    <div>
      {isLoading && <span>Loading</span>}
      {!isLoading && user && <button onClick={logout}>logout</button>}
      <ul>
        <li>
          <Link to={routes.Home}>Home</Link>
        </li>
        <li>
          <Link to={routes.SignUp}>SignUp</Link>
        </li>
        <li>
          <Link to={routes.Login}>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Gnb;
