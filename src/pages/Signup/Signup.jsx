import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AuthForm from "../../components/AuthForm/AuthForm";
import { SIGNUP_PAGE_IMAGE_URL } from "../../utils/Constants/constants";
import Loading from "../../components/Loading/Loading";

import "./Signup.css";

const Signup = () => {
  const authStatus = useSelector((store) => store.auth.status);
  if (authStatus === "loading") {
    return <Loading />;
  }
  return (
    <div className="signup">
      <div className="signup-form-container">
        <AuthForm signup />
        <div className="login-signup">
          Already have an account?<Link to="/login">Login</Link>
        </div>
      </div>
      <img
        src={SIGNUP_PAGE_IMAGE_URL}
        alt="signup-page-img"
        id="signup-page-img"
      />
    </div>
  );
};

export default Signup;
