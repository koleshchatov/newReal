import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  role,
  createNewRole,
  deleteRole,
  editRole,
} from "../../servises/role.service";

const initialState = {
  roles: [],
  error: null,
  loading: false,
  modal: {
    type: null,
    data: null,
  },
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

export const createRole = createAsyncThunk(
  "/access/createRole",
  async ({ token, code, name, description, isActive }, thunkAPI) => {
    try {
      const result = await createNewRole({
        token,
        code,
        name,
        description,
        isActive,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Возникла ошибка при создании роли",
      );
    }
  },
);

export const editRolePost = createAsyncThunk(
  "/access/editRole",
  async ({ token, code, name, description, isActive }, thunkAPI) => {
    try {
      const result = await editRole({
        token,
        code,
        name,
        description,
        isActive,
      });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Возникла ошибка при редактировании роли",
      );
    }
  },
);

export const deleteRolePost = createAsyncThunk(
  "/access/deleteRole",
  async ({ token, code }, thunkAPI) => {
    try {
      const result = await deleteRole({ token, code });
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Возникла ошибка при удалении роли",
      );
    }
  },
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    openModalRole: (state, action) => {
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModalRole: (state) => {
      state.modal.type = null;
      state.modal.data = null;
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
        state.loading = false;
        state.error = null;
      })
      .addCase(roleList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const { openModalRole, closeModalRole } = roleSlice.actions;
export default roleSlice.reducer;
