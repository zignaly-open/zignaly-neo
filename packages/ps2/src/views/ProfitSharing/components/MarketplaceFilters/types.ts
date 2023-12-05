import { ZigFiltersType } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';

export type MarketplaceFiltersProps = {
  filters: ZigFiltersType;
  services: MarketplaceService[];
  onSearchChange: (value: string) => void;
  onFiltersChange: (newFilters: ZigFiltersType) => void;
  searchFilter: string;
};
