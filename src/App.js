import { useEffect } from "react";
import "./App.css";
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./features/userSlice";
import { verifyUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const userSliceStatus = useSelector((state) => state.appUsers.status);

  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    if (userSliceStatus === "idle") {
      dispatch(getAllUsers());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (encodedToken) {
      dispatch(verifyUser());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
