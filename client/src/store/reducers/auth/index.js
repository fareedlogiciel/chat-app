import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserOnStore: (state, action) => {
      state.user = structuredClone(action?.payload);
    },
    logout: (state) => {
      state.user = null;
      console.log("state at reducer", state);
    },
  },
});

export const { setUserOnStore, logout } = authSlice?.actions;
export default authSlice?.reducer;
