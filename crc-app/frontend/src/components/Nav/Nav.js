import "./Nav.scss";

export default function NavBar() {
  return (
    <div className={"navbar"}>
      <div className={"navbar-left"}>
        <h2>Trainings App</h2>
      </div>
      <div className={"navbar-right"}>
        <div className={"navbar-element"}>
          <i class="bx bx-meteor"></i> <p>Trainings</p>
        </div>
        <div className={"navbar-element"}>
          <i class="bx bx-face"></i>
          <p>User trainings</p>
        </div>
        <div className={"navbar-element"}>
          <i class="bx bx-user"></i> <p>Login</p>
        </div>
      </div>
    </div>
  );
}
