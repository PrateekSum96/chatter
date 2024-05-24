import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

// Bookmark-Post
export const bookmarkPost = createAsyncThunk(
  "appPosts/bookmarkPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: encodedToken,
        },
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

//Remove-Bookmark-Post
export const removeBookmarkPost = createAsyncThunk(
  "appPosts/removeBookmarkPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: encodedToken,
        },
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

//Get-Bookmark-Post
export const getBookmarkedPost = createAsyncThunk(
  "appPosts/getBookmarkedPost",
  async (args, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/users/bookmark/`, {
        method: "GET",
        headers: {
          authorization: encodedToken,
        },
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
  status: "idle",
  error: null,
  bookmarkedPost: [],
  showShimmer: false,
};

const bookmarkSlice = createSlice({
  name: "appBookmarks",
  initialState,
  reducers: {
    clearBookmarks: (state) => {
      state.bookmarkedPost = [];
    },
  },
  extraReducers(builder) {
    builder
      //bookmark-post
      .addCase(bookmarkPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.bookmarkedPost = action.payload.bookmarks;
        toast.success("Added to bookmark!");
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
        toast.error("Failed to bookmark!");
      })
      //remove-bookmark-post
      .addCase(removeBookmarkPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeBookmarkPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.bookmarkedPost = action.payload.bookmarks;
        toast.success("Removed from bookmark!");
      })
      .addCase(removeBookmarkPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
        toast.error("Failed to remove from bookmark");
      })
      //get-all-bookmark-post
      .addCase(getBookmarkedPost.pending, (state) => {
        state.status = "loading";
        state.showShimmer = true;
        state.error = null;
      })
      .addCase(getBookmarkedPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.showShimmer = false;
        state.bookmarkedPost = action.payload.bookmarks;
      })
      .addCase(getBookmarkedPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error(action.payload);
      });
  },
});

export const { clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
