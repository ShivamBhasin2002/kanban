import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const boardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
