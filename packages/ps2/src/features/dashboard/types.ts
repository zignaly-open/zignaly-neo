export interface DashboardState {
  investments?: Investment[];
}

export type Investment = {
  serviceName: string;
  serviceLogo: string;
  ownerName: string;
  invested: string;
  pending: string;
  version: number;
  ssc: string;
  serviceId: string;
  accountId: string;
  sparklines: [number, number];
  createdAt: string;
  updatedAt: string;
  periodsLc: string;
  pnlSumLc: string;
  pnlPctLc: string;
  pnlDailyMeanLc: string;
  pnl30dSum: string;
  pnl30dPct: string;
  pnl90dSum: string;
  pnl90dPct: string;
  pnl180dSum: string;
  pnl180dPct: string;
};
