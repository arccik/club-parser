import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "all",
};

export const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 10;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, set } = navBarSlice.actions;

export default navBarSlice.reducer;
