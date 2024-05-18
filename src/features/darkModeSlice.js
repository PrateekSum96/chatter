import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "colorMode",
  initialState: {
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
  },
  reducers: {
    onDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(action.payload));
    },
  },
});

export const { onDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
