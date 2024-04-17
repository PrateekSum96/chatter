import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./AuthForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginButtonPressed } from "../../features/authSlice.js";

const AuthForm = ({ signup }) => {
  const [eyeOne, setEyeOne] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store?.auth?.isLoggedIn);
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogIn = () => {
    dispatch(loginButtonPressed());
  };
  return (
    <div className="auth-form">
      <img src="./chatter-logo.png" alt="auth-logo-img" id="auth-logo-img" />
      <p> {signup ? "Signup" : "Login"}</p>
      <form
        className="auth-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogIn();
        }}
      >
        {signup && (
          <div>
            <label htmlFor="first-name">
              First Name<span className="asterisk">&#42;</span>
            </label>
            <input type="text" id="first-name" className="auth-form-input" />
          </div>
        )}
        {signup && (
          <div>
            <label htmlFor="last-name">
              Last Name<span className="asterisk">&#42;</span>
            </label>
            <input type="text" id="last-name" className="auth-form-input" />
          </div>
        )}
        <div>
          <label htmlFor="email">
            Email<span className="asterisk">&#42;</span>
          </label>
          <input type="text" id="email" className="auth-form-input" />
        </div>
        {signup && (
          <div>
            <label htmlFor="user-name">
              User Name<span className="asterisk">&#42;</span>
            </label>
            <input type="text" id="user-name" className="auth-form-input" />
          </div>
        )}

        <div>
          <label htmlFor="password">
            Password<span className="asterisk">&#42;</span>
          </label>
          <input
            type={eyeOne ? "text" : "password"}
            id="password"
            className="auth-form-input"
          />
          <div className="eye-container" onClick={() => setEyeOne(!eyeOne)}>
            {eyeOne ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        {signup && (
          <div>
            <label htmlFor="confirm-password">
              Confirm Password<span className="asterisk">&#42;</span>
            </label>
            <input
              type={eyeTwo ? "text" : "password"}
              id="confirm-password"
              className="auth-form-input"
            />
            <div className="eye-container" onClick={() => setEyeTwo(!eyeTwo)}>
              {eyeTwo ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        )}

        <button className="auth-button" id="form-button">
          {signup ? "Sign Up" : "Log In"}
        </button>
      </form>
      {!signup && <button className="auth-button">Guest Mode</button>}
    </div>
  );
};

export default AuthForm;
