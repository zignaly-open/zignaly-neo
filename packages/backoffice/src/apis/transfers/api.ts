import {
  DepositData,
  TransferActionPayloadType,
  TransferFilterType,
  WithdrawalData,
} from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints, PaginatedResponse, PaginationType } from 'apis/util';
import { fixSearchParams } from '@zignaly-open/ui';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  deposits: builder.query<
    PaginatedResponse<DepositData>,
    TransferFilterType & PaginationType
  >({
    query: (params) => ({
      url: 'deposits',
      method: 'GET',
      params: fixSearchParams(params),
    }),
  }),
  withdrawals: builder.query<
    PaginatedResponse<WithdrawalData>,
    TransferFilterType & PaginationType
  >({
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
  useLazyWithdrawalsQuery,
  useWithdrawalRejectMutation,
} = api;
