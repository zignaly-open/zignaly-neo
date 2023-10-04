export type MarketplaceState = {
  mobileActiveRow?: string | null;
};

export type MarketplaceService = {
  userId: string;
  investedUSDT: string;
  type: string;
  tags: string[];
  successFee: number;
  ssc: string;
  sparklines: number[];
  solo: boolean;
  pnlPercent365t: string;
  pnlPercent180t: string;
  pnlPercent90t: string;
  pnlPercent30t: string;
  pnlPercent7t: string;
  ownerVerified: boolean;
  ownerName: string;
  ownerId: string;
  name: string;
  maximumSbt: number;
  logo: string;
  level: number;
  invested: string;
  investors: number;
  id: string;
  fundsAllocated: string;
  description: string;
  createdAt: string;
};
