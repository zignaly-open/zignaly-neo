import { logout } from './store';
import baseApiBackoffice from '../baseApiBackoffice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export const clearUserSession = (dispatch: Dispatch<AnyAction>) => {
  dispatch(logout());
  dispatch(baseApiBackoffice.util.resetApiState());
};
