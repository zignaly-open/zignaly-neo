import { ReferralRewards, TierLevels } from 'apis/referrals/types';

export type TiersTableProps = {
  tiers: TierLevels;
  referral: ReferralRewards;
  serviceCommission: number;
  zignalyCommission: number;
};
