import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingConversations: false,
  conversations: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConversationsOnStore: (state, action) => {
      return {
        ...state,
        conversations: structuredClone(action?.payload),
      };
    },
  },
});

export const { setConversationsOnStore } = appSlice?.actions;
export default appSlice?.reducer;
