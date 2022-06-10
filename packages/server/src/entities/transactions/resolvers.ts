import { ApolloContext } from '../../types';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';
import { getUserBalance } from './util';
import { withFilter } from 'graphql-subscriptions';

export const resolvers = {
  Query: {
    balance: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await getUserBalance(user.id);
    },
  },

  Subscription: {
    balanceChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([BALANCE_CHANGED]),
        (payload, variables, { user }: ApolloContext) =>
          +payload.id === +user.id,
      ),
    },
  },
};
