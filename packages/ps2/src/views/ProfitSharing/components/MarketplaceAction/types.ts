import { MarketplaceService } from '../../../../apis/marketplace/types';

export type MarketplaceActionType = {
  service: MarketplaceService;
  prefixId?: string;
};
