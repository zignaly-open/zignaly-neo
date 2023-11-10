import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from './types';

const initialState: UsersState = {};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export default usersSlice.reducer;
