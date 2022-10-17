import { DialogProps } from '@mui/material';

export type ShareCodeProps = DialogProps;

export type UserCodes = {
  code: string;
  rewardDirect: number;
  benefitDirect: number;
  currentRedemptions: number;
  maxRedemptions: number;
  rewardFactor: number;
  rewardDepositFactor: number;
  maxTotalRewards: number;
  maxTotalBenefits: number;
  benefitBalanceFactor: number;
  benefitDepositFactor: number;
  reqMinimumBalance: number;
  reqMinimumDeposit: number;
  reqDepositFrom: string;
  reqMinAuctions: number;
  reqWalletType: string;
  reqAuctionBids: number;
  endDate: string;
};

export type UserCodesRedemptions = {
  id: string;
  code: string;
  inviterBenefit: number;
  invitedBenefit: number;
  'invited.shortAddress': string;
  'invited.username': string;
  invited: {
    shortAddress: string;
    username: string;
    id: string;
  };
  redemptionDate: string;
};
