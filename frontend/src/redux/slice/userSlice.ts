// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface UserState {
//   value: {
//     data: null | {
//       firstName: string;
//       lastName: string;
//       email: string;
//       roles: string;
//     };
//   };
// }

// const initialState: UserState = {
//   value: {
//     data: null,
//   },
// };

// export const UserSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.value.data = action.payload;
//     },
//     logout: (state) => {
//       state.value.data = null;
//       localStorage.removeItem("authToken"); // Clear user data from localStorage on logout
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { login, logout } = UserSlice.actions;

// export default UserSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// export interface UserState {
//   value: {
//     data: null | {
//       firstName: string;
//       lastName: string;
//       email: string;
//       roles: string;
//     };
//   };
// }

// const initialState: UserState = {
//   value: {
//     data: null,
//   },
// };

// export const UserSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (
//       state,
//       action: PayloadAction<{
//         firstName: string;
//         lastName: string;
//         email: string;
//         roles: string;
//       }>,
//     ) => {
//       state.value.data = action.payload;
//       // No need to manually set localStorage here - redux-persist will handle it
//     },
//     logout: (state) => {
//       state.value.data = null;
//       localStorage.removeItem("authToken"); // Keep this for token removal
//       // No need to remove user data from localStorage manually
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { login, logout } = UserSlice.actions;

// export default UserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    data: null | {
      firstName: string;
      lastName: string;
      email: string;
      roles: string;
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
    login: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        roles: string;
      }>,
    ) => {
      state.value.data = action.payload;
      // redux-persist handles saving user data to localStorage automatically
    },
    logout: (state) => {
      state.value.data = null;
      localStorage.removeItem("token"); // Use consistent key name matching header.tsx
    },
  },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
