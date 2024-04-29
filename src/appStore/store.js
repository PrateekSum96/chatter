import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postSlice";
import bookmarkReducer from "../features/bookmarkSlice";

export const store = configureStore({
  reducer: {
    appUsers: userReducer,
    appPosts: postsReducer,
    auth: authReducer,
    appBookmarks: bookmarkReducer,
  },
});
