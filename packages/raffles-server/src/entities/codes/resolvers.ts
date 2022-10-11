import { ApolloContext } from '../../types';
import { check, redeem } from './service';

export const resolvers = {
  Query: {
    checkCode: async (
      _: any,
      { code }: { code: string },
      { user }: ApolloContext,
    ) => {
      return check(code, user);
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
