export type ReferralsState = Record<string, never>;

export type ReferralRewards = {
  referralCode: string;
  invitedCount: number;
  investorsCount: number;
  usdtEarned: number;
  usdtPending: number;
  tierLevelId: number;
  tierLevelFactor: number;
  discountPct: number;
  boost: number;
  boostEndsAt: string;
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

export enum BenefitType {
  // This naming does not make ANY sense whatsoever
  Deposit = 'voucher_pending',
  FeeVoucher = 'voucher_active',
}

export enum BenefitClaimedStatus {
  SuccessFee = 'success_fee',
  Awarded = 'awarded',
}

export type Benefit = {
  currency: string;
  amount: number;
  currentAmount: number;
  status: BenefitType;
};

export type BenefitClaimed = {
  date: string;
  currency: string;
  spent: number;
  amount: number;
  remaining: number;
  status: BenefitClaimedStatus;
};

export type TierLevel = {
  id: number;
  name: string;
  invitees: number;
  commissionPct: number;
};
export type TierLevels = TierLevel[];

export type ServiceCommission = {
  commission: number;
};

export type ServiceCommissionPayload = {
  service: string;
  commission: number;
};
