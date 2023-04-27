import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ReferralRewards,
  ReferralHistory,
  Benefit,
  BenefitClaimed,
  TierLevels,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery: baseQuery(process.env.REACT_APP_REFERRALS_API),
  reducerPath: 'referralApi',
  tagTypes: ['Referrals'],
  endpoints: (builder) => ({
    benefits: builder.query<Benefit[], void>({
      query: () => ({
        url: 'v1/benefit/list',
      }),
    }),
    benefitsClaimed: builder.query<BenefitClaimed[], void>({
      query: () => ({
        url: 'v1/benefit/history',
      }),
    }),
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
    tierLevels: builder.query<TierLevels, void>({
      query: () => ({
        url: 'v1/tier-levels',
      }),
    }),
  }),
});

export const {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
  useReferralHistoryQuery,
  useReferralRewardsQuery,
  useTierLevelsQuery,
} = api;
