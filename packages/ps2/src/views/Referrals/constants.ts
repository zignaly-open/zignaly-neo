export enum RewardType {
  SIGNUP_REWARD = 'SIGNUP_REWARD',
  DEPOSIT_REWARD = 'DEPOSIT_REWARD',
  SUCCESS_REWARD = 'SUCCESS_REWARD',
  ALLOCATE_REWARD = 'ALLOCATE_REWARD',
  SUCCESS_FEE_REWARD = 'SUCCESS_FEE_REWARD',
  REBATE_COMMISSION_REWARD = 'REBATE_COMMISSION_REWARD',
}

export enum StatusType {
  Completed = 'Completed',
  Pending = 'Pending',
  Locked = 'Locked',
  TransferPending = 'Transfer pending',
  TransferOrdered = 'Transfer ordered',
  Cancelled = 'Cancelled',
  Failed = 'Failed',
}

export const hardcodedInviteeReward = {
  value: 20,
  coin: 'ZIG',
  threshold: 100,
};
