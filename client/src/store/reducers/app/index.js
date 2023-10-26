import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingUsers: true,
  users: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUsersOnStore: (state, action) => {
      state.users = structuredClone(action?.payload);
    },
    setLoadingConversations: (state, action) => {
      state.loadingUsers = action?.payload;
    },
    resetApp: () => {
      return { ...initialState };
    },
  },
});

export const { setUsersOnStore, setLoadingConversations, resetApp } =
  appSlice?.actions;
export default appSlice?.reducer;
