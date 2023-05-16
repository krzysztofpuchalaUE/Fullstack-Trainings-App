import "./AuthForm.scss";
import Form from "../Reusable/Form";
import { setConfig } from "../../utils/requestConfig";

import useHttp from "../../hooks/useHttp";
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
  } = useForm();

  const {
    value: registerFirstName,
    setValueHandler: setRegisterFirstNameValue,
    reset: resetRegisterFirstNameInputField,
  } = useForm();

  const {
    value: registerLastName,
    setValueHandler: setRegisterLastNameValue,
    reset: resetRegisterLastNameInputField,
  } = useForm();

  const {
    value: email,
    setValueHandler: setEmailValue,
    reset: resetEmailInputField,
  } = useForm();

  let formIsValid = false;

  let validFName = false;
  let validLName = false;
  let validPassword = false;
  let validEmail = false;

  return (
    <div className={"authentication"}>
      <div className={"auth-form-container"}>
        <h2>Sign in</h2>

        <Form>
          <div className={"auth-property"}>
            <label htmlFor="first-name"> First Name </label>
            <i className={"bx bxs-user"}></i>
            <input
              type="text"
              id="first-name"
              placeholder="Enter your first name"
            />
          </div>
          <div className="auth-property">
            <label htmlFor="last-name"> Last Name </label>
            <i className={"bx bxs-user"}></i>
            <input
              type="text"
              id="last-name"
              placeholder="Enter tour last name"
            />
          </div>
          <div className={"auth-property"}>
            <label htmlFor="email"> Email </label>
            <i className={"bx bxs-envelope"}></i>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className={"auth-property"}>
            <label htmlFor="password"> Password </label>
            <i className={"bx bxs-lock"}></i>
            <input type="password" id="password" placeholder="Your password" />
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
