import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { RootState } from './store';
import { Mutex } from 'async-mutex';
import { logout, setSessionExpiryDate } from './auth/store';
import { AuthState, SessionResponse } from './auth/types';
import { TIME_TO_START_REFRESHING_TOKEN } from '../util/constants';
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  } else if (
    +(api.getState() as { auth: AuthState }).auth.sessionExpiryDate -
      TIME_TO_START_REFRESHING_TOKEN >
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
