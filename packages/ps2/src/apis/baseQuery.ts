import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './store';
import { Mutex } from 'async-mutex';
import { logout, setSessionExpiryDate } from './user/store';
import { SessionResponse } from './user/types';
import { TIME_TO_START_REFRESHING_TOKEN } from '../util/constants';
import i18next from '../util/i18next';
import { backendError } from 'util/hooks/useToast';
import { BackendError } from '../util/errors';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token && !['login', 'signup'].includes(endpoint)) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

const endpointsWhitelistedFor401 = [
  'user/verify_code/enable_user',
  `user/verify_2fa`,
  `known_device/verify`,
];

const maybeReportError = (error: FetchBaseQueryError) => {
  if (!error) return;
  backendError(i18next.t, error as unknown as BackendError);
};

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  maybeReportError(result?.error);

  if (
    result?.error?.status === 401 &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !endpointsWhitelistedFor401.includes(args.url)
  ) {
    api.dispatch(logout());
  } else if (
    +new Date((api.getState() as RootState).user.sessionExpiryDate) -
      TIME_TO_START_REFRESHING_TOKEN <
    Date.now()
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
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
