import { Balance } from './model';
import { ContextBalance } from '../../types';

export const generateService = (balance: ContextBalance) => {
  const getWalletAmountBalance = async (walletAddress: string) => {
    if (!balance) return null;
    // return sum of amount of all transactions by walletAddress
    return Balance.aggregate('amount', 'sum', {
      where: {
        walletAddress,
      },
    });
  };

  // get zhits balance from all transactions by walletAddress
  const getWalletZhitsBalance = async (walletAddress: string) => {
    if (!balance) return null;
    return Balance.aggregate('zhits', 'sum', {
      where: {
        walletAddress,
      },
    });
  };

  const getWalletTransactions = async (walletAddress: string) => {
    if (!balance) return null;
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
    console.log('internalTransfer');
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
    getWalletAmountBalance,
    getWalletTransactions,
    getWalletZhitsBalance,
    internalTransfer,
  };
};
