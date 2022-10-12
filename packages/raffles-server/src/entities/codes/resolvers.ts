import { ApolloContext } from '../../types';
import { check, redeem, userCodes, userCodesRedemptions } from './service';

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
    userCodes: async (_: any, __: any, { user }: ApolloContext) => {
      return userCodes(user);
    },
    userCodesRedemptions: async (_: any, __: any, { user }: ApolloContext) => {
      return userCodesRedemptions(user);
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
