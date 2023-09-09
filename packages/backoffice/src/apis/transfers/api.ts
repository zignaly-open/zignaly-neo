import { UserData } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  deposits: builder.query<void, UserData[]>({
    query: () => ({
      url: 'deposits',
      method: 'GET',
    }),
  }),
  withdrawals: builder.query<void, UserData[]>({
    query: () => ({
      url: 'withdrawals',
      method: 'GET',
    }),
  }),
  withdrawalReject: builder.mutation<void, { withdrawalId: string }>({
    query: ({ withdrawalId }) => ({
      url: `withdrawals/${withdrawalId}/reject`,
      method: 'POST',
    }),
  }),
  withdrawalApprove: builder.mutation<void, { withdrawalId: string }>({
    query: ({ withdrawalId }) => ({
      url: `withdrawals/${withdrawalId}/approve`,
      method: 'POST',
    }),
  }),
  depositApprove: builder.mutation<void, { withdrawalId: string }>({
    query: ({ withdrawalId }) => ({
      url: `deposits/${withdrawalId}/approve`,
      method: 'POST',
    }),
  }),
}));

export const {
  useDepositApproveMutation,
  useDepositsQuery,
  useWithdrawalApproveMutation,
  useWithdrawalsQuery,
  useWithdrawalRejectMutation,
} = api;
