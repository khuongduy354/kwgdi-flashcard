import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: { email: null, uid: null },
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
