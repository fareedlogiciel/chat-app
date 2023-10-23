import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingConversations: true,
  conversations: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConversationsOnStore: (state, action) => {
      state.conversations = structuredClone(action?.payload);
    },
    setLoadingConversations: (state, action) => {
      state.loadingConversations = action?.payload;
    },
    resetApp: () => {
      return { ...initialState };
    },
  },
});

export const { setConversationsOnStore, setLoadingConversations, resetApp } =
  appSlice?.actions;
export default appSlice?.reducer;
