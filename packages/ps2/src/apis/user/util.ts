import { logout } from './store';
import { endLiveSession } from '../../util/liveSession';
import { trackEndSession } from '../../util/analytics';
import baseApiPs2 from '../baseApiPs2';
import { api as walletApi } from '../wallet/api';
import { api as referralApi } from '../referrals/api';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export const clearUserSession = (dispatch: Dispatch<AnyAction>) => {
  dispatch(logout());
  dispatch(baseApiPs2.util.resetApiState());
  dispatch(walletApi.util.resetApiState());
  dispatch(referralApi.util.resetApiState());
  endLiveSession();
  trackEndSession();
};
