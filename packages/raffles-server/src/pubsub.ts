import { PostgresPubSub } from '@originlabs/graphql-postgres-subscriptions-retry';
import { postgresUrl } from '../config';
import { AUCTION_UPDATED } from './entities/auctions/constants';
import { BALANCE_CHANGED } from './entities/users/constants';

const pubsub = new PostgresPubSub({
  connectionString: postgresUrl,
  // Important: Add all subscriptions triggers here
  topics: [AUCTION_UPDATED, BALANCE_CHANGED],
});
pubsub.connect();
pubsub.subscribe('error', console.error);

export default pubsub;
