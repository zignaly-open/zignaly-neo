import BigNumber from 'bignumber.js';

export type WithdrawFormData = {
  amountTransfer?: {
    value: string | number | BigNumber;
    token: {
      id: string;
      balance: string | number | BigNumber;
    };
  };
};
