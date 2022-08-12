import { createApi } from '@reduxjs/toolkit/query/react';
import {
  LoginFullPayload,
  LoginResponse,
  SessionResponse,
  UserData,
} from './types';
import baseQuery from '../baseQuery';

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFullPayload>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    verifyCode: builder.mutation<
      LoginResponse,
      { reason: string; code: string }
    >({
      query: ({ code, reason }) => ({
        url: `/user/verify_code/${reason}`,
        method: 'POST',
        body: { code },
      }),
    }),

    user: builder.query<UserData, void>({
      query: () => ({
        url: 'user',
      }),
    }),

    session: builder.query<SessionResponse, void>({
      query: () => ({
        url: 'user/session',
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyUserQuery, useLazySessionQuery } = api;
