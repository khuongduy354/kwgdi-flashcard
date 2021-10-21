import { createSlice } from "@reduxjs/toolkit";
import authenticationSlice from "../Authentication/authenticationSlice";
const initialState = {
  flashcard: [],
};
export const flashCardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    addArrayOfCards: (state, action) => {
      state.flashcard = [...state.flashcard, ...action.payload];
    },
  },
});

export const { addArrayOfCards } = flashCardSlice.actions;
export default flashCardSlice.reducer;
