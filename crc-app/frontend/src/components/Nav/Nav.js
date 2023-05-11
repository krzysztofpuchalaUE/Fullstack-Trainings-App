import { NavLink } from "react-router-dom";

import "./Nav.scss";

export default function NavBar() {
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
          to={"/trainings"}
          className={({ isActive }) => (isActive ? "link-active" : undefined)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={"navbar-element"}>
            <i class="bx bx-meteor"></i> <p>Trainings</p>
          </div>
        </NavLink>
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
        <NavLink
          to={"/auth?mode=login"}
          className={({ isActive }) => (isActive ? "link-active" : undefined)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={"navbar-element"}>
            <i class="bx bx-user"></i> <p>Login</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
