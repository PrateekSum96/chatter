import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginButtonPressed: (state) => {
      state.isLoggedIn = true;
    },
    logoutButtonPressed: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginButtonPressed, logoutButtonPressed } = authSlice.actions;
export default authSlice.reducer;
