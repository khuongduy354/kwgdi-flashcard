import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "display",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchToDisplay: (state) => {
      state.mode = "display";
    },
    switchToConfig: (state) => {
      state.mode = "config";
    },
    switchToCreate: (state) => {
      state.mode = "create";
    },
  },
});
export const { switchToDisplay, switchToCreate, switchToConfig } =
  modeSlice.actions;
export default modeSlice.reducer;
