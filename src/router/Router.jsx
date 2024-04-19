import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import LikedPost from "../pages/LikedPost/LikedPost";
import AppLayout from "../appLayout/AppLayout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "../components/Auth/RequireAuth";

const Router = () => {
  const appRouter = createBrowserRouter([
    {
      element: (
        <RequireAuth>
          <AppLayout />
        </RequireAuth>
      ),
      path: "/",
      children: [
        {
          element: <Home />,
          path: "/",
        },
        {
          element: <Explore />,
          path: "/explore",
        },
        {
          element: <Bookmarks />,
          path: "/bookmarks",
        },
        {
          element: <LikedPost />,
          path: "/liked-post",
        },
      ],
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Signup />,
      path: "/signup",
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
      <ToastContainer
        position="bottom-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Router;
