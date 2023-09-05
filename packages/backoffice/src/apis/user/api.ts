import { LoginPayload, LoginResponse } from './types';
import baseApiBackoffice from '../baseApiBackoffice';
import { injectEndpoints } from 'apis/util';

export const api = injectEndpoints(baseApiBackoffice, (builder) => ({
  logout: builder.mutation<void, void>({
    query: () => ({
      url: 'logout',
      method: 'POST',
    }),
  }),
  login: builder.mutation<LoginResponse, LoginPayload>({
    query: (credentials) => ({
      url: 'login',
      method: 'POST',
      body: credentials,
    }),
  }),
  session: builder.query<
    {
      validUntil: number;
      userId: string;
    },
    void
  >({
    query: () => ({
      url: 'user/session',
    }),
  }),
}));

export const {
  useLogoutMutation,
  useLoginMutation,
  useLazyUserQuery,
  useLazySessionQuery,
} = api;
