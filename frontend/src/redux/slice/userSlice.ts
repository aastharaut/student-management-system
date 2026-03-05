import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: number;
}

const initialState: UserState = {
  value: 0,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: () => {},
    logout: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
