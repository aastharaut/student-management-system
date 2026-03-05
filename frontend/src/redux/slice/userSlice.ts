import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    data: null | {
      firstName: string;
      lastName: string;
      email: string;
      role: "admin" | "teacher" | "viewer";
    };
  };
}

const initialState: UserState = {
  value: {
    data: null,
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.data = action.payload;
    },
    logout: (state) => {
      state.value.data = null;
      localStorage.removeItem("authToken"); // Clear user data from localStorage on logout
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
