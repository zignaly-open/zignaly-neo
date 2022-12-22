import { Balance } from './model';
import { ContextBalance, DepositParams } from './types';

export const getWalletZhitsBalance = async (walletAddress: string) => {
  return Balance.aggregate('zhits', 'sum', {
    where: {
      walletAddress,
    },
  });
};

export const itemPayout = async ({
  walletAddress,
  blockchain,
  zhits,
}: ContextBalance) => {
  addTransaction({
    walletAddress,
    zhits,
    amount: '0',
    currency: '',
    blockchain,
    transactionType: 'itemPayout',
    note: 'itemPayout',
  });
};

export const redeemCode = async ({
  walletAddress,
  blockchain,
  currency,
  zhits,
}: ContextBalance) => {
  addTransaction({
    walletAddress,
    zhits,
    amount: '0',
    currency,
    blockchain,
    transactionType: 'redeem',
    note: 'redeem',
  });
};

export const deposit = async ({
  walletAddress,
  amount,
  currency,
  blockchain,
}: DepositParams) => {
  addTransaction({
    walletAddress,
    zhits: Number(amount) * 1,
    amount,
    currency,
    blockchain,
    transactionType: 'deposit',
    note: 'deposit',
  });
};

const addTransaction = async ({
  walletAddress,
  blockchain,
  currency,
  transactionType,
  amount = '0',
  note = '',
  zhits,
}: ContextBalance) => {
  if (!walletAddress) return null;

  try {
    const transaction = await Balance.create({
      walletAddress,
      blockchain,
      currency,
      transactionType,
      note,
      amount,
      zhits,
    });

    return {
      ...transaction.toJSON(),
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
