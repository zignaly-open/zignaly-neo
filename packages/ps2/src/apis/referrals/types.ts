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

export enum BenefitType {
  // This naming does not make ANY sense whatsoever
  FeeVoucher = 'voucher_pending',
  Deposit = 'voucher_active',
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
  amount: number;
  // it's Ctually missing but let's add it here becasue backend should add it
  usdtAmount?: number;
  spent: number;
  status: BenefitClaimedStatus;
};

export const VOUCHER_PENDING = 'voucher_pending';
export const VOUCHER_ACTIVE = 'voucher_active';
