import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/Mode/modeSlice";
import authReducer from "./features/Authentication/authenticationSlice";
export const store = configureStore({
  reducer: {
    mode: modeReducer,
    userUid: authReducer,
  },
});
