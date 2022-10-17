import { ApolloContext } from '../../types';
import { check, redeem, userCodes, userCodesRedemptions } from './service';

export const resolvers = {
  Query: {
    checkCode: async (
      _: any,
      { code }: { code: string },
      { user }: ApolloContext,
    ) => {
      try {
        return await check(code, user);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    userCodes: async (_: any, __: any, { user }: ApolloContext) => {
      try {
        return await userCodes(user);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    userCodesRedemptions: async (_: any, __: any, { user }: ApolloContext) => {
      try {
        return await userCodesRedemptions(user);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
  Mutation: {
    redeemCode: async (
      _: any,
      { code }: { code: string },
      { user }: ApolloContext,
    ) => {
      try {
        return await redeem(code, user);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};
