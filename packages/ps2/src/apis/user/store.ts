import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserData } from './types';

const initialState: UserState = {};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setActiveExchangeInternalId: (state, action: PayloadAction<string>) => {
      state.activeExchangeInternalId = action.payload;
    },
    setSessionExpiryDate: (state, action: PayloadAction<number>) => {
      state.sessionExpiryDate = new Date(action.payload * 1000);
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    activateExchange: (state, action: PayloadAction<string>) => {
      state.user.exchanges.find(
        (e) => e.internalId === action.payload,
      ).activated = true;
    },
    enable2FA: (state, action: PayloadAction<boolean>) => {
      state.user['2FAEnable'] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  logout,
  setAccessToken,
  setUser,
  setSessionExpiryDate,
  setActiveExchangeInternalId,
  activateExchange,
  enable2FA,
} = userSlice.actions;

export default userSlice.reducer;
