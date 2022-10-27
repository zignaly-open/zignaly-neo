import { ApolloContext, ResourceOptions } from '../../types';
import { checkAdmin } from '../../util/admin';
import { getCodeSettings, updateCodeSettings } from './service';
import { CodeSettings } from './types';

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
      data: CodeSettings,
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
