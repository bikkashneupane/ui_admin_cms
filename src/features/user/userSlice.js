import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
// create user slice
const slice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: {},
  },
});

const { reducer, actions } = slice;
export const { setUser } = actions;
export default reducer;
