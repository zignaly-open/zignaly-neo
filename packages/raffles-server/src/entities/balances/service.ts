import { Balance } from './model';
import { ContextBalance } from '../../types';

export const generateService = () => {
  const getAll = async (data: any) => {
    console.log('data', data, Balance.findAll(data).then((res) => console.log(res)));
    return Balance.findAll(data);
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
    getAll,
    getWalletAmountBalance,
    getWalletTransactions,
    getWalletZhitsBalance,
    internalTransfer,
  };
};
