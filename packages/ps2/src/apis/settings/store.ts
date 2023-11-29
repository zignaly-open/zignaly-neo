import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from './types';

const initialState: SettingsState = { table: {} };

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    sortTable: (state, action: PayloadAction<string>) => {
      const { id, sorting } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].sorting = sorting;
    },
    filterTable: (state, action: PayloadAction<string>) => {
      const { id, filters } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].filters = filters;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sortTable, filterTable } = settingsSlice.actions;

export default settingsSlice.reducer;
