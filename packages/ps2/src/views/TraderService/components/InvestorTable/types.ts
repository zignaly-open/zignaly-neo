import BigNumber from 'bignumber.js';

export type InvestorTableDataType = {
  email: string;
  userId: string;
  investment: BigNumber;
  feesInZig: boolean;
  totalFeesPaid: string;
  successFee: string;
  pnlTotal: string;
  pnl: {
    pnlNetLc: string;
    pnlPctLc: string;
  };
  status: string;
};
