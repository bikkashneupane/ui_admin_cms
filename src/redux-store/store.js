import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import systemReducer from "./system-slice/systemSlice";
import categoryReducer from "../features/user/category/categorySlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    systemInfo: systemReducer,
    categoryInfo: categoryReducer,
  },
});

export default store;
