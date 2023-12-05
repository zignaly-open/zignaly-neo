import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, TableId } from './types';
import { ZigFiltersPruned } from '@zignaly-open/ui';
import { SortingState } from '@tanstack/react-table';

const initialState: SettingsState = { table: {} };

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    sortTable: (
      state,
      action: PayloadAction<{ id: TableId; sorting: SortingState }>,
    ) => {
      const { id, sorting } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].sorting = sorting;
    },
    filterTable: (
      state,
      action: PayloadAction<{ id: TableId; filters: ZigFiltersPruned }>,
    ) => {
      const { id, filters } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].filters = filters;
    },
  },
});

export const { sortTable, filterTable } = settingsSlice.actions;

export default settingsSlice.reducer;
