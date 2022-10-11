import { ApolloContext } from '../../types';
import { check, redeem } from './service';

export const resolvers = {
  Query: {
    checkCode: async (
      _: any,
      { code }: { code: string },
      { user }: ApolloContext,
    ) => {
      const { code: codeInfo } = await check(code, user);
      return codeInfo;
    },
  },
  Mutation: {
    redeemCode: async (
      _: any,
      { code }: { code: string },
      { user }: ApolloContext,
    ) => {
      return redeem(code, user);
    },
  },
};
