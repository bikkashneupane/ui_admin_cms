import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

const slice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setProduct } = actions;
export default reducer;
