import { createApi } from '@reduxjs/toolkit/query/react';
import { Investment } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'dashboardApi',
  endpoints: (builder) => ({
    investments: builder.query<Investment[], string>({
      query: (exchangeInternalId) => ({
        url: 'user/exchanges/' + exchangeInternalId + '/investments',
      }),
    }),
  }),
});

export const { useLazyInvestmentsQuery, useInvestmentsQuery } = api;
