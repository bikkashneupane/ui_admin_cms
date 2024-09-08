import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";
import systemReducer from "./system/systemSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    categoryInfo: categoryReducer,
    productInfo: productReducer,
    orderInfo: orderReducer,
    reviewInfo: reviewReducer,
    systemInfo: systemReducer,
  },
});

export default store;
