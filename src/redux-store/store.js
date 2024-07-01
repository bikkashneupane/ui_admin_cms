import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/user/category/categorySlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    categoryInfo: categoryReducer,
  },
});

export default store;
