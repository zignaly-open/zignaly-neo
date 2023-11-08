import { createSlice } from '@reduxjs/toolkit';
import { LogsState } from './types';

const initialState: LogsState = {};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export default logsSlice.reducer;
