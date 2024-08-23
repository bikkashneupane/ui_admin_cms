import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    categoryInfo: categoryReducer,
    productInfo: productReducer,
    orderInfo: orderReducer,
    reviewInfo: reviewReducer,
  },
});

export default store;
