import { useEffect } from "react";
import "./App.css";
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./features/userSlice";
import { getAllPosts } from "./features/postSlice";

function App() {
  const dispatch = useDispatch();
  const userSliceStatus = useSelector((state) => state.appUsers.status);

  useEffect(() => {
    if (userSliceStatus === "idle") {
      dispatch(getAllUsers());
      dispatch(getAllPosts());
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
