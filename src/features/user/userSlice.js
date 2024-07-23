import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  allUsers: [
    {
      firstName: "Bikash",
      lastName: "Neupane",
      phone: 123456789,
      email: "bik@gmail.com",
      role: "user",
    },
    {
      firstName: "Kabindra",
      lastName: "Ranabhat",
      phone: 3456789,
      email: "kab@gmail.com",
      role: "user",
    },
    {
      firstName: "Test 3",
      lastName: "test 333",
      phone: 123456789,
      email: "test3@gmail.com",
      role: "admin",
    },
    {
      firstName: "Test 4",
      lastName: "Test 4",
      phone: 3456789,
      email: "test4@gmail.com",
      role: "admin",
    },
  ],
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
