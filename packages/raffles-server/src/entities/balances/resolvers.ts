import { ApolloContext, ResourceOptions } from '../../types';
import { ContextBalance } from '../../types';

export const resolvers = {
  Query: {
    allBalances: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Balance.getAll(data),

    getBalanceByWalletAddress: async (
      _: any,
      walletAddress: string,
      { services }: ApolloContext,
    ) => services.Balance.getWalletAmountBalance(walletAddress),

    getZhitsByWalletAddress: async (
      _: any,
      walletAddress: string,
      { services }: ApolloContext,
    ) => services.Balance.getWalletZhitsBalance(walletAddress),

    getDepositsByWalletAddress: async (
      _: any,
      data: { walletAddress: string },
      { services }: ApolloContext,
    ) =>
      services.Balance.getTransactionsTypeByWalletAddress(
        data.walletAddress,
        'deposit',
      ),
  },
  Mutation: {
    internalTransfer: async (
      _: any,
      data: ContextBalance,
      { services }: ApolloContext,
    ) => services.Balance.internalTransfer(data),

    deposit: async (
      _: any,
      data: ContextBalance,
      { services }: ApolloContext,
    ) => services.Balance.deposit(data),
  },
};
