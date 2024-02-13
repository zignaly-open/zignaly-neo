import { createSlice } from '@reduxjs/toolkit';
import { TransfersState } from './types';

const initialState: TransfersState = {};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export default configSlice.reducer;
