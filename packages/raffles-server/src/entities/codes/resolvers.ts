import { ApolloContext, ResourceOptions } from '../../types';
import {
  check,
  countCodes,
  getCodes,
  redeem,
  userCodes,
  userCodesRedemptions,
} from './service';

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
    allCodes: async (
      _: any,
      data: ResourceOptions,
      { user }: ApolloContext,
    ) => {
      return getCodes(
        user,
        data.sortField,
        data.sortOrder,
        data.page,
        data.perPage,
        data.filter,
      );
    },
    _allCodesMeta: async (
      _: any,
      {
        filter,
      }: {
        filter: ResourceOptions['filter'];
      },
      { user }: ApolloContext,
    ) => {
      return countCodes(user, filter);
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
