import { PubSub } from 'graphql-subscriptions';

// TODO: redis or smth
const pubsub = new PubSub();

export default pubsub;
