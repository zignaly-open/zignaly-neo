import baseApiPs2 from '../baseApiPs2';
import { logout } from './store';
import { endLiveSession } from '../../util/liveSession';
import { trackEndSession } from '../../util/analytics';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export const clearUserSession = (dispatch: Dispatch<AnyAction>) => {
  dispatch(logout());
  dispatch(baseApiPs2.util.resetApiState());
  endLiveSession();
  trackEndSession();
};
