import { ZigFiltersPruned, ZigFiltersType } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';

export type MarketplaceFiltersProps = {
  filters: ZigFiltersPruned;
  services: MarketplaceService[];
  onDataFiltered: (data: MarketplaceService[]) => void;
  onSearchChange: (value: string) => void;
  onFiltersChange: (newFilters: ZigFiltersType) => void;
  searchFilter: string;
};
