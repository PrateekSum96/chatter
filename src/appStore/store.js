import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    appUsers: userReducer,
    auth: authReducer,
  },
});
