import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};

const slice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setCategory } = actions;
export default reducer;
