import { SortingState } from '@tanstack/react-table';
import { ZigFiltersPruned } from '@zignaly-open/ui';

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
