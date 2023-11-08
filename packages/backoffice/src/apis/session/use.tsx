import { LoginPayload } from './types';
import { useLoginMutation, useLogoutMutation } from './api';
import { setAccessToken } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { clearUserSession } from './util';
import { useAsyncFn } from 'react-use';

export const useAuthenticate = (): [
  { loading: boolean },
  (payload: LoginPayload) => Promise<void>,
] => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  return useAsyncFn(
    async (payload: LoginPayload) => {
      try {
        const user = await login({
          ...payload,
        }).unwrap();
        dispatch(setAccessToken(user.token));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw e;
      }
    },
    [dispatch, login],
  );
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
  const user = useSelector((state: RootState) => state.session)?.accessToken;
  return !!user;
}
