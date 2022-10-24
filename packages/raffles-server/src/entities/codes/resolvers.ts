import { ApolloContext, ResourceOptions } from '../../types';
import { Code } from './model';
import {
  check,
  countCodes,
  createCode,
  getCode,
  getCodes,
  redeem,
  updateCode,
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
    Code: async (_: any, { id }: { id: string }, { user }: ApolloContext) => {
      return getCode(user, id);
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
    updateCode: async (
      _: any,
      data: Partial<Code>,
      { user }: ApolloContext,
    ) => {
      try {
        return updateCode(user, data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    createCode: async (
      _: any,
      data: Partial<Code>,
      { user }: ApolloContext,
    ) => {
      try {
        return createCode(user, data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};
