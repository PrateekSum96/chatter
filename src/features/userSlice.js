import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "appUsers/getAllUsers",
  async () => {
    const response = await fetch("api/users", {
      method: "GET",
    });
    const result = await response.json();
    return result;
  }
);

const initialState = {
  allUsers: [],
  status: "idle", //"loading"||"error"||"succeeded"
  error: null,
};

const userSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to get all users";
      });
  },
});

export default userSlice.reducer;
