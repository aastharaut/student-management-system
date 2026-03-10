import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

export interface UserState {
  value: {
    data: User | null;
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
    login: (state, action: PayloadAction<User>) => {
      state.value.data = action.payload;
    },
    logout: (state) => {
      state.value.data = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
