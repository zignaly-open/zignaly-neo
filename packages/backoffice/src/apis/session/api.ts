import { LoginPayload, LoginResponse, UserResponse } from './types';
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
  userInfo: builder.query<UserResponse, void>({
    query: () => ({
      url: 'user',
      method: 'GET',
    }),
  }),
}));

export const { useLogoutMutation, useUserInfoQuery, useLoginMutation } = api;
