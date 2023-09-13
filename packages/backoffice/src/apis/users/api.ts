import { UserActionPayloadType, UserData, UserFilterType } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { fixSearchParams, injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  users: builder.query<UserData[], UserFilterType>({
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
} = api;
