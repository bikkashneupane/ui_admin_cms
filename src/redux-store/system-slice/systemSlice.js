import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

const slice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setShowModal } = actions;
export default reducer;
