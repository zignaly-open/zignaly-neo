import { DialogProps } from '@mui/material';
import { WalletType } from '@zignaly-open/raffles-shared/types';

export type RedeemCodeProps = DialogProps;

export type CodeInfo = {
  code: string;
  reqMinimumBalance: number;
  reqMinimumDeposit: number;
  reqDepositFrom: Date;
  reqMinAuctions: number;
  reqWalletType: WalletType;
  benefitDirect: number;
  benefitBalanceFactor: number;
  benefitDepositFactor: number;
  maxTotalBenefits: number;
};
