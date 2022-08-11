import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginPayload } from './types';

const initialState: AuthState = {
  isLoggedIn: false,
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    authenticate: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = !!action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, authenticate } = authSlice.actions;

export default authSlice.reducer;
