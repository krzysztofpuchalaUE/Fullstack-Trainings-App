import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

import "./Nav.scss";

export default function NavBar() {
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

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
          <i className="bx bxs-medal"></i>
        </div>
      </NavLink>

      <div className={"navbar-right"}>
        <NavLink
          to={authCtx.authToken ? "/trainings" : "/"}
          className={({ isActive }) => (isActive ? "link-active" : undefined)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={"navbar-element"}>
            <i className="bx bx-meteor"></i> <p>Trainings</p>
          </div>
        </NavLink>
        {authCtx.authToken && (
          <NavLink
            to={"/user-trainings"}
            className={({ isActive }) => (isActive ? "link-active" : undefined)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={"navbar-element"}>
              <i className="bx bx-face"></i>
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
              <i className="bx bx-user"></i> <p>Login</p>
            </div>
          </NavLink>
        )}
        {authCtx.authToken && (
          <div className={"navbar-element"} onClick={onLogout}>
            <i className="bx bx-user"></i> <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}
