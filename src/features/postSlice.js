import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

//Get-All-Post
export const getAllPosts = createAsyncThunk(
  "appPosts/getAllPosts",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/posts", {
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

//Get-User-Post
export const getUserPosts = createAsyncThunk(
  "appPosts/getUserPost",
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

//Add-Post
export const addPost = createAsyncThunk(
  "appPosts/addPost",
  async ({ post }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          authorization: encodedToken,
        },
        body: JSON.stringify({ postData: post }),
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

export const likePost = createAsyncThunk(
  "appPosts/likePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/posts/like/${postId}`, {
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

export const disLikePost = createAsyncThunk(
  "appPosts/disLikePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/posts/dislike/${postId}`, {
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

export const deletePost = createAsyncThunk(
  "appPosts/deletePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
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

export const editUserPost = createAsyncThunk(
  "appPosts/editUserPost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const encodedToken = getEncodedToken();
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          authorization: encodedToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postData }),
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

export const getAPost = createAsyncThunk(
  "appPosts/getAPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
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
      return rejectWithValue(
        error?.message || "Invalid token or Network error"
      );
    }
  }
);

const initialState = {
  allPosts: [],
  userHomePost: [],
  post: null,
  status: "idle",
  showShimmer: false,
  error: null,
  sortBy: "latest", //"latest" || "trending"
  postLayover: false,
  homePostShimmer: true,
};

const postSlice = createSlice({
  name: "appPosts",
  initialState,
  reducers: {
    setPostLayover: (state, action) => {
      state.postLayover = action.payload;
    },

    sortPost: (state, action) => {
      state.sortBy = action.payload;
    },
    loadingStatus: (state) => {
      state.status = "loading";
    },
    clearDataPostSlice: (state) => {
      state.allPosts = [];
      state.userHomePost = [];
      state.post = null;
      state.status = "idle";
      state.showShimmer = false;
      state.error = null;
      state.sortBy = "latest";
      state.postLayover = false;
    },
    homePostShimmerTrue: (state) => {
      state.homePostShimmer = true;
    },
  },
  extraReducers(builder) {
    builder
      //get-all-post
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.showShimmer = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showShimmer = false;
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load posts";
        console.error(action.payload || "Failed to load posts");
      })
      //add-post
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
        state.showShimmer = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.showShimmer = false;
        state.allPosts = action.payload.posts;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Failed to add post";
        console.error(action.payload);
      })
      //like-post
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to like post";
        console.error(action.payload || "Failed to like post");
      })
      //dislike-Post
      .addCase(disLikePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(disLikePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(disLikePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to dislike post";
        console.error(action.payload || "Failed to dislike post");
      })
      //delete-Post
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
        toast.success("Post deleted successfully!");
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete post";
        console.error(action.payload || "Failed to delete post");
        toast.error("failed to delete post!");
      })
      //edit-post
      .addCase(editUserPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUserPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
        toast.success("Post updated successfully!");
      })
      .addCase(editUserPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update post";
        console.error(action.payload || "Failed to update post");
        toast.error("failed to update post!");
      })
      //get-a-post
      .addCase(getAPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.post = action.payload.post;
      })
      .addCase(getAPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to get post";
        console.error(action.payload || "Failed to get post");
      })
      //get-user-posts
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.homePostShimmer = false;
        state.userHomePost = action.payload.posts;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to get user's post";
        console.error(action.payload || "Failed to get user's post");
        state.homePostShimmer = false;
      });
  },
});

export const {
  sortPost,
  setPostLayover,
  loadingStatus,
  clearDataPostSlice,
  homePostShimmerTrue,
} = postSlice.actions;
export default postSlice.reducer;
