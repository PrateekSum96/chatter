import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

//Auth
export const handleUserLogin = createAsyncThunk(
  "auth/handleUserLogin",
  async ({ email, password }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    return result;
  }
);

export const handleUserSignUp = createAsyncThunk(
  "auth/handleUserSignUp",
  async ({ firstName, lastName, username, email, password }) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    const result = await response.json();
    return result;
  }
);

//VerifyUser
export const verifyUser = createAsyncThunk("auth/verifyUser", async () => {
  const encodedToken = getEncodedToken();
  const response = await fetch("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({ encodedToken }),
  });

  const result = await response.json();
  return result;
});

//Following
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (followUserId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/users/follow/${followUserId}`, {
      method: "POST",
      headers: { authorization: encodedToken },
      body: {},
    });

    const result = await response.json();
    return result;
  }
);
export const unFollowUser = createAsyncThunk(
  "auth/unFollowUser",
  async (followUserId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/users/unfollow/${followUserId}`, {
      method: "POST",
      headers: { authorization: encodedToken },
    });

    const result = await response.json();
    return result;
  }
);

const initialState = {
  isLoggedIn: false,
  status: "idle", // "loading"||"succeeded"||"error"
  error: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    updateLoggedInUser: (state, action) => {
      state.user.avatarUrl = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      //LOGIN
      .addCase(handleUserLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleUserLogin.fulfilled, (state, action) => {
        const { foundUser, encodedToken, errors } = action.payload;
        if (errors) {
          state.error = "The email you entered is not registered.";
          state.status = "error";
          toast.error("The email you entered is not registered.");
          return;
        }

        state.isLoggedIn = true;
        state.error = null;
        state.user = foundUser;
        localStorage.setItem("token", encodedToken);
        state.status = "succeeded";
        toast.success("Login successful!");
      })
      .addCase(handleUserLogin.rejected, (state) => {
        state.status = "error";
        state.error = "Something went wrong!";
        toast.error(state.error);
      })
      // SIGNUP
      .addCase(handleUserSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleUserSignUp.fulfilled, (state, action) => {
        const { createdUser, encodedToken, errors } = action.payload;
        if (errors) {
          state.status = "error";
          state.error = "Email or Username already exists";
          toast.error(state.error);
          return;
        }
        state.isLoggedIn = true;
        state.user = createdUser;
        state.error = null;
        localStorage.setItem("token", encodedToken);
        state.status = "succeeded";
        toast.success("Successfully account created!");
      })
      .addCase(handleUserSignUp.rejected, (state) => {
        state.status = "error";
        state.error = "Something went wrong!";
        toast.error(state.error);
      })
      //FOLLOW
      .addCase(followUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(followUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to follow";
      })
      // unFollowUser
      .addCase(unFollowUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(unFollowUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to unfollow";
      })
      //verify-user
      .addCase(verifyUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        const { user } = action.payload;

        if (user) {
          state.isLoggedIn = true;
          state.error = null;
          state.user = user;
          state.status = "succeeded";
          return;
        }
        state.isLoggedIn = false;
        state.error = "Something went wrong";
        state.status = "error";
      })
      .addCase(verifyUser.rejected, (state) => {
        state.status = "error";
        state.error = "Something went wrong!";
        toast.error(state.error);
      });
  },
});

export const { logOutUser, updateLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
