import { MarketplaceService } from '../../../../apis/marketplace/types';
import { ZigChartAxisFormatType } from '@zignaly-open/ui';

export type MarketplaceTableDataType = {
  service: MarketplaceService;
  actionService: MarketplaceService;
  '30d': {
    pnl30d: string;
    data: ZigChartAxisFormatType[] | number[];
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
