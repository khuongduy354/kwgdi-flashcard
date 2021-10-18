import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "display",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchToDisplay: (state) => {
      state.value = "display";
    },
    switchToConfig: (state) => {
      state.value = "config";
    },
    switchToCreate: (state) => {
      state.value = "create";
    },
  },
});
export const { switchToDisplay, switchToCreate, switchToConfig } =
  modeSlice.actions;
export default modeSlice.reducer;
