import type { AxisFormat } from '@zignaly-open/ui/lib/components/display/ZigChart/types';

export interface InvestmentState {
  selectedInvestment?: InvestmentServiceDetails;
}

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

export type InvestmentServiceDetails = {
  ownerVerified: boolean;
  serviceName: string;
  serviceLogo: string;
  ssc: string;
  serviceId: string;
};

export type InvestedInService = Record<
  string,
  {
    name: string;
    invested: string;
    pending: string;
  }
>;

export type Investment = InvestmentServiceDetails & {
  ownerName: string;
  invested: string;
  pending: string;
  version: number;
  accountId: string;
  sparklines: AxisFormat[] | number[];
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
