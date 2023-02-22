import { createApi } from '@reduxjs/toolkit/query/react';
import { ReferralRewards, ReferralHistory } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery: baseQuery(),
  reducerPath: 'referralsApi',
  tagTypes: ['Referrals'],
  endpoints: (builder) => ({
    referralRewards: builder.query<ReferralRewards, void>({
      query: () => ({
        url: 'v1/referrer/data',
      }),
    }),
    referralHistory: builder.query<ReferralHistory, void>({
      query: () => ({
        url: 'v1/referrer/history',
      }),
    }),
  }),
});

export const { useReferralHistoryQuery, useReferralRewardsQuery } = api;
