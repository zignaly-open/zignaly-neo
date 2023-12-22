import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, TableId } from './types';
import { ZigFilterPruned, ZigFiltersPruned } from '@zignaly-open/ui';
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
    // Not used at the moment
    updateFilter: (
      state,
      action: PayloadAction<{ id: TableId; filter: ZigFilterPruned }>,
    ) => {
      const { id, filter } = action.payload;
      if (!state.table[id])
        state.table[id] = {
          filters: [],
        };

      let filterFound = false;
      state.table[id].filters = state.table[id].filters?.map((f) => {
        if (f.id === filter.id) {
          filterFound = true;
          return { ...f, ...filter };
        }
        return f;
      });

      if (!filterFound) {
        state.table[id].filters.push(filter);
      }
    },
  },
});

export const { sortTable, filterTable, updateFilter } = settingsSlice.actions;

export default settingsSlice.reducer;
