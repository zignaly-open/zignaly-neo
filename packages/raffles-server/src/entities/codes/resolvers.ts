import { ApolloContext, ResourceOptions } from '../../types';
import { Code } from './model';

export const resolvers = {
  Query: {
    checkCode: async (
      _: any,
      { code }: { code: string },
      { services }: ApolloContext,
    ) => services.Code.checkCode(code),

    userCodes: async (_: any, __: any, { services }: ApolloContext) =>
      services.Code.getUserCodes(),

    userCodesRedemptions: async (
      _: any,
      __: any,
      { services }: ApolloContext,
    ) => services.Code.getUserCodesRedemptions(),

    Code: async (_: any, { id }: { id: string }, { services }: ApolloContext) =>
      services.Code.getById(id),

    allCodes: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Code.getAll(data),

    _allCodesMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Code.count(data),
  },
  Mutation: {
    redeemCode: async (
      _: any,
      { code }: { code: string },
      { services }: ApolloContext,
    ) => services.Code.redeem(code),

    createCode: async (
      _: any,
      data: Partial<Code>,
      { services }: ApolloContext,
    ) => services.Code.create(data),

    updateCode: async (
      _: any,
      data: Partial<Code>,
      { services }: ApolloContext,
    ) => services.Code.update(data),

    deleteCode: async (
      _: any,
      { id }: { id: string },
      { services }: ApolloContext,
    ) => services.Code.delete(id),
  },
};
