export type ReferralsState = Record<string, never>;

export type ReferralRewards = {
  referralCode: string;
  invitedCount: number;
  usdtEarned: number;
  usdtPending: number;
  configuration: {
    zignalySuccessFee: number;
    zignalyRebateFee: number;
    traderSuccessFee: number;
    traderRebateFee: number;
    rewardSignupAmount: number;
    rewardSignupSymbol: string;
    rewardDepositAmount: number;
    rewardDepositSymbol: string;
    rewardMinDepositAmount: number;
    rewardBalanceAmount: number;
    rewardBalanceSymbol: string;
    rewardMinBalanceAmount: number;
    rewardOneAllocationAmount: number;
    rewardOneAllocationSymbol: string;
    rewardMinOneAllocationAmount: number;
    rewardTotalAllocationAmount: number;
    rewardTotalAllocationSymbol: string;
    rewardMinTotalAllocationAmount: number;
    rewardMinTotalAllocationDays: number;
    enableSuccessFeeReward: boolean;
    enableRebateFeeReward: boolean;
    trusted: boolean;
  };
};

export type ReferralHistoryEntry = {
  date: string;
  type: string;
  status: string;
  usdtAmount: number;
  amount: number;
  coin: string;
  email: string;
  percentage: number;
};

export type ReferralHistory = {
  history: ReferralHistoryEntry[];
};
