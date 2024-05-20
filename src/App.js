import { useEffect } from "react";
import "./App.css";
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./features/userSlice";
import { verifyUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();
  const userSliceStatus = useSelector((state) => state.appUsers.status);
  const darkMode = useSelector((store) => store.colorMode.darkMode);
  const encodedToken = localStorage.getItem("token");

  useEffect(() => {
    if (userSliceStatus === "idle") {
      dispatch(getAllUsers());
    }
    if (encodedToken) {
      dispatch(verifyUser());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  //className={`App ${darkMode ? "dark" : "light"}`}
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
