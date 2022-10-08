import { Investment } from '../../../../apis/investment/types';

export type DashboardTableDataType = {
  summary: {
    totalValue: string;
    profit: string;
    service: Investment;
  };
  service: Investment;
  chart: {
    data: Investment['sparklines'];
    last30Pnl: string;
  };
  dailyAvg: {
    dailyAvgPnl: string;
    currency: Investment['ssc'];
  };
  threeMonths: {
    pnl90dPct: string;
    currency: Investment['ssc'];
  };
  sixMonths: {
    pnl180dPct: string;
    currency: Investment['ssc'];
  };
  all: {
    pnlPctLc: string;
    periodsLc: Investment['periodsLc'];
  };
};
