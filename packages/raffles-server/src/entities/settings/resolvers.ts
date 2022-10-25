import { ApolloContext, ResourceOptions } from '../../types';
import { Setting } from './model';
import { getSettings, updateSetting } from './service';

export const resolvers = {
  Query: {
    // Setting: async (_: any, __: any, { user }: ApolloContext) => {
    //   return getSettings(user);
    // },
    allSettings: async (
      _: any,
      data: ResourceOptions,
      { user }: ApolloContext,
    ) => {
      return getSettings(user);
    },
    // _allSettingsMeta: async (
    //   _: any,
    //   {
    //     filter,
    //   }: {
    //     filter: ResourceOptions['filter'];
    //   },
    //   { user }: ApolloContext,
    // ) => {
    //   // return countCodes(user, filter);
    //   return 10;
    // },
  },
  Mutation: {
    updateSetting: async (
      _: any,
      data: Partial<Setting>,
      { user }: ApolloContext,
    ) => {
      try {
        return updateSetting(user, data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};
