import { ReferralRewards, TierLevels } from 'apis/referrals/types';

export const loginMockEmail = 'alex@xfuturum.com';
export const loginMockPassword = 'password';
export const referralRewardsResponseMockSuccess: ReferralRewards = {
  referralCode: 'referralCode',
  invitedCount: 27,
  usdtEarned: 0.071438,
  usdtPending: 0.0,
  configuration: {
    zignalySuccessFee: 20.0,
    zignalyRebateFee: 20.0,
    traderSuccessFee: 5.0,
    traderRebateFee: 5.0,
    rewardSignupAmount: 0.0,
    rewardSignupSymbol: 'USDT',
    rewardDepositAmount: 0.0,
    rewardDepositSymbol: 'USDT',
    rewardMinDepositAmount: 0.0,
    rewardBalanceAmount: 0.0,
    rewardBalanceSymbol: 'USDT',
    rewardMinBalanceAmount: 0.0,
    rewardOneAllocationAmount: 0.0,
    rewardOneAllocationSymbol: 'USDT',
    rewardMinOneAllocationAmount: 0.0,
    rewardTotalAllocationAmount: 0.0,
    rewardTotalAllocationSymbol: 'USDT',
    rewardMinTotalAllocationAmount: 0.0,
    rewardMinTotalAllocationDays: 0,
    enableSuccessFeeReward: true,
    enableRebateFeeReward: true,
    trusted: false,
  },
  tierLevelId: 2,
  tierLevelFactor: 1.1,
  usdtAum: 30.577385549,
  zigBalance: 120117.17,
};

export const referralTierLevelsResponseMockSuccess: TierLevels = [
  {
    id: 1,
    minZig: 0.0,
    maxZig: 100000.0,
    minAum: 0.0,
    maxAum: 100000.0,
    tierLevelFactor: 1.0,
  },
  {
    id: 2,
    minZig: 100000.0,
    maxZig: 500000.0,
    minAum: 100000.0,
    maxAum: 500000.0,
    tierLevelFactor: 1.1,
  },
  {
    id: 3,
    minZig: 500000.0,
    maxZig: 1500000.0,
    minAum: 500000.0,
    maxAum: 1500000.0,
    tierLevelFactor: 1.2,
  },
  {
    id: 4,
    minZig: 1500000.0,
    maxZig: 3000000.0,
    minAum: 1500000.0,
    maxAum: 2500000.0,
    tierLevelFactor: 1.3,
  },
  {
    id: 5,
    minZig: 3000000.0,
    maxZig: 10000000.0,
    minAum: 2500000.0,
    maxAum: 7500000.0,
    tierLevelFactor: 1.4,
  },
  {
    id: 6,
    minZig: 10000000.0,
    maxZig: null,
    minAum: 7500000.0,
    maxAum: null,
    tierLevelFactor: 1.5,
  },
];
