import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './store';
import { useToast } from 'util/hooks/useToast';
import { clearUserSession } from './user/util';

const baseQuery = (baseUrl = process.env.REACT_APP_BASE_API) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token && !['login', 'signup'].includes(endpoint)) {
        headers.set('authorization', `Bearer ${token}`);
      }
      if (!headers || !headers.get('Content-Type')) {
        headers.set('content-type', 'application/json');
      }
      return headers;
    },
  });

const endpointsWhitelistedFor401 = [`login`, `logout`];

const maybeReportError = (error: FetchBaseQueryError) => {
  if (!error) return;
  // @ts-ignore
  useToast().error(error?.data?.error || 'Something went wrong');
};

const customFetchBase: (
  baseUrl?: string,
) => BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { silent?: boolean }
> = (baseUrl) => async (args, api, extraOptions) => {
  const result = await baseQuery(baseUrl)(args, api, extraOptions);
  extraOptions?.silent || maybeReportError(result?.error);

  if (
    result?.error?.status === 401 &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !endpointsWhitelistedFor401.includes(args.url)
  ) {
    clearUserSession(api.dispatch);
  }

  return result;
};

export default customFetchBase;
