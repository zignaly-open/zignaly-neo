export type MarketplaceState = Record<string, never>;

export type MarketplaceService = {
  service_id: string;
  owner_id: string;
  name: string;
  level: number;
  service_type: string; // TODO
  invested: number;
  investors: number;
  success_fee: number;
  maximum_sbt: number;
  created_at: string;
  sparklines: number[];
  pnl_pct_7t: number;
  pnl_pct_30t: number;
  pnl_pct_90t: number;
  pnl_pct_180t: number;
  pnl_pct_365t: number;
};
