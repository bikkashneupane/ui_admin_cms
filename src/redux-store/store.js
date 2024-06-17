import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    userInfo: {},
  },
});

export default store;
