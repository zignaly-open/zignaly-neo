import { ApolloContext, ResourceOptions } from '../../types';

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
  },
};
