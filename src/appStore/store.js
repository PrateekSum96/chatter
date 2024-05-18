import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postSlice";
import bookmarkReducer from "../features/bookmarkSlice";
import postModalReducer from "../features/postModalSlice";
import darkModeReducer from "../features/darkModeSlice";

export const store = configureStore({
  reducer: {
    appUsers: userReducer,
    appPosts: postsReducer,
    auth: authReducer,
    appBookmarks: bookmarkReducer,
    postModal: postModalReducer,
    colorMode: darkModeReducer,
  },
});
