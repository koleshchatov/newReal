import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  role,
  createNewRole,
  deleteRole,
  editRole,
} from "../../servises/role.service";

const initialState = {
  roles: [],
  modal: false,
  error: null,
  loading: false,
};

export const roleList = createAsyncThunk(
  "/access/roles",
  async (token, thunkAPI) => {
    try {
      const rolelist = await role(token);

      return rolelist.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Ошибка при запросе списка ролей",
      );
    }
  },
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(roleList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(roleList.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.modal = false;
        state.error = null;
      })
      .addCase(roleList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { openModal, closeModal } = roleSlice.actions;
export default roleSlice.reducer;
