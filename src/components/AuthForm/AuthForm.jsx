import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import "./AuthForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin, handleUserSignUp } from "../../features/authSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import ShowGuestUser from "./ShowGuestUser.jsx";

const AuthForm = ({ signup }) => {
  //hooks
  const [eyeOne, setEyeOne] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);
  const [showGuestUser, setShowGuestUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const initialUserDataState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialUserDataState);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store) => store?.auth?.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const returnLocation = location?.state?.from?.pathname || "/";
      navigate(returnLocation);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      setUserData(initialUserDataState);
    };
    // eslint-disable-next-line
  }, []);

  //function
  const { firstName, lastName, email, username, password, confirmPassword } =
    userData;

  const handleLogIn = (email, password) => {
    dispatch(handleUserLogin({ email, password }));
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      dispatch(
        handleUserSignUp({ firstName, lastName, username, email, password })
      );
    } else {
      toast.error("Passwords are not matching!");
    }
  };

  return (
    <div className="auth-form">
      <img src="./chatter-logo.png" alt="auth-logo-img" id="auth-logo-img" />
      <p> {signup ? "Signup" : "Login"}</p>
      <form
        className="auth-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          signup ? handleSignUp() : handleLogIn(email, password);
        }}
      >
        {signup && (
          <div>
            <label htmlFor="first-name">
              First Name<span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              required
              id="first-name"
              className="auth-form-input"
              value={firstName}
              onChange={(e) =>
                setUserData((data) => ({ ...data, firstName: e.target.value }))
              }
            />
          </div>
        )}
        {signup && (
          <div>
            <label htmlFor="last-name">
              Last Name<span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              required
              id="last-name"
              className="auth-form-input"
              value={lastName}
              onChange={(e) =>
                setUserData((data) => ({ ...data, lastName: e.target.value }))
              }
            />
          </div>
        )}
        <div>
          <label htmlFor="email">
            Email<span className="asterisk">&#42;</span>
          </label>
          <input
            type="email"
            required
            id="email"
            className="auth-form-input"
            value={email}
            onChange={(e) =>
              setUserData((data) => ({ ...data, email: e.target.value }))
            }
          />
        </div>
        {signup && (
          <div>
            <label htmlFor="user-name">
              User Name<span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              required
              id="user-name"
              className="auth-form-input"
              value={username}
              onChange={(e) =>
                setUserData((data) => ({ ...data, username: e.target.value }))
              }
            />
          </div>
        )}

        <div>
          <label htmlFor="password">
            Password<span className="asterisk">&#42;</span>
          </label>
          <input
            type={eyeOne ? "text" : "password"}
            required
            id="password"
            className="auth-form-input"
            value={password}
            onChange={(e) =>
              setUserData((data) => ({ ...data, password: e.target.value }))
            }
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
              required
              id="confirm-password"
              className="auth-form-input"
              value={confirmPassword}
              onChange={(e) =>
                setUserData((data) => ({
                  ...data,
                  confirmPassword: e.target.value,
                }))
              }
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
      <div className="guest-option-auth-form">
        {!signup && showGuestUser && (
          <div
            className="guest-user-cross"
            onClick={() => setShowGuestUser(!showGuestUser)}
          >
            &#10006;
          </div>
        )}
        {!signup && showGuestUser && (
          <div className="guest-user-auth-form">
            <ShowGuestUser
              setUserData={setUserData}
              handleLogIn={handleLogIn}
            />
          </div>
        )}
        {!signup && (
          <button
            className="auth-button"
            onClick={() => setShowGuestUser(!showGuestUser)}
          >
            Guest Mode
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
