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
    serviceCommission: builder.query<ServiceCommission, { serviceId: string }>({
      query: ({ serviceId }) => ({
        url: `v1/service/commission/${serviceId}`,
      }),
    }),
    updateServiceCommission: builder.mutation<void, ServiceCommissionPayload>({
      query: (payload) => ({
        url: 'v1/service/commission',
        method: 'POST',
        body: payload,
      }),
    }),
    updateDiscount: builder.mutation<void, { discount: number }>({
      query: (payload) => ({
        url: 'v1/referrer',
        method: 'PUT',
        body: payload,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        // Update discountPct data
        dispatch(
          api.util.updateQueryData('referralRewards', undefined, (data) => {
            Object.assign(data, { discountPct: payload.discount });
          }),
        );
      },
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
