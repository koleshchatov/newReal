import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import roleReducer from "../pages/rolePage/roleSlice.jsx";
import userReducer from "../pages/personalPage/userSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
  },
});
