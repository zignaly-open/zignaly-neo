import { ApolloContext, ResourceOptions } from '../../types';
import { Code } from './model';

export const resolvers = {
  Query: {
    checkCode: async (
      _: any,
      { code }: { code: string },
      { services }: ApolloContext,
    ) => services.Codes.checkCode(code),
    userCodes: async (_: any, __: any, { services }: ApolloContext) =>
      services.Codes.getUserCodes(),
    userCodesRedemptions: async (
      _: any,
      __: any,
      { services }: ApolloContext,
    ) => services.Codes.getUserCodesRedemptions(),
    Code: async (_: any, { id }: { id: string }, { services }: ApolloContext) =>
      services.Codes.getById(id),
    allCodes: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Codes.getAll(data),
    _allCodesMeta: async (
      _: any,
      data: ResourceOptions,
      { services }: ApolloContext,
    ) => services.Codes.count(data),
  },
  Mutation: {
    redeemCode: async (
      _: any,
      { code }: { code: string },
      { services }: ApolloContext,
    ) => services.Codes.redeem(code),
    createCode: async (
      _: any,
      data: Partial<Code>,
      { services }: ApolloContext,
    ) => services.Codes.create(data),
    updateCode: async (
      _: any,
      data: Partial<Code>,
      { services }: ApolloContext,
    ) => services.Codes.update(data),
    deleteCode: async (
      _: any,
      { id }: { id: string },
      { services }: ApolloContext,
    ) => services.Codes.delete(id),
  },
};
