import { ApolloContext } from '../../types';
import { CodeSettings } from './types';

export const resolvers = {
  Query: {
    Settings: async (_: any, __: any, { services }: ApolloContext) =>
      services.Setting.getAll(),
  },
  Mutation: {
    updateSettings: async (
      _: any,
      data: CodeSettings,
      { services }: ApolloContext,
    ) => services.Setting.update(data),
  },
};
