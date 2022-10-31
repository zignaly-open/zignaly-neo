import { createApi } from '@reduxjs/toolkit/query/react';
import { InvestedInService, Investment, InvestmentDetails } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'investmentApi',
  tagTypes: [
    'Investment',
    'Balance', // technically it does not provide balance but affects it; needed to invalidate cache
  ],
  endpoints: (builder) => ({
    investments: builder.query<Investment[], string>({
      query: (exchangeInternalId) => ({
        url: `user/exchanges/${exchangeInternalId}/investments`,
      }),
      providesTags: (result) =>
        result?.map((x) => ({ id: x.serviceId, type: 'Investment' })),
    }),

    withdrawInvestment: builder.mutation<
      void,
      {
        serviceId: string;
        amount: number | string;
        exchangeInternalId: string;
      }
    >({
      invalidatesTags: (result, error, arg) => [
        'Balance',
        { type: 'Investment', id: arg.serviceId },
      ],
      query: ({ serviceId, amount, exchangeInternalId }) => ({
        url: `services/${serviceId}/investments/out`,
        method: 'POST',
        body: {
          exchangeInternalId,
          amount,
        },
      }),
    }),

    investedAmount: builder.query<InvestedInService, string>({
      query: (serviceId) => ({
        url: `user/exchanges/${serviceId}/invested`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        {
          id,
          type: 'Investment',
        },
      ],
    }),

    updateTakeProfit: builder.mutation<
      void,
      {
        serviceId: string;
        profitPercentage: number | string;
        exchangeInternalId: string;
      }
    >({
      invalidatesTags: (result, error, arg) => [
        { type: 'Investment', id: arg.serviceId },
      ],
      query: ({ serviceId, profitPercentage, exchangeInternalId }) => ({
        url: `services/${serviceId}/investments/percentage`,
        method: 'POST',
        body: {
          exchangeInternalId,
          profitPercent: profitPercentage,
        },
      }),
    }),

    investInService: builder.mutation<
      void,
      {
        serviceId: string;
        profitPercentage: number | string;
        amount: string;
        exchangeInternalId: string;
      }
    >({
      invalidatesTags: (result, error, arg) => [
        'Balance',
        { type: 'Investment', id: arg.serviceId },
      ],
      query: ({ serviceId, profitPercentage, exchangeInternalId, amount }) => ({
        url: `services/${serviceId}/investments/in`,
        method: 'POST',
        body: {
          exchangeInternalId,
          profitPercent: profitPercentage,
          amount,
        },
      }),
    }),

    updateTakeProfitAndInvestMore: builder.mutation<
      void,
      {
        serviceId: string;
        profitPercentage: number | string;
        exchangeInternalId: string;
        amount: string;
      }
    >({
      invalidatesTags: (result, error, arg) => [
        'Balance',
        { type: 'Investment', id: arg.serviceId },
      ],
      query: ({ serviceId, profitPercentage, exchangeInternalId, amount }) => ({
        url: `services/${serviceId}/investments/in`,
        method: 'POST',
        body: {
          exchangeInternalId,
          profitPercent: profitPercentage,
          amount,
        },
      }),
    }),

    investmentDetails: builder.query<
      InvestmentDetails,
      { exchangeInternalId: string; serviceId: string }
    >({
      query: ({ exchangeInternalId, serviceId }) => ({
        url: `user/exchanges/${exchangeInternalId}/${serviceId}`,
      }),
      providesTags: (result, error, args) => [
        {
          id: args.serviceId,
          type: 'Investment',
        },
      ],
    }),
  }),
});

export const {
  useInvestmentsQuery,
  useInvestedAmountQuery,
  useUpdateTakeProfitAndInvestMoreMutation,
  useUpdateTakeProfitMutation,
  useInvestInServiceMutation,
  useWithdrawInvestmentMutation,
  useInvestmentDetailsQuery,
} = api;
