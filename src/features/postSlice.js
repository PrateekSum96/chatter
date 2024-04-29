import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getUserPost = createAsyncThunk(
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
    body: JSON.stringify({ postData: { content: post } }),
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

const initialState = {
  allPosts: [],
  userHomePost: [],
  status: "idle",
  error: null,
  sortBy: "latest", //"latest" || "trending"
};

const postSlice = createSlice({
  name: "appPosts",
  initialState,
  reducers: {
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
    showHomePost: (state, action) => {
      const userLoggedIn = action.payload;
      const userLoggedInFollowing = userLoggedIn?.following;
      const showPostHome = state.allPosts?.filter(
        (post) =>
          userLoggedIn?.username === post.username ||
          userLoggedInFollowing.some(
            (followingUser) => followingUser.username === post.username
          )
      );
      state.userHomePost = showPostHome;
    },
  },
  extraReducers(builder) {
    builder
      //get-all-post
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
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
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
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
      });
  },
});

export const { latestPost, sortPost, showHomePost, trendingPost } =
  postSlice.actions;
export default postSlice.reducer;
