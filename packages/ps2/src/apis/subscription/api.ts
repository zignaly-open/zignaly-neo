import { SubscriptionPlan } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  subscriptions: builder.query<SubscriptionPlan[], void>({
    query: () => ({
      url: `subscriptions`,
    }),
  }),
  subscribe: builder.mutation<never, { subscriptionCode: string }>({
    query: ({ subscriptionCode }) => ({
      method: 'POST',
      url: `subscriptions`,
      body: { code: subscriptionCode },
    }),
  }),
}));

export const { useSubscribeMutation, useSubscriptionsQuery } = api;
