import { ReferralRewards, TierLevels } from 'apis/referrals/types';

export type TiersTableProps = {
  tiers: TierLevels;
  referral: ReferralRewards;
  boostRunning: boolean;
  boost: number;
  traderBoost: number;
};
