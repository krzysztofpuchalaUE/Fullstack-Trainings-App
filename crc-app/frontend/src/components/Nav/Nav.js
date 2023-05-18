import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

import "./Nav.scss";

export default function NavBar() {
  const [displayLogIn, setDisplayLogIn] = useState(false);
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authCtx.authToken);
  });

  const onLogout = () => {
    authCtx.authToken = "";
    navigate("/auth/login");
  };

  return (
    <div className={"navbar"}>
      <NavLink
        to={"/"}
        style={{ textDecoration: "none", color: "inherit" }}
        className={({ isActive }) => (isActive ? "link-active" : undefined)}
        end
      >
        <div className={"navbar-left"}>
          <h2>Trainings App</h2>
        </div>
      </NavLink>

      <div className={"navbar-right"}>
        <NavLink
          to={authCtx.authToken ? "/trainings" : "/"}
          className={({ isActive }) => (isActive ? "link-active" : undefined)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={"navbar-element"}>
            <i class="bx bx-meteor"></i> <p>Trainings</p>
          </div>
        </NavLink>
        {authCtx.authToken && (
          <NavLink
            to={"/user-trainings"}
            className={({ isActive }) => (isActive ? "link-active" : undefined)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={"navbar-element"}>
              <i class="bx bx-face"></i>
              <p>User trainings</p>
            </div>
          </NavLink>
        )}
        {!authCtx.authToken && (
          <NavLink
            to={"/auth/login"}
            className={({ isActive }) => (isActive ? "link-active" : undefined)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={"navbar-element"}>
              <i class="bx bx-user"></i> <p>Login</p>
            </div>
          </NavLink>
        )}
        {authCtx.authToken && (
          <div className={"navbar-element"} onClick={onLogout}>
            <i class="bx bx-user"></i> <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}
