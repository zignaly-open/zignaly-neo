import {
  DepositData,
  TransferActionPayloadType,
  TransferFilterType,
  WithdrawalData,
} from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { fixSearchParams, injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  deposits: builder.query<DepositData[], TransferFilterType>({
    query: (params) => ({
      url: 'deposits',
      method: 'GET',
      params: fixSearchParams(params),
    }),
  }),
  withdrawals: builder.query<WithdrawalData[], TransferFilterType>({
    query: (params) => ({
      url: 'withdrawals',
      method: 'GET',
      params: fixSearchParams(params),
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
