import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from './api';
import { TraderState } from './types';

const initialState: TraderState = {};

export const traderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveServiceId: (state, action: PayloadAction<string>) => {
      state.activeServiceId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.traderServices.matchFulfilled,
      (state, { payload }) => {
        state.traderServices = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setActiveServiceId } = traderSlice.actions;

export default traderSlice.reducer;
