import { PubSub } from 'graphql-subscriptions';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import { isTest, redisURL } from '../config';

// let pubsub: PubSubEngine;
// if (!isTest) {
// pubsub = new RedisPubSub({ connection: redisURL });
// } else {
const pubsub = new PubSub();
// }

export default pubsub;
