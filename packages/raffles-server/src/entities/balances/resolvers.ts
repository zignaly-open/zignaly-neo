import { ApolloContext } from '../../types';

export const resolvers = {
  Query: {
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
