// this is a module to replace cybavo functionality
import { generateService } from './entities/balances/service';
const {
  getWalletAmountBalance,
  getWalletDepositBalance,
  internalTransfer: internalBalanceTransfer,
} = generateService();

export const getUserBalance = async (address: string) => {
  return getWalletAmountBalance(address);
};

export const getUserDeposits = async (address: string) => {
  return getWalletDepositBalance(address);
};

export const internalTransfer = async (
  from: string,
  to: string,
  amount: string,
  locked: boolean,
): Promise<string> => {
  const id = await internalBalanceTransfer({
    walletAddress: from,
    blockchain: 'polygon',
    currency: 'ZIG',
    amount: Number(amount),
    zhits: 0,
    fromAddressWallet: from,
    toAddressWallet: to,
    locked,
  });
  return id;
};
