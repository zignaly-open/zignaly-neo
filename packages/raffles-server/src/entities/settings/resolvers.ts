import { ApolloContext, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { Setting } from './model';
import { getCodeSettings, updateCodeSettings } from './service';

export const resolvers = {
  Query: {
    Settings: async (
      _: any,
      data: ResourceOptions,
      { user }: ApolloContext,
    ) => {
      await checkAdmin(user?.id);
      return getCodeSettings();
    },
  },
  Mutation: {
    updateSettings: async (
      _: any,
      data: Partial<Setting>,
      { user }: ApolloContext,
    ) => {
      await checkAdmin(user?.id);
      try {
        return updateCodeSettings(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
};
