import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { showZigToast } from '@zignaly-open/ui';
import { RootState } from './store';
import { clearUserSession } from './session/util';

const baseQuery = (baseUrl = process.env.REACT_APP_BASE_API) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).session?.accessToken;
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  showZigToast('error')(error?.data?.error?.msg || 'Something went wrong');
};

const customFetchBase: (
  baseUrl?: string,
) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  (baseUrl) => async (args, api, extraOptions) => {
    const result = await baseQuery(baseUrl)(args, api, extraOptions);
    maybeReportError(result?.error);

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
