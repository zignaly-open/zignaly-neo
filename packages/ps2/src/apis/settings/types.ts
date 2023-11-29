import { ColumnSort, SortingState } from '@tanstack/react-table';

export type SettingsState = {
  filters: Record<string, any>;
  // sort: Record<string, ColumnSort>;
  sort: Record<string, SortingState>;
};
