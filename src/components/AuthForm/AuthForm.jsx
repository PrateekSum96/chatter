import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import "./AuthForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUserLogin, handleUserSignUp } from "../../features/authSlice.js";
import { useNavigate } from "react-router-dom";
import ShowGuestUser from "./ShowGuestUser.jsx";
import { validateData } from "../../utils/Validate/validate.js";
import img1 from "../../asset/chatter-logo.png";

const AuthForm = ({ signup }) => {
  return (
    <div className="auth-form">
      <img src={img1} alt="auth-logo-img" id="auth-logo-img" />
      <p> {signup ? "Signup" : "Login"}</p>
      <FormComponent signup={signup} />
      <GuestComponent signup={signup} />
    </div>
  );
};

const FormComponent = ({ signup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eyeOne, setEyeOne] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const initialUserDataState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialUserDataState);
  const isLoggedIn = useSelector((store) => store?.auth?.isLoggedIn);
  const { firstName, lastName, email, username, password, confirmPassword } =
    userData;

  useEffect(() => {
    return () => {
      setUserData(initialUserDataState);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // const returnLocation = location?.state?.from?.pathname || "/";
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    toast.error(errorMsg);
  }, [errorMsg]);

  //function
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
  const handleSubmit = () => {
    if (signup && password !== confirmPassword) {
      toast.error("Passwords are not matching!");
      return;
    }
    const validateMsg = signup && validateData(email, password);
    if (!validateMsg) {
      signup ? handleSignUp() : handleLogIn(email, password);
    } else {
      setErrorMsg(validateMsg);
    }
  };
  return (
    <div>
      <form
        className="auth-form-container"
        onSubmit={(e) => {
          e.preventDefault();
          // signup ? handleSignUp() : handleLogIn(email, password);
          handleSubmit();
        }}
      >
        {signup && (
          <div>
            <label htmlFor="first-name">
              First Name<span className="asterisk">&#42;</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
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
              placeholder="Last Name"
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
            placeholder="Email"
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
              placeholder="Username"
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
            placeholder="Password"
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
              placeholder="Confirm Password"
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
    </div>
  );
};

const GuestComponent = ({ signup }) => {
  const [showGuestUserBox, setShowGuestUserBox] = useState(false);
  return (
    <div className="guest-option-auth-form">
      {!signup && showGuestUserBox && (
        <div
          className="guest-user-cross"
          onClick={() => setShowGuestUserBox(!showGuestUserBox)}
        >
          &#10006;
        </div>
      )}
      {!signup && showGuestUserBox && (
        <div className="guest-user-auth-form">
          <ShowGuestUser />
        </div>
      )}
      {!signup && (
        <button
          className="auth-button"
          onClick={() => setShowGuestUserBox(!showGuestUserBox)}
        >
          Guest Mode
        </button>
      )}
    </div>
  );
};

export default AuthForm;
