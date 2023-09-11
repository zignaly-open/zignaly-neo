import { UserData } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  users: builder.query<UserData[], Record<string, string>>({
    query: (filters) => ({
      url: 'users',
      method: 'GET',
      params: filters,
    }),
  }),
  disable2FA: builder.mutation<void, { userId: string }>({
    query: ({ userId }) => ({
      url: `disable-2fa/${userId}`,
      method: 'POST',
    }),
  }),
  ban: builder.mutation<void, { userId: string }>({
    query: ({ userId }) => ({
      url: `ban-user/${userId}`,
      method: 'POST',
    }),
  }),
  unban: builder.mutation<void, { userId: string }>({
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
