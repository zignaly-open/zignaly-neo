import { ZigFiltersType } from '@zignaly-open/ui';

export type MarketplaceFiltersProps = {
  filters: ZigFiltersType;
  defaultFilters: ZigFiltersType;
  resultsCount: number;
  onSearchChange: (value: string) => void;
  onFiltersChange: (newFilters: ZigFiltersType) => void;
  searchFilter: string;
  onReturnsPeriodChange: (value: number) => void;
  returnsPeriod: number;
};
