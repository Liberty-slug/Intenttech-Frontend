/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FormData } from "./type";

const API_URL = import.meta.env.VITE_API_KEY;

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching users."
      );
    }
  }
);

// Async thunk to add a user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk to update a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, ...userData }: { id: number; [key: string]: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

interface UserState {
  users: FormData[];
  isLoading: boolean;
  isSubmitted: boolean;
  isSuccess: boolean;
  userData: FormData[];
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  isSubmitted: false,
  isSuccess: false,
  userData: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state: any, actions) => {
      state.isLoading = actions.payload;
    },
    setSubmitted: (state: any, actions) => {
      state.isSubmitted = actions.payload;
    },
    setError: (state: any) => {
      state.isError = true;
    },
    setSuccess: (state: any, actions) => {
      state.isSuccess = actions.payload;
    },
    setData: (state: any, actions) => {
      state.userData = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setLoading, setSubmitted, setSuccess, setData } =
  userSlice.actions;

export const selectForm = (state: any) => state.form;

export default userSlice.reducer;
