import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    categoryInfo: categoryReducer,
    productInfo: productReducer,
  },
});

export default store;
