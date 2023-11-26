import { MarketplaceService } from '../../../../apis/marketplace/types';
import { ChartDataFormat } from '../../../../apis/service/types';

export type MarketplaceTableDataType = {
  service: MarketplaceService;
  actionService: MarketplaceService;
  '30d': {
    pnl30d: string;
    data: ChartDataFormat | number[];
  };
  '90d': {
    roi: string;
    createdAt: string;
  };

  assets: {
    invested: string;
    investors: number;
  };
};
