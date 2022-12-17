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
    fromAddressWallet,
    toAddressWallet,
  }: ContextBalance) => {
    try {
      await addTransaction({
        walletAddress,
        blockchain,
        currency,
        transactionType: 'transfer',
        note: 'internal transfer',
        amount: -amount,
        zhits,
        fromAddressWallet,
        toAddressWallet,
      });
      await addTransaction({
        walletAddress: toAddressWallet,
        blockchain,
        currency,
        transactionType: 'transfer',
        note: 'internal transfer',
        amount: amount,
        zhits,
        fromAddressWallet,
        toAddressWallet,
      });
    } catch (e) {
      console.error(e);
    }
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
    fromAddressWallet,
    toAddressWallet,
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
        fromAddressWallet,
        toAddressWallet,
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
