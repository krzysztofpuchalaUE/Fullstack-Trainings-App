import "./AuthForm.scss";
import Form from "../Reusable/Form";
import { setConfig } from "../../utils/requestConfig";

import useHttp from "../../hooks/useHttp";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const link = window.location.href.split("/").at(-1);
  const [reloadForm, setReloadForm] = useState(true);
  const [userEmialIsValid, setUserEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [registerFirstNameIsValid, setRegisterFirstNameIsvalid] =
    useState(true);
  const [registerLastNameIsValid, setRegisterLastNameIsValid] = useState(true);
  const { requestForData: loginUser } = useHttp((value) => value);
  const { requestForData: registerUser } = useHttp((value) => value);

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
    const loginUserAuth = (data) => {
      loginUser(
        "http://localhost:8800/login",
        setConfig("POST", {
          data,
        })
      );
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
    }

    // if (!validEmail) resetEmailInputField();
    // if (!validPassword) resetPasswordInputField();
    // if (!validFName) resetRegisterFirstNameInputField();
    // if (!validLName) resetRegisterLastNameInputField();

    setReloadForm((prev) => !prev);
  };

  return (
    <div className={"authentication"}>
      <div className={"auth-form-container"}>
        <h2>Sign in</h2>

        <Form onSubmit={onRegisterFormHandler}>
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
            <p className={"forgot-password"}>Forgot your password?</p>
            <div></div>
            <p className="no-account">
              You don't have an account? <a>Sign in</a>
            </p>
          </div>
          <button type="submit">Register</button>
        </Form>
      </div>
    </div>
  );
}
