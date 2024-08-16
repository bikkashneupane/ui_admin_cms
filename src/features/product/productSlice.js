import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  selectedProduct: {},
  pageProducts: [],
};

const slice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setPageProducts: (state, action) => {
      state.pageProducts = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setProduct, setSelectedProduct, setPageProducts } = actions;
export default reducer;
