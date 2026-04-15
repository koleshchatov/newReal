import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { loginUser, logoutUser, refreshToken } from "../Services/auth.service";
import { session } from "./session";

const initialState = {
  authentication: false,
  isLoadingAuth: true,
  token: null,
  error: null,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const localToken = session.getToken();

      if (!localToken) {
        return {
          authentication: false,
          token: null,
        };
      }
      const decodedToken = jwtDecode(localToken);
      const isExpiringSoon = decodedToken.exp * 1000 - Date.now() < 120000;

      if (isExpiringSoon) {
        const result = await refreshToken();
        const token = result.data.accessToken;

        session.setToken(token);
        return {
          authentication: true,
          token,
        };
      }
      return {
        authentication: true,
        token: localToken,
      };
    } catch (error) {
      session.clearToken();

      return thunkAPI.rejectWithValue(
        error?.message || "Ошибка при проверке авторизации",
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, deviceId }, thunkAPI) => {
    try {
      const result = await loginUser({ email, password, deviceId });
      const token = result.accessToken;
      session.setToken(token);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Ошибка при входе");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    session.clearToken();
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || "Ошибка при выходе");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoadingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.authentication = action.payload.authentication;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.authentication = false;
        state.token = null;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.isLoadingAuth = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.authentication = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.authentication = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoadingAuth = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoadingAuth = false;
        state.authentication = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoadingAuth = false;
        state.error = action.payload;
      }),
});

export default authSlice.reducer;
