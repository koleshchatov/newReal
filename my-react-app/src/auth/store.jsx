import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roleReducer from "../pages/rolePage/roleSlice";
import userReducer from "../pages/personalPage/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
  },
});
