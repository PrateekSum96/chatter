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

export const getAUser = createAsyncThunk(
  "appUsers/getAUser",
  async (username) => {
    const response = await fetch(`/api/users/${username}`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  }
);

export const getAllPostsOfAUser = createAsyncThunk(
  "appUsers/getAllPostsOfAUser",
  async (username) => {
    const response = await fetch(`/api/posts/user/${username}`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  }
);

const initialState = {
  allUsers: [],
  user: null,
  allPostsUser: [],
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
      })
      //getAUser
      .addCase(getAUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAUser.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to get the user";
      })
      //getAllPostsOfAUser
      .addCase(getAllPostsOfAUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllPostsOfAUser.fulfilled, (state, action) => {
        state.allPostsUser = action.payload.posts;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAllPostsOfAUser.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to get the user";
      });
  },
});

export default userSlice.reducer;
