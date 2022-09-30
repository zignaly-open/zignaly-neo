import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redisURL } from '../config';

const pubsub = new RedisPubSub({ connection: redisURL });

export default pubsub;
