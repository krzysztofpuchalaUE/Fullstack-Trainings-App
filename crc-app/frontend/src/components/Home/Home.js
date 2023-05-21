import { Link } from "react-router-dom";
import "./Home.scss";
import { authContext } from "../../context/authContext";
import { useContext } from "react";

export default function Home() {
  const authCtx = useContext(authContext);

  return (
    <div className={"home-container"}>
      {!authCtx.authToken && (
        <div className={"home-h1"}>
          <h1>Login to start</h1>
          <i class="bx bx-baseball"></i>
        </div>
      )}
      {authCtx.authToken && (
        <div className={"home-h1"}>
          <h1>Go and see trainings</h1>
          <i class="bx bx-rocket"></i>
        </div>
      )}
      <Link
        to={authCtx.authToken ? "/trainings" : "/auth/login"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={"home-login"}>
          <h2>{authCtx.authToken ? "Click me :D" : "Click to login"}</h2>
        </div>
      </Link>
    </div>
  );
}
