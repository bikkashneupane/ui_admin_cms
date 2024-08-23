import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  allUsers: [],
};
// create user slice
const slice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setUser, setAllUser } = actions;
export default reducer;
