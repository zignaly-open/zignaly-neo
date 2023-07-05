import {
  ReferralRewards,
  ServiceCommission,
  TierLevels,
} from 'apis/referrals/types';

export type TiersTableProps = {
  tiers: TierLevels;
  referral: ReferralRewards;
  serviceCommission: ServiceCommission;
};
