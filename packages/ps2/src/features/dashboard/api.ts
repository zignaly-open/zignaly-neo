import { createApi } from '@reduxjs/toolkit/query/react';
import { Investment } from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  reducerPath: 'dashboardApi',
  endpoints: (builder) => ({
    investments: builder.query<Investment[], string>({
      query: (exchangeId) => ({
        url: 'user/exchanges/' + exchangeId + '/investments',
      }),
    }),
  }),
});

export const { useLazyInvestmentsQuery, useInvestmentsQuery } = api;
