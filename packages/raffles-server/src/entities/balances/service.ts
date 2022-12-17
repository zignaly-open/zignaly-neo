import { Balance } from './model';
import { ContextBalance } from '../../types';

export const generateService = () => {
  const getAll = async (data: any) => {
    return Balance.findAll(data);
  };

  const getTransactionsTypeByWalletAddress = async (
    walletAddress: string,
    transactionType: string,
  ) => {
    return Balance.findAll({
      where: {
        walletAddress,
        transactionType,
      },
    });
  };

  const getWalletAmountBalance = async (walletAddress: string) => {
    return Balance.aggregate('amount', 'sum', {
      where: {
        walletAddress,
      },
    });
  };

  // get zhits balance from all transactions by walletAddress
  const getWalletZhitsBalance = async (walletAddress: string) => {
    return Balance.aggregate('zhits', 'sum', {
      where: {
        walletAddress,
      },
    });
  };

  const getWalletTransactions = async (walletAddress: string) => {
    return Balance.findAll({
      where: {
        walletAddress,
      },
    });
  };

  const internalTransfer = async ({
    walletAddress,
    amount,
    blockchain,
    currency,
    zhits,
  }: ContextBalance) => {
    addTransaction({
      walletAddress,
      blockchain,
      currency,
      transactionType: 'transfer',
      note: 'internal transfer',
      amount,
      zhits,
    });
  };

  const deposit = async ({
    walletAddress,
    amount,
    blockchain,
    currency,
    zhits,
  }: ContextBalance) => {
    addTransaction({
      walletAddress,
      blockchain,
      currency,
      transactionType: 'deposit',
      note: 'deposit',
      amount,
      zhits,
    });
  };

  const addTransaction = async ({
    walletAddress,
    blockchain,
    currency,
    transactionType,
    amount,
    note,
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

  return {
    getAll,
    getTransactionsTypeByWalletAddress,
    getWalletAmountBalance,
    getWalletTransactions,
    getWalletZhitsBalance,
    internalTransfer,
    deposit,
  };
};
