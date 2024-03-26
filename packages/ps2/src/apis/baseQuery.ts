import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './store';
import { Mutex } from 'async-mutex';
import { setSessionExpiryDate } from './user/store';
import { SessionResponse } from './user/types';
import { TIME_TO_START_REFRESHING_TOKEN } from '../util/constants';
import i18next from '../util/i18n/i18next';
import { backendError } from 'util/hooks/useToast';
import { BackendError } from '../util/errors';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { clearUserSession } from './user/util';
import { whitelabel } from '../whitelabel';

const mutex = new Mutex();

const baseQuery = (baseUrl = whitelabel.baseApi) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.accessToken;
      const { slug: xSource } = whitelabel;
      xSource && headers.set('x-source', xSource);
      if (token && !['login', 'signup'].includes(endpoint)) {
        headers.set('authorization', `Bearer ${token}`);
      }
      if (!headers || !headers.get('Content-Type')) {
        headers.set('content-type', 'application/json');
      }
      return headers;
    },
  });

const endpointsWhitelistedFor401 = [
  'user/verify_code/enable_user',
  'user/verify_code/verify_email',
  `user/verify_2fa`,
  `known_device/verify`,
  `login`,
  `logout`,
  'change_password',
];

const endpointsWhitelistedForSessionRefresh = [
  'user/enable_2fa/step2',
  `logout`,
];

const maybeReportError = (
  error: FetchBaseQueryError,
  requestType: BaseQueryApi['type'],
) => {
  if (!error) return;
  // eslint-disable-next-line no-console
  console.error(error);
  backendError(
    i18next.t,
    error as unknown as BackendError,
    requestType === 'mutation',
  );
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

  extraOptions?.silent || maybeReportError(result?.error, api?.type);

  if (
    result?.error?.status === 401 &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !endpointsWhitelistedFor401.includes(args.url)
  ) {
    clearUserSession(api.dispatch);
  } else if (
    +new Date((api.getState() as RootState).user.sessionExpiryDate) -
      TIME_TO_START_REFRESHING_TOKEN <
      Date.now() &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !endpointsWhitelistedForSessionRefresh.includes(args.url)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery()(
          { url: 'user/session' },
          api,
          extraOptions,
        );

        api.dispatch(
          setSessionExpiryDate(
            (refreshResult?.data as SessionResponse)?.validUntil,
          ),
        );
      } finally {
        release();
      }
    }
  }

  return result;
};

export default customFetchBase;
