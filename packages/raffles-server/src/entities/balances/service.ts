import { Balance } from './model';
import {
  BalanceType,
  DepositParams,
  PayoutParams,
  FeeParams,
  RedeemParams,
  UserBalanceZhits,
  ImportParams,
  Import,
} from './types';
import { TransactionType } from '../../types';
import { Code } from '../codes/model';

export const getWalletZhitsBalance = async (walletAddress: string) => {
  return Balance.aggregate('zhits', 'sum', {
    where: {
      walletAddress,
    },
  });
};

const addTransaction = async ({
  walletAddress,
  zhits,
  amount,
  currency,
  blockchain,
  transactionType,
  note = '',
}: BalanceType) => {
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

    return transaction;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const addTransactions = async (balanceType: BalanceType[]) => {
  try {
    const transaction = await Balance.bulkCreate(balanceType);
    return transaction;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const payFee = async ({ walletAddress, zhits, note }: FeeParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!zhits || isNaN(Number(zhits)) || Number(zhits) <= 0) {
    throw new Error('Invalid amount');
  }

  const tx = addTransaction({
    walletAddress,
    zhits: `${-zhits}`,
    amount: '0',
    currency: '',
    blockchain: '',
    transactionType: TransactionType.Fee,
    note,
  });

  return tx;
};

export const makePayout = async ({
  walletAddress,
  zhits,
  note,
}: PayoutParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!zhits || isNaN(Number(zhits)) || Number(zhits) <= 0) {
    throw new Error('Invalid amount');
  }

  const tx = addTransaction({
    walletAddress,
    zhits: `${-zhits}`,
    amount: '0',
    currency: '',
    blockchain: '',
    transactionType: TransactionType.Payout,
    note,
  });

  return tx;
};

export const referralCode = async ({
  walletAddress,
  zhits,
  note,
}: RedeemParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!zhits || isNaN(Number(zhits)) || Number(zhits) <= 0) {
    throw new Error('Invalid amount');
  }

  addTransaction({
    walletAddress,
    zhits,
    amount: '0',
    currency: '',
    blockchain: '',
    transactionType: TransactionType.ReferralCode,
    note,
  });
};

export const redeemCode = async ({
  walletAddress,
  zhits,
  note,
}: RedeemParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!zhits || isNaN(Number(zhits)) || Number(zhits) <= 0) {
    throw new Error('Invalid amount');
  }

  addTransaction({
    walletAddress,
    zhits,
    amount: '0',
    currency: '',
    blockchain: '',
    transactionType: TransactionType.RedeemCode,
    note,
  });
};

export const deposit = async ({
  walletAddress,
  amount,
  currency,
  blockchain,
}: DepositParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new Error('Invalid amount');
  }
  if (!currency) {
    throw new Error('Currency is required');
  }
  if (!blockchain) {
    throw new Error('Blockchain is required');
  }

  const tx = addTransaction({
    walletAddress,
    zhits: `${Number(amount) * 1}`,
    amount,
    currency,
    blockchain,
    transactionType: TransactionType.Deposit,
    note: '',
  });

  return tx;
};

//This two functions are only for migrating current balances from the old system to the new one
export const importBalance = async ({ walletAddress, zhits }: ImportParams) => {
  if (!walletAddress) {
    throw new Error('Wallet address is required');
  }
  if (!zhits || isNaN(Number(zhits)) || Number(zhits) <= 0) {
    throw new Error('Invalid amount');
  }

  addTransaction({
    walletAddress,
    zhits: zhits,
    amount: '0',
    currency: '',
    blockchain: '',
    transactionType: Import.Import,
    note: '',
  });
};

export const importBalanceBulk = async (balanceRowsImports: BalanceType[]) => {
  if (balanceRowsImports.length === 0) {
    throw new Error('No rows to import from cybavo');
  }
  addTransactions(balanceRowsImports);
};

export const getUserBalance = async (
  walletAddress: string,
): Promise<UserBalanceZhits> => {
  const userBalance = await Balance.aggregate('zhits', 'sum', {
    where: {
      walletAddress,
    },
  });

  return `${userBalance}`;
};

export const getUserDeposits = async (
  walletAddress: string,
): Promise<Balance[]> => {
  const userBalance = await Balance.findAll({
    where: {
      walletAddress,
      transactionType: TransactionType.Deposit,
    },
  });

  return userBalance;
};

export const getDepositsTotal = async (code: Code, walletAddress: string) => {
  return (await getUserDeposits(walletAddress)).reduce(
    (total, deposit) =>
      total +
      (!code.reqDepositFrom || new Date(deposit.createdAt) > code.reqDepositFrom
        ? Number(deposit.zhits)
        : 0),
    0,
  );
};
