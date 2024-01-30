import { MarketplaceService } from '../../../../apis/marketplace/types';

export type MarketplaceActionType = {
  service: MarketplaceService;
  prefixId?: string;
  fullSizeInvest?: boolean;
  investedVariant?: 'mobile' | 'button' | 'component';
  showRocket?: boolean;
  showArrow?: boolean;
};
