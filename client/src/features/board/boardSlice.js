import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const boardSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
    },
    setIcon: (state, { payload: { newIcon, oldIcon } }) => ({
      value: state.value.map((board) => {
        if (board.icon === oldIcon) return { ...board, icon: newIcon };
        return board;
      }),
    }),
  },
});

export const { setBoards, setIcon } = boardSlice.actions;

export default boardSlice.reducer;
