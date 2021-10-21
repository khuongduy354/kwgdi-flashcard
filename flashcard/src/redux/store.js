import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./features/Mode/modeSlice";
import authReducer from "./features/Authentication/authenticationSlice";
import flashcardReducer from "./features/FlashCard/flashcardSlice";
export const store = configureStore({
  reducer: {
    mode: modeReducer,
    userUid: authReducer,
    flashCards: flashcardReducer,
  },
});
