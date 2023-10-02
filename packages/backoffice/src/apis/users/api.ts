import { UserActionPayloadType, UserData, UserFilterType } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints, PaginatedResponse, PaginationType } from 'apis/util';
import { fixSearchParams } from '@zignaly-open/ui';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  users: builder.query<
    PaginatedResponse<UserData>,
    UserFilterType & PaginationType
  >({
    query: (params) => ({
      url: 'users',
      method: 'GET',
      params: fixSearchParams(params),
    }),
  }),
  disable2FA: builder.mutation<void, UserActionPayloadType>({
    query: ({ userId }) => ({
      url: `disable-2fa/${userId}`,
      method: 'POST',
    }),
  }),
  ban: builder.mutation<void, UserActionPayloadType>({
    query: ({ userId }) => ({
      url: `ban-user/${userId}`,
      method: 'POST',
    }),
  }),
  unban: builder.mutation<void, UserActionPayloadType>({
    query: ({ userId }) => ({
      url: `unban-user/${userId}`,
      method: 'POST',
    }),
  }),
}));

export const {
  useLazyUsersQuery,
  useDisable2FAMutation,
  useBanMutation,
  useUnbanMutation,
  useUsersQuery,
} = api;
