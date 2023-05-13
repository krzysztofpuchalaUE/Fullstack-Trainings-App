import "./AuthForm.scss";
import Form from "../Reusable/Form";

export default function AuthForm() {
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
