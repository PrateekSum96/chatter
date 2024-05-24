import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get-All-Users
export const getAllUsers = createAsyncThunk(
  "appUsers/getAllUsers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("api/users", {
        method: "GET",
      });
      if (response?.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        if (error?.message) {
          throw new Error(error?.message || "network error");
        }
        return rejectWithValue(
          error?.errors[0] ? error.errors[0] : "Unknown error"
        );
      }
    } catch (error) {
      console.error(error?.message || error);
      return rejectWithValue(error?.message || "Network error");
    }
  }
);

//GET-A-User
export const getAUser = createAsyncThunk(
  "appUsers/getAUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: "GET",
      });
      if (response?.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();

        if (error?.message) {
          throw new Error(error.message || "Network error");
        }
        return rejectWithValue("Invalid Username or Network error");
      }
    } catch (error) {
      console.error(error?.message || error);
      return rejectWithValue(
        error?.message || "Invalid Username or Network error"
      );
    }
  }
);

//Get-All-Posts-Of-User

export const getAllPostsOfAUser = createAsyncThunk(
  "appUsers/getAllPostsOfAUser",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/user/${username}`, {
        method: "GET",
      });
      if (response?.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        if (error?.message) {
          throw new Error(error.message || "Network error");
        }
        return rejectWithValue("Invalid Username or Network error");
      }
    } catch (error) {
      console.error(error?.message || error);
      return rejectWithValue(
        error?.message || "Invalid Username or Network error"
      );
    }
  }
);

//Edit-User-Info
export const editUserInfo = createAsyncThunk(
  "appUsers/editUserInfo",
  async ({ userData }, { rejectWithValue }) => {
    const encodedToken = localStorage.getItem("token");
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          authorization: encodedToken,
        },
        body: JSON.stringify({ userData }),
      });

      if (response?.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        if (error?.message) {
          throw new Error(error?.message || "network error");
        }
        return rejectWithValue(
          error?.errors[0] ? error.errors[0] : "Unknown error"
        );
      }
    } catch (error) {
      console.error(error?.message || error);
      return rejectWithValue(
        error?.message || "Invalid token or Network error"
      );
    }
  }
);

const initialState = {
  allUsers: [],
  user: null,
  allPostsUser: [],
  status: "idle", //"loading"|"succeeded"|"failed"
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
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
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
      .addCase(getAUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
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
      .addCase(getAllPostsOfAUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to get the user's posts";
        console.error(action.payload);
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
      .addCase(editUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
        toast.error("Failed to update details!");
      });
  },
});

export const { setLayover, updateAllUserList } = userSlice.actions;

export default userSlice.reducer;
