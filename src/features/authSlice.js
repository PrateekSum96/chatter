import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

//Auth
export const handleUserLogin = createAsyncThunk(
  "auth/handleUserLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
        error?.message || error || "Invalid credentials or Network error"
      );
    }
  }
);

export const handleUserSignUp = createAsyncThunk(
  "auth/handleUserSignUp",
  async (
    { firstName, lastName, username, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
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
      return rejectWithValue(error?.message || error || " Network error");
    }
  }
);

//VerifyUser
export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (args, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ encodedToken }),
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
      return rejectWithValue(error?.message || error || " Network error");
    }
  }
);

//Following
export const followUser = createAsyncThunk(
  "auth/followUser",
  async ({ followUserId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/users/follow/${followUserId}`, {
        method: "POST",
        headers: { authorization: encodedToken },
        body: {},
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
        error?.message || error || "Invalid token or Network error"
      );
    }
  }
);
export const unFollowUser = createAsyncThunk(
  "auth/unFollowUser",
  async ({ followUserId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/users/unfollow/${followUserId}`, {
        method: "POST",
        headers: { authorization: encodedToken },
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
        error?.message || error || "Invalid token or Network error"
      );
    }
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
        const { foundUser, encodedToken } = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.user = foundUser;
        localStorage.setItem("token", encodedToken);
        state.status = "succeeded";
        toast.success("Login successful!");
      })
      .addCase(handleUserLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
        toast.error("Login failed!");
      })
      // SIGNUP
      .addCase(handleUserSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(handleUserSignUp.fulfilled, (state, action) => {
        const { createdUser, encodedToken } = action.payload;
        state.isLoggedIn = true;
        state.user = createdUser;
        state.error = null;
        localStorage.setItem("token", encodedToken);
        state.status = "succeeded";
        toast.success("Successfully account created!");
      })
      .addCase(handleUserSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
        toast.error("Failed to create account!");
      })
      //Follow-User
      .addCase(followUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
      })
      // Un-Follow-User
      .addCase(unFollowUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(unFollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(unFollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
      })
      //verify-user
      .addCase(verifyUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
      });
  },
});

export const { logOutUser, updateLoggedInUser } = authSlice.actions;
export default authSlice.reducer;
