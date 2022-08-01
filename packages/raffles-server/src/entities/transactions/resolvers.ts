import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';
import { withFilter } from 'graphql-subscriptions';
import { getUserIdFromToken } from '../../util/jwt';

export const resolvers = {
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
