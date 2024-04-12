import { useEffect } from "react";
import "./App.css";
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const userSliceStatus = useSelector((state) => state.appUsers.status);
  console.log(userSliceStatus);
  useEffect(() => {
    if (userSliceStatus === "idle") {
      dispatch(getAllUsers());
    }
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
