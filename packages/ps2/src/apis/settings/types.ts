import { SortingState } from '@tanstack/react-table';
import {
  ZigFilterPruned,
  ZigFiltersPruned,
  ZigFiltersType,
} from '@zignaly-open/ui';

export enum TableId {
  Marketplace = 'marketplace',
  Referrals = 'referrals',
}

export type SettingsState = {
  table:
    | Record<
        TableId,
        {
          filters?: ZigFiltersPruned;
          sorting?: SortingState;
        }
      >
    | Record<string, never>;
};

type PersistTableData = {
  sorting: SortingState;
  sortTable: (sorting: SortingState) => void;
  filterTable: (filters: ZigFiltersType) => void;
};

export type PersistTableDataFull = PersistTableData & {
  filters: ZigFiltersType;
};

export type PersistTableDataPruned = PersistTableData & {
  filters: ZigFilterPruned[];
};
