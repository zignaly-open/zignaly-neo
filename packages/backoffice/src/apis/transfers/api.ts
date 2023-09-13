import {
  DepositData,
  TransferActionPayloadType,
  TransferFilterType,
  WithdrawalData,
} from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  deposits: builder.query<DepositData[], TransferFilterType>({
    query: () => ({
      url: 'deposits',
      method: 'GET',
    }),
  }),
  withdrawals: builder.query<WithdrawalData[], TransferFilterType>({
    query: () => ({
      url: 'withdrawals',
      method: 'GET',
    }),
  }),
  withdrawalReject: builder.mutation<void, TransferActionPayloadType>({
    query: ({ id }) => ({
      url: `withdrawals/${id}/reject`,
      method: 'POST',
    }),
  }),
  withdrawalApprove: builder.mutation<void, TransferActionPayloadType>({
    query: ({ id }) => ({
      url: `withdrawals/${id}/approve`,
      method: 'POST',
    }),
  }),
  depositApprove: builder.mutation<void, TransferActionPayloadType>({
    query: ({ id }) => ({
      url: `deposits/${id}/approve`,
      method: 'POST',
    }),
  }),
}));

export const {
  useDepositApproveMutation,
  useDepositsQuery,
  useWithdrawalApproveMutation,
  useWithdrawalsQuery,
  useLazyDepositsQuery,
  useLazyWithdrawalsQuery,
  useWithdrawalRejectMutation,
} = api;
