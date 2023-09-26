import {
  ReferralHistory,
  ReferralRewards,
  TierLevels,
} from 'apis/referrals/types';

export const referrerDataResponseMockSuccess: ReferralRewards = {
  referralCode: '617da36fad20d',
  invitedCount: 37,
  investorsCount: 5,
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
  tierId: 5,
  tierFactor: 50.0,
  discountPct: 24.67,
  boost: 2.0,
  boostEndsAt: null,
};

export const referrerHistoryResponseMockSuccess: ReferralHistory = {
  history: [
    {
      date: '2023-03-01 16:26:15',
      type: 'SIGNUP_REWARD',
      status: 'Completed',
      usdtAmount: 0.071438,
      amount: 10.0,
      coin: 'ZIG',
      email: 's***+4@g***om',
      percentage: null,
    },
  ],
};

export const tierLevelsResponseMockSuccess: TierLevels = [
  {
    id: 1,
    name: 'Tier 1',
    invitees: 1,
    commissionPct: 10.0,
  },
  {
    id: 2,
    name: 'Tier 2',
    invitees: 2,
    commissionPct: 20.0,
  },
  {
    id: 3,
    name: 'Tier 3',
    invitees: 3,
    commissionPct: 30.0,
  },
  {
    id: 4,
    name: 'Tier 4',
    invitees: 4,
    commissionPct: 40.0,
  },
  {
    id: 5,
    name: 'Tier 5',
    invitees: 5,
    commissionPct: 50.0,
  },
];
