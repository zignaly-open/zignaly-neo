import { InvestedInService, Investment, InvestmentDetails } from './types';
import { injectEndpoints } from 'apis/util';
import baseApiPs2 from '../baseApiPs2';

export const api = injectEndpoints(baseApiPs2, (builder) => ({
  investments: builder.query<Investment[], string>({
    query: (exchangeInternalId) => ({
      url: `user/exchanges/${exchangeInternalId}/investments`,
    }),
    providesTags: ['Investment'],
  }),

  withdrawInvestment: builder.mutation<
    void,
    {
      serviceId: string;
      amount: number | string;
      exchangeInternalId: string;
    }
  >({
    invalidatesTags: (result, error, args) => [
      'Balance',
      'Investment',
      'Marketplace',
      { type: 'Service', id: args.serviceId },
    ],
    query: ({ serviceId, amount, exchangeInternalId }) => ({
      url: `services/${serviceId}/investments/out`,
      method: 'POST',
      body: {
        exchangeInternalId,
        amount,
      },
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      await queryFulfilled;
      setTimeout(() => {
        dispatch(api.util.invalidateTags(['Balance']));
      }, 5000);
    },
  }),

  investedAmount: builder.query<InvestedInService, string>({
    query: (serviceId) => ({
      url: `user/exchanges/${serviceId}/invested`,
      method: 'GET',
    }),
    providesTags: ['Investment'],
  }),

  updateTakeProfit: builder.mutation<
    void,
    {
      serviceId: string;
      profitPercentage: number | string;
      exchangeInternalId: string;
    }
  >({
    invalidatesTags: ['Investment'],
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
    invalidatesTags: (result, error, args) => [
      'Balance',
      'Investment',
      { type: 'Service', id: args.serviceId },
      'Marketplace',
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
    invalidatesTags: (result, error, args) => [
      'Balance',
      'Investment',
      'Marketplace',
      { type: 'Service', id: args.serviceId },
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
    providesTags: ['Investment'],
    extraOptions: {
      // do not report errors
      // because this endpoint returns an error if we query after we make a full pull out
      // and we gotta query that
      // I understand this is a crutch but sometimes one crutch is better than 4h of debugging
      silent: true,
    },
  }),
}));

export const {
  useInvestmentsQuery,
  useInvestedAmountQuery,
  useUpdateTakeProfitAndInvestMoreMutation,
  useUpdateTakeProfitMutation,
  useInvestInServiceMutation,
  useWithdrawInvestmentMutation,
  useInvestmentDetailsQuery,
} = api;
