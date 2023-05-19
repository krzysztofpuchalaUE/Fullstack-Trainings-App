import "./AuthForm.scss";
import Form from "../Reusable/Form";
import { setConfig } from "../../utils/requestConfig";

import useHttp from "../../hooks/useHttp";
import useForm from "../../hooks/useForm";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";

export default function AuthForm() {
  const mode = window.location.href.split("/").at(-1);
  const [reloadForm, setReloadForm] = useState(true);
  const [userEmialIsValid, setUserEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [registerFirstNameIsValid, setRegisterFirstNameIsvalid] =
    useState(true);
  const [registerLastNameIsValid, setRegisterLastNameIsValid] = useState(true);
  const { requestForData: loginUser } = useHttp((value) => value);
  const { requestForData: registerUser } = useHttp((value) => value);
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const {
    value: password,
    setValueHandler: setPasswordValue,
    reset: resetPasswordInputField,
  } = useForm((value) => value);

  const {
    value: registerFirstName,
    setValueHandler: setRegisterFirstNameValue,
    reset: resetRegisterFirstNameInputField,
  } = useForm((value) => value);

  const {
    value: registerLastName,
    setValueHandler: setRegisterLastNameValue,
    reset: resetRegisterLastNameInputField,
  } = useForm((value) => value);

  const {
    value: email,
    setValueHandler: setEmailValue,
    reset: resetEmailInputField,
  } = useForm((value) => value);

  let formIsValid = false;

  let validFName = false;
  let validLName = false;
  let validPassword = false;
  let validEmail = false;

  if (registerFirstName.trim() !== "") validFName = true;
  if (registerLastName.trim() !== "") validLName = true;
  if (email.includes("@")) validEmail = true;
  if (password.length > 6) validPassword = true;

  useEffect(() => {
    if (validFName) setRegisterFirstNameIsvalid(true);
    if (validLName) setRegisterLastNameIsValid(true);
    if (validEmail) setUserEmailIsValid(true);
    if (validPassword) setPasswordIsValid(true);
  }, [reloadForm]);

  const onLoginFormHandler = (e) => {
    e.preventDefault();
    const loginData = [email, password];
    const loginUserAuth = async (data) => {
      const response = await loginUser(
        "http://localhost:8800/auth/login",
        setConfig("POST", {
          data,
        })
      );
      setTimeout(() => {
        navigate("/trainings");
      }, 300);
      return authCtx.onSetToken(response.authToken);
    };
    loginUserAuth(loginData);
    resetEmailInputField();
    resetPasswordInputField();
  };

  const onRegisterFormHandler = (e) => {
    e.preventDefault();

    if (validFName && validLName && validEmail && validPassword)
      formIsValid = true;

    if (!validFName) setRegisterFirstNameIsvalid(false);
    if (!validLName) setRegisterLastNameIsValid(false);
    if (!validEmail) setUserEmailIsValid(false);
    if (!validPassword) setPasswordIsValid(false);

    if (formIsValid) {
      const data = { registerFirstName, registerLastName, email, password };
      const registerUserAuth = () => {
        registerUser(
          "http://localhost:8800/auth/signup",
          setConfig("POST", {
            data,
          })
        );
      };
      registerUserAuth();
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    }

    if (!validEmail) resetEmailInputField();
    if (!validPassword) resetPasswordInputField();
    if (!validFName) resetRegisterFirstNameInputField();
    if (!validLName) resetRegisterLastNameInputField();

    setReloadForm((prev) => !prev);
  };

  const nameJsx = (
    <>
      <div className={"auth-property"}>
        <label htmlFor="first-name"> First Name </label>
        <i className={"bx bxs-user"}></i>
        <input
          type="text"
          id="first-name"
          placeholder="Enter your first name"
          value={registerFirstName}
          onChange={setRegisterFirstNameValue}
        />
        {registerFirstNameIsValid === false && (
          <p className={"invalid-info"}>First Name must not be empty</p>
        )}
      </div>
      <div className="auth-property">
        <label htmlFor="last-name"> Last Name </label>
        <i className={"bx bxs-user"}></i>
        <input
          type="text"
          id="last-name"
          placeholder="Enter tour last name"
          value={registerLastName}
          onChange={setRegisterLastNameValue}
        />
        {registerLastNameIsValid === false && (
          <p className={"invalid-info"}>Last Name must not be empty</p>
        )}
      </div>
    </>
  );

  return (
    <div className={"authentication"}>
      <div className={"auth-form-container"}>
        {mode === "signup" && <h2>Sign up</h2>}
        {mode === "login" && <h2>Welcome back</h2>}

        <Form
          onSubmit={
            mode === "signup" ? onRegisterFormHandler : onLoginFormHandler
          }
        >
          {mode === "signup" && nameJsx}
          <div className={"auth-property"}>
            <label htmlFor="email"> Email </label>
            <i className={"bx bxs-envelope"}></i>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmailValue}
            />
            {userEmialIsValid === false && (
              <p className={"invalid-info"}>Email must contains '@'</p>
            )}
          </div>
          <div className={"auth-property"}>
            <label htmlFor="password"> Password </label>
            <i className={"bx bxs-lock"}></i>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={setPasswordValue}
            />
            {passwordIsValid === false && (
              <p className={"invalid-info"}>
                Password must be at least 7 characters
              </p>
            )}
          </div>
          <div className={"links"}>
            {mode === "login" && (
              <>
                <p className={"forgot-password"}>Forgot your password?</p>

                <div></div>
                <Link
                  to={"/auth/signup"}
                  className={({ isActive }) =>
                    isActive ? "link-active" : undefined
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p className="no-account">
                    You don't have an account? <a>Sign up</a>
                  </p>
                </Link>
              </>
            )}
          </div>
          <button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </Form>
      </div>
    </div>
  );
}
