import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
};

const slice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setCategory, setSubCategory } = actions;
export default reducer;
