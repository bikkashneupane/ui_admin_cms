import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const slice = createSlice({
  name: "Reviews",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setReview } = actions;
export default reducer;
