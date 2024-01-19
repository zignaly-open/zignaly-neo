import { MarketplaceService } from '../../../../apis/marketplace/types';

export type MarketplaceActionType = {
  service: MarketplaceService;
  prefixId?: string;
  fullSizeInvest?: boolean;
  fullSizeInvested?: boolean;
  showRocket?: boolean;
};
