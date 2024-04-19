import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
