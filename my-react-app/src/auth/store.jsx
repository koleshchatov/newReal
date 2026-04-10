import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import roleReducer from "../Pages/RolePage/roleSlice.jsx";
import userReducer from "../Pages/PersonalPage/userSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
  },
});
