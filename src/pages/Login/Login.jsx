import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { LOGIN_PAGE_IMAGE_URL } from "../../utils/Constants/constants";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <img
        src={LOGIN_PAGE_IMAGE_URL}
        alt="login-page-img"
        id="login-page-img"
      />
      <div className="login-form-container">
        <AuthForm />
        <div className="login-signup">
          Don't have an account?<Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
