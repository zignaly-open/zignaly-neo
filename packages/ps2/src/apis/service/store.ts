import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from './api';
import { ServiceState } from './types';

const initialState: ServiceState = {};

export const serviceSlice = createSlice({
  name: 'service',
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
        // we need this to be able to access this syncronously
        // if we invalidate caches or smth
        state.traderServices = payload;
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const { setActiveServiceId } = serviceSlice.actions;

export default serviceSlice.reducer;
