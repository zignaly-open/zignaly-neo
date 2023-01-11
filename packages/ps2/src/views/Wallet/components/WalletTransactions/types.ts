import Theme from '@zignaly-open/ui/lib/theme/theme';
import { FilterKeys, TransactionStateType } from 'apis/wallet/types';

export const transactionStateName: {
  [key in TransactionStateType]: string;
} = {
  [TransactionStateType.COMPLETED]: 'transactions.status.completed',
  [TransactionStateType.PENDING]: 'transactions.status.pending',
  [TransactionStateType.ERROR]: 'transactions.status.error',
};

export const transactionStateColor: {
  [key in TransactionStateType]: keyof Theme;
} = {
  [TransactionStateType.COMPLETED]: 'greenGraph',
  [TransactionStateType.PENDING]: 'yellow',
  [TransactionStateType.ERROR]: 'red',
};

export const FILTERS_TYPE_NAME: { [key in FilterKeys]: string } = {
  ALL: 'all',
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  CASHBACK_VOLUME: 'cashbackvolume',
  COIN_SALVAGE: 'coinsalvage',
  COMPENSATION: 'compensation',
  PAYMENT: 'payment',
  REWARD: 'reward',
  SUCCESS_FEE: 'successfee',
  WITHDRAW_FEE: 'withdrawfee',
  ZIGPAD_PLEDGE: 'zigpadpledge',
  ZIGPAD_RETURN: 'zigpadreturn',
  ZIGPAD_REWARD: 'zigpadtokensreward',
  STAKING_VAULT: 'stakingvault',
  STAKING_VAULT_RETURN: 'stakingvaultreturn',
  UNSTAKING_VAULT: 'unstakingvault',
  BUY_ZIG: 'buyzig',
};
