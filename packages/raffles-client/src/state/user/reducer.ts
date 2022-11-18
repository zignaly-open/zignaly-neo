import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '@zignaly-open/raffles-shared/types';
import { ConnectionType } from 'config/web3';

export interface UserState {
  currentUser?: UserType;
  selectedWallet?: ConnectionType;
}

export const initialState: UserState = {
  currentUser: undefined,
  selectedWallet: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentUser(state, { payload: { currentUser } }) {
      state.currentUser = currentUser;
    },
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
  },
});

export const { updateSelectedWallet, updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;
