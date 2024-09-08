import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minimiseSideBar: true,
};

const slice = createSlice({
  name: "SideBar",
  initialState,
  reducers: {
    setMinimiseSideBar: (state, action) => {
      state.minimiseSideBar = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setMinimiseSideBar } = actions;
export default reducer;
