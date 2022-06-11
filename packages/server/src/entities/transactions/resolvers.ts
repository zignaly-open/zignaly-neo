import { ApolloContext } from '../../types';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';
import { getUserBalanceObject } from './util';
import { withFilter } from 'graphql-subscriptions';
import { getUserIdFromToken } from '../../util/jwt';

export const resolvers = {
  Query: {
    balance: async (_: any, __: any, { user }: ApolloContext) => {
      if (!user) return null;
      return await getUserBalanceObject(user.id);
    },
  },

  Subscription: {
    balanceChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([BALANCE_CHANGED]),
        (payload, variables) =>
          getUserIdFromToken(variables.token) === payload.balanceChanged.id,
      ),
    },
  },
};
