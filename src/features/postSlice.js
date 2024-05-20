import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getEncodedToken = () => localStorage.getItem("token");

export const getAllPosts = createAsyncThunk(
  "appPosts/getAllPosts",
  async () => {
    const response = await fetch("/api/posts", {
      method: "GET",
    });
    const result = await response.json();
    return result;
  }
);

export const getUserPosts = createAsyncThunk(
  "appPosts/getUserPost",
  async (username) => {
    const response = await fetch(`/api/posts/user/${username}`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  }
);

export const addPost = createAsyncThunk("appPosts/addPost", async (post) => {
  const encodedToken = getEncodedToken();
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      authorization: encodedToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postData: post }),
  });
  const result = await response.json();
  return result;
});

export const likePost = createAsyncThunk(
  "appPosts/likePost",
  async (postId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/posts/like/${postId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
    });
    const result = await response.json();
    return result;
  }
);

export const disLikePost = createAsyncThunk(
  "appPosts/disLikePost",
  async (postId) => {
    const encodedToken = getEncodedToken();
    const response = await fetch(`/api/posts/dislike/${postId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
    });
    const result = await response.json();
    return result;
  }
);

export const deletePost = createAsyncThunk(
  "appPosts/deletePost",
  async (postId) => {
    const encodedToken = getEncodedToken();

    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
    });

    const result = await response.json();
    return result;
  }
);

export const editUserPost = createAsyncThunk(
  "appPosts/editUserPost",
  async ({ postId, postData }) => {
    const encodedToken = getEncodedToken();

    const response = await fetch(`/api/posts/edit/${postId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postData }),
    });

    const result = await response.json();
    return result;
  }
);

export const getAPost = createAsyncThunk(
  "appPosts/getAPost",
  async (postId) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
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
    latestPost: (state) => {
      state.userHomePost?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
    trendingPost: (state) => {
      state.userHomePost?.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
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
      .addCase(getAllPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to load posts";
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
      .addCase(addPost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to add post";
      })
      //like-post
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = "failed";
          state.error = "You already liked the post";
          return;
        }
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(likePost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to like post";
      })
      //dislike-Post
      .addCase(disLikePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(disLikePost.fulfilled, (state, action) => {
        if (action.payload.errors) {
          state.status = "failed";
          state.error = "You already disliked the post";
          return;
        }
        state.status = "succeeded";
        state.error = null;
        state.allPosts = action.payload.posts;
      })
      .addCase(disLikePost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to dislike post";
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
      .addCase(deletePost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to delete post";
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
      .addCase(editUserPost.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to update post";
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
        state.error = "Failed to get post";
      })
      //get-user-posts
      .addCase(getUserPosts.pending, (state) => {
        state.status = "loading";
        // state.showShimmer = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.showShimmer = false;
        state.error = null;
        state.homePostShimmer = false;
        state.userHomePost = action.payload.posts;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Failed to get user's post";
        state.homePostShimmer = false;
      });
  },
});

export const {
  latestPost,
  sortPost,
  trendingPost,
  setPostLayover,
  loadingStatus,
  clearDataPostSlice,
  homePostShimmerTrue,
} = postSlice.actions;
export default postSlice.reducer;
