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
    resetAuth: () => {
      return { ...initialState };
    },
  },
});

export const { setUserOnStore, resetAuth } = authSlice?.actions;
export default authSlice?.reducer;
