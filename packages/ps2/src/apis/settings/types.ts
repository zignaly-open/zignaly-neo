import { ColumnSort, SortingState } from '@tanstack/react-table';
import { ZigFiltersType } from '@zignaly-open/ui/lib/components/filters/ZigFilters/types';

export enum TableId {
  Marketplace = 'marketplace',
  Referrals = 'referrals',
}

export type SettingsState = {
  table: Record<
    TableId,
    {
      filters: ZigFiltersType;
      sorting: ColumnSort;
    }
  >;
};
