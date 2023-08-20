import { SubscriptionPlan } from './types';
import baseApiPs2 from '../baseApiPs2';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  subscriptions: builder.query<SubscriptionPlan[], void>({
    query: () => ({
      url: `subscriptions`,
    }),
  }),
  subscribe: builder.mutation<never, { code: string }>({
    query: ({ code }) => ({
      method: 'POST',
      url: `subscriptions`,
      body: { code },
    }),
  }),
}));

export const { useSubscribeMutation, useSubscriptionsQuery } = api;
