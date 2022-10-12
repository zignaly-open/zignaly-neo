import { DialogProps } from '@mui/material';

export type ShareCodeProps = DialogProps;

export type UserCodes = {
  code: string;
  rewardDirect: number;
  benefitDirect: number;
  currentRedemptions: number;
  maximumRedemptions: number;
  expirationDate: string;
};

export type UserCodesRedemptions = {
  code: string;
  rewardDirect: number;
  benefitDirect: number;
  currentRedemptions: number;
  maximumRedemptions: number;
  expirationDate: string;
};
