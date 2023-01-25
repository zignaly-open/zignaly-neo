import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { isTest, redisURL } from '../config';

let pubsub: PubSubEngine;
if (!isTest) {
  pubsub = new RedisPubSub({ connection: redisURL });
} else {
  pubsub = new PubSub();
}

export default pubsub;
