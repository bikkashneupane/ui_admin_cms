import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
  brand: [],
  material: [],
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
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setCategory, setSubCategory, setBrand, setMaterial } = actions;
export default reducer;
