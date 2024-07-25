import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  selectedProduct: {},
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
  },
});

const { reducer, actions } = slice;
export const { setProduct, setSelectedProduct } = actions;
export default reducer;
