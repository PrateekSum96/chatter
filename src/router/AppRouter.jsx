import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import UserFeed from "../pages/userFeed/UserFeed";
import Explore from "../pages/explore/Explore";
import LikedPage from "../pages/likedPage/LikedPage";
import BookmarkPage from "../pages/bookmarks/BookmarkPage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <UserFeed />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/likedPage",
          element: <LikedPage />,
        },
        {
          path: "/bookmark",
          element: <BookmarkPage />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
