import { TierLevel, ReferralRewards } from 'apis/referrals/types';

export type TierBarProps = {
  tier: TierLevel;
  tiers: TierLevel[];
  minHeight?: number;
  maxHeight?: number;
  width?: number;
  showArrow?: boolean;
  maxOpacity?: number;
  minOpacity?: number;
  minFontSize?: number;
  maxFontSize?: number;
  serviceCommission: number;
  specialBoost: boolean;
  referral: ReferralRewards;
};
