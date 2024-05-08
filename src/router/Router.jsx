import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import LikedPost from "../pages/LikedPost/LikedPost";
import AppLayout from "../appLayout/AppLayout.jsx";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "../components/Auth/RequireAuth";
import UserProfile from "../pages/UserProfile/UserProfile.jsx";
import PostPage from "../pages/Post/PostPage.jsx";

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
        {
          element: <UserProfile />,
          path: "/profile/:username",
        },
        {
          element: <PostPage />,
          path: "/post/:postId",
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
