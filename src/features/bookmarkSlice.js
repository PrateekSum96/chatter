import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

export const bookmarkPost = createAsyncThunk(
  "appPosts/bookmarkPost",
  async (postId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/users/bookmark/${postId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
    });
    const result = await response.json();

    return result;
  }
);
export const removeBookmarkPost = createAsyncThunk(
  "appPosts/removeBookmarkPost",
  async (postId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
    });
    const result = await response.json();

    return result;
  }
);

const initialState = {
  status: "idle",
  error: null,
  bookmarkedPost: [],
};

const bookmarkSlice = createSlice({
  name: "appBookmarks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //bookmark-post
      .addCase(bookmarkPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = "failed";
          state.error = action.payload.errors[0];
          toast.error(state.error);
          return;
        }
        state.status = "succeeded";
        state.error = null;
        state.bookmarkedPost = action.payload.bookmarks;
        toast.success("bookmark added!");
      })
      .addCase(bookmarkPost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to bookmark the post";
      })
      //remove-bookmark-post
      .addCase(removeBookmarkPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeBookmarkPost.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = "failed";
          state.error = action.payload.errors[0];
          toast.error(state.error);
          return;
        }
        state.status = "succeeded";
        state.error = null;
        state.bookmarkedPost = action.payload.bookmarks;
        toast.success("bookmark removed!");
      })
      .addCase(removeBookmarkPost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to bookmark the post";
      });
  },
});

export default bookmarkSlice.reducer;
