import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  error: null,
  showPostModal: false,
};

const postModal = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    postModalVisibility: (state, action) => {
      state.showPostModal = action.payload;
    },
  },
});

export const { postModalVisibility } = postModal.actions;

export default postModal.reducer;
