export const useReferralHistoryQuery = () => {
  return {
    isLoading: false,
    data: {
      referrerId: 'string',
      history: [
        {
          date: 'string',
          type: 'string',
          status: 'string',
          usdtAmount: 0,
          amount: 0,
          coin: 'string',
          email: 'string',
          percentage: 0,
        },
      ],
    },
  };
};

export const useReferralRewardsQuery = () => {
  return {
    isLoading: false,
    data: {
      referralCode: 'string',
      invitedCount: 0,
      usdtEarned: 0,
      usdtPending: 0,
      configuration: {
        zignalySuccessFee: 0,
        zignalyRebateFee: 0,
        traderSuccessFee: 0,
        traderRebateFee: 0,
        rewardSignupAmount: 0,
        rewardSignupSymbol: 'string',
        rewardDepositAmount: 0,
        rewardDepositSymbol: 'string',
        rewardMinDepositAmount: 0,
        rewardBalanceAmount: 0,
        rewardBalanceSymbol: 'string',
        rewardMinBalanceAmount: 0,
        rewardOneAllocationAmount: 0,
        rewardOneAllocationSymbol: 'string',
        rewardMinOneAllocationAmount: 0,
        rewardTotalAllocationAmount: 0,
        rewardTotalAllocationSymbol: 'string',
        rewardMinTotalAllocationAmount: 0,
        rewardMinTotalAllocationDays: 0,
        enableSuccessFeeReward: true,
        enableRebateFeeReward: true,
        trusted: true,
      },
    },
  };
};
