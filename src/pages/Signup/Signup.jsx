import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { SIGNUP_PAGE_IMAGE_URL } from "../../utils/Constants/constants";
import "./Signup.css";

const Signup = () => {
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
