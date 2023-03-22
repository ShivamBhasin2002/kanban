import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import boardReducer from "../features/board/boardSlice";
import favouriteReducer from "../features/board/favouriteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favourites: favouriteReducer,
  },
});
