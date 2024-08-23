import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
  },

  reducers: {
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setAllOrders } = actions;
export default reducer;
