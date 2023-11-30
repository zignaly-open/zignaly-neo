import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, TableId } from './types';
import { ZigFiltersType } from '@zignaly-open/ui/lib/components/filters/ZigFilters/types';
import { ColumnSort, SortingColumn } from '@tanstack/react-table';

const initialState: SettingsState = { table: {}, version: 1 };

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    sortTable: (
      state,
      action: PayloadAction<{ id: TableId; sorting: ColumnSort }>,
    ) => {
      const { id, sorting } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].sorting = sorting;
    },
    filterTable: (
      state,
      action: PayloadAction<{ id: TableId; filters: ZigFiltersType }>,
    ) => {
      const { id, filters } = action.payload;
      if (!state.table[id]) state.table[id] = {};
      state.table[id].filters = filters;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sortTable, filterTable } = settingsSlice.actions;

export default settingsSlice.reducer;
