import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users } from "../../servises/user.service";

const initialState = {
  users: [],
  error: null,
  loading: false,
  modal: {
    type: null,
    data: null,
  },
};

export const userList = createAsyncThunk("/users", async (token, thunkAPI) => {
  try {
    const userlist = await users(token);

    return userlist.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.message || "Ошибка при запросе списка пользователей",
    );
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modal.type = null;
      state.modal.data = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(userList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { openModal, closeModal } = userSlice.actions;
export default userSlice.reducer;
