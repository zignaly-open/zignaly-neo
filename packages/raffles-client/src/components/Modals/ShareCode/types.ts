import { DialogProps } from '@mui/material';

export type ShareCodeProps = DialogProps;

export type UserCodes = {
  code: string;
  rewardDirect: number;
  benefitDirect: number;
  currentRedemptions: number;
  maxRedemptions: number;
  expirationDate: string;
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
