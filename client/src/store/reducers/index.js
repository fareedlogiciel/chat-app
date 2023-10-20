import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import appReducer from "./app";

const reducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export default reducer;
