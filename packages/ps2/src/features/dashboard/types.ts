import { AxisFormat } from '@zignaly-open/ui/lib/components/display/Charts/types';

export interface DashboardState {
  investments?: Investment[];
  selectedInvestment?: Investment;
  selectedInvestmentDetails?: InvestmentDetails;
  coins?: Coins;
}

export type Coin = {
  balanceFree: string;
  balanceFreeBTC: string;
  balanceFreeUSDT: string;
  balanceLocked: string;
  balanceLockedBTC: string;
  balanceLockedUSDT: string;
  balanceTotal: string;
  balanceTotalBTC: string;
  balanceTotalExchCoin: string;
  balanceTotalUSDT: string;
  exchCoin: string;
  maxWithdrawAmount: string;
  name: string;
};

export type Coins = Record<string, Coin>;

export type InvestmentDetails = {
  invested: number;
  pending: number;
  percentage: number;
  hwm: number;
  serviceId: string;
  accountId: string;
  accountType: string;
  profitPercentage: number;
  dfaMqDebt: number;
  transferOutAll: boolean;
  transferOut: number;
  transferOutTs: number;
  profitOut: number;
  backAmounts: number[];
  createdAt: string;
};

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
  sparklines: AxisFormat[];
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
