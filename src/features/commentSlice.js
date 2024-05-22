import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getEncodedToken = () => localStorage.getItem("token");

//Get-User-Comment
export const getUserComments = createAsyncThunk(
  "postComment/getUserComments",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const result = await response.json();
        return result;
      } else {
        throw new Error("Failed to fetch comments");
      }
    } catch (error) {
      console.error(error?.message || error);
      return rejectWithValue(error?.message || "Failed to fetch comments");
    }
  }
);

//Add-User-Comment
export const addNewComment = createAsyncThunk(
  "postComment/addNewComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    const encodedToken = getEncodedToken();
    try {
      const response = await fetch(`/api/comments/add/${postId}`, {
        method: "POST",
        headers: {
          authorization: encodedToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentData: { commentData } }),
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

//Delete-A-Comment

export const deleteComment = createAsyncThunk(
  "postComment/deleteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    const encodedToken = getEncodedToken();
    try {
      const response = await fetch(
        `/api/comments/delete/${postId}/${commentId}`,
        {
          method: "DELETE",
          headers: {
            authorization: encodedToken,
          },
        }
      );
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

// Update-Comment

export const updateComment = createAsyncThunk(
  "postComment/updateComment",
  async ({ postId, commentId, commentData }, { rejectWithValue }) => {
    const encodedToken = getEncodedToken();
    try {
      const response = await fetch(
        `/api/comments/edit/${postId}/${commentId}`,
        {
          method: "POST",
          headers: {
            authorization: encodedToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentData: { commentData } }),
        }
      );
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

// initialState

const initialState = {
  status: "idle", //"loading"||"failed"||"succeeded"
  error: null,
  comments: [],
  allPosts: [],
};

const commentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //get-comments
      .addCase(getUserComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.comments = action.payload.comments;
      })
      .addCase(getUserComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //add-comment
      .addCase(addNewComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //delete-comment
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //update-comment
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
