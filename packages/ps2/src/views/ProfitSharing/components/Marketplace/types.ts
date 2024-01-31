import { MarketplaceService } from '../../../../apis/marketplace/types';
import type { ZigChartAxisFormat } from '@zignaly-open/ui/charts';

export type MarketplaceTableDataType = {
  service: MarketplaceService;
  actionService: MarketplaceService;
  '30d': {
    pnl30d: string;
    data: ZigChartAxisFormat[] | number[];
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
