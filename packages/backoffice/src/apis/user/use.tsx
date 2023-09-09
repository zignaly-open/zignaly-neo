import { useState } from 'react';
import { LoginPayload, LoginResponse, UserData } from './types';
import {
  useLazySessionQuery,
  useLazyUserQuery,
  useLoginMutation,
  useLogoutMutation,
} from './api';
import { setAccessToken, setUser } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { clearUserSession } from './util';

const useStartSession = () => {
  const dispatch = useDispatch();
  const [loadSession] = useLazySessionQuery();
  const [loadUser] = useLazyUserQuery();

  return async (
    user: { token: string; userId?: string } & Partial<LoginResponse>,
  ) => {
    dispatch(setAccessToken(user.token));
    const needsModal =
      user.ask2FA ||
      user.isUnknownDevice ||
      user.disabled ||
      user.emailUnconfirmed;

    if (needsModal) {
      // eslint-disable-next-line no-console
      console.error('Sucks to be you');
    }
    const [, userData] = await Promise.all([
      loadSession().unwrap(),
      loadUser().unwrap(),
    ]);

    dispatch(setUser(userData));
  };
};

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: LoginPayload) => Promise<void>,
] => {
  const [login] = useLoginMutation();
  const startSession = useStartSession();

  const [loading, setLoading] = useState(false);

  // can't use useAsyncFn because https://github.com/streamich/react-use/issues/1768
  return [
    { loading },
    async (payload: LoginPayload) => {
      setLoading(true);

      try {
        const user = await login({
          ...payload,
        }).unwrap();
        await startSession(user);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
  ];
};

export function useLogout(performRequest = true): () => void {
  const dispatch = useDispatch();
  const [logoutRequest] = useLogoutMutation();
  const navigate = useNavigate();

  return () => {
    if (performRequest) {
      logoutRequest();
    }
    clearUserSession(dispatch);
    navigate('/login');
  };
}

export function useIsAuthenticated(): boolean {
  const user = useSelector((state: RootState) => state.user)?.user;
  return !!user;
}

export function useCurrentUser(): UserData | Partial<UserData> {
  return (
    useSelector((state: RootState) => state.user)?.user || ({} as UserData)
  );
}
