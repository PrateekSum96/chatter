import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllUsers = createAsyncThunk(
  "appUsers/getAllUsers",
  async () => {
    try {
      const response = await fetch("api/users", {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
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

export const editUserInfo = createAsyncThunk(
  "appUsers/editUserInfo",
  async (userData) => {
    const encodedToken = localStorage.getItem("token");
    const response = await fetch("/api/users/edit", {
      method: "POST",
      headers: {
        authorization: encodedToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
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
  showLayover: false,
  toggleEdit: false,
};

const userSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {
    setLayover: (state, action) => {
      state.showLayover = action.payload;
    },
    updateAllUserList: (state, action) => {
      const userInfo = action.payload;
      const updatedUserList = state.allUsers?.map((user) => {
        if (user?._id === userInfo?._id) {
          user.avatarUrl = userInfo.avatarUrl;
          return { ...user, avatarUrl: userInfo.avatarUrl };
        }
        return user;
      });
      state.allUsers = updatedUserList;
    },
  },
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
      .addCase(getAllUsers.rejected, (state, action) => {
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
      })
      //editUserInfo
      .addCase(editUserInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.error = null;
        state.toggleEdit = !state.toggleEdit;
        toast.success("Details updated!");
      })
      .addCase(editUserInfo.rejected, (state) => {
        state.status = "error";
        state.error = "Failed to edit the user info";
        toast.error("Failed to update details!");
      });
  },
});

export const { setLayover, updateAllUserList } = userSlice.actions;

export default userSlice.reducer;
