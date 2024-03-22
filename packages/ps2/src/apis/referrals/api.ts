import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ReferralRewards,
  ReferralHistory,
  Benefit,
  BenefitClaimed,
  TierLevels,
  ServiceCommission,
  ServiceCommissionPayload,
} from './types';
import baseQuery from '../baseQuery';
import { whitelabel } from '../../whitelabel';

export const api = createApi({
  baseQuery: baseQuery(whitelabel.baseReferralApi),
  reducerPath: 'referralApi',
  tagTypes: ['Referrals', 'Commission'],
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
      providesTags: ['Referrals'],
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
    serviceCommission: builder.query<ServiceCommission, { serviceId: string }>({
      query: ({ serviceId }) => ({
        url: `v1/service/commission/${serviceId}`,
      }),
      providesTags: ['Commission'],
    }),
    updateServiceCommission: builder.mutation<void, ServiceCommissionPayload>({
      query: (payload) => ({
        url: 'v1/service/commission',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Commission'],
    }),
    updateDiscount: builder.mutation<void, { discount: number }>({
      query: (payload) => ({
        url: 'v1/referrer',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Referrals'],
    }),
  }),
});

export const {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
  useReferralHistoryQuery,
  useReferralRewardsQuery,
  useTierLevelsQuery,
  useServiceCommissionQuery,
  useUpdateServiceCommissionMutation,
  useUpdateDiscountMutation,
} = api;
