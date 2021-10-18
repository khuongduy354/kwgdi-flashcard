import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/Mode/modeSlice";
export const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
});
